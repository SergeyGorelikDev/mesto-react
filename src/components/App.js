import '../index.css';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import React, { useState, useEffect } from 'react';

function App() {
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleImageClick() {
    setIsImagePopupOpen(true);
  }

  function handleSelectedCard(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard([]);
  }
  return (
    <>
      <Header />
      <main className="content">
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteImage={handleConfirmClick} onCardClick={handleSelectedCard} />
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonCaption='Cохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
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
        </PopupWithForm>
        <PopupWithForm name="popup_confirm" title="Вы уверены" buttonCaption='Да' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name="add-photo" title="Новое место" buttonCaption='Cохранить' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
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
        </PopupWithForm>
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonCaption='Cохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="popup__field">
            <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="avatar" id="link-input" required></input>
            <span className="popup__input-error" id="link-input-error"></span>
          </label>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}  isOpen={isImagePopupOpen}/>
      </main>
      <Footer />
    </>
  );
}

export default App;