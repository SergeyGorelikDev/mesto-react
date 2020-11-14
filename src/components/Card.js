import React, { useContext } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function Card(props) {
    const CurrentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === CurrentUser._id;
    const isLiked = props.card.likes.some(i => i._id === CurrentUser._id);
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
    );

    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="element" key={props.card._id}>
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
            <img className="element__photo" src={props.card.link} alt="Фото" onClick={handleClick}></img>
            <div className="element__wrap">
                <h2 className="element__title">{props.card.name}</h2>
                <button className={cardLikeButtonClassName} type="button" aria-label="Сердечко" onClick= {handleLikeClick}></button>
                <p className="element__amount">{props.card.likes.length}</p>
            </div>
        </article>
    );
}

export default Card;
