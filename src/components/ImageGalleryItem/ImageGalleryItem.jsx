import PropTypes from 'prop-types';
import { Item, GalleryImg } from "./ImageGalleryItem.styled";
function ImageGalleryItem({ image, onClick }) {
    return (
        <Item onClick={() => {
        onClick(image.largeImageURL);
        }}>
            <GalleryImg src={image.webformatURL} alt="" />

        </Item>
    )
};

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    image: PropTypes.object.isRequired,

}

export default ImageGalleryItem;