# Startup Product: Client Side
#### Project State: Bootstrap Wireframes

This repository will hold the *client side* of your product. The client
side of your product runs in the browser.

## Building

##### Install Dependencies
`npm install`

##### Package Client 
`npm run build`

## Development Workflow
_Note that this is an evolving workflow, it's just the beginning..._

**Javascript**

Webpack is handling the bundling of our JS, although in this stage of the project we have none. 

**CSS**

We are using [Sass](http://sass-lang.com) as a preprocessor for CSS. The sass directory is located in `build/sass/`. For now, all CSS should be written in `build/sass/_base.scss` (we will work out a better organizational system later). Variables and mixins can also go in their respective files in that directory. All will be packaged into `build/css/main.css` during the build task. 

Currently we're using [Gulp](http://gulpjs.com) to handle live Sass compilation. Run `npm run gulp` to start up a script that will listen to all changes in the sass directory and automatically compile your Sass to CSS (make sure you've run' `npm install` first). 

Remember, if you're not comfortable writing Sass (you'll love it though I promise), you can always write vanilla CSS in the sass files, it's all compatible. 

**Remember, do not modify the files in `build/css/`, they will be overritten on sass compilation.**. 

## Running the Dev Server

Currently, we have no backend server. We'll be using Webpack to serve us up a development server over at [http://localhost:8080](http://localhost:8080).