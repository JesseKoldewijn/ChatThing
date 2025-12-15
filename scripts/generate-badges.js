#!/usr/bin/env node
/**
 * Generate coverage badge SVGs from coverage-summary.json files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

/**
 * Get color based on coverage percentage
 */
function getColor(percentage) {
	if (percentage >= 80) return "#4c1"; // green
	if (percentage >= 60) return "#a3c51c"; // yellow-green
	if (percentage >= 40) return "#dfb317"; // yellow
	if (percentage >= 20) return "#fe7d37"; // orange
	return "#e05d44"; // red
}

/**
 * Generate badge SVG
 */
function generateBadge(label, percentage) {
	const color = getColor(percentage);
	const percentText = `${percentage.toFixed(1)}%`;
	const labelWidth = label.length * 6.5 + 10;
	const valueWidth = percentText.length * 7 + 10;
	const totalWidth = labelWidth + valueWidth;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="a">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#a)">
    <path fill="#555" d="M0 0h${labelWidth}v20H0z"/>
    <path fill="${color}" d="M${labelWidth} 0h${valueWidth}v20H${labelWidth}z"/>
    <path fill="url(#b)" d="M0 0h${totalWidth}v20H0z"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="${labelWidth / 2}" y="14">${label}</text>
    <text x="${labelWidth + valueWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${percentText}</text>
    <text x="${labelWidth + valueWidth / 2}" y="14">${percentText}</text>
  </g>
</svg>`;
}

/**
 * Process a coverage directory
 */
function processCoverage(type) {
	const coverageDir = path.join(rootDir, "coverage", type);
	const summaryFile = path.join(coverageDir, "coverage-summary.json");

	if (!fs.existsSync(summaryFile)) {
		console.log(`⚠️  No coverage-summary.json found for ${type} tests`);
		return null;
	}

	try {
		const summary = JSON.parse(fs.readFileSync(summaryFile, "utf-8"));
		const total = summary.total;

		if (!total) {
			console.log(`⚠️  No total coverage data found for ${type} tests`);
			return null;
		}

		// Use lines coverage as the primary metric
		const percentage = total.lines.pct;
		const labelMap = {
			unit: "unit coverage",
			integration: "integration coverage",
			e2e: "e2e coverage",
		};
		const label = labelMap[type] || `${type} coverage`;

		const badge = generateBadge(label, percentage);
		const badgePath = path.join(coverageDir, "badge.svg");

		fs.writeFileSync(badgePath, badge);
		console.log(
			`✅ Generated ${type} coverage badge: ${percentage.toFixed(1)}%`
		);

		return { percentage, total };
	} catch (error) {
		console.error(`❌ Error processing ${type} coverage:`, error.message);
		return null;
	}
}

/**
 * Calculate total coverage by merging all coverage reports
 * This calculates the union of all covered lines across all test types
 */
function calculateTotalCoverage() {
	const types = ["unit", "integration", "e2e"];
	const summaries = {};

	// Load all coverage summaries
	for (const type of types) {
		const coverageDir = path.join(rootDir, "coverage", type);
		const summaryFile = path.join(coverageDir, "coverage-summary.json");

		if (fs.existsSync(summaryFile)) {
			try {
				const summary = JSON.parse(
					fs.readFileSync(summaryFile, "utf-8")
				);
				summaries[type] = summary;
			} catch (error) {
				console.warn(
					`⚠️  Could not load ${type} coverage summary:`,
					error.message
				);
			}
		}
	}

	if (Object.keys(summaries).length === 0) {
		console.log("⚠️  No coverage summaries found for total calculation");
		return null;
	}

	// Merge coverage data by file
	const mergedCoverage = {};

	for (const [, summary] of Object.entries(summaries)) {
		for (const [filePath, fileData] of Object.entries(summary)) {
			if (filePath === "total") continue;

			if (!mergedCoverage[filePath]) {
				mergedCoverage[filePath] = {
					statements: { total: 0, covered: 0 },
					branches: { total: 0, covered: 0 },
					functions: { total: 0, covered: 0 },
					lines: { total: 0, covered: 0 },
				};
			}

			// Use the maximum coverage (union of all covered lines)
			// For each metric, take the max of covered/total
			const metrics = ["statements", "branches", "functions", "lines"];
			for (const metric of metrics) {
				if (fileData[metric]) {
					mergedCoverage[filePath][metric].total = Math.max(
						mergedCoverage[filePath][metric].total,
						fileData[metric].total || 0
					);
					mergedCoverage[filePath][metric].covered = Math.max(
						mergedCoverage[filePath][metric].covered,
						fileData[metric].covered || 0
					);
				}
			}
		}
	}

	// Calculate totals
	const totals = {
		statements: { total: 0, covered: 0 },
		branches: { total: 0, covered: 0 },
		functions: { total: 0, covered: 0 },
		lines: { total: 0, covered: 0 },
	};

	for (const fileData of Object.values(mergedCoverage)) {
		for (const metric of Object.keys(totals)) {
			totals[metric].total += fileData[metric].total;
			totals[metric].covered += fileData[metric].covered;
		}
	}

	// Calculate percentages
	const totalCoverage = {
		statements: {
			total: totals.statements.total,
			covered: totals.statements.covered,
			pct:
				totals.statements.total > 0
					? (totals.statements.covered / totals.statements.total) *
						100
					: 0,
		},
		branches: {
			total: totals.branches.total,
			covered: totals.branches.covered,
			pct:
				totals.branches.total > 0
					? (totals.branches.covered / totals.branches.total) * 100
					: 0,
		},
		functions: {
			total: totals.functions.total,
			covered: totals.functions.covered,
			pct:
				totals.functions.total > 0
					? (totals.functions.covered / totals.functions.total) * 100
					: 0,
		},
		lines: {
			total: totals.lines.total,
			covered: totals.lines.covered,
			pct:
				totals.lines.total > 0
					? (totals.lines.covered / totals.lines.total) * 100
					: 0,
		},
	};

	return totalCoverage;
}

// Process unit, integration, and e2e coverage
console.log("Generating coverage badges...\n");
processCoverage("unit");
processCoverage("integration");
processCoverage("e2e");

// Calculate and generate total coverage badge
console.log("\nCalculating total coverage...");
const totalCoverage = calculateTotalCoverage();

if (totalCoverage) {
	const totalPercentage = totalCoverage.lines.pct;
	const badge = generateBadge("total coverage", totalPercentage);
	const badgePath = path.join(rootDir, "coverage", "badge.svg");

	fs.writeFileSync(badgePath, badge);
	console.log(
		`✅ Generated total coverage badge: ${totalPercentage.toFixed(1)}%`
	);

	// Also save total coverage summary for reference
	const totalSummaryPath = path.join(
		rootDir,
		"coverage",
		"coverage-summary.json"
	);
	fs.writeFileSync(
		totalSummaryPath,
		JSON.stringify({ total: totalCoverage }, null, 2)
	);
}

console.log("\nDone!");
