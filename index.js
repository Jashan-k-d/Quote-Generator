const express = require("express");
const app = express();
app.set("view engine", "views");

let port = 3000;
app.listen(port, () => {
    console.log('app is listening');
})
app.get("/", (req, res) => {
    const quotes = require("./quote.json");
    let number = Math.floor(Math.random() * quotes.quotes.length);
    res.render("quotepage.ejs", { quotelist: quotes, num: number });
})
