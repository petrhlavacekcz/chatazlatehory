/**
 * Konvertuje AVIF obrázky v static/img/gallery/ na WebP zálohy.
 * Spustit: bun run webp
 */
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, basename, extname } from 'path';

const dir = new URL('../static/img/gallery/', import.meta.url).pathname;
const files = (await readdir(dir)).filter((f) => f.endsWith('.avif'));

console.log(`Konvertuji ${files.length} AVIF → WebP…`);

await Promise.all(
	files.map(async (file) => {
		const input = join(dir, file);
		const output = join(dir, basename(file, extname(file)) + '.webp');
		await sharp(input).webp({ quality: 82 }).toFile(output);
		process.stdout.write('.');
	})
);

console.log(`\nHotovo — ${files.length} WebP souborů v static/img/gallery/`);
