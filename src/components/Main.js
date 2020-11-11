import api from './utils/Api.js';
import Card from './Card.js';
import React, { useState, useEffect } from 'react';

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setuserDescription] = useState('');
    const [userAvatar, setuserAvatar] = useState('');
    const [cards, getCards] = useState([]);

    function getInformation() {
        api.getAllNeededData()
            .then((result) => {
                const [dataFromFirstPromise, dataFromSecondPromise] = result;
                setUserName(dataFromFirstPromise.name);
                setuserDescription(dataFromFirstPromise.about);
                setuserAvatar(dataFromFirstPromise.avatar);
                return dataFromSecondPromise;
            })
            .then((dataFromSecondPromise) => {
                getCards(dataFromSecondPromise);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getInformation({});
    }, []);

    return (
        <>
            <section className="profile">
                <div className="profile__edit-profile">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар"></img>
                    <button className="profile__edit" type="button" aria-label="Редактировать" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((item) => {
                    return (
                        <Card card={item} onCardClick={props.onCardClick} isOpen={props.onDeleteImage} />
                    );
                })}
            </section>
        </>

    );
}

export default Main;