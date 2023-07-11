# Messenger

### Sprint 2
- Добавлен ESLint, TypeScript, Slylelint
- Разработан класс для создания компонент по аналогу с React
- Страница разбита на компоненты.
- Добавлен класс для работы с запросами через XMLHttpRequest

### Sprint 3
- Добавлен роутинг, взаимодействие с сервером
- Разработан классы для взаимодействия с сервером по http и ws
- созданы отдельные API и сервисы для работы по MVC

### Sprint 4
- Сборка переведена с parcel на webpack
- Добавлены тесты на основе Mocha и Chai
- Настроен pre-commit
- Добавлен файл для создания docker image
- Проведен аудит пакетов
- Размещен проект на Render

### Макеты
[Смотреть макеты](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?type=design&node-id=1-2&t=7wWpCV4czdytZJlu-0)
---
### Деплой 
[Netlify](https://spiffy-taiyaki-156f74.netlify.app/) - обычная сборка
[Render](https://middle-messenger-praktikum-yandex-gfs5.onrender.com/) - сборка через docker
---
### Команды 
- `npm install` — установка проекта
- `npm run build:dev` — запуск сервера разработки на порту 3000
- `npm run build` — сборка проекта
- `npm run start` — запуск статичного cервера на express на порту 3000
- `npm run test` — запуск тестов
- `npm run test` — запуск lint'еров
- `npm run prepare-husky` — установка хука pre-commit


- `docker build -t middle-messenger-praktikum-yandex .` — сборка docker image
- `docker run -p 3000:3000 -d middle-messenger-praktikum-yandex` — запуск docker image

