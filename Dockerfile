# Etapa 1: Imagem base para construir a aplicação
FROM node:20.13.1 AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (ou yarn.lock) para instalar as dependências
COPY package*.json ./

# Remova o diretório node_modules e package-lock.json, se já existirem
RUN rm -rf node_modules package-lock.json

# Instale as dependências do projeto Angular
RUN npm install --legacy-peer-deps

# Copie todo o código fonte para o container
COPY . .

# Compile o projeto Angular para produção
RUN npm run build --prod

# Etapa 2: Imagem base para servir o conteúdo estático
FROM nginx:alpine

# Copie os arquivos de build do Angular para o diretório público do nginx
COPY --from=build /app/dist/financeiro /usr/share/nginx/html

# Copie o arquivo nginx.conf da raiz do projeto para /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta 80 (padrão do nginx)
EXPOSE 80

# Comando para iniciar o servidor nginx
CMD ["nginx", "-g", "daemon off;"]
