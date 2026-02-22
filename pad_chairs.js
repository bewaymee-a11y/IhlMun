const Jimp = require('jimp');
const path = require('path');

// Photos that are too zoomed in — add 25% padding on each side
const CHAIRS_DIR = path.join(__dirname, 'public', 'chairs');
const BG_COLOR = 0x0d1b2aff; // site background color #0d1b2a
const PAD_RATIO = 0.25; // 25% padding on each side

const FILES = [
    'khadija_bakhromova.jpg',
    'muazzam_muminova.jpg',
    'roman_kim.jpg',
    'dilshod_khalbekov.jpg',
    'saida_adkhamova.jpg',
    'abdumajid_toshmatov.jpg',
    'dilnoza_yuldasheva.jpg',
    'saidakhmadkhon_saidaminov.jpg',
];

async function padImage(filename) {
    const filePath = path.join(CHAIRS_DIR, filename);
    const img = await Jimp.read(filePath);
    const w = img.getWidth();
    const h = img.getHeight();

    const padX = Math.round(w * PAD_RATIO);
    const padY = Math.round(h * PAD_RATIO);
    const newW = w + padX * 2;
    const newH = h + padY * 2;

    const canvas = new Jimp({ width: newW, height: newH, color: BG_COLOR });
    canvas.composite(img, padX, padY);
    await canvas.write(filePath);
    console.log(`✓ ${filename} → ${newW}x${newH} (was ${w}x${h})`);
}

(async () => {
    for (const f of FILES) {
        try {
            await padImage(f);
        } catch (e) {
            console.error(`✗ ${f}: ${e.message}`);
        }
    }
    console.log('\nDone! Run npm run deploy to publish.');
})();
