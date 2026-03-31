FROM node:22-alpine3.23
WORKDIR /app
COPY package.json .
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]