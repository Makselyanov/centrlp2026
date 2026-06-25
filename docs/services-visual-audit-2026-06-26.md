# Аудит изображений страницы `/services` от 2026-06-26

Цель: убрать бессмысленные иллюстрации из первого смыслового блока страницы `https://centrlp.ru/services` и заменить их изображениями, построенными от текста карточек.

## Найденные проблемные изображения

| Блок | Старый ассет | Проблема | Новый ассет |
|---|---|---|---|
| Продуктовый стек | `/images/services/services-product-stack.svg` | Абстрактные тёмные карточки без понятного канала, CRM, аналитики и автоматизации. | `/images/services/services-product-stack.webp` |
| Готовые сборки запуска | `/images/services/services-launch-bundles.svg` | Универсальная SaaS-заглушка: три колонки не показывают разницу между пилотом, MVP и системой. | `/images/services/services-launch-bundles.webp` |
| Нишевые сценарии | `/images/services/services-industry-map.svg` | Hub-and-spoke схема без признаков турагентств, СТО, мебели, клининга и обучения. | `/images/services/services-industry-map.webp` |
| OG `/services` | `/og/services.png` | Устаревший смысл: "маркетинговое агентство" и "17 услуг" вместо Mini App, AI, CRM и цифровых продуктов. | `/og/services.png` обновлён |

## Промпт: Продуктовый стек

Контекст блока: "Показываем не набор отдельных услуг, а рабочую связку: точка входа клиента, AI-логика, CRM, аналитика и автоматизация действий команды." Пункты: "Telegram, Max, сайт или Mini App", "AI-агент и сценарии", "CRM, n8n и аналитика".

```text
Use case: productivity-visual
Asset type: website service-card image, 4:3 crop-safe composition
Primary request: Create a meaningful editorial/product-style visual for a business digital product stack: customer entry channel, AI intake, CRM pipeline, analytics, and automation working as one system.
Scene/backdrop: A clean modern operations desk viewed from a slightly elevated angle. On the desk: a smartphone with a blank messenger conversation UI, a laptop with a clean CRM pipeline made of unlabeled cards, a tablet with simple analytics charts, and small physical workflow cards connected by subtle colored lines. The objects should clearly imply one connected business workflow from message to CRM to analytics.
Subject: Concrete devices and workflow artifacts, not abstract sci-fi. The system should feel usable by a small business owner or operations manager.
Style/medium: premium photorealistic editorial product photography with restrained UI mockups on screens, realistic materials, no fantasy elements.
Composition/framing: landscape 4:3-friendly layout, centered main desk scene, clean margins, important objects not near edges.
Lighting/mood: bright natural studio light, calm professional mood, crisp details.
Color palette: white, soft slate, brand accents sky blue #0096D6 and mint green #44B78B only as subtle UI highlights and connector lines.
Constraints: no readable text, no fake letters, no logos, no brand marks, no watermarks, no human faces, no generic robot, no glowing brain, no decorative AI particles. Screens may show simple unlabeled UI blocks, charts, cards, and lines only.
Avoid: meaningless abstract nodes, random 3D cubes, illegible text, futuristic holograms, stock-photo cliches, clutter.
```

## Промпт: Готовые сборки запуска

Контекст блока: "Можно начать с маленького пилота, собрать MVP под одну задачу или сразу строить полноценную систему под входящие заявки и сервис." Пункты: "пилот на 1 гипотезу", "MVP под задачу бизнеса", "масштабируемая система".

```text
Use case: productivity-visual
Asset type: website service-card image, 4:3 crop-safe composition
Primary request: Create a clear visual metaphor for three launch formats of a digital business system: a small pilot, a working MVP, and a full scalable system.
Scene/backdrop: A clean planning table with three distinct build stations arranged left to right as increasing depth: left has one compact test card and one simple phone mockup, center has a small clickable product prototype on a laptop with a few workflow cards, right has a larger connected system board with CRM, automation and analytics modules. The progression must be visually obvious without text.
Subject: Three concrete levels of project launch: pilot -> MVP -> full system, shown through real artifacts, screens, cards, wires and modular blocks.
Style/medium: premium photorealistic editorial product photography with realistic screen mockups and tangible modular cards, not abstract concept art.
Composition/framing: landscape 4:3-friendly, three clusters balanced across the frame, clean negative space, central objects fully visible after slight crop.
Lighting/mood: bright professional studio light, structured and confident.
Color palette: neutral white/slate workspace with controlled sky blue #0096D6 and mint green #44B78B accents.
Constraints: no readable text, no fake alphabet, no logos, no watermarks, no people, no robot, no magic particles. Use only unlabeled UI blocks, simple icons, clean cards, and color-coded connectors.
Avoid: identical generic dashboards, vague futuristic 3D blocks, illegible labels, decorative AI slop, cluttered startup buzzword imagery.
```

## Промпт: Нишевые сценарии

Контекст блока: "Для разных ниш нужны разные маршруты клиента. Поэтому мы собираем не универсальный шаблон, а сценарий под конкретный рынок и тип заявки." Пункты: "турагентства", "СТО и сервис", "мебель, клининг, обучение".

```text
Use case: productivity-visual
Asset type: website service-card image, 4:3 crop-safe composition
Primary request: Create a concrete visual for niche business scenarios where the same digital product logic is adapted to different markets: travel agency, car service, furniture, cleaning, and education/service businesses.
Scene/backdrop: A clean strategy table with a central blank CRM/workflow tablet in the middle, surrounded by five small real-world industry kits: travel documents and suitcase tag, car service key and appointment card, furniture material swatches and measuring tape, cleaning checklist with spray bottle, and a course/education notebook. Thin blue and mint connector lines link each kit to the central tablet.
Subject: The image must show adaptation to real business niches, not generic abstract segmentation.
Style/medium: premium photorealistic editorial product photography, realistic materials and restrained digital UI overlay, grounded business consulting mood.
Composition/framing: landscape 4:3-friendly, central tablet visible, five surrounding kits recognizable but not cluttered, safe margins for object-cover crop.
Lighting/mood: bright clean daylight, organized, trustworthy, practical.
Color palette: white and slate base, subtle sky blue #0096D6 and mint green #44B78B connectors and UI highlights, natural material colors for industry objects.
Constraints: no readable text, no fake letters, no logos, no brand marks, no watermarks, no people, no robot, no futuristic neon. Screens and cards should use simple blank lines, icons and blocks only.
Avoid: meaningless network diagrams, random glossy spheres, stock-photo hands, clutter, illegible labels, decorative AI slop.
```
