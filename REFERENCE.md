# BOILERPLATE DIRECTIONS

- clone with command `npx degit githubusername/githubreponame#branchname projectName`

- cd into new project folder

- run `npm install` to install dependencies

- rename template.env to .env

- make sure to replace MONGODB_URL with a working Mongo URL

- enjoy!

## Scripts

- `npm run start` run in production mode, node server.js
- `npm run dev` run in development mode, nodemon server.js
- `npm run seed` run the seed file, node db/seed.js

## Deployment

- Procfile already created
- [Article on Heroku Deployment](https://tuts.alexmercedcoder.com/2021/4/deploying_node_heroku/)

## Export and Importing

- a file exports data by assigning date to module.exports

```js
module.exports = stuffToExport;
```

- a file imports what is exported by another file using require

```js
const importedStuff = require("./fileThatExportsStuff.js");
```

## File Structure

#### Root

This is the main project folder with server.js, Procfile and package.json

#### Root/controllers

Folder intended to house controller functions, controller functions always have the following signature.

```js
const someControllerFunction = (req, res) => {
  // controller code here to generate response
};
```

**main request properties**

- req.session: the session object, used to store data between requests
- req.params: url params are stored here
- req.query: url queries stored here
- req.body: request body stored here (parsed by express.urlencoded and express.json middleware)
- req.method: the request method
- req.headers: all request headers stored here

**response types**

- res.json => send data as json response
- res.send => send back a text response
- res.render => render specified template in views folder with specified data
- res.redirect => redirect user to different url

#### Root/db

This folder houses our connection file that connects us to our mongo database and a seed file for running one time database operations with `npm run seed`

#### Root/models

Folder for writing models

- [Mongoose Models Documentation](https://mongoosejs.com/docs/models.html)

#### Root/public

Folder for statically hosting css, js, html and image files.

The url for any file here is relative to "/"

so if you have a file called Root/public/cheese.html it could be accessed at localhost:XXXX/cheese.html

so if you have a file called Root/public/css/style.css it could be accessed at localhost:XXXX/css/style.css

#### Root/routes

Folder for creating all your routers, Make sure you export your router and import it into server.js

```js
module.exports = router;
```

```js
const SampleRouter = require("../routes/samplerouter.js");

app.use("/sample", SampleRouter);
```

#### Root/views

Folder for storing views, when using res.render the path is relative to the views folder.

so for Root/views/home.ejs it would be `res.render("home")`

For using partials with the includes function, the path is relative to the location of the particular ejs file you are editing. So if Root/views/cheese/index.ejs wanted to include Root/views/partials/head.ejs it would look like.

`<%- include("../partials/head") %>`

## Sessions

Sessions is already configured so all your controllers should be able to access req.sessions.

## Common Errors

- module not found: It means it can't find the file or library you required so double check the line the error refers to. Possible solutions include:

  - typo in require statement
  - the library isn't installed (check package.json)
  - the file isn't located where you specified it was

- x is not defined: it means you've made use of a variable that was not yet declared. Look at the line of the code the error refers to and look for where the variable was declared prior to its use.

- ECONNREFUSED: The PORT is in use, clear the port with this command `sudo kill -9 $(sudo lsof -t -i:3000)`

- router.get requires a function but got x: This means whatever you passed as the controller function (the second argument to a route) is not a function, double check that you exported the function from your controller and imported it into your router. If you haven't made the function yet... comment out the route.

## Other Tips

- when you use res.render the object passed as the second argument contains all the data provided to the template and the name of the properties is how you should refer to them in your EJS file.

## Reference

- [Express Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [Mongoose Documentation](https://mongoosejs.com/docs/index.html)
- [Express Build Video Playlist](https://www.youtube.com/playlist?list=PLY6oTPmKnKbb4uE8ym45pLaaE76sUwvBL)

## HTML & CSS Review

- [HTML REFRESHER VIDEO](https://generalassembly.zoom.us/rec/share/ht-wmHyCTgnV-hrvtEzgCsywHKyPYQ1OH0S6DfNh-V1XB1vPsBh_Q1HTgtr0i1lI.LGQPTyMA_pcn3mbV?startTime=1612187836000)
- [CSS Refresher Video](https://generalassembly.zoom.us/rec/share/ht-wmHyCTgnV-hrvtEzgCsywHKyPYQ1OH0S6DfNh-V1XB1vPsBh_Q1HTgtr0i1lI.LGQPTyMA_pcn3mbV?startTime=1612187836000)
- [CSS Grid](https://generalassembly.zoom.us/rec/share/6VOvdpBiOf6uJuU0LIzTNDRQ5PQPb4EeA7L6U0PEYeFDW3hH2xF6J496JAuakgNH.iHsdHqmjc58FEP1N)
- [CSS Flexbox](https://generalassembly.zoom.us/rec/share/kToGF_1iwh-hW-Kjvds_tZFzC4wp2H7bhQO1o6EZxD3hYpCQXozeuwV0mCxkEnlk.F4lGdBM2_w3ameBT)
- [BEM Naming Conventions](https://generalassembly.zoom.us/rec/share/E5rcHmqX7SsWWKPQu8mad3W_CIhyix8xlBCQtvZzOXoKcIyX6ErlpUm0tV0Txbc.n0p3WR3y4tnyeb8X)

## Javascript Review

- [Javascript in 60 Minutes](https://www.youtube.com/watch?v=yN9-eBh3dSw&list=PLY6oTPmKnKbZDZ9cRrRby4Wnr4GIJj5O3&index=1&t=355s)
- [Javascript in 30 Minutes - Part 1](https://www.youtube.com/watch?v=VEnrgqenumY&t=1s)
- [Javascript in 30 Minutes - Part 2](https://www.youtube.com/watch?v=ZO10BXnUufk)
- [Scope Masterclass: var, let, const](https://www.youtube.com/watch?v=trez5PLZm7I)
- [Loops Masterclass](https://www.youtube.com/watch?v=Yf6whlVj5qA)
- [Strings Masterclass](https://www.youtube.com/watch?v=EJy7f0YPgi8)
- [Array Methods](https://www.youtube.com/watch?v=CIWHuP8n_KA&t=4s)
- [Array Masterclass](https://www.youtube.com/watch?v=0rd-WuGtLgI)
- [Destructuring Masterclass](https://www.youtube.com/watch?v=T03vCdNz6h4&t=2s)
- [Everything on Functions](https://www.youtube.com/watch?v=fhLFpVeGdoU)
- [Iterating Masterclass](https://www.youtube.com/watch?v=JFf6ogtBUdo)
- [Objects Masterclass](https://www.youtube.com/watch?v=6Ytou94vP9g)
- [Prototypes Masterclass](https://www.youtube.com/watch?v=O_lyavc0lJc)
- [Web Components Masterclass](https://www.youtube.com/watch?v=qV7jh7ctALg)
- [Web Component Styling Masterclass](https://www.youtube.com/watch?v=9flT7pFyaXM)
- [OOP Masterclass](https://www.youtube.com/watch?v=IxbDwmNwnFQ)
- [Classes Masterclass](https://www.youtube.com/watch?v=O93r_ZB1NfQ)
