import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Masonry from "react-responsive-masonry";

export const QueryImage = () => {
    const [queryImage, setQueryImage] = useState([]);
    const { search } = useParams();
    const url = `https://api.unsplash.com/search/photos/?per_page=30&query=${search}&client_id=a3UHM6AA9sAjHoblXGcI1uUu6fjEfpBJaBNuJwDlqXk`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setQueryImage(data.results))
            console.log(queryImage)
    },[search])
    return(
        <>
            <div className="category-library">
                <Masonry gutter="1rem">
                    {
                        queryImage && queryImage.map((image) => (
                            <img key={image.id} src={image.urls.regular} alt={image.alt_description}/>
                        ))
                    }
                </Masonry>
            </div>
        </>
    )
}