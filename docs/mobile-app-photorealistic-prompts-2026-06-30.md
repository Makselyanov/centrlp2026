# Photorealistic Mobile App Service Images

Internal production prompt pack for the CentrLP Android and iOS service OG images.

Generated assets:

- `public/og/services/android-app-development.png`
- `public/og/services/ios-app-development.png`

The prompts are intentionally detailed because the target is not a generic phone mockup. The target is a photographed-looking product case: real devices, real glass, believable app UI, commercial studio lighting, and no vector/SaaS illustration residue.

## Shared Direction

Use these constraints for both images.

1. The image must look like a real commercial product photograph.
2. The phone must look physically real: correct bezels, thickness, screen glass, reflections, and shadows.
3. The app must look like a finished business product, not a placeholder design.
4. The screen must stay sharp enough for a `1200x630` OG crop.
5. Use a clean desk scene, not an abstract gradient background.
6. Keep the subject concrete: phones, app screens, documents, work-order props, and office surfaces.
7. Do not show fantasy AI objects, robots, neural networks, or code streams.
8. Do not use floating infographic labels or arrows.
9. Do not use a vector grid background.
10. Do not use decorative blobs, bokeh, or gradient orbs.
11. Do not use obvious stock-photo hands.
12. Prefer no hands; if hands appear, they must be physically correct.
13. Keep the UI text sparse and large.
14. Do not rely on tiny Russian text.
15. If any UI text might become gibberish, replace it with UI bars and icons.
16. No real personal data.
17. No real customer names.
18. No real phone numbers.
19. No card numbers.
20. No passport or medical data.
21. No real platform logos as the main object.
22. No Apple logo.
23. No Google logo.
24. No watermark.
25. No template watermark.
26. No `TODO`.
27. No `draft`.
28. No placeholder copy.
29. No internal agent/process wording.
30. No screenshots of existing third-party apps.

## Android

Anchor:

`https://centrlp.ru/services/android-app-development`

Output:

`public/og/services/android-app-development.png`

Final generation prompt:

