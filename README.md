# Collectopia

<a id="readme-top"></a>

## Table of Contents

<a name="readme-top"></a>

  <summary>Summary</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
        <li><a href="#tested-with">Tested with</a></li>
        <li><a href="#pipeline">Pipeline</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
<br>

## About the project

Hi! Here the API REST of Collectopia built with Node.js and Express.js. It enables users to keep track of their board game collections by adding, removing, and editing board games. This API hosts multiple endpoints to cater to various functionalities.

<br>

<a id="built-with"></a>

<div align="center">
  <h3 style="border-bottom: 2px solid #DDD; width: 100%;">Built With</h3>
</div>

<br>

<div align="center">
<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-Runtime-green" alt="Node.js"></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-Framework-orange" alt="Express.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Language-blue?logo=typescript" alt="TypeScript"></a>
  <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-Authentication-green?logo=jsonwebtokens" alt="JWT"></a>
  <a href="https://www.npmjs.com/package/bcrypt"><img src="https://img.shields.io/badge/bcrypt-Password%20Hashing-blueviolet" alt="bcrypt"></a>
  <a href="https://mongoosejs.com/"><img src="https://img.shields.io/badge/Mongoose-ODM-red" alt="Mongoose"></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" alt="MongoDB"></a>
</div>

<br>

<a id="tested-with"></a>

<div align="center">
  <h3 style="border-bottom: 2px solid #DDD; width: 100%;">Tested With</h3>
</div>

<br>

<div align="center">
  <a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Jest-Testing-red" alt="Jest"></a>
  <a href="https://www.npmjs.com/package/supertest"><img src="https://img.shields.io/badge/Supertest-HTTP%20Testing-orange" alt="Supertest"></a>
  <a href="https://mongodb.github.io/node-mongodb-memory-server/"><img src="https://img.shields.io/badge/MongoDB%20Memory%20Server-Testing-lightgrey" alt="MongoDB Memory Server"></a>
</div>

<br>

<a id="pipeline"></a>

<div align="center">
  <h3 style="border-bottom: 2px solid #DDD; width: 100%;">Pipeline</h3>
</div>

<br>

<div align="center">
<a href="https://prettier.io/"><img src="https://img.shields.io/badge/Prettier-Code%20Formatting-ff69b4?logo=prettier" alt="Prettier"></a>
  <a href="https://typicode.github.io/husky"><img src="https://badgen.net/badge/Husky/v7.0.4/blue" alt="Husky"></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-Code%20Linting-yellow?logo=eslint" alt="ESLint"></a>
</div>
<br>

<div align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Carles-Pueyo-Final-Project-back-202304-bcn"><img src="https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Carles-Pueyo-Final-Project-back-202304-bcn&metric=coverage" alt="Coverage"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Carles-Pueyo-Final-Project-back-202304-bcn"><img src="https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Carles-Pueyo-Final-Project-back-202304-bcn&metric=alert_status" alt="Quality Gate Status"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Carles-Pueyo-Final-Project-front-202304-bcn"><img src="https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Carles-Pueyo-Final-Project-front-202304-bcn&metric=sqale_index" alt="Technical Debt"></a>
</div>

<br>

<p align="center">(<a href="#readme-top">back to top</a>)</p>

## Getting started

<br>

### Prerequisites

To use this app, you'll need to have the following tool installed:
<br>  
[![Node.js](https://badgen.net/badge/Node.js/Runtime/green?icon=node.js)](https://nodejs.org/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/cpcastells/collectopia_BACK.git
```

2. Install NPM packages

```sh
npm install
```

<br>

<p align="center">(<a href="#readme-top">back to top</a>)</p>

## Endpoints

<br>

### PING /

- Method: GET
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/
- Body:
- Response: message "pong"

### POST /user/login

- Method: POST
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/user/login
- Body: {"username":"admin", "password":"admin"}
- Response: token

### GET /boardgames

- Method: GET
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/boardgames
- Body:
- Response: list of boardgames

### DELETE /boardgames/:boardgameId

- Method: DELETE
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/boardgames/:boardgameId
- Body:
- Response: message "Boardgame deleted"

### POST /boardgames/create

- Method: POST
- URL: https://carles-pueyo-final-project-back-202304.onrender.com/boardgames/create
- Body: {createdBoardgame}
- Response: new boardgame

<br>

<p align="center">(<a href="#readme-top">back to top</a>)</p>
<br>

<a id="demo"></a>

<div align="center">
  <h3 style="font-size: 1.5rem; border-bottom: 2px solid #DDD; width: 100%;">Demo</h3>
</div>
<br>

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1114204200885301331/1122923373832450131/LOGO-svg.png" alt="Logo" width="120">
</p>

<p align="center">Check the demo <a href="https://collectopia.netlify.app/"><br>HERE</a></p>

<p align="center">
  <code>username: admin <br> password: admin</code>
</p>

<br>

<a id="contact"></a>

<div align="center">
  <h3 style="font-size: 1.5rem; border-bottom: 2px solid #DDD; width: 100%;">Contact</h3>
</div>
<br>

<div align="center">
  <a href="https://www.linkedin.com/in/carlespueyodeveloper/">
    <img src="https://img.shields.io/badge/LinkedIn-Carles_Pueyo-blue?logo=linkedin" alt="LinkedIn">
  </a>
</div>

<br>

<p align="center">(<a href="#readme-top">back to top</a>)</p>
<br>
