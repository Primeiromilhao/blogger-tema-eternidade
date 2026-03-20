import fetch from 'node-fetch';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CACHE_PATH = join(__dirname, 'cache', 'bible_cache.json');

/**
 * Busca um versículo na tradução especificada (default: almeida para PT)
 */
export async function getVerse(reference, translation = 'almeida') {
    if (!reference) return { reference: "Apocalipse 1:8", text: "Eu sou o Alfa e o Ômega..." };

    // 1. Tentar carregar Cache
    let mainCache = {};
    try {
        if (await fs.pathExists(CACHE_PATH)) {
            mainCache = await fs.readJson(CACHE_PATH);
        }
    } catch (e) { mainCache = {}; }

    // Estrutura do cache: mainCache[translation][reference]
    if (!mainCache[translation]) mainCache[translation] = {};
    
    const key = reference.trim();
    if (mainCache[translation][key]) {
        console.log(`[BIBLE-CACHE] (${translation}) Usando cache para: ${key}`);
        return mainCache[translation][key];
    }

    // 2. Buscar na API
    console.log(`[BIBLE-API] (${translation}) Buscando na nuvem: ${key}`);
    const encoded = encodeURIComponent(key);
    const url = `https://bible-api.com/${encoded}?translation=${translation}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Status ${response.status}`);
        
        const data = await response.json();
        const result = {
            reference: data.reference,
            text: data.text.trim(),
            verses: data.verses.map(v => ({
                book: v.book_name,
                chapter: v.chapter,
                verse: v.verse,
                text: v.text.trim()
            }))
        };

        // 3. Salvar no Cache
        mainCache[translation][key] = result;
        await fs.ensureDir(join(__dirname, 'cache'));
        await fs.writeJson(CACHE_PATH, mainCache, { spaces: 2 });

        return result;
    } catch (error) {
        console.error(`[BIBLE-ERROR] (${translation}) Erro ao buscar "${key}":`, error.message);
        // Fallback
        return { reference: key, text: `[Texto não disponível em ${translation}]` };
    }
}
