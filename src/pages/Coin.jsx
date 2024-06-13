import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isFavorite, setIsFavorite] = useState([]);


  useEffect(() => {

    async function getCoin(){

        try{
            const url = `https://api.coincap.io/v2/assets/${id}`;
            const response = await fetch(url);

            const data = await response.json();

            if(data.data){
              setCoin(data.data); 
//              console.log('data', data.data)

              let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // conseguir las criptomonedas favoritas del localstorage
              storedFavorites = storedFavorites.filter(favorite => favorite !== null); // Filter out null values
           //   console.log('Stored favorites:', storedFavorites);
    
              setIsFavorite(storedFavorites.map(fav => fav.id));
 //         console.log('Favorite IDs:', storedFavorites.map(fav => fav.id));
      
            }
            else {
              console.log('No data found for this coin');
            }
        }
        catch(error){
            console.log('Ha ocurrido un error al conectar con la API', error)
        }
    }
    getCoin();
  }, [id]);


  const addTofavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // conseguir las criptomonedas favoritas del localstorage
    //console.log('Current favorites:', favorites);
    if (!favorites) {
      favorites = [];
    }
    favorites = favorites.filter(favorite => favorite !== null); // Filter out null values
    if (coin && !favorites.find((favorite) => favorite.id === coin.id)) { // si la criptomoneda no esta en favoritos

      favorites.push({ id: coin.id }); // agregar la criptomoneda a favoritos
      localStorage.setItem('favorites', JSON.stringify(favorites)); // guardar las criptomonedas favoritas en el localstorage
      setIsFavorite([...isFavorite, coin.id]);
    }
  };
  const removeFromFavorites = () => {
    // función para remover de favoritos
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []; // conseguir las criptomonedas favoritas del localstorage
    const newFavorites = favorites.filter(
      (favorite) => favorite.id !== coin.id
    ); // filtrar las criptomonedas favoritas
    localStorage.setItem('favorites', JSON.stringify(newFavorites)); // guardar las criptomonedas favoritas en el localstorage
    setIsFavorite(isFavorite.filter(favId => favId !== coin.id));

  };

  const handleFavorite = () => { // función para manejar los favoritos
    if (isFavorite.includes(coin.id)) {
      removeFromFavorites(); 
    } 
    else {
      addTofavorites(); 
    }
  };

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
          <button onClick={handleFavorite}>
              {isFavorite.includes(coin.id)  ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>
   
      )}
    </div>
    </>
  );
}

export default Coin;