# Use official Node image
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Production image 
# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port for Vite preview
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
