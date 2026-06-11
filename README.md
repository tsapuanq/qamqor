# Qamqor CCTV

Статичный лендинг для проверки спроса на установку камер видеонаблюдения в Кокшетау под ключ.

Сайт рассчитан на трафик из 2GIS, Instagram и Google. Основные целевые действия: переход в WhatsApp и отправка расчета из калькулятора.

## Что внутри

- `index.html` — одностраничный лендинг.
- `style.css` — адаптивные стили без сборки.
- `script.js` — калькулятор стоимости, плавный скролл и WhatsApp-ссылки.
- `assets/` — favicon и hero-изображение.
- `robots.txt` — правила индексации.
- `sitemap.xml` — карта сайта для поисковиков.

## Локальный запуск

Откройте `index.html` в браузере или запустите простой локальный сервер:

```bash
python3 -m http.server 8000
```

После запуска откройте:

```text
http://localhost:8000
```

## Настройка перед публикацией

1. Замените телефон `+7 700 000 00 00` и номер WhatsApp в `script.js`.
2. Замените `https://example.github.io/web-qamqor/` в `index.html`, `robots.txt` и `sitemap.xml` на реальный адрес GitHub Pages.
3. Вставьте код Google Analytics или GTM в отмеченный комментарий в `index.html`.
4. Замените placeholder-ссылки на 2GIS и Instagram в footer.
5. При необходимости подключите Formspree или Google Forms для отдельной формы заявки.

## Публикация на GitHub Pages

1. Загрузите файлы в репозиторий GitHub.
2. Откройте `Settings` → `Pages`.
3. В блоке `Build and deployment` выберите `Deploy from a branch`.
4. Выберите ветку `main` и папку `/root`.
5. Сохраните настройки и дождитесь публикации.

Сайт не использует backend, React, Next.js или сборщики, поэтому подходит для обычного GitHub Pages.
