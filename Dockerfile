#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM node:alpine AS build
COPY package*.json ./
RUN npm install
RUN npm install react react-dom react-router-dom styled-components @mui/material @emotion/react @emotion/styled @mui/styled-engine-sc @mui/icons-material @apollo/client @mui/lab cors
COPY . ./
RUN npm run build

# release step
FROM nginx:1.21.5-alpine AS release
COPY --from=build /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
