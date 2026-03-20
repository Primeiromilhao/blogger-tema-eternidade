import fetch from 'node-fetch';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CACHE_PATH = join(__dirname, 'cache', 'verses.json');

/**
 * Busca um versículo na King James Version com cache local.
 */
export async function getKJVVerse(reference) {
    if (!reference) return { reference: "Apocalipse 1:8", text: "Eu sou o Alfa e o Ômega..." };

    // 1. Tentar carregar Cache
    let cache = {};
    try {
        if (await fs.pathExists(CACHE_PATH)) {
            cache = await fs.readJson(CACHE_PATH);
        }
    } catch (e) { cache = {}; }

    const key = reference.trim();
    if (cache[key]) {
        console.log(`[BIBLE-CACHE] Usando cache para: ${key}`);
        return cache[key];
    }

    // 2. Buscar na API
    console.log(`[BIBLE-API] Buscando na nuvem: ${key}`);
    const encoded = encodeURIComponent(key);
    const url = `https://bible-api.com/${encoded}?translation=kjv`;

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
        cache[key] = result;
        await fs.ensureDir(join(__dirname, 'cache'));
        await fs.writeJson(CACHE_PATH, cache, { spaces: 2 });

        return result;
    } catch (error) {
        console.error(`[BIBLE-ERROR] Erro ao buscar "${key}":`, error.message);
        // Fallback para não quebrar o gerador
        return { reference: key, text: "[Texto não disponível online no momento]" };
    }
}
