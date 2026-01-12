import { t as h } from "./hastscript.mjs";
import { t as parseEntities } from "./parse-entities.mjs";
bash.displayName = "bash";
bash.aliases = ["sh", "shell"];
function bash(Prism$1) {
	(function(Prism$2) {
		var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
		var commandAfterHeredoc = {
			pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
			lookbehind: true,
			alias: "punctuation",
			inside: null
		};
		var insideString = {
			bash: commandAfterHeredoc,
			environment: {
				pattern: RegExp("\\$" + envVars),
				alias: "constant"
			},
			variable: [
				{
					pattern: /\$?\(\([\s\S]+?\)\)/,
					greedy: true,
					inside: {
						variable: [{
							pattern: /(^\$\(\([\s\S]+)\)\)/,
							lookbehind: true
						}, /^\$\(\(/],
						number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
						operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
						punctuation: /\(\(?|\)\)?|,|;/
					}
				},
				{
					pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
					greedy: true,
					inside: { variable: /^\$\(|^`|\)$|`$/ }
				},
				{
					pattern: /\$\{[^}]+\}/,
					greedy: true,
					inside: {
						operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
						punctuation: /[\[\]]/,
						environment: {
							pattern: RegExp("(\\{)" + envVars),
							lookbehind: true,
							alias: "constant"
						}
					}
				},
				/\$(?:\w+|[#?*!@$])/
			],
			entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
		};
		Prism$2.languages.bash = {
			shebang: {
				pattern: /^#!\s*\/.*/,
				alias: "important"
			},
			comment: {
				pattern: /(^|[^"{\\$])#.*/,
				lookbehind: true
			},
			"function-name": [{
				pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
				lookbehind: true,
				alias: "function"
			}, {
				pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
				alias: "function"
			}],
			"for-or-select": {
				pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
				alias: "variable",
				lookbehind: true
			},
			"assign-left": {
				pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
				inside: { environment: {
					pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
					lookbehind: true,
					alias: "constant"
				} },
				alias: "variable",
				lookbehind: true
			},
			parameter: {
				pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
				alias: "variable",
				lookbehind: true
			},
			string: [
				{
					pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
					lookbehind: true,
					greedy: true,
					inside: insideString
				},
				{
					pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
					lookbehind: true,
					greedy: true,
					inside: { bash: commandAfterHeredoc }
				},
				{
					pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
					lookbehind: true,
					greedy: true,
					inside: insideString
				},
				{
					pattern: /(^|[^$\\])'[^']*'/,
					lookbehind: true,
					greedy: true
				},
				{
					pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
					greedy: true,
					inside: { entity: insideString.entity }
				}
			],
			environment: {
				pattern: RegExp("\\$?" + envVars),
				alias: "constant"
			},
			variable: insideString.variable,
			function: {
				pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
				lookbehind: true
			},
			keyword: {
				pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
				lookbehind: true
			},
			builtin: {
				pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
				lookbehind: true,
				alias: "class-name"
			},
			boolean: {
				pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
				lookbehind: true
			},
			"file-descriptor": {
				pattern: /\B&\d\b/,
				alias: "important"
			},
			operator: {
				pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
				inside: { "file-descriptor": {
					pattern: /^\d/,
					alias: "important"
				} }
			},
			punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
			number: {
				pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
				lookbehind: true
			}
		};
		commandAfterHeredoc.inside = Prism$2.languages.bash;
		var toBeCopied = [
			"comment",
			"function-name",
			"for-or-select",
			"assign-left",
			"parameter",
			"string",
			"environment",
			"function",
			"keyword",
			"builtin",
			"boolean",
			"file-descriptor",
			"operator",
			"punctuation",
			"number"
		];
		var inside = insideString.variable[1].inside;
		for (var i = 0; i < toBeCopied.length; i++) inside[toBeCopied[i]] = Prism$2.languages.bash[toBeCopied[i]];
		Prism$2.languages.sh = Prism$2.languages.bash;
		Prism$2.languages.shell = Prism$2.languages.bash;
	})(Prism$1);
}
clike.displayName = "clike";
clike.aliases = [];
function clike(Prism$1) {
	Prism$1.languages.clike = {
		comment: [{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}],
		string: {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		"class-name": {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: { punctuation: /[.\\]/ }
		},
		keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		boolean: /\b(?:false|true)\b/,
		function: /\b\w+(?=\()/,
		number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		punctuation: /[{}[\];(),.:]/
	};
}
c.displayName = "c";
c.aliases = [];
function c(Prism$1) {
	Prism$1.register(clike);
	Prism$1.languages.c = Prism$1.languages.extend("clike", {
		comment: {
			pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
			greedy: true
		},
		string: {
			pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
			greedy: true
		},
		"class-name": {
			pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
			lookbehind: true
		},
		keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
		function: /\b[a-z_]\w*(?=\s*\()/i,
		number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
		operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
	});
	Prism$1.languages.insertBefore("c", "string", { char: {
		pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
		greedy: true
	} });
	Prism$1.languages.insertBefore("c", "string", { macro: {
		pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
		lookbehind: true,
		greedy: true,
		alias: "property",
		inside: {
			string: [{
				pattern: /^(#\s*include\s*)<[^>]+>/,
				lookbehind: true
			}, Prism$1.languages.c["string"]],
			char: Prism$1.languages.c["char"],
			comment: Prism$1.languages.c["comment"],
			"macro-name": [{
				pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
				lookbehind: true
			}, {
				pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
				lookbehind: true,
				alias: "function"
			}],
			directive: {
				pattern: /^(#\s*)[a-z]+/,
				lookbehind: true,
				alias: "keyword"
			},
			"directive-hash": /^#/,
			punctuation: /##|\\(?=[\r\n])/,
			expression: {
				pattern: /\S[\s\S]*/,
				inside: Prism$1.languages.c
			}
		}
	} });
	Prism$1.languages.insertBefore("c", "function", { constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/ });
	delete Prism$1.languages.c["boolean"];
}
cpp.displayName = "cpp";
cpp.aliases = [];
function cpp(Prism$1) {
	Prism$1.register(c);
	(function(Prism$2) {
		var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
		var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function() {
			return keyword.source;
		});
		Prism$2.languages.cpp = Prism$2.languages.extend("c", {
			"class-name": [
				{
					pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function() {
						return keyword.source;
					})),
					lookbehind: true
				},
				/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
				/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
				/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
			],
			keyword,
			number: {
				pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
				greedy: true
			},
			operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
			boolean: /\b(?:false|true)\b/
		});
		Prism$2.languages.insertBefore("cpp", "string", {
			module: {
				pattern: RegExp(/(\b(?:import|module)\s+)/.source + "(?:" + /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + "|" + /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function() {
					return modName;
				}) + ")"),
				lookbehind: true,
				greedy: true,
				inside: {
					string: /^[<"][\s\S]+/,
					operator: /:/,
					punctuation: /\./
				}
			},
			"raw-string": {
				pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
				alias: "string",
				greedy: true
			}
		});
		Prism$2.languages.insertBefore("cpp", "keyword", { "generic-function": {
			pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
			inside: {
				function: /^\w+/,
				generic: {
					pattern: /<[\s\S]+/,
					alias: "class-name",
					inside: Prism$2.languages.cpp
				}
			}
		} });
		Prism$2.languages.insertBefore("cpp", "operator", { "double-colon": {
			pattern: /::/,
			alias: "punctuation"
		} });
		Prism$2.languages.insertBefore("cpp", "class-name", { "base-clause": {
			pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
			lookbehind: true,
			greedy: true,
			inside: Prism$2.languages.extend("cpp", {})
		} });
		Prism$2.languages.insertBefore("inside", "double-colon", { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i }, Prism$2.languages.cpp["base-clause"]);
	})(Prism$1);
}
csharp.displayName = "csharp";
csharp.aliases = ["cs", "dotnet"];
function csharp(Prism$1) {
	Prism$1.register(clike);
	(function(Prism$2) {
		function replace(pattern, replacements) {
			return pattern.replace(/<<(\d+)>>/g, function(m, index) {
				return "(?:" + replacements[+index] + ")";
			});
		}
		function re(pattern, replacements, flags) {
			return RegExp(replace(pattern, replacements), flags || "");
		}
		function nested(pattern, depthLog2) {
			for (var i = 0; i < depthLog2; i++) pattern = pattern.replace(/<<self>>/g, function() {
				return "(?:" + pattern + ")";
			});
			return pattern.replace(/<<self>>/g, "[^\\s\\S]");
		}
		var keywordKinds = {
			type: "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
			typeDeclaration: "class enum interface record struct",
			contextual: "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
			other: "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield"
		};
		function keywordsToPattern(words) {
			return "\\b(?:" + words.trim().replace(/ /g, "|") + ")\\b";
		}
		var typeDeclarationKeywords = keywordsToPattern(keywordKinds.typeDeclaration);
		var keywords = RegExp(keywordsToPattern(keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other));
		var nonTypeKeywords = keywordsToPattern(keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other);
		var nonContextualKeywords = keywordsToPattern(keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.other);
		var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2);
		var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
		var name = /@?\b[A-Za-z_]\w*\b/.source;
		var genericName = replace(/<<0>>(?:\s*<<1>>)?/.source, [name, generic]);
		var identifier = replace(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [nonTypeKeywords, genericName]);
		var array = /\[\s*(?:,\s*)*\]/.source;
		var typeExpressionWithoutTuple = replace(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source, [identifier, array]);
		var tupleElement = replace(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source, [
			generic,
			nestedRound,
			array
		]);
		var tuple = replace(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
		var typeExpression = replace(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source, [
			tuple,
			identifier,
			array
		]);
		var typeInside = {
			keyword: keywords,
			punctuation: /[<>()?,.:[\]]/
		};
		var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source;
		var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
		var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
		Prism$2.languages.csharp = Prism$2.languages.extend("clike", {
			string: [{
				pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
				lookbehind: true,
				greedy: true
			}, {
				pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
				lookbehind: true,
				greedy: true
			}],
			"class-name": [
				{
					pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [identifier]),
					lookbehind: true,
					inside: typeInside
				},
				{
					pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [name, typeExpression]),
					lookbehind: true,
					inside: typeInside
				},
				{
					pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
					lookbehind: true
				},
				{
					pattern: re(/(\b<<0>>\s+)<<1>>/.source, [typeDeclarationKeywords, genericName]),
					lookbehind: true,
					inside: typeInside
				},
				{
					pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
					lookbehind: true,
					inside: typeInside
				},
				{
					pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
					lookbehind: true
				},
				{
					pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [typeExpressionWithoutTuple]),
					lookbehind: true,
					inside: typeInside
				},
				{
					pattern: re(/\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source, [
						typeExpression,
						nonContextualKeywords,
						name
					]),
					inside: typeInside
				}
			],
			keyword: keywords,
			number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
			operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
			punctuation: /\?\.?|::|[{}[\];(),.:]/
		});
		Prism$2.languages.insertBefore("csharp", "number", { range: {
			pattern: /\.\./,
			alias: "operator"
		} });
		Prism$2.languages.insertBefore("csharp", "punctuation", { "named-parameter": {
			pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
			lookbehind: true,
			alias: "punctuation"
		} });
		Prism$2.languages.insertBefore("csharp", "class-name", {
			namespace: {
				pattern: re(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source, [name]),
				lookbehind: true,
				inside: { punctuation: /\./ }
			},
			"type-expression": {
				pattern: re(/(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source, [nestedRound]),
				lookbehind: true,
				alias: "class-name",
				inside: typeInside
			},
			"return-type": {
				pattern: re(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source, [typeExpression, identifier]),
				inside: typeInside,
				alias: "class-name"
			},
			"constructor-invocation": {
				pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
				lookbehind: true,
				inside: typeInside,
				alias: "class-name"
			},
			"generic-method": {
				pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [name, generic]),
				inside: {
					function: re(/^<<0>>/.source, [name]),
					generic: {
						pattern: RegExp(generic),
						alias: "class-name",
						inside: typeInside
					}
				}
			},
			"type-list": {
				pattern: re(/\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source, [
					typeDeclarationKeywords,
					genericName,
					name,
					typeExpression,
					keywords.source,
					nestedRound,
					/\bnew\s*\(\s*\)/.source
				]),
				lookbehind: true,
				inside: {
					"record-arguments": {
						pattern: re(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [genericName, nestedRound]),
						lookbehind: true,
						greedy: true,
						inside: Prism$2.languages.csharp
					},
					keyword: keywords,
					"class-name": {
						pattern: RegExp(typeExpression),
						greedy: true,
						inside: typeInside
					},
					punctuation: /[,()]/
				}
			},
			preprocessor: {
				pattern: /(^[\t ]*)#.*/m,
				lookbehind: true,
				alias: "property",
				inside: { directive: {
					pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
					lookbehind: true,
					alias: "keyword"
				} }
			}
		});
		var regularStringOrCharacter = regularString + "|" + character;
		var regularStringCharacterOrComment = replace(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source, [regularStringOrCharacter]);
		var roundExpression = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
		var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
		var attr = replace(/<<0>>(?:\s*\(<<1>>*\))?/.source, [identifier, roundExpression]);
		Prism$2.languages.insertBefore("csharp", "class-name", { attribute: {
			pattern: re(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source, [attrTarget, attr]),
			lookbehind: true,
			greedy: true,
			inside: {
				target: {
					pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
					alias: "keyword"
				},
				"attribute-arguments": {
					pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
					inside: Prism$2.languages.csharp
				},
				"class-name": {
					pattern: RegExp(identifier),
					inside: { punctuation: /\./ }
				},
				punctuation: /[:,]/
			}
		} });
		var formatString = /:[^}\r\n]+/.source;
		var mInterpolationRound = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
		var mInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [mInterpolationRound, formatString]);
		var sInterpolationRound = nested(replace(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source, [regularStringOrCharacter]), 2);
		var sInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [sInterpolationRound, formatString]);
		function createInterpolationInside(interpolation, interpolationRound) {
			return {
				interpolation: {
					pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
					lookbehind: true,
					inside: {
						"format-string": {
							pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [interpolationRound, formatString]),
							lookbehind: true,
							inside: { punctuation: /^:/ }
						},
						punctuation: /^\{|\}$/,
						expression: {
							pattern: /[\s\S]+/,
							alias: "language-csharp",
							inside: Prism$2.languages.csharp
						}
					}
				},
				string: /[\s\S]+/
			};
		}
		Prism$2.languages.insertBefore("csharp", "string", {
			"interpolation-string": [{
				pattern: re(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source, [mInterpolation]),
				lookbehind: true,
				greedy: true,
				inside: createInterpolationInside(mInterpolation, mInterpolationRound)
			}, {
				pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [sInterpolation]),
				lookbehind: true,
				greedy: true,
				inside: createInterpolationInside(sInterpolation, sInterpolationRound)
			}],
			char: {
				pattern: RegExp(character),
				greedy: true
			}
		});
		Prism$2.languages.dotnet = Prism$2.languages.cs = Prism$2.languages.csharp;
	})(Prism$1);
}
css.displayName = "css";
css.aliases = [];
function css(Prism$1) {
	(function(Prism$2) {
		var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
		Prism$2.languages.css = {
			comment: /\/\*[\s\S]*?\*\//,
			atrule: {
				pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
				inside: {
					rule: /^@[\w-]+/,
					"selector-function-argument": {
						pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
						lookbehind: true,
						alias: "selector"
					},
					keyword: {
						pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
						lookbehind: true
					}
				}
			},
			url: {
				pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
				greedy: true,
				inside: {
					function: /^url/i,
					punctuation: /^\(|\)$/,
					string: {
						pattern: RegExp("^" + string.source + "$"),
						alias: "url"
					}
				}
			},
			selector: {
				pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + string.source + ")*(?=\\s*\\{)"),
				lookbehind: true
			},
			string: {
				pattern: string,
				greedy: true
			},
			property: {
				pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
				lookbehind: true
			},
			important: /!important\b/i,
			function: {
				pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
				lookbehind: true
			},
			punctuation: /[(){};:,]/
		};
		Prism$2.languages.css["atrule"].inside.rest = Prism$2.languages.css;
		var markup$1 = Prism$2.languages.markup;
		if (markup$1) {
			markup$1.tag.addInlined("style", "css");
			markup$1.tag.addAttribute("style", "css");
		}
	})(Prism$1);
}
go.displayName = "go";
go.aliases = [];
function go(Prism$1) {
	Prism$1.register(clike);
	Prism$1.languages.go = Prism$1.languages.extend("clike", {
		string: {
			pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
			lookbehind: true,
			greedy: true
		},
		keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
		boolean: /\b(?:_|false|iota|nil|true)\b/,
		number: [
			/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
			/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
			/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
		],
		operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
		builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
	});
	Prism$1.languages.insertBefore("go", "string", { char: {
		pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
		greedy: true
	} });
	delete Prism$1.languages.go["class-name"];
}
java.displayName = "java";
java.aliases = [];
function java(Prism$1) {
	Prism$1.register(clike);
	(function(Prism$2) {
		var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
		var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
		var className = {
			pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
			lookbehind: true,
			inside: {
				namespace: {
					pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
					inside: { punctuation: /\./ }
				},
				punctuation: /\./
			}
		};
		Prism$2.languages.java = Prism$2.languages.extend("clike", {
			string: {
				pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
				lookbehind: true,
				greedy: true
			},
			"class-name": [
				className,
				{
					pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),
					lookbehind: true,
					inside: className.inside
				},
				{
					pattern: RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + classNamePrefix + /[A-Z]\w*\b/.source),
					lookbehind: true,
					inside: className.inside
				}
			],
			keyword: keywords,
			function: [Prism$2.languages.clike.function, {
				pattern: /(::\s*)[a-z_]\w*/,
				lookbehind: true
			}],
			number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
			operator: {
				pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
				lookbehind: true
			},
			constant: /\b[A-Z][A-Z_\d]+\b/
		});
		Prism$2.languages.insertBefore("java", "string", {
			"triple-quoted-string": {
				pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
				greedy: true,
				alias: "string"
			},
			char: {
				pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
				greedy: true
			}
		});
		Prism$2.languages.insertBefore("java", "class-name", {
			annotation: {
				pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
				lookbehind: true,
				alias: "punctuation"
			},
			generics: {
				pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
				inside: {
					"class-name": className,
					keyword: keywords,
					punctuation: /[<>(),.:]/,
					operator: /[?&|]/
				}
			},
			import: [{
				pattern: RegExp(/(\bimport\s+)/.source + classNamePrefix + /(?:[A-Z]\w*|\*)(?=\s*;)/.source),
				lookbehind: true,
				inside: {
					namespace: className.inside.namespace,
					punctuation: /\./,
					operator: /\*/,
					"class-name": /\w+/
				}
			}, {
				pattern: RegExp(/(\bimport\s+static\s+)/.source + classNamePrefix + /(?:\w+|\*)(?=\s*;)/.source),
				lookbehind: true,
				alias: "static",
				inside: {
					namespace: className.inside.namespace,
					static: /\b\w+$/,
					punctuation: /\./,
					operator: /\*/,
					"class-name": /\w+/
				}
			}],
			namespace: {
				pattern: RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, function() {
					return keywords.source;
				})),
				lookbehind: true,
				inside: { punctuation: /\./ }
			}
		});
	})(Prism$1);
}
javascript.displayName = "javascript";
javascript.aliases = ["js"];
function javascript(Prism$1) {
	Prism$1.register(clike);
	Prism$1.languages.javascript = Prism$1.languages.extend("clike", {
		"class-name": [Prism$1.languages.clike["class-name"], {
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}],
		keyword: [{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		}, {
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		}],
		function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
		number: {
			pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
			lookbehind: true
		},
		operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	});
	Prism$1.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
	Prism$1.languages.insertBefore("javascript", "keyword", {
		regex: {
			pattern: RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				"regex-source": {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: true,
					alias: "language-regex",
					inside: Prism$1.languages.regex
				},
				"regex-delimiter": /^\/|\/$/,
				"regex-flags": /^[a-z]+$/
			}
		},
		"function-variable": {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: "function"
		},
		parameter: [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: true,
				inside: Prism$1.languages.javascript
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: true,
				inside: Prism$1.languages.javascript
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: true,
				inside: Prism$1.languages.javascript
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: true,
				inside: Prism$1.languages.javascript
			}
		],
		constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	});
	Prism$1.languages.insertBefore("javascript", "string", {
		hashbang: {
			pattern: /^#!.*/,
			greedy: true,
			alias: "comment"
		},
		"template-string": {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: true,
			inside: {
				"template-punctuation": {
					pattern: /^`|`$/,
					alias: "string"
				},
				interpolation: {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: true,
					inside: {
						"interpolation-punctuation": {
							pattern: /^\$\{|\}$/,
							alias: "punctuation"
						},
						rest: Prism$1.languages.javascript
					}
				},
				string: /[\s\S]+/
			}
		},
		"string-property": {
			pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: true,
			greedy: true,
			alias: "property"
		}
	});
	Prism$1.languages.insertBefore("javascript", "operator", { "literal-property": {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: "property"
	} });
	if (Prism$1.languages.markup) {
		Prism$1.languages.markup.tag.addInlined("script", "javascript");
		Prism$1.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
	}
	Prism$1.languages.js = Prism$1.languages.javascript;
}
json.displayName = "json";
json.aliases = ["webmanifest"];
function json(Prism$1) {
	Prism$1.languages.json = {
		property: {
			pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
			lookbehind: true,
			greedy: true
		},
		string: {
			pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
			lookbehind: true,
			greedy: true
		},
		comment: {
			pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
			greedy: true
		},
		number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
		punctuation: /[{}[\],]/,
		operator: /:/,
		boolean: /\b(?:false|true)\b/,
		null: {
			pattern: /\bnull\b/,
			alias: "keyword"
		}
	};
	Prism$1.languages.webmanifest = Prism$1.languages.json;
}
markup.displayName = "markup";
markup.aliases = [
	"atom",
	"html",
	"mathml",
	"rss",
	"ssml",
	"svg",
	"xml"
];
function markup(Prism$1) {
	Prism$1.languages.markup = {
		comment: {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: true
		},
		prolog: {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: true
		},
		doctype: {
			pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
			greedy: true,
			inside: {
				"internal-subset": {
					pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
					lookbehind: true,
					greedy: true,
					inside: null
				},
				string: {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: true
				},
				punctuation: /^<!|>$|[[\]]/,
				"doctype-tag": /^DOCTYPE/i,
				name: /[^\s<>'"]+/
			}
		},
		cdata: {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: true
		},
		tag: {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: true,
			inside: {
				tag: {
					pattern: /^<\/?[^\s>\/]+/,
					inside: {
						punctuation: /^<\/?/,
						namespace: /^[^\s>\/:]+:/
					}
				},
				"special-attr": [],
				"attr-value": {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: { punctuation: [{
						pattern: /^=/,
						alias: "attr-equals"
					}, {
						pattern: /^(\s*)["']|["']$/,
						lookbehind: true
					}] }
				},
				punctuation: /\/?>/,
				"attr-name": {
					pattern: /[^\s>\/]+/,
					inside: { namespace: /^[^\s>\/:]+:/ }
				}
			}
		},
		entity: [{
			pattern: /&[\da-z]{1,8};/i,
			alias: "named-entity"
		}, /&#x?[\da-f]{1,8};/i]
	};
	Prism$1.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism$1.languages.markup["entity"];
	Prism$1.languages.markup["doctype"].inside["internal-subset"].inside = Prism$1.languages.markup;
	Prism$1.hooks.add("wrap", function(env) {
		if (env.type === "entity") env.attributes["title"] = env.content.value.replace(/&amp;/, "&");
	});
	Object.defineProperty(Prism$1.languages.markup.tag, "addInlined", { value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside["language-" + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism$1.languages[lang]
		};
		includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
		var inside = { "included-cdata": {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			inside: includedCdataInside
		} };
		inside["language-" + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism$1.languages[lang]
		};
		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
				return tagName;
			}), "i"),
			lookbehind: true,
			greedy: true,
			inside
		};
		Prism$1.languages.insertBefore("markup", "cdata", def);
	} });
	Object.defineProperty(Prism$1.languages.markup.tag, "addAttribute", { value: function(attrName, lang) {
		Prism$1.languages.markup.tag.inside["special-attr"].push({
			pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
			lookbehind: true,
			inside: {
				"attr-name": /^[^\s=]+/,
				"attr-value": {
					pattern: /=[\s\S]+/,
					inside: {
						value: {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, "language-" + lang],
							inside: Prism$1.languages[lang]
						},
						punctuation: [{
							pattern: /^=/,
							alias: "attr-equals"
						}, /"|'/]
					}
				}
			}
		});
	} });
	Prism$1.languages.html = Prism$1.languages.markup;
	Prism$1.languages.mathml = Prism$1.languages.markup;
	Prism$1.languages.svg = Prism$1.languages.markup;
	Prism$1.languages.xml = Prism$1.languages.extend("markup", {});
	Prism$1.languages.ssml = Prism$1.languages.xml;
	Prism$1.languages.atom = Prism$1.languages.xml;
	Prism$1.languages.rss = Prism$1.languages.xml;
}
jsx.displayName = "jsx";
jsx.aliases = [];
function jsx(Prism$1) {
	Prism$1.register(javascript);
	Prism$1.register(markup);
	(function(Prism$2) {
		var javascript$1 = Prism$2.util.clone(Prism$2.languages.javascript);
		var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
		var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
		var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
		function re(source, flags) {
			source = source.replace(/<S>/g, function() {
				return space;
			}).replace(/<BRACES>/g, function() {
				return braces;
			}).replace(/<SPREAD>/g, function() {
				return spread;
			});
			return RegExp(source, flags);
		}
		spread = re(spread).source;
		Prism$2.languages.jsx = Prism$2.languages.extend("markup", javascript$1);
		Prism$2.languages.jsx.tag.pattern = re(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source);
		Prism$2.languages.jsx.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/;
		Prism$2.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
		Prism$2.languages.jsx.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
		Prism$2.languages.jsx.tag.inside["comment"] = javascript$1["comment"];
		Prism$2.languages.insertBefore("inside", "attr-name", { spread: {
			pattern: re(/<SPREAD>/.source),
			inside: Prism$2.languages.jsx
		} }, Prism$2.languages.jsx.tag);
		Prism$2.languages.insertBefore("inside", "special-attr", { script: {
			pattern: re(/=<BRACES>/.source),
			alias: "language-javascript",
			inside: {
				"script-punctuation": {
					pattern: /^=(?=\{)/,
					alias: "punctuation"
				},
				rest: Prism$2.languages.jsx
			}
		} }, Prism$2.languages.jsx.tag);
		var stringifyToken = function(token) {
			if (!token) return "";
			if (typeof token === "string") return token;
			if (typeof token.content === "string") return token.content;
			return token.content.map(stringifyToken).join("");
		};
		var walkTokens = function(tokens) {
			var openedTags = [];
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				var notTagNorBrace = false;
				if (typeof token !== "string") if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") if (token.content[0].content[0].content === "</") {
					if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) openedTags.pop();
				} else if (token.content[token.content.length - 1].content === "/>") {} else openedTags.push({
					tagName: stringifyToken(token.content[0].content[1]),
					openedBraces: 0
				});
				else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") openedTags[openedTags.length - 1].openedBraces++;
				else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") openedTags[openedTags.length - 1].openedBraces--;
				else notTagNorBrace = true;
				if (notTagNorBrace || typeof token === "string") {
					if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
						var plainText = stringifyToken(token);
						if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
							plainText += stringifyToken(tokens[i + 1]);
							tokens.splice(i + 1, 1);
						}
						if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
							plainText = stringifyToken(tokens[i - 1]) + plainText;
							tokens.splice(i - 1, 1);
							i--;
						}
						tokens[i] = new Prism$2.Token("plain-text", plainText, null, plainText);
					}
				}
				if (token.content && typeof token.content !== "string") walkTokens(token.content);
			}
		};
		Prism$2.hooks.add("after-tokenize", function(env) {
			if (env.language !== "jsx" && env.language !== "tsx") return;
			walkTokens(env.tokens);
		});
	})(Prism$1);
}
markdown.displayName = "markdown";
markdown.aliases = ["md"];
function markdown(Prism$1) {
	Prism$1.register(markup);
	(function(Prism$2) {
		var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
		function createInline(pattern) {
			pattern = pattern.replace(/<inner>/g, function() {
				return inner;
			});
			return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + pattern + ")");
		}
		var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
		var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
			return tableCell;
		});
		var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
		Prism$2.languages.markdown = Prism$2.languages.extend("markup", {});
		Prism$2.languages.insertBefore("markdown", "prolog", {
			"front-matter-block": {
				pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
				lookbehind: true,
				greedy: true,
				inside: {
					punctuation: /^---|---$/,
					"front-matter": {
						pattern: /\S+(?:\s+\S+)*/,
						alias: ["yaml", "language-yaml"],
						inside: Prism$2.languages.yaml
					}
				}
			},
			blockquote: {
				pattern: /^>(?:[\t ]*>)*/m,
				alias: "punctuation"
			},
			table: {
				pattern: RegExp("^" + tableRow + tableLine + "(?:" + tableRow + ")*", "m"),
				inside: {
					"table-data-rows": {
						pattern: RegExp("^(" + tableRow + tableLine + ")(?:" + tableRow + ")*$"),
						lookbehind: true,
						inside: {
							"table-data": {
								pattern: RegExp(tableCell),
								inside: Prism$2.languages.markdown
							},
							punctuation: /\|/
						}
					},
					"table-line": {
						pattern: RegExp("^(" + tableRow + ")" + tableLine + "$"),
						lookbehind: true,
						inside: { punctuation: /\||:?-{3,}:?/ }
					},
					"table-header-row": {
						pattern: RegExp("^" + tableRow + "$"),
						inside: {
							"table-header": {
								pattern: RegExp(tableCell),
								alias: "important",
								inside: Prism$2.languages.markdown
							},
							punctuation: /\|/
						}
					}
				}
			},
			code: [{
				pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
				lookbehind: true,
				alias: "keyword"
			}, {
				pattern: /^```[\s\S]*?^```$/m,
				greedy: true,
				inside: {
					"code-block": {
						pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
						lookbehind: true
					},
					"code-language": {
						pattern: /^(```).+/,
						lookbehind: true
					},
					punctuation: /```/
				}
			}],
			title: [{
				pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
				alias: "important",
				inside: { punctuation: /==+$|--+$/ }
			}, {
				pattern: /(^\s*)#.+/m,
				lookbehind: true,
				alias: "important",
				inside: { punctuation: /^#+|#+$/ }
			}],
			hr: {
				pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
				lookbehind: true,
				alias: "punctuation"
			},
			list: {
				pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
				lookbehind: true,
				alias: "punctuation"
			},
			"url-reference": {
				pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
				inside: {
					variable: {
						pattern: /^(!?\[)[^\]]+/,
						lookbehind: true
					},
					string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
					punctuation: /^[\[\]!:]|[<>]/
				},
				alias: "url"
			},
			bold: {
				pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
				lookbehind: true,
				greedy: true,
				inside: {
					content: {
						pattern: /(^..)[\s\S]+(?=..$)/,
						lookbehind: true,
						inside: {}
					},
					punctuation: /\*\*|__/
				}
			},
			italic: {
				pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
				lookbehind: true,
				greedy: true,
				inside: {
					content: {
						pattern: /(^.)[\s\S]+(?=.$)/,
						lookbehind: true,
						inside: {}
					},
					punctuation: /[*_]/
				}
			},
			strike: {
				pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
				lookbehind: true,
				greedy: true,
				inside: {
					content: {
						pattern: /(^~~?)[\s\S]+(?=\1$)/,
						lookbehind: true,
						inside: {}
					},
					punctuation: /~~?/
				}
			},
			"code-snippet": {
				pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
				lookbehind: true,
				greedy: true,
				alias: ["code", "keyword"]
			},
			url: {
				pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
				lookbehind: true,
				greedy: true,
				inside: {
					operator: /^!/,
					content: {
						pattern: /(^\[)[^\]]+(?=\])/,
						lookbehind: true,
						inside: {}
					},
					variable: {
						pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
						lookbehind: true
					},
					url: {
						pattern: /(^\]\()[^\s)]+/,
						lookbehind: true
					},
					string: {
						pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
						lookbehind: true
					}
				}
			}
		});
		[
			"url",
			"bold",
			"italic",
			"strike"
		].forEach(function(token) {
			[
				"url",
				"bold",
				"italic",
				"strike",
				"code-snippet"
			].forEach(function(inside) {
				if (token !== inside) Prism$2.languages.markdown[token].inside.content.inside[inside] = Prism$2.languages.markdown[inside];
			});
		});
		Prism$2.hooks.add("after-tokenize", function(env) {
			if (env.language !== "markdown" && env.language !== "md") return;
			function walkTokens(tokens) {
				if (!tokens || typeof tokens === "string") return;
				for (var i = 0, l = tokens.length; i < l; i++) {
					var token = tokens[i];
					if (token.type !== "code") {
						walkTokens(token.content);
						continue;
					}
					var codeLang = token.content[1];
					var codeBlock = token.content[3];
					if (codeLang && codeBlock && codeLang.type === "code-language" && codeBlock.type === "code-block" && typeof codeLang.content === "string") {
						var lang = codeLang.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
						lang = (/[a-z][\w-]*/i.exec(lang) || [""])[0].toLowerCase();
						var alias$1 = "language-" + lang;
						if (!codeBlock.alias) codeBlock.alias = [alias$1];
						else if (typeof codeBlock.alias === "string") codeBlock.alias = [codeBlock.alias, alias$1];
						else codeBlock.alias.push(alias$1);
					}
				}
			}
			walkTokens(env.tokens);
		});
		Prism$2.hooks.add("wrap", function(env) {
			if (env.type !== "code-block") return;
			var codeLang = "";
			for (var i = 0, l = env.classes.length; i < l; i++) {
				var cls = env.classes[i];
				var match = /language-(.+)/.exec(cls);
				if (match) {
					codeLang = match[1];
					break;
				}
			}
			var grammar = Prism$2.languages[codeLang];
			if (!grammar) {
				if (codeLang && codeLang !== "none" && Prism$2.plugins.autoloader) {
					var id = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 0x2386f26fc10000);
					env.attributes["id"] = id;
					Prism$2.plugins.autoloader.loadLanguages(codeLang, function() {
						var ele = document.getElementById(id);
						if (ele) ele.innerHTML = Prism$2.highlight(ele.textContent, Prism$2.languages[codeLang], codeLang);
					});
				}
			} else env.content = Prism$2.highlight(env.content.value, grammar, codeLang);
		});
		RegExp(Prism$2.languages.markup.tag.pattern.source, "gi");
		String.fromCodePoint || String.fromCharCode;
		Prism$2.languages.md = Prism$2.languages.markdown;
	})(Prism$1);
}
var uniqueId = 0;
var plainTextGrammar = {};
var _ = {
	util: {
		type: function(o) {
			return Object.prototype.toString.call(o).slice(8, -1);
		},
		objId: function(obj) {
			if (!obj["__id"]) Object.defineProperty(obj, "__id", { value: ++uniqueId });
			return obj["__id"];
		},
		clone: function deepClone(o, visited) {
			visited = visited || {};
			var clone;
			var id;
			switch (_.util.type(o)) {
				case "Object":
					id = _.util.objId(o);
					if (visited[id]) return visited[id];
					clone = {};
					visited[id] = clone;
					for (var key in o) if (o.hasOwnProperty(key)) clone[key] = deepClone(o[key], visited);
					return clone;
				case "Array":
					id = _.util.objId(o);
					if (visited[id]) return visited[id];
					clone = [];
					visited[id] = clone;
					o.forEach(function(v, i) {
						clone[i] = deepClone(v, visited);
					});
					return clone;
				default: return o;
			}
		}
	},
	languages: {
		plain: plainTextGrammar,
		plaintext: plainTextGrammar,
		text: plainTextGrammar,
		txt: plainTextGrammar,
		extend: function(id, redef) {
			var lang = _.util.clone(_.languages[id]);
			for (var key in redef) lang[key] = redef[key];
			return lang;
		},
		insertBefore: function(inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];
			var ret = {};
			for (var token in grammar) if (grammar.hasOwnProperty(token)) {
				if (token == before) {
					for (var newToken in insert) if (insert.hasOwnProperty(newToken)) ret[newToken] = insert[newToken];
				}
				if (!insert.hasOwnProperty(token)) ret[token] = grammar[token];
			}
			var old = root[inside];
			root[inside] = ret;
			_.languages.DFS(_.languages, function(key, value) {
				if (value === old && key != inside) this[key] = ret;
			});
			return ret;
		},
		DFS: function DFS(o, callback, type, visited) {
			visited = visited || {};
			var objId = _.util.objId;
			for (var i in o) if (o.hasOwnProperty(i)) {
				callback.call(o, i, o[i], type || i);
				var property = o[i];
				var propertyType = _.util.type(property);
				if (propertyType === "Object" && !visited[objId(property)]) {
					visited[objId(property)] = true;
					DFS(property, callback, null, visited);
				} else if (propertyType === "Array" && !visited[objId(property)]) {
					visited[objId(property)] = true;
					DFS(property, callback, i, visited);
				}
			}
		}
	},
	plugins: {},
	highlight: function(text, grammar, language) {
		var env = {
			code: text,
			grammar,
			language
		};
		_.hooks.run("before-tokenize", env);
		if (!env.grammar) throw new Error("The language \"" + env.language + "\" has no grammar.");
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run("after-tokenize", env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},
	tokenize: function(text, grammar) {
		var rest = grammar.rest;
		if (rest) {
			for (var token in rest) grammar[token] = rest[token];
			delete grammar.rest;
		}
		var tokenList = new LinkedList();
		addAfter(tokenList, tokenList.head, text);
		matchGrammar(text, tokenList, grammar, tokenList.head, 0);
		return toArray(tokenList);
	},
	hooks: {
		all: {},
		add: function(name, callback) {
			var hooks = _.hooks.all;
			hooks[name] = hooks[name] || [];
			hooks[name].push(callback);
		},
		run: function(name, env) {
			var callbacks = _.hooks.all[name];
			if (!callbacks || !callbacks.length) return;
			for (var i = 0, callback; callback = callbacks[i++];) callback(env);
		}
	},
	Token
};
function Token(type, content, alias$1, matchedStr) {
	this.type = type;
	this.content = content;
	this.alias = alias$1;
	this.length = (matchedStr || "").length | 0;
}
function matchPattern(pattern, pos, text, lookbehind) {
	pattern.lastIndex = pos;
	var match = pattern.exec(text);
	if (match && lookbehind && match[1]) {
		var lookbehindLength = match[1].length;
		match.index += lookbehindLength;
		match[0] = match[0].slice(lookbehindLength);
	}
	return match;
}
function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
	for (var token in grammar) {
		if (!grammar.hasOwnProperty(token) || !grammar[token]) continue;
		var patterns = grammar[token];
		patterns = Array.isArray(patterns) ? patterns : [patterns];
		for (var j = 0; j < patterns.length; ++j) {
			if (rematch && rematch.cause == token + "," + j) return;
			var patternObj = patterns[j];
			var inside = patternObj.inside;
			var lookbehind = !!patternObj.lookbehind;
			var greedy = !!patternObj.greedy;
			var alias$1 = patternObj.alias;
			if (greedy && !patternObj.pattern.global) {
				var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
				patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
			}
			var pattern = patternObj.pattern || patternObj;
			for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
				if (rematch && pos >= rematch.reach) break;
				var str = currentNode.value;
				if (tokenList.length > text.length) return;
				if (str instanceof Token) continue;
				var removeCount = 1;
				var match;
				if (greedy) {
					match = matchPattern(pattern, pos, text, lookbehind);
					if (!match || match.index >= text.length) break;
					var from = match.index;
					var to = match.index + match[0].length;
					var p = pos;
					p += currentNode.value.length;
					while (from >= p) {
						currentNode = currentNode.next;
						p += currentNode.value.length;
					}
					p -= currentNode.value.length;
					pos = p;
					if (currentNode.value instanceof Token) continue;
					for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
						removeCount++;
						p += k.value.length;
					}
					removeCount--;
					str = text.slice(pos, p);
					match.index -= pos;
				} else {
					match = matchPattern(pattern, 0, str, lookbehind);
					if (!match) continue;
				}
				var from = match.index;
				var matchStr = match[0];
				var before = str.slice(0, from);
				var after = str.slice(from + matchStr.length);
				var reach = pos + str.length;
				if (rematch && reach > rematch.reach) rematch.reach = reach;
				var removeFrom = currentNode.prev;
				if (before) {
					removeFrom = addAfter(tokenList, removeFrom, before);
					pos += before.length;
				}
				removeRange(tokenList, removeFrom, removeCount);
				var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias$1, matchStr);
				currentNode = addAfter(tokenList, removeFrom, wrapped);
				if (after) addAfter(tokenList, currentNode, after);
				if (removeCount > 1) {
					var nestedRematch = {
						cause: token + "," + j,
						reach
					};
					matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
					if (rematch && nestedRematch.reach > rematch.reach) rematch.reach = nestedRematch.reach;
				}
			}
		}
	}
}
function LinkedList() {
	var head = {
		value: null,
		prev: null,
		next: null
	};
	var tail = {
		value: null,
		prev: head,
		next: null
	};
	head.next = tail;
	this.head = head;
	this.tail = tail;
	this.length = 0;
}
function addAfter(list, node, value) {
	var next = node.next;
	var newNode = {
		value,
		prev: node,
		next
	};
	node.next = newNode;
	next.prev = newNode;
	list.length++;
	return newNode;
}
function removeRange(list, node, count) {
	var next = node.next;
	for (var i = 0; i < count && next !== list.tail; i++) next = next.next;
	node.next = next;
	next.prev = node;
	list.length -= i;
}
function toArray(list) {
	var array = [];
	var node = list.head.next;
	while (node !== list.tail) {
		array.push(node.value);
		node = node.next;
	}
	return array;
}
const Prism = _;
function Refractor() {}
Refractor.prototype = Prism;
const refractor = new Refractor();
refractor.highlight = highlight;
refractor.register = register;
refractor.alias = alias;
refractor.registered = registered;
refractor.listLanguages = listLanguages;
refractor.util.encode = encode;
refractor.Token.stringify = stringify;
function highlight(value, language) {
	if (typeof value !== "string") throw new TypeError("Expected `string` for `value`, got `" + value + "`");
	let grammar;
	let name;
	/* c8 ignore next 2 */
	if (language && typeof language === "object") grammar = language;
	else {
		name = language;
		if (typeof name !== "string") throw new TypeError("Expected `string` for `name`, got `" + name + "`");
		if (Object.hasOwn(refractor.languages, name)) grammar = refractor.languages[name];
		else throw new Error("Unknown language: `" + name + "` is not registered");
	}
	return {
		type: "root",
		children: Prism.highlight.call(refractor, value, grammar, name)
	};
}
function register(syntax) {
	if (typeof syntax !== "function" || !syntax.displayName) throw new Error("Expected `function` for `syntax`, got `" + syntax + "`");
	if (!Object.hasOwn(refractor.languages, syntax.displayName)) syntax(refractor);
}
function alias(language, alias$1) {
	const languages = refractor.languages;
	let map = {};
	if (typeof language === "string") {
		if (alias$1) map[language] = alias$1;
	} else map = language;
	let key;
	for (key in map) if (Object.hasOwn(map, key)) {
		const value = map[key];
		const list = typeof value === "string" ? [value] : value;
		let index = -1;
		while (++index < list.length) languages[list[index]] = languages[key];
	}
}
function registered(aliasOrLanguage) {
	if (typeof aliasOrLanguage !== "string") throw new TypeError("Expected `string` for `aliasOrLanguage`, got `" + aliasOrLanguage + "`");
	return Object.hasOwn(refractor.languages, aliasOrLanguage);
}
function listLanguages() {
	const languages = refractor.languages;
	const list = [];
	let language;
	for (language in languages) if (Object.hasOwn(languages, language) && typeof languages[language] === "object") list.push(language);
	return list;
}
function stringify(value, language) {
	if (typeof value === "string") return {
		type: "text",
		value
	};
	if (Array.isArray(value)) {
		const result = [];
		let index = -1;
		while (++index < value.length) if (value[index] !== null && value[index] !== void 0 && value[index] !== "") result.push(stringify(value[index], language));
		return result;
	}
	const env = {
		attributes: {},
		classes: ["token", value.type],
		content: stringify(value.content, language),
		language,
		tag: "span",
		type: value.type
	};
	if (value.alias) env.classes.push(...typeof value.alias === "string" ? [value.alias] : value.alias);
	refractor.hooks.run("wrap", env);
	return h(env.tag + "." + env.classes.join("."), attributes(env.attributes), env.content);
}
function encode(tokens) {
	return tokens;
}
function attributes(record) {
	let key;
	for (key in record) if (Object.hasOwn(record, key)) record[key] = parseEntities(record[key]);
	return record;
}
python.displayName = "python";
python.aliases = ["py"];
function python(Prism$1) {
	Prism$1.languages.python = {
		comment: {
			pattern: /(^|[^\\])#.*/,
			lookbehind: true,
			greedy: true
		},
		"string-interpolation": {
			pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
			greedy: true,
			inside: {
				interpolation: {
					pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
					lookbehind: true,
					inside: {
						"format-spec": {
							pattern: /(:)[^:(){}]+(?=\}$)/,
							lookbehind: true
						},
						"conversion-option": {
							pattern: /![sra](?=[:}]$)/,
							alias: "punctuation"
						},
						rest: null
					}
				},
				string: /[\s\S]+/
			}
		},
		"triple-quoted-string": {
			pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
			greedy: true,
			alias: "string"
		},
		string: {
			pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
			greedy: true
		},
		function: {
			pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
			lookbehind: true
		},
		"class-name": {
			pattern: /(\bclass\s+)\w+/i,
			lookbehind: true
		},
		decorator: {
			pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
			lookbehind: true,
			alias: ["annotation", "punctuation"],
			inside: { punctuation: /\./ }
		},
		keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
		builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
		boolean: /\b(?:False|None|True)\b/,
		number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
		operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
		punctuation: /[{}[\];(),.:]/
	};
	Prism$1.languages.python["string-interpolation"].inside["interpolation"].inside.rest = Prism$1.languages.python;
	Prism$1.languages.py = Prism$1.languages.python;
}
rust.displayName = "rust";
rust.aliases = [];
function rust(Prism$1) {
	(function(Prism$2) {
		var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
		for (var i = 0; i < 2; i++) multilineComment = multilineComment.replace(/<self>/g, function() {
			return multilineComment;
		});
		multilineComment = multilineComment.replace(/<self>/g, function() {
			return /[^\s\S]/.source;
		});
		Prism$2.languages.rust = {
			comment: [{
				pattern: RegExp(/(^|[^\\])/.source + multilineComment),
				lookbehind: true,
				greedy: true
			}, {
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}],
			string: {
				pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
				greedy: true
			},
			char: {
				pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
				greedy: true
			},
			attribute: {
				pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
				greedy: true,
				alias: "attr-name",
				inside: { string: null }
			},
			"closure-params": {
				pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
				lookbehind: true,
				greedy: true,
				inside: {
					"closure-punctuation": {
						pattern: /^\||\|$/,
						alias: "punctuation"
					},
					rest: null
				}
			},
			"lifetime-annotation": {
				pattern: /'\w+/,
				alias: "symbol"
			},
			"fragment-specifier": {
				pattern: /(\$\w+:)[a-z]+/,
				lookbehind: true,
				alias: "punctuation"
			},
			variable: /\$\w+/,
			"function-definition": {
				pattern: /(\bfn\s+)\w+/,
				lookbehind: true,
				alias: "function"
			},
			"type-definition": {
				pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
				lookbehind: true,
				alias: "class-name"
			},
			"module-declaration": [{
				pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
				lookbehind: true,
				alias: "namespace"
			}, {
				pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
				lookbehind: true,
				alias: "namespace",
				inside: { punctuation: /::/ }
			}],
			keyword: [/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/, /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],
			function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
			macro: {
				pattern: /\b\w+!/,
				alias: "property"
			},
			constant: /\b[A-Z_][A-Z_\d]+\b/,
			"class-name": /\b[A-Z]\w*\b/,
			namespace: {
				pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
				inside: { punctuation: /::/ }
			},
			number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
			boolean: /\b(?:false|true)\b/,
			punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
			operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
		};
		Prism$2.languages.rust["closure-params"].inside.rest = Prism$2.languages.rust;
		Prism$2.languages.rust["attribute"].inside["string"] = Prism$2.languages.rust["string"];
	})(Prism$1);
}
sql.displayName = "sql";
sql.aliases = [];
function sql(Prism$1) {
	Prism$1.languages.sql = {
		comment: {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
			lookbehind: true
		},
		variable: [{
			pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
			greedy: true
		}, /@[\w.$]+/],
		string: {
			pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
			greedy: true,
			lookbehind: true
		},
		identifier: {
			pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
			greedy: true,
			lookbehind: true,
			inside: { punctuation: /^`|`$/ }
		},
		function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
		keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
		boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
		number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
		operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
		punctuation: /[;[\]()`,.]/
	};
}
typescript.displayName = "typescript";
typescript.aliases = ["ts"];
function typescript(Prism$1) {
	Prism$1.register(javascript);
	(function(Prism$2) {
		Prism$2.languages.typescript = Prism$2.languages.extend("javascript", {
			"class-name": {
				pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
				lookbehind: true,
				greedy: true,
				inside: null
			},
			builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
		});
		Prism$2.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/);
		delete Prism$2.languages.typescript["parameter"];
		delete Prism$2.languages.typescript["literal-property"];
		var typeInside = Prism$2.languages.extend("typescript", {});
		delete typeInside["class-name"];
		Prism$2.languages.typescript["class-name"].inside = typeInside;
		Prism$2.languages.insertBefore("typescript", "function", {
			decorator: {
				pattern: /@[$\w\xA0-\uFFFF]+/,
				inside: {
					at: {
						pattern: /^@/,
						alias: "operator"
					},
					function: /^[\s\S]+/
				}
			},
			"generic-function": {
				pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
				greedy: true,
				inside: {
					function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
					generic: {
						pattern: /<[\s\S]+/,
						alias: "class-name",
						inside: typeInside
					}
				}
			}
		});
		Prism$2.languages.ts = Prism$2.languages.typescript;
	})(Prism$1);
}
tsx.displayName = "tsx";
tsx.aliases = [];
function tsx(Prism$1) {
	Prism$1.register(jsx);
	Prism$1.register(typescript);
	(function(Prism$2) {
		var typescript$1 = Prism$2.util.clone(Prism$2.languages.typescript);
		Prism$2.languages.tsx = Prism$2.languages.extend("jsx", typescript$1);
		delete Prism$2.languages.tsx["parameter"];
		delete Prism$2.languages.tsx["literal-property"];
		var tag = Prism$2.languages.tsx.tag;
		tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")", tag.pattern.flags);
		tag.lookbehind = true;
	})(Prism$1);
}
yaml.displayName = "yaml";
yaml.aliases = ["yml"];
function yaml(Prism$1) {
	(function(Prism$2) {
		var anchorOrAlias = /[*&][^\s[\]{},]+/;
		var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
		var properties = "(?:" + tag.source + "(?:[ 	]+" + anchorOrAlias.source + ")?|" + anchorOrAlias.source + "(?:[ 	]+" + tag.source + ")?)";
		var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function() {
			return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
		});
		var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
		function createValuePattern(value, flags) {
			flags = (flags || "").replace(/m/g, "") + "m";
			var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
				return properties;
			}).replace(/<<value>>/g, function() {
				return value;
			});
			return RegExp(pattern, flags);
		}
		Prism$2.languages.yaml = {
			scalar: {
				pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function() {
					return properties;
				})),
				lookbehind: true,
				alias: "string"
			},
			comment: /#.*/,
			key: {
				pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
					return properties;
				}).replace(/<<key>>/g, function() {
					return "(?:" + plainKey + "|" + string + ")";
				})),
				lookbehind: true,
				greedy: true,
				alias: "atrule"
			},
			directive: {
				pattern: /(^[ \t]*)%.+/m,
				lookbehind: true,
				alias: "important"
			},
			datetime: {
				pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
				lookbehind: true,
				alias: "number"
			},
			boolean: {
				pattern: createValuePattern(/false|true/.source, "i"),
				lookbehind: true,
				alias: "important"
			},
			null: {
				pattern: createValuePattern(/null|~/.source, "i"),
				lookbehind: true,
				alias: "important"
			},
			string: {
				pattern: createValuePattern(string),
				lookbehind: true,
				greedy: true
			},
			number: {
				pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "i"),
				lookbehind: true
			},
			tag,
			important: anchorOrAlias,
			punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
		};
		Prism$2.languages.yml = Prism$2.languages.yaml;
	})(Prism$1);
}
export { c as _, rust as a, markdown as c, javascript as d, java as f, cpp as g, csharp as h, sql as i, jsx as l, css as m, tsx as n, python as o, go as p, typescript as r, refractor as s, yaml as t, json as u, bash as v };
