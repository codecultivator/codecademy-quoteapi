const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let result = {
        quote: getRandomElement(quotes)
    };
    res.send(result);
});

const filteredQuotes = (person) =>{
    console.log(`filtering by ${person}`)
    return quotes.filter(quote => { 
        return quote.person.toLowerCase().indexOf(person.toLowerCase()) !== -1
    })
}

app.get('/api/quotes/:person?', (req, res, next) => {
    let result = {
        quotes: req.query.person 
            ? filteredQuotes(req.query.person) : quotes
    };

    res.send(result);
});

app.post('/api/quotes', (req, res, next) => {
    const { person, quote } = req.query;

    if (!person)
        return res.status(400).send('Missing person');

    if (!quote)
        return res.status(400).send('Missing quote');

    const newQuote = {
        quote,
        person
    }

    // add new quote to quotes array
   quotes.push(newQuote);

   res.send({
    quote: newQuote
   })
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})