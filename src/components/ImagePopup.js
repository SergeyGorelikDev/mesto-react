function ImagePopup(props) {
    return (
        <div className={`popup popup_image_viewer ${props.card.link ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_image">
                <img className="popup__photo" src={props.card.link} alt="Фото"></img>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <h2 className="popup__header popup__header_location_bottom">{props.card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;