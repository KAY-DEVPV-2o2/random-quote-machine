import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('Loading quote...');
  const [author, setAuthor] = useState(''); // Initial author is empty
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.PUBLIC_URL}/quotes.json`);
      console.log('API Response:', response.data); // Log the API response
      const quotes = response.data;

      const randomIndex = Math.floor(Math.random() * quotes.length);
      const selectedQuote = quotes[randomIndex];

      // Simulate delay before updating the state
      setTimeout(() => {
        setQuote(selectedQuote.content || 'Quote not available');
        setAuthor(selectedQuote.author || 'Anonymous');
        setLoading(false); // Stop loading after updating
      }, 1000); // Delay of 1 second (1000ms)
    } catch (error) {
      console.error('Error fetching quote:', error);
      setTimeout(() => {
        setQuote('Could not fetch a quote at the moment. Please try again later.');
        setAuthor('');
        setLoading(false); // Stop loading even on error
      }, 1000); // Delay of 1 second
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
        >
          Tweet Quote
        </a>
      </div>
      <footer id="footer">Developed by K-Devp-V-2o2</footer>
    </div>
  );
};

export default App;
