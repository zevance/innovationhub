FROM node:14-slim

# WORKDIR is used to specify the node app directory
WORKDIR /app

# Copying the package.json file to the app directory
COPY package.json /app

#installing npm for docker
RUN npm install 

# copying the rest of the application to the app directory
COPY . /app

# exposing the app's port
EXPOSE 5000

# starting the application using npm run dev    
CMD ["npm", "start"]