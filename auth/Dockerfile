FROM node:alpine
wORKDIR /app
COPY package.json .
RUN yarn install --production
COPY . .
CMD ["yarn", "start"]

