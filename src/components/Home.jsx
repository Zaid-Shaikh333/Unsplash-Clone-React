import { useState, useEffect } from 'react';
import { CLIENT_ID } from '../Secret';
import { Navbar } from './Navbar';
import { HomeThumb } from './HomeThumb';
import Masonry from "react-responsive-masonry"
import { Link, useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';

export const Home = () => {
    
    const [images, setImages] = useState([]);
    const [popupdata, setPopupdata] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    const url = `https://api.unsplash.com/photos/?page=${page}&per_page=30&client_id=${CLIENT_ID}`;
    useEffect(() => {
        handleScroll()
    }, [])
   

    const handleScroll = () => {
        setLoading(true)
        setPage(page+1)
        fetch(url)
            .then(res => res.json())
            .then(data => setImages([...images, ...data]))
            setLoading(false)
    }

    return (
        <>

            <div className="homepage-image">
                <HomeThumb />
            </div>
            <div className="home-image-library" >
                <InfiniteScroll
                dataLength={images.length}
                hasMore={true}
                next={handleScroll}
                loading={loading}
                >
                <Masonry gutter="1rem">
                    {
                        images &&
                        images.map((image) => (
                            <img key={image.id} src={image.urls.regular} alt={image.alt_description}
                                data-toggle="modal" data-target="#popupModal"
                                onClick={() => {
                                    setPopupdata(image)
                                }}
                            />
                        ))
                    }
                </Masonry>
                </InfiniteScroll>
            </div>
            {
                popupdata &&
                <div className="modal fade modalbox" id="popupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img src={popupdata.user.profile_image.small} className='user-thumb' />
                                <p>{popupdata.user.first_name + " " + popupdata.user.last_name ? popupdata.user.last_name : ''}</p>
                            </div>
                            <div className="modal-body">
                                
                                <img src={popupdata.urls.small} alt={popupdata.alt_description} className='popup-image'/>
                                <hr />
                                <div className="likes">
                                    <span className="material-symbols-outlined likes-icon">
                                        favorite
                                    </span>
                                    <p>{popupdata.likes}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}