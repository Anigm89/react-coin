import { Link, Outlet } from 'react-router-dom'

function Header () {
  return (
    <>
    <nav>
    
      <Link to={"/"}> Home</Link>
      <Link to={"/coin/:id"}> Coin</Link>
      <Link to={"favorites"}> Favorites</Link>

    </nav>
    <Outlet />
    </>

  )
}

export default Header