import { useEffect, useState } from "react"

function Favorites () {

  const [favorites, setFavorites] = useState([]); 
  useEffect(() => {
    updateFavorites(); 
  }, []);
  const updateFavorites = async () => { 
    const favoritesFilter = JSON.parse(localStorage.getItem('favorites')) || []; // conseguir las criptomonedas favoritas del localstorage
    console.log('favs', favoritesFilter)
    const response = await fetch('https://api.coincap.io/v2/assets/');
    const data = await response.json();
    const newFavorites = data.data.filter((coin) =>
      favoritesFilter.some((favorite) => favorite.id === coin.id)
    ); // filtrar las criptomonedas favoritas
    setFavorites(newFavorites); // guardar las criptomonedas favoritas en el estado
  };

  const removeFromFavorites = (coinId) => {

    const favoritas = JSON.parse(localStorage.getItem('favorites')) || []; // conseguir las criptomonedas favoritas del localstorage
    const newFavorites = favoritas.filter((fav) => fav.id !== coinId); // filtrar las criptomonedas favoritas
    localStorage.setItem('favorites', JSON.stringify(newFavorites)); // guardar las criptomonedas favoritas en el localstorage
    setFavorites(favorites.filter(fav => fav.id !== coinId));

  };

    return (
      <>
      <div className="container">
        <h1>Mis favoritos</h1>
        <ul>
          {favorites.map((coin) => (
            <li key={coin.id}>
              <span>{coin.name}</span>
              <button onClick={() => removeFromFavorites(coin.id)}> Quitar de favoritos  </button>
            </li>
          ))}
        </ul>
      </div>
    </>
    
  
    )
  }
  
  export default Favorites