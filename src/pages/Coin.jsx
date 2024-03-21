import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [favorites, setFavorites] = useState([]);


console.log('id', id)
  useEffect(() => {

    async function getCoin(){

        try{
            const url = `https://api.coincap.io/v2/assets/${id}`;
            const response = await fetch(url);

            const data = await response.json();
            setCoin(data.data); 
            console.log(data.data)
    
        }
        catch(error){
            console.log('Ha ocurrido un error al conectar con la API', error)
        }
    }
    getCoin();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = () => {
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter(fav => fav !== id);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]); 
  
  return (
    <>
    <div className="container">
      <h1>Detalle de la moneda</h1>
      {coin && (
        <div>
          <h2>{coin.name}</h2>
          <p>Symbol: <i>{coin.symbol} </i></p>
          <p>Supply: <i>{coin.supply} </i> </p>
          <p>MaxSupply: <i>{coin.maxSupply} </i></p>
          <p>MarketCapUsd: <i>{coin.marketCapUsd}</i> </p>
          <p>VolumeUsd24Hr: <i>{coin.volumeUsd24Hr}</i> </p>
          <p>PriceUsd: <i>{coin.priceUsd} </i></p>
          <p>ChangePercent24Hr:<i>{coin.changePercent24Hr} </i></p>
          <p>Vwap24Hr: <i>{coin.vwap24Hr} </i></p>
          <a href={coin.explorer}>Más información</a>
          <button onClick={() => toggleFavorite(coin.id)}>
              {favorites.includes(coin.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>
   
      )}
    </div>
    </>
  );
}

export default Coin;