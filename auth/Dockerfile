FROM node:alpine
wORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn", "start"]

