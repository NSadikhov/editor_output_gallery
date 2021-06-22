import React, { useEffect, useRef } from 'react';
import classes from '../Styles/editor-output.module.css';
import { usePersistedStateLocal } from '../Utils';

const EDITOR_INPUT_DATA = 'editor-input-data';

const Editor_Output = () => {

    const resultRef = useRef(null);

    const [inputData, setInputData] = usePersistedStateLocal(EDITOR_INPUT_DATA, {
        color: '#FFA500',
        size: 150,
        radius: 25
    })

    const handleInputChange = (e) => {
        const target = e.currentTarget;
        let value;
        switch (target.name) {
            case 'color':
                value = target.value;
                resultRef.current.style.backgroundColor = value;
                break;
            case 'size':
                if (target.value > 10 && target.value < 300) {
                    value = target.valueAsNumber;
                    resultRef.current.style.width = value + 'px';
                    resultRef.current.style.height = value + 'px';
                }
                break;
            case 'radius':
                value = Math.round(target.valueAsNumber * 10 / 2) / 10;
                resultRef.current.style.borderRadius = value + '%';
                break;
            default:
                break;
        }

        value && setInputData((prevS) => ({ ...prevS, [target.name]: value }))
    }

    const handleInputBlur = (e) => {
        const target = e.currentTarget;
        if (target.value < 10) target.value = 10;
        if (target.value > 300) target.value = 300;
        resultRef.current.style.width = target.valueAsNumber + 'px';
        resultRef.current.style.height = target.valueAsNumber + 'px';
        setInputData((prevS) => ({ ...prevS, [target.name]: target.valueAsNumber }))
    }

    const handleSave = (e) => {

    }

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.style.width = inputData.size + 'px';
            resultRef.current.style.height = inputData.size + 'px';
            resultRef.current.style.backgroundColor = inputData.color;
            resultRef.current.style.borderRadius = inputData.radius + '%';
        }
    }, [resultRef.current])

    return (
        <div className={classes.container}>
            <div className={classes.editor}>
                <h1 className={classes.headerText}>Editor</h1>
                <div className={classes.inputSection}>
                    <div>
                        <label htmlFor='colorPicker'>Color:</label>
                        <input onChange={handleInputChange} name='color' defaultValue={inputData.color} type='color' id='colorPicker' className={classes.colorPicker} />
                    </div>
                    <div>
                        <label htmlFor='size'>Size: </label>
                        <input onChange={handleInputChange} onBlur={handleInputBlur} name='size' defaultValue={inputData.size} type="number" id='size' className={classes.size}></input>
                    </div>
                    <div>
                        <label htmlFor='borderRadius'>Radius: </label>
                        <input onChange={handleInputChange} name='radius' defaultValue={inputData.radius * 2} type="range" id='borderRadius' className={classes.borderRadius}></input>
                    </div>
                    <button className={classes.saveBtn}>Save</button>
                </div>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.output}>
                <h1 className={classes.headerText}>Output</h1>
                <div className={classes.resultSection}>
                    <div className={classes.result} ref={resultRef} />
                </div>
            </div>
        </div>
    );
}

export default Editor_Output;