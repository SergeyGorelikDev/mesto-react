import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from './utils/Api.js';
import Card from './Card.js';
import React, { useState, useEffect } from 'react';

const editProfile =
    <>
        <label className="popup__field">
            <input type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="name" minLength="2" maxLength="40" id="name-input" required></input>
            <span className="popup__input-error" id="name-input-error"></span>
        </label>
        <label className="popup__field">
            <input type="text" placeholder="О себе" className="popup__input popup__input_type_about" name="about" minLength="2" maxLength="200" id="about-input" required></input>
            <span className="popup__input-error" id="about-input-error"></span>
        </label>
    </>

const addPhoto =
    <>
        <label className="popup__field">
            <input type="text" placeholder="Название" className="popup__input popup__input_type_name" name="name" minLength="1" maxLength="30" id="caption-input" required></input>
            <span className="popup__input-error" id="caption-input-error"></span>
        </label>
        <label className="popup__field">
            <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="link" id="link-input" required></input>
            <span className="popup__input-error" id="link-input-error"></span>
        </label>
    </>

const updateAvatar =
    <label className="popup__field">
        <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="avatar" id="link-input" required></input>
        <span className="popup__input-error" id="link-input-error"></span>
    </label>

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
        <main className="content">
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
                {cards.map((item, key) => {
                    return (
                        <article className="element" key={key}>
                            <Card cards={item} onCardClick={props.onCardClick} isOpen={props.onDeleteImage} />
                        </article>
                    );
                })}
            </section>
            <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonCaption='Cохранить' children={editProfile} isOpen={props.isEditProfilePopupOpen} onClose={props.onClose} />
            <PopupWithForm name="popup_confirm" title="Вы уверены" buttonCaption='Да' isOpen={props.isConfirmPopupOpen} onClose={props.onClose} />
            <div className="popup popup_confirm">
                <div className="popup__container">
                    <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
                    <h2 className="popup__header">Вы уверены</h2>
                    <form className="popup__input-form" name="confirm" noValidate>
                        <button className="popup__submit-button" type="submit" aria-label="Удалить">Да</button>
                    </form>
                </div>
            </div>
            <PopupWithForm name="add-photo" title="Новое место" buttonCaption='Cохранить' children={addPhoto} isOpen={props.isAddPlacePopupOpen} onClose={props.onClose} />
            <PopupWithForm name="update-avatar" title="Обновить аватар" buttonCaption='Cохранить' children={updateAvatar} isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose} />
            <ImagePopup onClose={props.onClose} card={props.selectedCard} />
        </main>
    );
}

export default Main;