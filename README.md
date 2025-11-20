Random Quote Generator — API Powered

A modern, interactive quote generator built with Node.js, Express.js, EJS, and the Quotable API. Includes category filtering, quote search, theme switching, copy-to-clipboard, and tweet sharing. This version replaces the old local JSON file with live API quotes, making it an excellent polished portfolio project.

Features

Fetches quotes from the Quotable API

Category filter (love, wisdom, technology, happiness, etc.)

Search quotes by keyword or author

Theme switcher (Light, Dark, Gradient, Pastel)

Copy quote to clipboard

Tweet quote button

Responsive modern UI using Bootstrap 5

Smooth fade animations

Server-side rendering with EJS

Technologies Used

Node.js

Express.js

EJS Templates

Bootstrap 5

JavaScript (Fetch API)

HTML & CSS

Quotable API

Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/Quote-Generator.git


Go into the project folder:

cd Quote-Generator


Install dependencies:

npm install


Start the server:

node index.js


Open the app in your browser:

http://localhost:3000


How the App Works
Fetch random quote
https://api.quotable.io/random

Fetch by category
https://api.quotable.io/random?tags=love

Search quotes
https://api.quotable.io/quotes?query=life&limit=1

Load categories
https://api.quotable.io/tags

Usage

New Quote → loads random or filtered quote

Search bar → enter text and press Enter

Category dropdown → pick a tag

Theme selector → change appearance

Copy → saves quote text to clipboard

Tweet → shares the quote on X/Twitter

License

This project is open-source under the MIT License.
