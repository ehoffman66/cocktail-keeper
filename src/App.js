import React, { useEffect, useState } from 'react';

function App() {
  const [responseBody, setResponseBody] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      console.error('Browser is offline');
    } else {
      fetch('http://localhost:3001/readSheet') // replace with your server's endpoint
        .then(response => 
          response.json().then(data => {
            if (!response.ok) {
              console.error(`HTTP error! status: ${response.status}`);
            }
            console.log(data); // Log the data to the console
            return data;
          })
        )
        .then(data => setResponseBody(data))
        .catch(error => console.error('Fetch error: ', error));
    }
  }, []);

  return (
    <div className="App">
      {responseBody.map((cocktail, index) => (
        <div key={index}>
          <h2>{cocktail['Cocktail']}</h2>
          <p>Base Spirit: {cocktail['Base Spirit']}</p>
          <p>Ingredients:</p>
          <ul>
            {cocktail['Ingredients '] && cocktail['Ingredients '].trim() !== '' ?
              cocktail['Ingredients '].replace(/[\[\]']+/g,'').split(',').map((ingredient, i) => (
                <li key={i}>{ingredient.trim()}</li>
              ))
              : <li>No ingredients listed</li>
            }
          </ul>
          <p>Garnish: {cocktail['Garnish']}</p>
        </div>
      ))}
    </div>
  );
}

export default App;