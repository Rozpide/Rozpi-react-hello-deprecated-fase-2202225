import React, { useState } from 'react';
import CloudinaryUploadWidget from '../component/CloudinaryUploadWidget'

export const Admin = () => {
    const [imageURL, setImageURL] = useState('');

    return (<>
        <h1>Admin perros!</h1>
        <CloudinaryUploadWidget setImageURL={setImageURL} folder="productos"/>
        <h2>{imageURL}</h2>
        <img src={imageURL} />
    </>)
}