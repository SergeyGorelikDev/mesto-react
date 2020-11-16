import '../index.css';
import api from './utils/Api.js';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); 
  const [cards, getCards] = useState([]);

  function getAllCards() {
      api.getCardList()
          .then((result) => {
              getCards(result);
          })
          .catch((err) => {
              console.log(err);
          });
  }

  function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard,isLiked) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        getCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  } 

  function handleCardDelete(card) {
      api.deletePhoto(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => {return c._id !== card._id} );
        getCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  } 

  useEffect(() => {
      getAllCards({});
  }, []);

  function getInformation() {
    api.getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInformation({});
  }, []);

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

  function handleSelectedCard(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard([]);
  }

  function handleUpdateUser(paramInf) {
    api.setUserInfo(paramInf)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlace(newPhoto) {
    api.postPhoto(newPhoto)
      .then((newCard) => {
        getCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <main className="content">
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteImage={handleConfirmClick} onCardClick={handleSelectedCard}  cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm name="popup_confirm" title="Вы уверены" buttonCaption='Да' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} /> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen} />
      </main>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;