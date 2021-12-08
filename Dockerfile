# Stage 1 - build
FROM node:14 as build-node
# Get packages
COPY /knox-ui/package.json /knox-ui/package-lock.json ./
RUN npm install
# Build UI
COPY /knox-ui/ ./
RUN npm run build

# Stage 2 - deploy
FROM node:14 as deploy-node
# Get packages
COPY /Server/package.json /Server/package-lock.json ./
RUN npm install
# Deploy UI
COPY --from=build-node /build ./build
COPY /Server/ ./
EXPOSE 8000
CMD ["node", "server.js"]