cd /var/www/scrumspace/ScrumSpace

#stop application
./node_modules/forever/bin/forever stop scrumspace

#pull in updates to master branch
git pull origin master

#install any new dependencies
npm i

#build
gulp

#start application back up
./node_modules/forever/bin/forever start src/server/server.js --uid scrumspace -l ../deploy/logs/LOGFILE -o ../deploy/logs/OUTFILE