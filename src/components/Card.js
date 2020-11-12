function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <article className="element" key={props.card._id}>
            <button className="element__delete" type="button" aria-label="Удалить" onClick={props.isOpen}></button>
            <img className="element__photo" src={props.card.link} alt="Фото" onClick={handleClick}></img>
            <div className="element__wrap">
                <h2 className="element__title">{props.card.name}</h2>
                <button className="element__like" type="button" aria-label="Сердечко"></button>
                <p className="element__amount">{props.card.likes.length}</p>
            </div>
        </article>
    );
}

export default Card;
