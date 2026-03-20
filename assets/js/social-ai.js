/**
 * social-ai.js — Direct REST API (no SDK dependency)
 * Uses: https://generativelanguage.googleapis.com/v1/models/...
 */

const API_KEY = "AIzaSyDouYjeRyr4FA8A1ITwe4pmEqcqeSsr-wE";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export async function generateSocialContent(userPrompt, platform) {
    const platformInstructions = {
        facebook: "Gere um post para Facebook/WhatsApp. Tom engajador, com emojis e CTA (chamada para ação).",
        instagram: "Gere uma legenda para Instagram. Tom inspirador, use hashtags relevantes.",
        tiktok: "Gere um roteiro curto ou legenda para TikTok. Use ganchos (hooks) rápidos e hashtags virais."
    };

    const fullPrompt = `Você é um especialista em redes sociais cristão.
Objetivo: Criar conteúdo para ${platform.toUpperCase()}.
${platformInstructions[platform] || platformInstructions.facebook}

Baseie o conteúdo em:
1. Um LIVRO relacionado ao tema (Henry Otasowere ou clássicos cristãos)
2. PASSAGENS BÍBLICAS relevantes
3. Uma PRÁTICA para o dia a dia

Tema: ${userPrompt}

Retorne APENAS um objeto JSON com esta estrutura:
{
  "bookTitle": "Título do Livro Base",
  "caption": "A legenda completa com passagens bíblicas e emojis",
  "practice": "Uma ação prática concreta para o leitor fazer hoje",
  "hashtags": ["tag1", "tag2", "tag3"],
  "mapData": {
    "center": "TEMA CENTRAL",
    "categories": [
      { "label": "CATEGORIA 1", "items": ["item a", "item b"] },
      { "label": "CATEGORIA 2", "items": ["item a", "item b"] }
    ]
  }
}`;

    const body = {
        contents: [{
            parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 1500
        }
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip markdown code fences if present
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}") + 1;
    if (start === -1 || end === 0) throw new Error("Resposta não contém JSON válido");
    return JSON.parse(rawText.substring(start, end));
}
