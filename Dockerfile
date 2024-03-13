ARG IMAGE=node:18-alpine

#COMMON
FROM $IMAGE as builder

WORKDIR /app

# COPY package.json package-lock.json ./
COPY . .

RUN npm i


#DEVELOPMENT
FROM builder as dev 
CMD [""]
