import React, { useState, useEffect } from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function App() {
  const [quote, setQuote] = useState("Dale que me voy de peronia")
  const [author, setAuthor] = useState("Marcos Bertón");
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <h2 id="text">
            <span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft}/></span>{quote}"
        </h2>
          <p id="author">- {author}</p>
          <div className="buttons" >
            <a id="tweet-quote" style={{ backgroundColor: accentColor }} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" style={{ backgroundColor: accentColor }} onClick={() => getRandomQuote()}>Nueva Frase</button>
          </div>

          

        </div>
      </header>
    </div>
  );
}

export default App;