```text
Use case: photorealistic-natural + ui-mockup
Asset type: 1200x630 website hero / OpenGraph image for a Russian software studio service page about Android app development.

Primary request:
Create an excellent photorealistic commercial product photograph of real Android smartphones showing finished business mobile applications.
This must look like a real photographed case study for a software studio.
It must not look like an illustration.
It must not look like a 3D render.
It must not look like vector art.
It must not look like a generic mockup template.

Scene:
A clean light matte office desk in a modern B2B technology studio.
The desk is pale warm gray or light beige.
The surface has real texture and soft reflection.
The background is restrained and practical.
There is a subtle blurred laptop edge.
There is a small paper work order.
There is a neutral metal pen.
There may be a small delivery label without private data.
There may be a small cardboard package to suggest field service and logistics.
The background remains second plane.
No visual clutter.
No office stock-photo cliche.

Subject:
Two or three real modern Android smartphones.
The devices are Pixel/Samsung-like but without visible brand logos.
Use black glass bodies.
Show correct bezels.
Show a punch-hole camera or small speaker detail.
Show physically plausible screen reflections.
Show subtle fingerprints and dust only where realistic.
Show natural contact shadows.
Show believable device thickness.
Show realistic perspective.

Main app concept:
Android app for service requests, routes, field staff, and CRM.
The main screen is a route and service-request dashboard.
The user is a dispatcher, service master, or field technician.
The app helps manage today's route, service ticket, customer status, and CRM follow-up.

Main screen UI:
Large title: "Маршрут".
Map-style route card with four route points.
Current stop highlighted in orange.
Route line visible but not decorative.
Service card below the map.
Large card title: "Заявка #1042".
Status chip: "мастер едет".
Primary green action button.
Secondary small status chip: "в работе".
Bottom navigation with four items.
Navigation labels: "Сегодня", "Маршрут", "Заявки", "CRM".
Active tab: "Маршрут".

Secondary screen UI:
Large title: "Заявки".
List of request cards.
Status chips: "в работе", "новая", "выполнено".
Small CRM overview with count cards.
Mini bar chart for request activity.
Bottom navigation matches the main app.
Active tab: "Заявки".

Optional third screen UI:
Catalog/order screen for field equipment.
Large title: "Каталог".
Two product cards.
Cart summary.
Primary button similar to "Оформить заказ".
This screen should stay secondary, not dominate.

UI visual rules:
Material 3 inspired, practical, dense enough for operations.
White and light gray cards.
Dark navy text.
Emerald green for ready/completed actions.
Warm orange for route/in-progress.
Teal for CRM/status.
Rounded cards.
Native Android spacing.
Readable status bar.
Readable bottom navigation.
No decorative poster typography.
No fake dashboard chaos.

Text rules:
Only use a few large Russian labels.
Acceptable labels: "Маршрут", "Заявка #1042", "мастер едет", "Заявки", "CRM", "Каталог".
Avoid dense microcopy.
Avoid tiny labels.
No fake Cyrillic.
No gibberish.
No distorted letters.
If the model cannot render a label, use UI bars/icons instead.

Composition:
Wide horizontal crop.
One main phone is largest and slightly left of center.
Second phone is to the right and slightly behind.
Optional third phone is further right, secondary.
Phones must not overlap important screen content.
Screens must remain sharp.
Keep clean margins for social preview.
The image must read in one second as a mobile business app product shot.

Camera:
Commercial product photography.
70mm product lens look.
Slight top-down angle.
Realistic perspective.
No exaggerated wide-angle distortion.
F/5.6 feel.
Devices and screens sharp.
Background gently soft.

Lighting:
Large softbox from upper left.
Gentle rim light on glass edges.
Natural ambient occlusion.
Soft desk shadows.
Subtle screen glare that does not hide UI.
Clean neutral whites.
Realistic blacks.
No neon.
No cyberpunk.

Materials:
Real glass.
Real metal or high-quality dark plastic edges.
Matte desk surface.
Paper has believable fibers.
Pen has metallic reflection.
Package label is realistic but not private.

Avoid:
vector illustration.
flat design.
cartoon.
isometric.
clay render.
plastic phones.
generic SaaS illustration.
floating labels.
speech bubbles.
infographic arrows.
decorative blobs.
gradient orbs.
blue-purple AI slop.
robot.
AI icon.
code wallpaper.
fake unreadable text.
distorted Cyrillic.
gibberish.
broken UI.
impossible buttons.
misaligned screens.
duplicated cameras.
warped bezels.
melted glass.
harsh neon.
dark cyberpunk background.
stock-photo hands.
real Google Play logo.
real Samsung logo.
real Apple logo.
watermark.
mockup template.
placeholder text.
TODO.
draft.
wireframe.
existing app screenshots.

Final quality target:
It should feel like CentrLP already built the Android business app and photographed it for a case study.
The image must feel trustworthy, concrete, premium, useful, and real.
```

## iOS

Anchor:

`https://centrlp.ru/services/ios-app-development`

Output:

`public/og/services/ios-app-development.png`

Final generation prompt:

