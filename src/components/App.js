import '../index.css';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
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

function App() {
  const [selectedCard, handleCardClick] = useState([]);
  const [isEditAvatarPopupOpen, editAvatar] = useState(false);
  const [isEditProfilePopupOpen, editProfile] = useState(false);
  const [isAddPlacePopupOpen, addPlace] = useState(false);
  const [isConfirmPopupOpen, confirmDelete] = useState(false);

  function handleEditAvatarClick() {
    editAvatar(true);
  }

  function handleEditProfileClick() {
    editProfile(true);
  }

  function handleAddPlaceClick() {
    addPlace(true);
  }

  function handleConfirmClick() {
    confirmDelete(true);
  }

  function handleClick(card) {
    handleCardClick(card);
  }

  function closeAllPopups() {
    editAvatar(false);
    editProfile(false);
    addPlace(false);
    confirmDelete(false);
    handleCardClick([]);
  }
  return (
    <>
      <Header />
      <main className="content">
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteImage={handleConfirmClick} onCardClick={handleClick} />
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonCaption='Cохранить' children={editProfile} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name="popup_confirm" title="Вы уверены" buttonCaption='Да' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name="add-photo" title="Новое место" buttonCaption='Cохранить' children={addPhoto} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonCaption='Cохранить' children={updateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </main>
      <Footer />
    </>
  );
}

export default App;