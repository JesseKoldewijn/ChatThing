#!/usr/bin/env node
/**
 * Display coverage summary from coverage-summary.json files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

/**
 * Get coverage summary for a specific test type (without displaying)
 */
function getCoverage(type) {
	const coverageDir = path.join(rootDir, "coverage", type);
	const summaryFile = path.join(coverageDir, "coverage-summary.json");

	if (!fs.existsSync(summaryFile)) {
		return null;
	}

	try {
		const summary = JSON.parse(fs.readFileSync(summaryFile, "utf-8"));
		return summary;
	} catch {
		return null;
	}
}

/**
 * Display coverage summary for a specific test type
 */
function displayCoverage(type, silent = false) {
	const summary = getCoverage(type);

	if (!summary || !summary.total) {
		if (!silent) {
			console.log(`⚠️  No coverage-summary.json found for ${type} tests`);
		}
		return null;
	}

	const total = summary.total;

	if (silent) {
		return summary;
	}

	const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
	console.log(`\n📊 ${typeLabel} Test Coverage:`);
	console.log("─".repeat(50));
	console.log(
		`  Statements: ${total.statements.covered}/${total.statements.total} (${total.statements.pct.toFixed(1)}%)`
	);
	console.log(
		`  Branches:   ${total.branches.covered}/${total.branches.total} (${total.branches.pct.toFixed(1)}%)`
	);
	console.log(
		`  Functions:  ${total.functions.covered}/${total.functions.total} (${total.functions.pct.toFixed(1)}%)`
	);
	console.log(
		`  Lines:      ${total.lines.covered}/${total.lines.total} (${total.lines.pct.toFixed(1)}%)`
	);
	console.log("─".repeat(50));

	return summary;
}

/**
 * Calculate combined totals from multiple coverage reports
 * Merges per-file coverage data to get accurate combined totals
 */
function calculateCombinedTotals(summaries) {
	const validSummaries = summaries.filter(
		(s) => s !== null && s !== undefined
	);
	if (validSummaries.length === 0) {
		return null;
	}

	// Merge per-file coverage data
	// For each file, take the maximum coverage (union of all test types)
	const mergedFiles = new Map();

	validSummaries.forEach((summary) => {
		// Iterate through all files in the summary (excluding 'total')
		Object.keys(summary).forEach((filePath) => {
			if (filePath === "total") return;

			const fileCoverage = summary[filePath];
			if (!fileCoverage) return;

			// Get existing coverage for this file or initialize
			const existing = mergedFiles.get(filePath);
			if (!existing) {
				mergedFiles.set(filePath, {
					statements: { ...fileCoverage.statements },
					branches: { ...fileCoverage.branches },
					functions: { ...fileCoverage.functions },
					lines: { ...fileCoverage.lines },
				});
			} else {
				// Merge: take the maximum covered count (union of coverage)
				// The total should be the same across all test types for the same file
				existing.statements.covered = Math.max(
					existing.statements.covered,
					fileCoverage.statements.covered
				);
				existing.branches.covered = Math.max(
					existing.branches.covered,
					fileCoverage.branches.covered
				);
				existing.functions.covered = Math.max(
					existing.functions.covered,
					fileCoverage.functions.covered
				);
				existing.lines.covered = Math.max(
					existing.lines.covered,
					fileCoverage.lines.covered
				);
			}
		});
	});

	// Calculate combined totals from merged file data
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

	// Calculate percentages
	combined.statements.pct =
		combined.statements.total > 0
			? (combined.statements.covered / combined.statements.total) * 100
			: 0;
	combined.branches.pct =
		combined.branches.total > 0
			? (combined.branches.covered / combined.branches.total) * 100
			: 0;
	combined.functions.pct =
		combined.functions.total > 0
			? (combined.functions.covered / combined.functions.total) * 100
			: 0;
	combined.lines.pct =
		combined.lines.total > 0
			? (combined.lines.covered / combined.lines.total) * 100
			: 0;

	return combined;
}

// Get test type from command line argument
const testType = process.argv[2] || "unit";

if (testType === "all") {
	// Display all coverage types
	const unitSummary = displayCoverage("unit");
	const integrationSummary = displayCoverage("integration");
	const e2eSummary = displayCoverage("e2e");

	// Calculate and display combined totals
	const combinedTotal = calculateCombinedTotals([
		unitSummary,
		integrationSummary,
		e2eSummary,
	]);

	if (combinedTotal) {
		console.log(`\n📊 Combined Test Coverage (All Types):`);
		console.log("─".repeat(50));
		console.log(
			`  Statements: ${combinedTotal.statements.covered}/${combinedTotal.statements.total} (${combinedTotal.statements.pct.toFixed(1)}%)`
		);
		console.log(
			`  Branches:   ${combinedTotal.branches.covered}/${combinedTotal.branches.total} (${combinedTotal.branches.pct.toFixed(1)}%)`
		);
		console.log(
			`  Functions:  ${combinedTotal.functions.covered}/${combinedTotal.functions.total} (${combinedTotal.functions.pct.toFixed(1)}%)`
		);
		console.log(
			`  Lines:      ${combinedTotal.lines.covered}/${combinedTotal.lines.total} (${combinedTotal.lines.pct.toFixed(1)}%)`
		);
		console.log("─".repeat(50));
	}
} else {
	displayCoverage(testType);
}
