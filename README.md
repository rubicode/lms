# Learning Management System (LMS)

## Introduction

This is a simple full stack React application which provides a solid starting point for [MongoDB](https://www.mongodb.com/), [ExpressJS](https://expressjs.com/), [ReactJS](https://reactjs.org/) and [NodeJS](https://nodejs.org/en/) based applications. Client side code is written in React and the backend API is written using Express.

Learning management systems help the instructor deliver material to the students, administer tests and other assignments, track student progress, and manage a report.

## Before You Begin

Before you begin i recommend you to read about the basic building blocks that assemble this application:
* MongoDB - Go through [MongoDB Official Website](https://www.mongodb.com/) and proceed to their [Official Manual](https://docs.mongodb.com/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through it's [Official Website](https://expressjs.com/), which has a [Getting Started](https://expressjs.com/en/starter/installing.html) guide, as well as an [ExpressJS](https://expressjs.com/en/guide/routing.html) guide for general express topics.
* ReactJS - React's [Official Website](https://reactjs.org/) is a great starting point.
* Node.js - Start by going through [Node.js Official Website](https://nodejs.org/en/) which should get you going with the Node.js platform.

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* MongoDB - [Download & Install MongoDB](https://www.mongodb.com/download-center), and make sure it's running on the default port (27017).

## front-end

 - ReactJS (ES6)
 - react-router (*Single Page Application*)
 - redux
 - redux-thunk
 - bootstrap

*source files in `client/` folder.*
## back-end

 - NodeJS
 - ExpressJS

*source files in `server/` folder*

## Quick Start

open terminal to run server,
*Please make sure your MongoDB is running*

```bash
# Clone the repository
git clone https://github.com/rubicode/lms

# Go inside the directory
cd lms

# Install dependencies for server
cd server && npm install

# Start server
npm start
```

open new terminal to run client

```bash
# Go inside the directory
cd lms

# Install dependencies for client
cd client && npm install

# Start client
npm start
```

this application should run on port 3000 , you can access it through browser, just go to [http://localhost:3000/login](http://localhost:3000/login) for Client App. and
[http://localhost:3001/](http://localhost:3001/) for RESTful APIs.

### Default Admin User
```sh
Email       :rubi.henjaya@gmail.com
Password    :adminnyacodago
Role        :Administrator
```
