import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styled";
function ImageGallery({ arrayImages, onClick}) {
    return (
        <List>
            {arrayImages.map((image) => {
                return (
                    <ImageGalleryItem onClick={onClick} key={image.id} image={image}></ImageGalleryItem>
                )
            })}
        </List>
    );
    
};

ImageGallery.propTypes = {
  arrayImages: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;