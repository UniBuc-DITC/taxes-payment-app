FROM node:22

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

RUN npx prisma generate

# Build the production version of the app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
