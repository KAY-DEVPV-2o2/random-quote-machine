import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('Loading quote...');
  const [author, setAuthor] = useState('Fetching author...');
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/quotes.json'); // Fetch from public/quotes.json
      const quotes = response.data;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].content);
      setAuthor(quotes[randomIndex].author);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Could not fetch a quote at the moment. Please try again later.');
      setAuthor('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="App">
      <div id="quote-box">
        <div id="text">{loading ? 'Loading...' : quote}</div>
        <div id="author">{author && `- ${author}`}</div>
        <button id="new-quote" onClick={fetchRandomQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${quote} - ${author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tweet the current quote"
        >
          Tweet Quote
        </a>
      </div>
      {/* Footer Section */}
      <footer id="footer">Developed by K-Devp-V-2o2</footer>
    </div>
  );
};

export default App;
