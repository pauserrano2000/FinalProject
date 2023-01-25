# ImageHub
[![Imagehub](https://github.com/pauserrano2000/FinalProject/blob/master/public/images/landing.png)](https://youtu.be/x0trsV3TUIo)


ImageHub is a web application that allows users to find the perfect image for their design projects with a wide selection of high-quality, free, and copyright-free stock images. With over 3.48 million images to choose from (Unsplash API), and an AI-powered image generator (DALL-E 2 API), you can easily find the perfect image or create custom images on the fly. Save and download your favorites with our favorites feature, and elevate your designs with ImageHub.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Built With](#built-with)

## Features

- Dark and light theme
- User authentication with Signup and Login
- Wide selection of high-quality, free, copyright-free stock images (using Unsplash API)
- AI-powered image generator (using DALL-E 2 API)
- Save and download favorite images
- User account with profile settings
- Admin panel for showing all users info

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm 
- A web browser
- Unsplash API key
- Open AI API key

### Installation

1. Clone the repository.

```bash
git clone https://github.com/pauserrano2000/FinalProject.git
```

2. Install the dependencies.

```bash
npm install
```
3. Create a ".env" file in the root of the repository to store the api keys (don't write the api key between "")

```bash
REACT_APP_UNSPLASH_API_KEY=<your unsplash apikey>
REACT_APP_DALL_E_API_KEY=<your dall-e 2 apikey>
```

4. Sart the fake backend json-server

```bash
npm run server
```

The fake backend server will be running on http://localhost:3000

5. Start the development server.

```bash
npm start
```

The application will be running on http://localhost:3001

## Usage

The application is divided into several pages, each one with a different purpose:

### Anonymous user:
- The landing page, located at the route `/`, where you can see an overview of the application's main features
- The signup page, located at the route `/signup`, where you can create a new user account
- The login page, located at the route `/login`, where you can log in with your existing user account

### Logged user:
- The search page, located at the route `/search`, where you can search for images by keywords
- The image creator page, located at the route `/image-creator`, where you can generate custom images using the AI-powered generators
- The image detail page, located at the route `/image-detail/:id`, where you can see a full-size version of an image and download it
- The favorites page, located at the route `/favorites`, where you can see the images you have saved
- The profile settings page, located at the route `/profile-settings`, where you can manage your user account

### Logged  admin
- All logged user pages and...
- The admin page, located at the route `/admin`, where you can manage the images and users


## Built With
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Typescript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - A stylesheet language used for describing the presentation of a document written in HTML or XML
- I have tried to use the best possible coding practices, such as creating reusable components, using custom hooks, implementing compound components, conditional rendering, using context for managing state, and keeping the code clean and organized. Additionally, I have utilized services files for separating apicalls and valudation logic and keeping the component files lean.