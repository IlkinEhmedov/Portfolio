import React from 'react';
import '../assets/styles/Loader.scss';

function PreLoader() {
    return (
        <div className='preloader'>
            {/* Replace "IA" with your initials if you like, or keep it generic */}
            <div className="spinner-container">
                {/* A professional looking CSS/SVG spinner */}
                <div className="spinner"></div>
                <div className="logo-text">Ilkin Ahmadov</div>
            </div>
        </div>
    );
}

export default PreLoader;
