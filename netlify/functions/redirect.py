# netlify/functions/redirect.py
import json
import os
import urllib.parse
from datetime import datetime
import requests

# ---- CONFIGURAÇÕES ----
# 1. Google Sheets (ou Airtable) onde os logs serão gravados
SHEETS_ID = os.getenv('SHEETS_ID')  # ID da planilha
SHEETS_RANGE = 'Logs!A:E'  # Aba "Logs" colunas: Timestamp, Book, Type, IP, UA
GOOGLE_API_TOKEN = os.getenv('GOOGLE_API_TOKEN')  # OAuth token de serviço (service account)

# 2. Dicionário de links de afiliado
AFFILIATE_LINKS = {
    "marine_spirits": "https://amzn.to/4lvlvj0R",
    "altar_satanico": "https://amzn.to/4s8Uj3B",
    "generational_curses": "https://amzn.to/41sKj9h",
    "conta_bancaria_espiritual": "https://amzn.to/4dVjX2L",
    "airdrops_bible": "https://amzn.to/3CQXyJk",
    "power_of_compounding": "https://amzn.to/4mRwT9K",
    "lei_contribuicao": "https://amzn.to/4fN2pXs",
    "crypto_staking": "https://amzn.to/4kWjR7M",
    "lei_pensamento": "https://amzn.to/4h3YzPq",
    "millionaire_mindset": "https://amzn.to/4k9Lm2N",
    "focus": "https://amzn.to/3JvXqR4",
    "self_pity": "https://amzn.to/4m8ZtK5",
    "casamento_feliz": "https://amzn.to/4h9YwL3",
    "rei_rainha": "https://amzn.to/4f2XnQ8",
    "pessoas_dificeis": "https://amzn.to/4lVjW2R",
    "receita_amor": "https://amzn.to/4720BcY",
    "chave_mestre_oracao": "https://amzn.to/4urhuYj",
    "vida_anjos": "https://amzn.to/4smwPl1",
    "sos_numbers": "https://www.amazon.com.br/sos-Numbers-God-Emergency-numbers/dp/1477454187/",
    "caminhada_anjos": "https://www.amazon.com.br/Uma-Caminhada-Com-Os-Anjos/dp/1546821759/",
    "poder_altar": "https://amzn.to/4sfRw90",
    "deus_terminar": "https://amzn.to/4svuqvJ",
    "homem_fe": "https://amzn.to/41PajFT",
    "novo_nascimento": "https://www.amazon.com.br/Salvacao-um-novo-nascimento-Portuguese/dp/1453808833/",
    "danca_comigo": "https://www.amazon.com.br/Danca-Comigo-Portuguese-Katy-Cipri/dp/B0FCMMLMQB/"
}

STUDY_LINKS = {
    # Quando o estudo ficar pronto, basta colocar o URL aqui
}

# -------------------------
def handler(event, context):
    # Netlify passa queryStringParameters no event['queryStringParameters']
    params = event.get('queryStringParameters') or {}
    book = params.get('book')
    is_study = params.get('study') == '1'

    # 1. Determina o destino
    if is_study:
        # Se estudo ainda não existir, devolve página de "Em breve"
        dest = STUDY_LINKS.get(book, "https://primeiromilhao.github.io/blogger_Estudos/#biblioteca")
    else:
        dest = AFFILIATE_LINKS.get(book, "https://primeiromilhao.github.io/blogger_Estudos/#biblioteca")

    # 2. Log do clique
    ip = event['headers'].get('x-forwarded-for', '').split(',')[0]
    ua = event['headers'].get('user-agent', '')
    timestamp = datetime.utcnow().isoformat() + "Z"
    log_row = [timestamp, book, 'study' if is_study else 'amazon', ip, ua]

    # Grava no Google Sheets (API simples via HTTP POST)
    sheets_url = f"https://sheets.googleapis.com/v4/spreadsheets/{SHEETS_ID}/values/{urllib.parse.quote(SHEETS_RANGE)}:append?valueInputOption=RAW"
    body = {"values": [log_row]}
    headers = {
        "Authorization": f"Bearer {GOOGLE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    try:
        requests.post(sheets_url, headers=headers, json=body, timeout=5)
    except Exception as e:
        # Não impede o redirecionamento – caso falhe, apenas ignore
        print("Falha ao gravar no Sheets:", e)

    # 3. Resposta de redirecionamento HTTP 302
    return {
        "statusCode": 302,
        "headers": {
            "Location": dest,
            "Cache-Control": "no-cache"
        },
        "body": ""
    }
