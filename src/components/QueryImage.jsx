import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Masonry from "react-responsive-masonry";
import { CLIENT_ID } from '../Secret';
import InfiniteScroll from 'react-infinite-scroll-component';

export const QueryImage = () => {

    const [queryImage, setQueryImage] = useState([]);
    const { search } = useParams();
    const [popupdata, setPopupdata] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    const url = `https://api.unsplash.com/search/photos/?page=${page}&per_page=30&query=${search}&client_id=${CLIENT_ID}`;

    useEffect(() => {
        handleScroll()
    }, [search])

    const handleScroll = () => {
        setLoading(true)
        setPage(page+1)
        fetch(url)
            .then(res => res.json())
            .then(data => handleData(data))
        setLoading(false)
    }
    
    const handleData = (data) => {
        setQueryImage([...queryImage, ...data.results])
    }
    return (
        <>
            <div className="category-library">
                <InfiniteScroll
                    dataLength={queryImage.length}
                    hasMore={true}
                    next={handleScroll}
                    loading={loading}
                >
                    <Masonry gutter="1rem">
                        {
                            queryImage.length > 0 && queryImage.map((image) => (
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
                                <p>{popupdata.user.first_name + " " + popupdata.user.last_name}</p>
                            </div>
                            <div className="modal-body">
                                <img src={popupdata.urls.small} alt={popupdata.alt_description} className='popup-image' />
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