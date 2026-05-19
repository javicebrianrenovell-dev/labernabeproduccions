# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Build args expuestos por Dokploy (Build-time Arguments).
# Vite los lee como import.meta.env.VITE_* al hacer el build.
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET=production
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID
ENV VITE_SANITY_DATASET=$VITE_SANITY_DATASET

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
