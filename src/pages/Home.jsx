import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Home(){
    const [coins, setCoins] = useState([]);

    useEffect(() => {

        const getCoin = async () =>{

            try{
                const url = 'https://api.coincap.io/v2/assets/';
                const response = await fetch(url);

                const data = await response.json();
                setCoins(data.data); 
               // console.log(data.data)
        
            }
            catch(error){
                console.log('Ha ocurrido un error al conectar con la API', error)
            }
        }
    getCoin();
    },[coins]);


    return(
      <>
        <div className="container">
            <h1>Listado de monedas</h1>
            <ul>
            {coins.map((coin) => (
            <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>{coin.name}</Link>
            </li>
            ))}
            </ul>
        </div>
      </>
    )
  }
  export default Home;

      