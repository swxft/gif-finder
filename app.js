// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
// App Setup
const app = express();

// Middleware

app.use(express.static(__dirname + 'public'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const Tenor = require("tenorjs").client({
  // Replace with your own key
  "Key": "K5N3NL3P7CMX", // https://tenor.com/developer/keyregistration
  "Filter": "high", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});
// Routes
// example URL "http://localhost:3000/?term=hey"
app.get('/public/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/styles.css')
})
app.get('/', (req, res) => {
  // console.log(req.query) // => "{ term: hey" }[/bold]
  //   res.render('home')
  // })
  term = ""
  if (req.query.term) {
      term = req.query.term
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, "10")
      .then(response => {
          // store the gifs we get back from the search
          const gifs = response;
          // pass the gifs as an object into the home page
          res.render('home', { gifs })
      }).catch(console.error);
});
app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
})

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});