import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PATH = '/home/wwwsjdin/frontend/';
const DIST_DIR = path.join(__dirname, '..', 'frontend', 'dist');

function patchFile(filePath) {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace local absolute paths with server absolute paths
    // Pattern matches the user's local path structure
    const localPathPattern = /\/Users\/budi\.triatmojo\/Documents\/Web Project\/sjd-interior-new\/frontend\//g;

    if (localPathPattern.test(content)) {
        content = content.replace(localPathPattern, SERVER_PATH);
        changed = true;
    }

    // Also replace variants (e.g., with file:// protocol or different slashes if any)
    const localFileProtocolPattern = /file:\/\/\/Users\/budi\.triatmojo\/Documents\/Web%20Project\/sjd-interior-new\/frontend\//g;
    if (localFileProtocolPattern.test(content)) {
        content = content.replace(localFileProtocolPattern, `file://${SERVER_PATH}`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[PATCHED] ${path.relative(__dirname, filePath)}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith('.cjs')) {
            patchFile(fullPath);
        }
    }
}

console.log(`🚀 Patching build files for server path: ${SERVER_PATH}`);
if (fs.existsSync(DIST_DIR)) {
    walkDir(DIST_DIR);
    console.log('✅ Patching complete.');
} else {
    console.error('❌ dist directory not found. Run npm run build first.');
    process.exit(1);
}
