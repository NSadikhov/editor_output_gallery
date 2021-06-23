import React, { useEffect, useRef } from 'react';
import classes from '../Styles/editor-output.module.css';
import { EDITOR_INPUT_DATA, GALLERY_DATA, usePersistedStateLocal } from '../Utils';

const MIN_SIZE_VALUE = 10;
const MAX_SIZE_VALUE = 250;

const Editor_Output = () => {

    const resultRef = useRef(null);
    const popUpRef = useRef(null);
    const popUpInputRef = useRef(null);

    const [inputData, setInputData] = usePersistedStateLocal(EDITOR_INPUT_DATA, {
        color: '#FFA500',
        size: 150,
        radius: 25
    })

    const [galleryData, setGalleryData] = usePersistedStateLocal(GALLERY_DATA, null);

    const handleInputChange = (e) => {
        const target = e.currentTarget;
        let value;
        switch (target.name) {
            case 'color':
                value = target.value;
                resultRef.current.style.backgroundColor = value;
                break;
            case 'size':
                if (target.value > MIN_SIZE_VALUE && target.value < MAX_SIZE_VALUE) {
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
        if (target.value < MIN_SIZE_VALUE) target.value = MIN_SIZE_VALUE;
        if (target.value > MAX_SIZE_VALUE) target.value = MAX_SIZE_VALUE;
        resultRef.current.style.width = target.valueAsNumber + 'px';
        resultRef.current.style.height = target.valueAsNumber + 'px';
        setInputData((prevS) => ({ ...prevS, [target.name]: target.valueAsNumber }))
    }

    const handleSave = (e) => {
        popUpRef.current.style.opacity = 1;
        popUpRef.current.style.visibility = 'visible';
    }

    const handleClickAway = (e, isForced = false) => {
        if (e.target === popUpRef.current || isForced) {
            popUpRef.current.style.opacity = 0;
            popUpRef.current.style.visibility = 'hidden';
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = popUpInputRef.current.value.trim();
        if (name !== '') {
            if (galleryData) setGalleryData(galleryData.concat({ name, ...inputData }));
            else setGalleryData([{ name, ...inputData }]);
            handleClickAway(e, true);
        }
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
                    <button className={classes.saveBtn} onClick={handleSave}>Save</button>
                </div>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.output}>
                <h1 className={classes.headerText}>Output</h1>
                <div className={classes.resultSection}>
                    <div className={classes.result} ref={resultRef} />
                </div>
            </div>
            <div className={classes.popUpContainer} ref={popUpRef} onClick={handleClickAway}>
                <form className={classes.popUp} onSubmit={handleSubmit}>
                    <h1>Assign a name to your design</h1>
                    <div className={classes.popUpInputField}>
                        <input type='text' ref={popUpInputRef} spellCheck={false} placeholder='e.g. Layout-1' />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Editor_Output;