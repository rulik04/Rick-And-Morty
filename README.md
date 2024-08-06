# Rick And Morty

## Локальный запуск

1. **Клонирование репозитория**

    ```bash
    git clone https://github.com/rulik04/Rick-And-Morty.git
    cd Rick-And-Morty
    ```

2. **Установка зависимостей**
   Убедитесь, что у вас установлены Node.js и npm. Установите необходимые зависимости:

    ```bash
    npm install
    ```

3. **Запуск приложения**
   Для запуска приложения локально выполните:
    ```bash
    npm run dev
    ```
    Приложение будет доступно по адресу `http://localhost:5173`.

## Запуск в Docker

1. **Сборка Docker-образа**
   Убедитесь, что у вас установлен Docker. Перейдите в папку вашего проекта и выполните команду для сборки Docker-образа:

    ```bash
    docker build -t rick-and-morty-app .
    ```

2. **Запуск Docker-контейнера**
   После сборки образа, запустите контейнер с помощью следующей команды:
    ```bash
    docker run -p 8080:80 rick-and-morty-app
    ```
    Приложение будет доступно по адресу `http://localhost:8080`.



https://github.com/user-attachments/assets/0d9cc22a-e6c2-43ca-b5ce-8a19a27f2f5d


