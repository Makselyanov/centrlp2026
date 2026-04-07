#!/usr/bin/env python3
"""Generate OG images for centrlp.ru pages."""
import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "og")
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH, HEIGHT = 1200, 630
BG_COLOR = (15, 23, 42)       # slate-900
PRIMARY = (139, 92, 246)       # violet-500
ACCENT = (59, 130, 246)        # blue-500
WHITE = (255, 255, 255)
GRAY = (148, 163, 184)         # slate-400

def get_font(size):
    """Try to find a good font, fallback to default."""
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
    ]
    for path in font_paths:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def wrap_text(text, font, draw, max_width):
    """Word-wrap text to fit within max_width."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines

def create_og_image(title, subtitle, filename):
    """Create a branded OG image."""
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Gradient accent bar at top
    for i in range(6):
        r = int(PRIMARY[0] + (ACCENT[0] - PRIMARY[0]) * i / WIDTH * 200)
        g = int(PRIMARY[1] + (ACCENT[1] - PRIMARY[1]) * i / WIDTH * 200)
        b = int(PRIMARY[2] + (ACCENT[2] - PRIMARY[2]) * i / WIDTH * 200)
        draw.rectangle([(0, i), (WIDTH, i + 1)], fill=(r, g, b))

    # Decorative circles
    draw.ellipse([(WIDTH - 200, -100), (WIDTH + 100, 200)], fill=(139, 92, 246, 30), outline=None)
    draw.ellipse([(-80, HEIGHT - 180), (120, HEIGHT + 20)], fill=(59, 130, 246, 20), outline=None)

    # Logo text
    logo_font = get_font(28)
    draw.text((60, 40), "CentrLP", fill=PRIMARY, font=logo_font)

    # Divider line
    draw.line([(60, 80), (200, 80)], fill=PRIMARY, width=3)

    # Title
    title_font = get_font(44)
    lines = wrap_text(title, title_font, draw, WIDTH - 140)
    y = 120
    for line in lines[:3]:
        draw.text((60, y), line, fill=WHITE, font=title_font)
        y += 58

    # Subtitle
    if subtitle:
        sub_font = get_font(22)
        sub_lines = wrap_text(subtitle, sub_font, draw, WIDTH - 140)
        y += 20
        for line in sub_lines[:2]:
            draw.text((60, y), line, fill=GRAY, font=sub_font)
            y += 32

    # Bottom bar
    draw.rectangle([(0, HEIGHT - 50), (WIDTH, HEIGHT)], fill=(30, 41, 59))
    bottom_font = get_font(18)
    draw.text((60, HEIGHT - 38), "centrlp.ru", fill=GRAY, font=bottom_font)
    draw.text((WIDTH - 300, HEIGHT - 38), "Маркетинг под ключ · Тюмень", fill=GRAY, font=bottom_font)

    filepath = os.path.join(OUTPUT_DIR, filename)
    img.save(filepath, "PNG", optimize=True)
    print(f"  Created: {filepath}")

# --- Page definitions ---
pages = [
    ("Сайты, ВК-упаковка, чат-боты и ИИ-маркетинг", "Студия CentrLP — маркетинг под ключ в Тюмени", "index.png"),
    ("Услуги маркетингового агентства", "17 услуг для роста вашего бизнеса", "services.png"),
    ("Цены на маркетинговые услуги", "Прозрачные цены без скрытых платежей", "prices.png"),
    ("Наши проекты и портфолио", "Реальные результаты для реальных клиентов", "projects.png"),
    ("О компании CentrLP", "Маркетинговое агентство в Тюмени", "about.png"),
    ("Контакты CentrLP", "Свяжитесь с нами для консультации", "contacts.png"),
    ("Блог о маркетинге", "Статьи, кейсы и полезные материалы", "blog.png"),
    ("ИИ-маркетинг для бизнеса", "Автоматизация с искусственным интеллектом", "ai.png"),
    ("Бартер маркетинговых услуг", "Маркетинг в обмен на ваши услуги", "barter.png"),
    ("Разработка сайта под ключ", "От прототипа до готового сайта за 2 недели", "website-development.png"),
    ("Яндекс.Директ — настройка и ведение", "Контекстная реклама с гарантией результата", "yandex-direct.png"),
    ("Реклама ВКонтакте", "Таргетированная реклама для вашего бизнеса", "vk-ads.png"),
    ("Чат-бот ВКонтакте", "Автоматизация общения с клиентами 24/7", "chatbot-vk.png"),
    ("Контент-завод на n8n", "Автоматизация создания контента для бизнеса", "kontent-zavod.png"),
    ("CRM с контент-заводом", "Единственная в России CRM с контент-заводом", "crm-kontent-zavod.png"),
    ("OpenClaw для бизнеса", "ИИ-агенты для автоматизации маркетинга", "openclaw.png"),
]

print(f"Generating {len(pages)} OG images...")
for title, subtitle, filename in pages:
    create_og_image(title, subtitle, filename)
print(f"Done! Images saved to {OUTPUT_DIR}")
