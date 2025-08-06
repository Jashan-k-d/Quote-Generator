# Random Quote Generator

A simple web application that displays a random quote each time you visit or refresh the page. Built with **Node.js**, **Express.js**, and **EJS** templating, and styled using **Bootstrap 5**.

## Features

- Displays a random quote and its author from a JSON file
- Server-side rendering with EJS templates
- Responsive and modern UI using Bootstrap and custom CSS
- Easy to run locally with minimal setup

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- HTML & CSS

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/random-quote-generator.git
Navigate into the project directory:

cd random-quote-generator
Install dependencies:

npm install
Start the server:

node index.js
Open your browser and go to:

http://localhost:3000
Project Structure
index.js — main server file where Express is set up and routes are defined

quote.json — JSON file containing an array of quotes and authors

views/quotepage.ejs — EJS template for rendering the quote page

public/ — (optional) directory for static assets like CSS or images if added

Usage
Click the Get Another Quote button to load a new random quote.

License
This project is open-source and available under the MIT License.
