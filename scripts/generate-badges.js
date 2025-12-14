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
		return;
	}

	try {
		const summary = JSON.parse(fs.readFileSync(summaryFile, "utf-8"));
		const total = summary.total;

		if (!total) {
			console.log(`⚠️  No total coverage data found for ${type} tests`);
			return;
		}

		// Use lines coverage as the primary metric
		const percentage = total.lines.pct;
		const label = type === "unit" ? "unit coverage" : "e2e coverage";

		const badge = generateBadge(label, percentage);
		const badgePath = path.join(coverageDir, "badge.svg");

		fs.writeFileSync(badgePath, badge);
		console.log(`✅ Generated ${type} coverage badge: ${percentage.toFixed(1)}%`);
	} catch (error) {
		console.error(`❌ Error processing ${type} coverage:`, error.message);
	}
}

// Process both unit and e2e coverage
console.log("Generating coverage badges...\n");
processCoverage("unit");
processCoverage("e2e");
console.log("\nDone!");

