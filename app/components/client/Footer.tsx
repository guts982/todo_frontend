import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className='max-w-screen h-[5vh] flex justify-center items-center bg-lawrencium text-white'>
           Copyright © {year} Amit Karn. All Rights Reserved.
        </div>
    );
};

export default Footer;

// ™