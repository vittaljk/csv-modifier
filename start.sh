# installing latest version of nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# installing node v8.9.0 using nvm
nvm install 8.9.0

# using node version 8.9.0
nvm use 8.9.0

# installing angular cli
npm install -g @angular/cli

# install dependencies
npm install

# build AOT and run the application
ng serve --aot
