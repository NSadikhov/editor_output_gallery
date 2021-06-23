import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Styles/navbar.module.css';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const Navbar = () => {
    return (
        <div className={classes.container}>
            <div className={classes.navBar}>
                <ExitToAppRoundedIcon className={classes.icon} />
                <Link to='/'>Editor & Output</Link>
                <Link to='/gallery'>Gallery</Link>
            </div>
        </div>
    );
}

export default Navbar;