import React from 'react';
import classes from '../Styles/gallery.module.css';
import { GALLERY_DATA, usePersistedStateLocal } from '../Utils';


const Gallery = () => {

    const [galleryData, setGalleryData] = usePersistedStateLocal(GALLERY_DATA, null);


    return (
        <div className={classes.container}>
            <h1 className={classes.headerText}>Gallery</h1>
            <div className={classes.gallerySection}>
                {galleryData?.map(each =>
                    <div key={each.name} className={classes.gallerySectionBox}>
                        <div className={classes.gallerySB_content}>
                            <div style={{
                                backgroundColor: each.color, width: each.size + 'px',
                                height: each.size + 'px', borderRadius: each.radius + '%'
                            }}></div>
                        </div>
                        <div className={classes.gallerySB_name}>{each.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Gallery;