```text
Use case: photorealistic-natural + ui-mockup
Asset type: 1200x630 website hero / OpenGraph image for a Russian software studio service page about iOS app development.

Primary request:
Create an excellent photorealistic commercial product photograph of real iPhones showing finished custom iOS business applications.
This must look like a real photographed client case for a software studio.
It must not look like an illustration.
It must not look like vector art.
It must not look like a 3D render.
It must not look like a generic mockup template.

Scene:
A clean premium light studio desk in a modern consulting and software office.
The surface is matte warm white or very light gray.
The surface has subtle real texture.
The scene feels premium but practical.
There is a blurred laptop edge without a visible logo.
There is a neat document folder.
There is a neutral pen.
There may be a blurred coffee cup in the background.
No private documents.
No visible personal data.
No decorative vector grid.
No gradient blobs.
No floating labels.
No artificial SaaS background.

Subject:
Two or three real modern iPhones.
Use black titanium or black glass bodies.
Show accurate rounded corners.
Show Dynamic Island.
Show realistic bezels.
Show real screen reflections.
Show subtle fingerprints and dust only where believable.
Show correct thickness.
Show natural contact shadows.
No visible Apple logo.
No trademark marks.

Main app concept:
iOS client cabinet application.
The app helps a customer track an order, repeat a purchase, access documents, pay, use bonuses, and request service.
The product should feel App Store ready.
It should feel calm, high trust, and premium.

Main screen UI:
Large title: "Кабинет".
Large order card: "Заказ #4821".
Status: "готовится".
Progress steps for order status.
Clean cards for order details.
Payment row.
History row.
Large blue button: "Повторить заказ".
Bottom tab bar.
Tab labels: "Главная", "Заказы", "Сервис", "Бонусы", "Профиль".
Active tab: "Главная" or "Заказы".

Secondary documents screen:
Large title: "Документы".
Tabs or filters: "Все", "Договоры", "Акты", "Счета".
Document cards with simple icons.
Acceptable labels: "Договор", "Акт", "Счет".
Button similar to "Запросить документ".
Keep text sparse and readable.

Secondary bonuses screen:
Large title: "Бонусы".
Large balance: "12 480".
A magenta/violet bonus card.
Small rows for accrual and spending.
Button similar to "Списать бонусы".
This screen should support the story of repeat sales.

UI visual rules:
Native iOS spacing.
Clean rounded cards.
Readable status bar.
Readable tab bar.
White and soft gray backgrounds.
Deep navy text.
iOS blue for primary actions.
Green for ready/paid states.
Violet for documents.
Magenta for bonuses.
Do not make everything purple.
Do not make it look like a banking app unless the UI is generic and safe.
No real account data.
No card numbers.

Text rules:
Only use a few large Russian labels.
Acceptable labels: "Кабинет", "Заказ #4821", "Повторить заказ", "Документы", "Бонусы", "12 480".
Avoid dense microcopy.
No fake Cyrillic.
No gibberish.
No distorted letters.
If text rendering is uncertain, use clean UI bars/icons instead.

Composition:
Wide horizontal crop.
Main iPhone centered and largest.
Secondary iPhone to the left showing documents.
Optional third iPhone to the right showing bonuses.
Phones overlap naturally but do not hide important screen content.
Enough clean breathing room around edges.
No clutter.
The image must read quickly as a polished iOS app showcase.

Camera:
Premium commercial product photography.
70-85mm product lens look.
Slight top-down angle.
Realistic perspective.
F/5.6 feel.
Screens sharp.
Background gently soft.
No exaggerated lens distortion.

Lighting:
Large softbox from upper left.
Gentle rim light on glass edges.
Natural shadows under devices.
Subtle screen glare that does not hide UI.
Clean premium tech atmosphere.
No harsh neon.
No dark cyberpunk.

Materials:
Real glass reflections.
Black titanium/glass bodies.
Matte desk.
Soft paper texture.
Leather or fabric folder texture if present.
Metal pen reflection.
No impossible reflections.

Avoid:
vector illustration.
flat design.
cartoon.
isometric.
clay render.
generic SaaS illustration.
fake phone.
plastic device.
floating badges.
speech bubbles.
infographic arrows.
decorative blobs.
gradient orbs.
blue-purple AI slop.
robot.
AI icon.
code wallpaper.
fake unreadable text.
distorted Cyrillic.
gibberish.
broken UI.
impossible buttons.
misaligned screens.
duplicated cameras.
warped bezels.
melted glass.
overblurred screen.
harsh neon.
dark cyberpunk scene.
stock-photo hands.
real Apple logo.
App Store logo as main object.
real Google logo.
watermark.
mockup template.
placeholder text.
TODO.
draft.
wireframe.
existing app screenshots.

Final quality target:
It should feel like CentrLP already built a polished iOS client cabinet app and photographed it for a premium case study.
The image must feel trustworthy, calm, concrete, app-store-ready, and real.
```

## QA Checklist

1. Open both final PNG files at 100%.
2. Open both final PNG files at 50%.
3. Confirm the subject reads as mobile app development within one second.
4. Confirm Android and iOS are visually distinct.
5. Confirm phones look physically plausible.
6. Confirm screens are sharp enough after the `1200x630` crop.
7. Confirm there is no watermark.
8. Confirm there is no visible real customer data.
9. Confirm there are no third-party app screenshots.
10. Confirm there is no internal process language in the public asset.
11. Confirm no file outside the two target PNGs changed after image generation.
12. Confirm `npm run build` still passes before deploy.
