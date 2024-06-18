import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const userId = localStorage.getItem('token')
    console.log(userId)
    return (
        <nav className="navbar">
            <div className="navbar-menu is-active">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to="/" className="button is-warning">Gallery</Link>
                        <Link to="/signup" className="button">Sign up</Link>
                        <Link to="/signin" className="button">Sign in</Link>
                        <Link to="/gallery/create" className="button">Create</Link>
                        <Link to="/gallery/edit" className="button">Edit</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar