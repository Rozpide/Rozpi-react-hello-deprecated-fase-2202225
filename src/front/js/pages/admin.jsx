import React, { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryUploadWidget from '../component/CloudinaryUploadWidget'

export const Admin = () => {
    const cloudName = 'hzxyensd5';
    const uploadPreset = 'aoh4fpwm';
    const [imageURL, setImageURL] = useState('');

    const cld = new Cloudinary({
        cloud: {
            cloudName,
        },
    });

    const uwConfig = {
        cloudName,
        uploadPreset,
        // Uncomment and modify as needed:
        // cropping: true,
        // showAdvancedOptions: true,
        // sources: ['local', 'url'],
        // multiple: false,
        // folder: 'user_images',
        // tags: ['users', 'profile'],
        // context: { alt: 'user_uploaded' },
        // clientAllowedFormats: ['images'],
        // maxImageFileSize: 2000000,
        // maxImageWidth: 2000,
        // theme: 'purple',
    };


    return (<>
        <h1>Admin perros!</h1>
        <CloudinaryUploadWidget uwConfig={uwConfig} setImageURL={setImageURL} />
        <h2>{imageURL}</h2>
        <img src={imageURL} />
    </>)
}