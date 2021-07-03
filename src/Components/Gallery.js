import React from 'react';
import classes from '../Styles/gallery.module.css';
import { EDITOR_OUTPUT_DATA, GALLERY_DATA, usePersistedStateLocal } from '../Utils';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import noData from '../Images/no_data.svg';

const Gallery = (props) => {

    const [galleryData, setGalleryData] = usePersistedStateLocal(GALLERY_DATA, null);
    const [editorOutputData, setEditorOutputData] = usePersistedStateLocal(EDITOR_OUTPUT_DATA, null);

    const handleInfoIconClick = (e) => {
        const getAttributeValue = e.currentTarget.parentElement.getAttribute('data-details');
        e.currentTarget.parentElement.setAttribute('data-details', getAttributeValue === 'open' ? 'closed' : 'open');
    }

    const handleEditIconClick = (data) => new Promise((res) => res(setEditorOutputData(data))).then(() => props.history.push('/'));

    const handleDeleteIconClick = (data) => {
        setGalleryData(galleryData.filter(each => each.name !== data.name))
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.headerText}>Gallery</h1>
            {galleryData.length === 0 ?
                <div className={classes.noDataSection}>
                    <img className={classes.noData} src={noData} alt='no data found' />
                    <p>
                        {'<<< No Design Found >>>'}
                    </p>
                </div>
                :
                <div className={classes.gallerySection}>
                    {galleryData?.map(each =>
                        <div key={each.name} className={classes.gallerySectionBox}>
                            <div className={classes.gallerySB_content}>
                                <div className={classes.gallerySB_content_delete}>
                                    <DeleteOutlineOutlinedIcon className={classes.delete_icon} onClick={() => handleDeleteIconClick(each)} />
                                </div>
                                <div className={classes.gallerySB_content_designInfo} data-details='closed'>
                                    <InfoOutlinedIcon name='info' className={classes.info_icon} onClick={handleInfoIconClick} />
                                    <CloseRoundedIcon name='close' className={classes.info_icon} onClick={handleInfoIconClick} />
                                    <div className={classes.details}>
                                        <span> <span>Color: </span><span>{each.color}</span></span>
                                        <span> <span>Size: </span><span>{each.size} px</span></span>
                                        <span> <span>Radius: </span><span>{each.radius} %</span></span>
                                    </div>
                                </div>
                                <div className={classes.gallerySB_content_edit}>
                                    <EditOutlinedIcon className={classes.edit_icon} onClick={() => handleEditIconClick(each)} />
                                </div>
                                <div style={{
                                    backgroundColor: each.color, width: each.size + 'px',
                                    height: each.size + 'px', borderRadius: each.radius + '%'
                                }} className={classes.gallerySB_content_design}></div>
                            </div>
                            <div className={classes.gallerySB_name}>{each.name}</div>
                        </div>
                    )}
                    <div />
                    <div />
                </div>
            }
        </div>
    )
}

export default Gallery;
