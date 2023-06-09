blood bank management system alongside a featureful donors web app. Created as a final year project for my computer science license.

## Used libraries

- nodejs 19.5
- quasar framework = vue 3 with components and utils
- PostgreSQL + PostGis - using cloud alwaysdata.com
- Headless CMS directus - NodeJS - ExpressJS + VueJS for admin Panel


## Install nodejs 

download nvm for easier install

https://github.com/coreybutler/nvm-windows/releases/download/1.1.11/nvm-setup.exe

then run cmds

nvm install 19
nvm use 19

//install Quasar framework - vue3
npm i -g @quasar/cli


## run client 

you can serve the builded spa files 
inside the folder client/dist/spa

quasar serve


or to change
inside folder client

run
npm install

- to run dev 
quasar dev

- to build
quasar build


## server

to change config  set at .env
all codes , flows , models are set either with GUI Admin Panl or Extensions

to run

npm i -g directus
then
npx directus start


default admin

admin@admin.com
123456


