import React, { useState, useEffect } from 'react';
import axios from 'axios';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product'
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-customDark'>
      <div className='flex rounded-lg bg-customWhite'>
        <h1 className='text-2xl font-bold py-2 px-4 uppercase'>
          React Boilerplate <FontAwesomeIcon icon={faAtom}></FontAwesomeIcon>
        </h1>
      </div>
    </div>
  );
}

export default App;
