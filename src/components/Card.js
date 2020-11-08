function Card(props) { 
    function handleClick() {
        props.onCardClick(props.cards);
      }  
    return (
        <>
            <button className="element__delete" type="button" aria-label="Удалить"></button>
            <img className="element__photo" src={props.cards.link} alt="Фото" onClick = {handleClick}></img>
            <div className="element__wrap">
                <h2 className="element__title">{props.cards.name}</h2>
                <button className="element__like" type="button" aria-label="Сердечко"></button>
                <p className="element__amount">{props.cards.likes.length}</p>
            </div>
        </>
    );
}

export default Card;
