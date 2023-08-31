# Fetch Take-Home Project - Dog Lover

This repository contains my solution to the FE project. 

Welcome to try my deployed live version -> [https://fetch-dog-lover.vercel.app/](https://fetch-dog-lover.vercel.app/)

Iphone still have 401 error after login. I'm still fixing it yet.

## Project Review

Fetch required us to building a web application that allows users to explore avaliable dogs from their database and create matches based on the users preferences. The application consists of 2 main sections: the Login Screen and the Search Page.

## Features

### Login Screen

  - Users can enter their name and valid email on the login screen
  - If name or email is missing, will display error message to the users
  - If users enter an invalid email will pop up an error alert to notify the users

### Search Page

  - Users can filter dogs by breed (Based on the API error, it's not working yet)
  - Users can filter dogs by setup preferent age range
  - Results are paginated for easy navigation
  - Results are sorted alphabetically by breed by default, users can set up their own preferences sort dogs by different field and method
  - All fields of the Dog are displayed
  - Users can click any Dog Card to save the dog to their save list or to adapt the dog
  - Users can match a random dog from the database and choose to adopt it or not
  - Users can math a dog from their saved dog list to adopt or not
  - Users can click any dog in the saved list to review their information and choose to unsave or adopt
  - User can logout by clicking the logout button

## Technologies Used
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" /></a>
  <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored-dark.svg" width="36" height="36" alt="NextJs" /></a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg" width="36" height="36" alt="TailwindCSS" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" width="36" height="36" alt="HTML5" /></a>
<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" /></a>


  TypeScript, Next.js, React.js, TailwindCSS, Node.js, Fetch, Sweetalert, Jest, React Testing Library 

## Setup and Running

  1. Clone this repository: `git clone https://github.com/pyc0422/fetch-exercise.git`
  2. Navigate to the project directory: `cd fetch-exersice`
  3. Open terminal run below commends

    ```
    npm install
    npm run dev
    ```
 5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

