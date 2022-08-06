import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Masonry from "react-responsive-masonry"

export const SingleCategory = ({category}) => {
    const { id } = useParams();
    const [categoryImage, setCategoryImage] = useState([])
    const url = `https://api.unsplash.com/topics/${id}/photos?client_id=a3UHM6AA9sAjHoblXGcI1uUu6fjEfpBJaBNuJwDlqXk`;

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setCategoryImage(data))
    }, [id])

    return(
        <>
            <div className="thumb-image"></div>
            <div className="category-library">
                <Masonry gutter="1rem">
                    {
                        categoryImage && 
                        categoryImage.map((image) => (
                            <img src={image.urls.regular} alt={image.alt_description} key={image.id}/>
                        ))
                    }
                </Masonry>
            </div>
        </>
    )
}