
export const ImageList = ({ data }) => {
    return (
        <>
            {data &&
                data.map((image) => (
                    <img key={image.id} src={image.urls.regular} alt={image.alt_descriptipn}/>
                ))
            }
        </>
    )
}