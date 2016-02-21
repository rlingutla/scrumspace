cd /var/www/scrumspace/ScrumSpace

#stop application
forever stop scrumspace

#pull in updates to master branch
git pull origin master

#install any new dependencies
npm i

#build
gulp

#start application back up
forever start server/server.js --uid scrumspace