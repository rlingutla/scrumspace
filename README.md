# Startup Product: Client Side
#### Project State: React!

[![Build Status](https://travis-ci.com/dylanfischler/startup-product-frontend-scrumspace.svg?token=XpAFVxZPs7jbAuEHuYce&branch=master)](https://travis-ci.com/dylanfischler/startup-product-frontend-scrumspace)

The working copy of this repository exists at [dylanfischler/startup-product-frontend-scrumspace](https://github.com/dylanfischler/startup-product-frontend-scrumspace). We have forked the repository to allow for the use of Travis build tooling (CI and CD), as well as the integration into Slack. We will be regularly pulling changes into the main repository at [umass-cs-326/startup-product-frontend-scrumspace](https://github.com/umass-cs-326/startup-product-frontend-scrumspace).

## Building

##### Install Dependencies
Install node from [https://nodejs.org](https://nodejs.org).

After the installation, run `npm install` to install the application's dependencies.

##### Package Client
To start up a one time build script, run `npm run build`. 

For a live rebuilding dev server, run `npm run dev`. 

To build the client **and** start up the server, run `npm run serve`

## Development Workflow
_Note that this is an evolving workflow, it's just the beginning..._

**Javascript**

We're using Webpack with Babel to provide bundling and ES6 compatibility. Please follow the directory structure in `src/app/`. The directory structure within should mimic the URL routing. If you have any questions as to where something should go, ask!

**CSS**

We are using [Sass](http://sass-lang.com) as a preprocessor for CSS. The sass directory is located in `src/sass/`. Everything should go in their respective files in that directory (if there is any confusion as to which file your Sass should be written in, ask). All will be packaged into `dist/css/main.css` during the build task.

We're using [Gulp](http://gulpjs.com) to handle live Sass compilation. Run `npm run dev` to start up a script that will listen to all changes in the sass directory and automatically compile your Sass to CSS (make sure you've run' `npm install` first). The command on Windows is just `gulp` (you'll need to install Gulp globally first though (`npm install -g gulp`).

If you're not comfortable writing Sass, you can always write vanilla CSS in the sass files, it's all compatible.

**Remember, do not modify the files in `dist/`, they will be overwritten on in the build task.**.

## Running the Server

The dev server can be started by running `npm start`.

As stated above, to build the application and start the server, run `npm run serve`.

The server will by default listen on port `8080`, however you can configure this by setting your `PORT` environment variable to something else. 

Additionally, we've set up nodemon to allow for the livereloading of node on server changes. Running `npm run dev` will start a build task that will listen to all client-side and server-side changes and trigger the proper recompiling tasks. 

[http://localhost:8080](http://localhost:8080).
