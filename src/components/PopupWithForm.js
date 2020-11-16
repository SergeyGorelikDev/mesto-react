function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <h2 className="popup__header">{props.title}</h2>
                <form className="popup__input-form" name="{props.name}" onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button className="popup__submit-button" type="submit" aria-label={props.buttonCaption}>{props.buttonCaption}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;