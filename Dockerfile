# Dockerfile.dev
FROM node:22-alpine

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

EXPOSE 5173

# Запускаем dev сервер с hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]