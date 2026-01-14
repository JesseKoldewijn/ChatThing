#!/usr/bin/env node
/**
 * Generate a markdown coverage report for GitHub PR comments
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function getCoverage(type) {
	const summaryFile = path.join(
		rootDir,
		"coverage",
		type,
		"coverage-summary.json",
	);
	if (!fs.existsSync(summaryFile)) return null;
	try {
		return JSON.parse(fs.readFileSync(summaryFile, "utf-8"));
	} catch {
		return null;
	}
}

function calculateCombinedTotals(summaries) {
	const validSummaries = summaries.filter((s) => s !== null && s !== undefined);
	if (validSummaries.length === 0) return null;

	const mergedFiles = new Map();
	validSummaries.forEach((summary) => {
		Object.keys(summary).forEach((filePath) => {
			if (filePath === "total") return;
			const fileCoverage = summary[filePath];
			if (!fileCoverage) return;

			const existing = mergedFiles.get(filePath);
			if (!existing) {
				mergedFiles.set(filePath, {
					statements: { ...fileCoverage.statements },
					branches: { ...fileCoverage.branches },
					functions: { ...fileCoverage.functions },
					lines: { ...fileCoverage.lines },
				});
			} else {
				existing.statements.covered = Math.max(
					existing.statements.covered,
					fileCoverage.statements.covered,
				);
				existing.branches.covered = Math.max(
					existing.branches.covered,
					fileCoverage.branches.covered,
				);
				existing.functions.covered = Math.max(
					existing.functions.covered,
					fileCoverage.functions.covered,
				);
				existing.lines.covered = Math.max(
					existing.lines.covered,
					fileCoverage.lines.covered,
				);
			}
		});
	});

	const combined = {
		statements: { covered: 0, total: 0, pct: 0 },
		branches: { covered: 0, total: 0, pct: 0 },
		functions: { covered: 0, total: 0, pct: 0 },
		lines: { covered: 0, total: 0, pct: 0 },
	};

	mergedFiles.forEach((fileCoverage) => {
		combined.statements.covered += fileCoverage.statements.covered;
		combined.statements.total += fileCoverage.statements.total;
		combined.branches.covered += fileCoverage.branches.covered;
		combined.branches.total += fileCoverage.branches.total;
		combined.functions.covered += fileCoverage.functions.covered;
		combined.functions.total += fileCoverage.functions.total;
		combined.lines.covered += fileCoverage.lines.covered;
		combined.lines.total += fileCoverage.lines.total;
	});

	["statements", "branches", "functions", "lines"].forEach((key) => {
		combined[key].pct =
			combined[key].total > 0
				? (combined[key].covered / combined[key].total) * 100
				: 0;
	});

	return combined;
}

function formatPct(pct) {
	const p = pct.toFixed(2);
	let emoji = "🟢";
	if (pct < 80) emoji = "🟡";
	if (pct < 60) emoji = "🟠";
	if (pct < 40) emoji = "🔴";
	return `${emoji} **${p}%**`;
}

const unit = getCoverage("unit");
const integration = getCoverage("integration");
const e2e = getCoverage("e2e");
const combined = calculateCombinedTotals([unit, integration, e2e]);

let markdown = "## 📊 Test Coverage Report\n\n";

if (!combined) {
	markdown += "⚠️ No coverage data found.\n";
} else {
	markdown += "| Test Type | Statements | Branches | Functions | Lines |\n";
	markdown += "|:---|:---:|:---:|:---:|:---:|\n";

	if (unit) {
		const t = unit.total;
		markdown += `| Unit | ${formatPct(t.statements.pct)} | ${formatPct(t.branches.pct)} | ${formatPct(t.functions.pct)} | ${formatPct(t.lines.pct)} |\n`;
	}
	if (integration) {
		const t = integration.total;
		markdown += `| Integration | ${formatPct(t.statements.pct)} | ${formatPct(t.branches.pct)} | ${formatPct(t.functions.pct)} | ${formatPct(t.lines.pct)} |\n`;
	}
	if (e2e) {
		const t = e2e.total;
		markdown += `| E2E | ${formatPct(t.statements.pct)} | ${formatPct(t.branches.pct)} | ${formatPct(t.functions.pct)} | ${formatPct(t.lines.pct)} |\n`;
	}

	markdown += `| **Combined (All)** | ${formatPct(combined.statements.pct)} | ${formatPct(combined.branches.pct)} | ${formatPct(combined.functions.pct)} | ${formatPct(combined.lines.pct)} |\n\n`;

	markdown += "--- \n";
	markdown += `*Generated at: ${new Date().toUTCString()}*`;
}

process.stdout.write(markdown);
