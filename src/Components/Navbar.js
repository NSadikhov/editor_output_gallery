import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Styles/navbar.module.css';

const Navbar = () => {
    return (
        <div className={classes.container}>
            <Link to='/'>Editor & Output</Link>
            <Link to='/gallery'>Gallery</Link>
        </div>
    );
}

export default Navbar;