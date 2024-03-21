import { useEffect } from "react"

function Favorites () {



    return (
      <>
      <div className="container">
        <h1>Mis favoritos</h1>
        <ul>
          {favorites.map((coin) => (
            <li key={coin.id}>
              <span>{coin.name}</span>
              <button onClick={() => toggleFavorite(coin.id)}>
                {favorites.includes(coin.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
    
  
    )
  }
  
  export default Favorites