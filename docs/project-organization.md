# Building Predictable User Interfaces

## Separation of concerns

One of the successes of React was in challenging the dogma that one can't mix their markup (HTML) and display logic (JavaScript). In the interest avoiding the same dogma trap (for the now exceedingly popular library), let's look critically at modern application architectures with React.

According to React, as popularized in [Pete Hunt's talk](https://www.youtube.com/watch?v=DgVS-zXgMTk), separating by technology is not the same as separation of concerns. We have all seen websites broken into:

```
my-first-website/
└── style/
└── fonts/
└── js/
└── index.html 
└── anotherpage.html 
└── 404.html 
└── lastpage.html 

```

Here, the CSS styling, JavaScript rendering code and markup are separated by technology; _not with any respect to modularity_. The problem we find later is that presentation logic, markup, and the associated styling are _tightly coupled_. That is to say, when you change one you are likely to modify the other to keep it in sync. Even if we try to group by feature, each technology will likely be in a redundant/repetitive hierarchy. We force our selves in separating related things starting in different root folders.

**... All based on technology?**

**Example**: 

Imagine changing a class name in CSS. You'd have to make equivalent changes to your HTML markup and to any class selectors in your JS. Also, this simple organization is a quick route to have dead code in your application. It's easy to forget to remove code as files get too large and lose their sense of modularity.

Accordingly, it makes sense to organize these concerns into small modules that can be placed close together. Since they are small and very closely related we can more easily reason about what's going on. This avoids monolithic design and lets your team move quickly while maintaing high quality code. Some of the more daring in the React community are forgoing CSS styling by class name, and putting inline-CSS in their React components.

**Personal Anecdote:**

I've seen smart people build useful applications that thousands use everyday. These are applications that solve business needs. As they continually add features the applications become this tangled mess of unsupportable code. I remember one of my co-workers said:  *"[working on his web application] was not fun anymore"*. Well, modularity puts the fun back in your code. 

The job of a programmer is to reduce complexity and create abstractions that solve problems. Don't pride yourself on debugging a poorly designed code base. Pride yourself on good design and solving problems before they come up. Learn to scale your code base and refactor as your application grows. 

One of the major reasons I love the web is how open it is. It's not a platform that is owned by a singular company (like Android, iOS, Windows, etc), It has loads of completing technologies and ideas. Finally, the open source community on the web is quite vibrant. Idea cross-pollination and competition is a requisite for fast progress.

## An Aside..
For those who are new to React, it's grown to be quite more than just the V in MVC, or a library for user interfaces. Coupled with react-router and redux it can enable you to build entire single page web applications isomorphically.

## Other concerns
There are additional concerns to managing state, styling and display logic. 

1. How do we relate these components into a view hierarchy and relate it to our application URL? 
2. How do we respond to URL requests on the client or on the server. 
3. How to we reuse code across server and client? 

## Let's think about composability
Let's break down a simple application architecture from top to bottom. I wrote a bit about this in a previous blog post, but here is a skeleton for a generic React application. A lot of the inspiration for this structure comes from Ryan Florences's [post](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346).

###First, lets look at what is **source code** and ignore the rest.

``` 
website/
└── src/
    └── app/ (your react code, static content)  
    |    └── routes.js (describes application URL routes for react-router)
    |    └── views/ (contains react components + related assets, also called feature components)
    └── client
    |    └── entry.js (has rendering code, and references routes)
    └── server/
        |── apis/ RESTFUL APIs your server can provide
        |── config.js (we can put some configuration for our server here)
        |── server.js (Listen on a port & launch application framework (something like express)
        └── entry.js (has rendering code for server)
```

We should note that we can change this organization on the fly in order to manage our complexity as the code base grows. Focus on the problems your team is facing, not what is hip. Maybe that api/ directory is overkill for your app. Maybe your routes.js file is further nested into a config/ directory along with other configuration files. Pick a design that minimizes your problems and lets your team work without merge conflicts. Also pay attention to good names.

###Now, let's acknowledge some other things that go into making a real application.

``` 
website/
└── src/
    └── app/ (your react code, static content)  
    |    └── routes.js (describes application URL routes for react-router)
    |    └── views/ (contains react components + related assets, also called feature components)
    └── client
    |    └── entry.js (has rendering code, and references routes)
    └── server/
        |── apis/ RESTFUL APIs your server can provide
        |── config.js (we can put some configuration for our server here)
        |── server.js (Listen on a port & launch application framework (something like express)
        └── entry.js (has rendering code for server)
└── dist/ (contains public directory with all contents for production)
└── docs/ (Helpful hints and guides)
└── node_modules/ (here we pull in packages via NPM)
└── deploy/ (scripts/ configuration for deployment) 
```
###Now, let's quickly acknowledge some other files you might have seen in your [favorite open source library](https://github.com/facebook/react) and maybe in your own project. 

1. `.babelrc` [Babel](https://babeljs.io) lets you write futuristic Javascript, with polyfills that don't give up browser support. 
2. `.eslintrc:` Configuration for linting, to check for simple code quality.
3. `.gitignore:` Tell your Git version control to ignore some directories & files
5. `.travis.yml:` Continuous Integration. Used for automated testing and deployment.
4. `gulpfile.js:` Used for task running. It is used to automate a lot of manual commands used to build, deploy, develop your application.
5. `package.json:` Used for package management with NPM in node. Get open source code, so you don't reinvent the wheels (with bugs).
6. `README.md:` A markdown file that has basic info.

For you windows folks, the `.{fileName}` is for hidden files in a UNIX directory. Also, [I'm sorry](https://www.quora.com/Why-do-many-programmers-prefer-and-recommend-UNIX-like-systems).

### Finally, Here is how we might compose views with feature components.

``` 
feature-component/ (a module encapsulating a feature you're building)
└── actions/ (here we store the explict changes to stores/state)
└── components/ (sometimes called 'dumb' components; they only manage what your UI will look like, and the state relevant to UI)
└── containers/ (here we query the state tree, AJAX calls, mapping/reducing/filtering data)
└── reducers/ (describes how state + action will mutate the state tree)
└── stores/ (where state lives, can trigger renders in listening components)
└── views/ (will contain code that maps to a view hiearchy, usually coupled directly with your URL routes in react-router) e.g. this is a part of your URL
	 
```

As taken from Ryan's post: **"The file structure maps directly to the route hierarchy, which maps directly to the UI hierarchy."** He describes it better than I can, since he co-authored [react-router](https://github.com/reactjs/react-router). The general idea is there a explicit consistency between:

1. URL routes, as defined in `routes.js`
2. React based 'views', which can also be considered feature-components
3. File hierarchy in your source code.

You can imagine the happy developer who comes to see your `routes.js` file to see a map of the entire application. Most likely you have used or seen something similiar in your previous projects, but I found this structure to be very intuitive.

Now, you may be wondering what is the glue that holds these components together? 

###Here's how *not* to do it:

```
Don't do this!
<html>
<head>
	<script src="myScriptLocation.js></script>
	<script src="myScriptLocation2.js></script>
	<script src="myScriptLocation3.js></script>
	<script src="myScriptLocationX.js></script>
</head>
</html>	
```

**Pros** It worked! Not much else. :(

**Cons**: There's no way to describe dependencies between the files listed above. How do we know what to delete? Does the order of the scripts matter for loading? Why make X requests for something, instead of just one? Your global scope is probably a mess.


###How about this?
```
<html>
<head>
	<script src="bundle.js></script>
</head>
</html>
```

This is better. You can use something like [browserify](http://browserify.org/) to concat all your JS into one file, with proper dependency injections. I'd suggest avoiding RequireJS, for reasons beyond the scope of this post. 

**Pros** Dependencies are now managed for you!

**Cons**: Can be big, thus slow to load. Also might be overkill to include entire application in one payload.


###**Solution**:
This is the best way to glue your JS together: [Webpack](https://webpack.github.io/). I recommend using a bundler called webpack to bundle your modules into module entry points.


**What are the concerns we are separating here?** 

We just divorced all our state mutations from our presentation logic. We also have created a single sensible location to inject data into our application (containers).