import React, { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';

function App() {
  const [responseBody, setResponseBody] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="App grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Search Cocktails</h2>
        <input
          type="text"
          placeholder="Search by cocktail name..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {responseBody.filter(cocktail => cocktail['Cocktail'].toLowerCase().includes(searchTerm.toLowerCase())).map((cocktail, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{cocktail['Cocktail']}</h2>
          <p className="text-gray-600 mb-2">Base Spirit: {cocktail['Base Spirit']}</p>
          <p className="text-gray-600 mb-2">Ingredients:</p>
          <Listbox as="ul" className="mb-2">
            {cocktail['Ingredients'] && cocktail['Ingredients'].trim() !== '' ?
              cocktail['Ingredients'].replace(/[\[\]']+/g,'').split(',').map((ingredient, i) => (
                <Listbox.Option as="li" key={i} className="text-gray-600 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{ingredient.trim()}</Listbox.Option>
              ))
              : <li className="text-gray-600">No ingredients listed</li>
            }
          </Listbox>
          <p className="text-gray-600">Garnish: {cocktail['Garnish']}</p>
        </div>
      ))}
    </div>
  );
}

export default App;