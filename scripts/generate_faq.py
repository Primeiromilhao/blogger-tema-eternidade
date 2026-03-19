import json
import os

def generate_faqs():
    with open('books.json', 'r', encoding='utf-8') as f:
        books = json.load(f)
    
    # Ensure output directory exists
    os.makedirs('chatbot', exist_ok=True)
    
    # Generic FAQ for the whole library
    library_faq = {
        "title": "Biblioteca Profética",
        "questions": []
    }
    
    for book in books:
        q = {
            "question": f"Sobre o que é o livro '{book['title']}'?",
            "answer": f"Este livro aborda temas como {book.get('subtitle', 'edificação espiritual')}. Você pode encontrá-lo no link de afiliado: {book['affiliate_link']}"
        }
        library_faq["questions"].append(q)
        
    with open('chatbot/faq_library.json', 'w', encoding='utf-8') as f:
        json.dump(library_faq, f, indent=2, ensure_ascii=False)
        
    print(f"Gerado faq_library.json com {len(books)} itens.")

if __name__ == "__main__":
    generate_faqs()
