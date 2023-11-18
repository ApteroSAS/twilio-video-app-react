# Build Stage
FROM node:18 as build

# Create app directory
WORKDIR /opt/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci

#ENV REACT_APP_TOKEN_ENDPOINT=https://example.com/token
ENV REACT_APP_DISABLE_TWILIO_CONVERSATIONS=true

# Bundle frontend
COPY tsconfig.json ./
COPY public ./public
COPY scripts ./scripts
COPY src ./src
RUN npm run build

# Nginx Stage
FROM nginx:1.21.3-alpine

# Copy built assets from build stage
COPY --from=build /opt/app/build /usr/share/nginx/html

# Optional: Copy custom Nginx configuration
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose port for the Nginx server
EXPOSE 80
