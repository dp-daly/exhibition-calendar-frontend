import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPayload, isAdmin } from '../lib/auth.js'

function Navbar() {

    let location = useLocation()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(getPayload())
        isAdmin()
      }, [location])
    
      function logout() {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
      }

    return (
        <nav className="navbar">
            <div className="navbar-menu is-active">
                <div className="logo"></div>
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to="/" className="button is-dark">Gallery</Link>
                        {!isLoggedIn && <Link to="/signup" className="button is-warning">Sign up</Link>}
                        {!isLoggedIn && <Link to="/signin" className="button is-danger">Sign in</Link>}
                        {isAdmin() && <Link to="/gallery/create" className="button">Create</Link>}
                        {isLoggedIn && <Link to={`/user/${getPayload().userId}`} className="button is-danger">My planner</Link>}
                        {isLoggedIn && <button className="button" onClick={logout}>Sign out</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar