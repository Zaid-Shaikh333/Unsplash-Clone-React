import { useState, useEffect } from 'react';

import { Navbar } from './Navbar';
import { HomeThumb } from './HomeThumb';
import Masonry from "react-responsive-masonry"
import { Link,useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const url = `https://api.unsplash.com/photos/?client_id=a3UHM6AA9sAjHoblXGcI1uUu6fjEfpBJaBNuJwDlqXk`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setImages(data))
    },[])

    return (
        <>
            
            <div className="homepage-image">
                <HomeThumb />
            </div>
            <div className="home-image-library" >
                <Masonry gutter="1rem">
                        {
                            images && 
                            images.map((image) => (
                                <img key={image.id} src={image.urls.regular} alt={image.alt_description}
                                onClick={() => {
                                    navigate(`/image/${image.id}`)
                                }}
                                />
                            ))
                        }
                </Masonry>
            </div>
        </>
    )
}