/**
 * Simple SVG-based icon generator for PWA
 * This creates PNG icons from an inline SVG template
 * 
 * Run with: node scripts/generate-icons.js
 * 
 * Note: For production, you may want to use a proper icon design tool.
 * These are placeholder icons that can be replaced with custom designs.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../public/icons');

// ChatThing icon as SVG - a stylized speech bubble with "CT"
const createSvgIcon = (size, maskable = false) => {
	const padding = maskable ? size * 0.1 : 0;
	const innerSize = size - padding * 2;
	const centerX = size / 2;
	const centerY = size / 2;
	
	// Scale factors
	const bubbleRadius = innerSize * 0.38;
	const fontSize = innerSize * 0.32;
	
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#1a1a1d"/>
			<stop offset="100%" style="stop-color:#0a0a0b"/>
		</linearGradient>
		<linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#6366f1"/>
			<stop offset="100%" style="stop-color:#8b5cf6"/>
		</linearGradient>
	</defs>
	
	<!-- Background -->
	<rect width="${size}" height="${size}" rx="${size * 0.18}" fill="url(#bgGrad)"/>
	
	<!-- Speech bubble -->
	<ellipse cx="${centerX}" cy="${centerY - innerSize * 0.02}" rx="${bubbleRadius}" ry="${bubbleRadius * 0.85}" fill="url(#bubbleGrad)"/>
	
	<!-- Bubble tail -->
	<path d="M ${centerX - bubbleRadius * 0.3} ${centerY + bubbleRadius * 0.6} 
	         Q ${centerX - bubbleRadius * 0.5} ${centerY + bubbleRadius * 1.1} 
	           ${centerX - bubbleRadius * 0.7} ${centerY + bubbleRadius * 0.95}
	         Q ${centerX - bubbleRadius * 0.3} ${centerY + bubbleRadius * 0.9}
	           ${centerX - bubbleRadius * 0.1} ${centerY + bubbleRadius * 0.7}" 
	      fill="url(#bubbleGrad)"/>
	
	<!-- Text "CT" -->
	<text x="${centerX}" y="${centerY + fontSize * 0.15}" 
	      font-family="system-ui, -apple-system, sans-serif" 
	      font-size="${fontSize}" 
	      font-weight="700" 
	      fill="#ffffff" 
	      text-anchor="middle" 
	      dominant-baseline="middle">CT</text>
</svg>`;
};

// Icon sizes for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('Generating PWA icons for ChatThing...\n');

// Generate regular icons
sizes.forEach(size => {
	const svg = createSvgIcon(size, false);
	const filename = `icon-${size}x${size}.svg`;
	writeFileSync(join(iconsDir, filename), svg);
	console.log(`✓ Generated ${filename}`);
});

// Generate maskable icons (with safe zone padding)
[192, 512].forEach(size => {
	const svg = createSvgIcon(size, true);
	const filename = `icon-maskable-${size}x${size}.svg`;
	writeFileSync(join(iconsDir, filename), svg);
	console.log(`✓ Generated ${filename} (maskable)`);
});

console.log('\n✅ Icon generation complete!');
console.log('\nNote: These are SVG icons. For production PWA, convert to PNG using:');
console.log('- https://realfavicongenerator.net/');
console.log('- https://maskable.app/editor');
console.log('- Or a design tool like Figma/Sketch');

