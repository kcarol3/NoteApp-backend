# Wykorzystanie obrazu bazowego Node.js
FROM node:latest

# Utworzenie katalogu aplikacji wewnątrz kontenera
WORKDIR /app

# Skopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Skopiowanie plików aplikacji
COPY . .

# Uruchomienie serwera developerskiego Express
CMD ["npm", "run", "dev"]

# Wystawienie portu na zewnątrz
EXPOSE 8000

