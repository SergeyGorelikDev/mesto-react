import Card from './Card.js';
import React, { useContext } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function Main(props) {
    const CurrentUser = useContext(CurrentUserContext);

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
                {props.cards.map((item) => {
                    return (
                        <CurrentUserContext.Provider value={CurrentUser} key={item._id}>
                            <Card card={item} onCardClick={props.onCardClick} isOpen={props.onDeleteImage} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                        </CurrentUserContext.Provider>
                    );
                })}
            </section>
        </>

    );
}

export default Main;