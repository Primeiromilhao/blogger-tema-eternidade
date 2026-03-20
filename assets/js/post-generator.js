/**
 * Post Generator Logic for Nova Jerusalém
 * Rotates posts every 4 hours based on books and biblical teachings.
 */

const postsLibrary = [
    {
        // Slot 1: 00:00 - 04:00 (Madrugada - Reflexão Profunda)
        id: 1,
        bookTitle: "Uma Caminhada Com Os Anjos",
        amazonLink: "https://www.amazon.com.br/Uma-Caminhada-Com-OS-Anjos/dp/1546821759/",
        siteLink: "https://novajerusalem.netlify.app/",
        teaching: "O ministério angélico não é uma fábula, mas uma assistência real para quem caminha com Deus.",
        bibleVerses: ["Salmos 91:11", "Hebreus 1:14"],
        mapData: {
            center: "Ministério Angélico",
            branches: [
                { label: "Proteção", ref: "Salmo 91" },
                { label: "Serviço", ref: "Hb 1:14" },
                { label: "Presença", ref: "Êxodo 23" }
            ]
        },
        caption: "Você já parou para pensar que não caminha sozinho? 😇 No livro 'Uma Caminhada Com Os Anjos', Henry Otasowere revela como Deus escala Seus mensageiros para te guardar. \n\n🔥 O que sustenta a sua vitória é a firmeza do seu altar! \n\n📖 Adquira agora: https://amzn.to/4tFDApL"
    },
    {
        // Slot 2: 04:00 - 08:00 (Manhã - Despertar)
        id: 2,
        bookTitle: "O Poder de Um Altar",
        amazonLink: "https://amzn.to/4sfRw90",
        siteLink: "https://novajerusalem.netlify.app/",
        teaching: "O altar é o lugar da troca: você entrega sua dor e recebe a vitória de Deus.",
        bibleVerses: ["Gênesis 12:7", "1 Reis 18:30"],
        mapData: {
            center: "O Poder do Altar",
            branches: [
                { label: "Sacrifício", ref: "Abraão" },
                { label: "Fogo", ref: "Elias" },
                { label: "Troca", ref: "Jacó" }
            ]
        },
        caption: "Bom dia! ☀️ O que sustenta a sua vitória hoje não é a sua força, mas a altura do seu Altar. No livro 'O Poder de Um Altar', entenda por que os patriarcas sempre levantavam altares antes das conquistas.\n\n📖 Disponível na Amazon: https://amzn.to/4sfRw90"
    },
    {
        // Slot 3: 08:00 - 12:00 (Tarde - Estratégia)
        id: 3,
        bookTitle: "Deus Terminar o Que Ele Começou",
        amazonLink: "https://amzn.to/4svuqvj",
        siteLink: "https://novajerusalem.netlify.app/",
        teaching: "A fidelidade de Deus garante que a obra iniciada em sua vida não ficará incompleta.",
        bibleVerses: ["Filipenses 1:6", "Esdras 5"],
        mapData: {
            center: "Fidelidade de Deus",
            branches: [
                { label: "Promessa", ref: "FP 1:6" },
                { label: "Processo", ref: "Esdras" },
                { label: "Conclusão", ref: "Vitória" }
            ]
        },
        caption: "Deus não faz nada pela metade! 🔥 Se Ele começou, Ele terminará. Aprenda a confiar no processo com o livro 'Deus Terminar o Que Ele Começou'.\n\n📖 Garanta o seu: https://amzn.to/4svuqvj"
    },
    {
        // Slot 4: 12:00 - 16:00 (Conhecimento Profundo)
        id: 4,
        bookTitle: "Espíritos Marinhos",
        amazonLink: "https://novajerusalem.netlify.app/nova-jerusalem/estudo_espiritos.html",
        siteLink: "https://novajerusalem.netlify.app/nova-jerusalem/estudo_espiritos.html",
        teaching: "A guerra espiritual exige conhecimento. Os mistérios de Gênesis 6 explicam muitas opressões modernas.",
        bibleVerses: ["Gênesis 6:1-4", "Efécios 6:12"],
        mapData: {
            center: "Guerra Espiritual",
            branches: [
                { label: "Gênesis 6", ref: "Origem" },
                { label: "Libertação", ref: "Cristo" },
                { label: "Autoridade", ref: "Fé" }
            ]
        },
        caption: "Existem mistérios que precisam ser revelados para a sua libertação total. 🌊 O estudo sobre Espíritos Marinhos e Gênesis 6 é essencial para todo guerreiro espiritual.\n\n📖 Saiba mais no site e livros: https://novajerusalem.netlify.app/"
    },
    {
        // Slot 5: 16:00 - 20:00 (Fé Inabalável)
        id: 5,
        bookTitle: "O Homem de Fé",
        amazonLink: "https://amzn.to/4lPajFT",
        siteLink: "https://novajerusalem.netlify.app/",
        teaching: "A fé não é um sentimento, é uma decisão de coragem baseada na Palavra.",
        bibleVerses: ["Hebreus 11", "Romanos 10:17"],
        mapData: {
            center: "O Homem de Fé",
            branches: [
                { label: "Coragem", ref: "Caleb" },
                { label: "Ouvir", ref: "Rm 10:17" },
                { label: "Agir", ref: "Hb 11" }
            ]
        },
        caption: "O homem de fé não murmura, ele age! 🛡️ Descubra como fortalecer sua coragem no livro 'O Homem de Fé' de Henry Otasowere.\n\n📖 Adquira agora: https://amzn.to/4lPajFT"
    },
    {
        // Slot 6: 20:00 - 00:00 (Encerramento - Altar)
        id: 6,
        bookTitle: "Salvação, um novo nascimento",
        amazonLink: "https://www.amazon.com.br/Salva%C3%A7%C3%A3o-um-novo-nascimento-Portuguese/dp/1453808833/",
        siteLink: "https://novajerusalem.netlify.app/",
        teaching: "O novo nascimento é o segredo para acessar as dimensões de Deus.",
        bibleVerses: ["João 3:3", "2 Coríntios 5:17"],
        mapData: {
            center: "Novo Nascimento",
            branches: [
                { label: "João 3", ref: "Espírito" },
                { label: "Nova Criatura", ref: "2 Co 5" },
                { label: "Reino", ref: "Acesso" }
            ]
        },
        caption: "Termine o dia renovado! ✨ O segredo da vitória total começa com o Novo Nascimento. Revelações impactantes de Henry Otasowere.\n\n📖 Comece sua jornada: https://amzn.to/3XxxYYY"
    }
];

function getCurrentSlot() {
    const hours = new Date().getHours();
    return Math.floor(hours / 4); // 0-5 slots
}

function getDailyPost() {
    const slot = getCurrentSlot();
    return postsLibrary[slot];
}

window.PostGenerator = {
    getDailyPost,
    postsLibrary
};
