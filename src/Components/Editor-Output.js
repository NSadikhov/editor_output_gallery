import React from 'react';
import classes from '../Styles/editor-output.module.css';

const Editor_Output = () => {

    return (
        <div className={classes.container}>
            <div className={classes.editor}>
                <h1 className={classes.headerText}>Editor</h1>
                <div className={classes.inputSection}>
                    <div>
                        <label htmlFor='colorPicker'>Color:</label>
                        <input type='color' id='colorPicker' className={classes.colorPicker} />
                    </div>
                    <div>
                        <label htmlFor='size'>Size: </label>
                        <input type="number" id='size' className={classes.size}></input>
                    </div>
                    <div>
                        <label htmlFor='borderRadius'>Radius: </label>
                        <input type="range" id='borderRadius' className={classes.borderRadius}></input>
                    </div>
                    <button className={classes.saveBtn}>Save</button>
                </div>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.output}>
                <h1 className={classes.headerText}>Output</h1>
                <div className={classes.resultSection}>
                    <div className={classes.result}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editor_Output;