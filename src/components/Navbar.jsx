import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-menu is-active">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to="/" className="button is-warning">Gallery</Link>
                        <Link to="/auth/signup" className="button">Sign up</Link>
                        <Link to="/auth/signin" className="button">Sign in</Link>
                        <Link to="/gallery/create" className="button">Create</Link>
                        <Link to="/gallery/edit" className="button">Edit</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar