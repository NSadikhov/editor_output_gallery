import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Styles/navbar.module.css';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const Navbar = (props) => {

    const containerRef = useRef(null);

    const handleToggle = (e) => {
        const getAttributeValue = containerRef.current.getAttribute('data-toggle');
        containerRef.current.setAttribute('data-toggle', getAttributeValue === 'open' ? 'closed' : 'open');

        if (getAttributeValue === 'open') {
            containerRef.current.style.minWidth = '60px';
            // props.contentRef.current.style.width = 'calc(100% - 60px)';
        }
        else {
            containerRef.current.style.minWidth = '250px';
            // props.contentRef.current.style.width = 'calc(100% - 250px)';
        }
    }

    const handleOnMouseDown = (e) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseMove = (e) => {
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize';
        const size = document.body.clientWidth - e.clientX;
        if (size <= 250 && size >= 60) {
            containerRef.current.style.transitionDuration = '0ms';
            containerRef.current.style.minWidth = size + 'px';

            // props.contentRef.current.style.width = `calc(100% - ${size}px)`;

            if (size <= 125) containerRef.current.setAttribute('data-toggle', 'closed');
            else containerRef.current.setAttribute('data-toggle', 'open');
        }

    }

    const handleMouseUp = () => {
        document.body.style.userSelect = 'auto';
        document.body.style.cursor = 'default';
        containerRef.current.style.transitionDuration = '300ms';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    return (
        <div ref={containerRef} className={classes.container} data-toggle='open'>
            <div className={classes.border} onMouseDown={handleOnMouseDown} />
            <ExitToAppRoundedIcon onClick={handleToggle} className={classes.icon} />
            <div className={classes.tabs}>
                <Link to='/'>Editor & Output</Link>
                <Link to='/gallery'>Gallery</Link>
            </div>
        </div>
    );
}

export default Navbar;