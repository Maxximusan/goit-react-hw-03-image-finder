import PropTypes from "prop-types";
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css'
// пропс для модалки, в img его и в проптайп
export const ImageGalleryItem = (props) => {
const {id, webformatURL, largeImageURL, alt} = props
    return (
        <li key={id} className={css.ImageGalleryItem}>
            <img
                className={css.ImageGalleryItem__image}
                src={webformatURL}
                alt={alt}
                dataformodal={largeImageURL} />
</li>
    )
}


ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    alt: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,

}