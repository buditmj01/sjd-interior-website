FROM node:18-alpine

# Install dependencies for node-gyp
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /opt/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build admin panel
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "develop"]
