# Step 1: Build React app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app and build it
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy built app to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Configure nginx to handle client-side routing
RUN echo 'server { \
    listen 3002; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3002

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
