# Usa a imagem do Node.js para buildar o Angular
FROM node:20 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código e faz o build
COPY . .

# Usa a imagem do Nginx para servir os arquivos
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# COPY dist/financeiro/browser /usr/share/nginx/html

# Copia os arquivos buildados do Angular para a pasta correta do Nginx
COPY --from=build /app/dist/financeiro/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
