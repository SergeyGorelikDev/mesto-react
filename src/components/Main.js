import api from './utils/Api.js';
import Card from './Card.js';
import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function Main(props) {
    const CurrentUser = useContext(CurrentUserContext);
    const [cards, getCards] = useState([]);

    function getAllCards() {
        api.getInitialCards()
            .then((result) => {
                getCards(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === CurrentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard,isLiked) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          getCards(newCards);
        });
    } 

    function handleCardDelete(card) {
        api.deletePhoto(card._id).then((newCard) => {
          const newCards = cards.filter((c) => {return c._id !== card._id} );
          getCards(newCards);
        });
    } 

    useEffect(() => {
        getAllCards({});
    }, []);

    return (
        <>
            <section className="profile">
                <div className="profile__edit-profile">
                    <img className="profile__avatar" src={CurrentUser.avatar} alt="Аватар"></img>
                    <button className="profile__edit" type="button" aria-label="Редактировать" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{CurrentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    <p className="profile__subtitle">{CurrentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((item) => {
                    return (
                        <CurrentUserContext.Provider value={CurrentUser} key={item._id}>
                            <Card card={item} onCardClick={props.onCardClick} isOpen={props.onDeleteImage} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                        </CurrentUserContext.Provider>
                    );
                })}
            </section>
        </>

    );
}

export default Main;