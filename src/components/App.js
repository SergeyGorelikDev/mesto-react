import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import React, { useState, useEffect } from 'react';

function App() {
  const [selectedCard, handleCardClick] = useState([]);
  let isEditAvatarPopupOpen = false;
  let isEditProfilePopupOpen = false;
  let isAddPlacePopupOpen = false;
  
  function handleEditAvatarClick() {
    isEditAvatarPopupOpen = true;
    const popupAvatar = document.querySelector('.popup_update-avatar');
    popupAvatar.classList.add('popup_opened');
  }
  function handleEditProfileClick() {
    isEditProfilePopupOpen = true;
    const popupProfile = document.querySelector('.popup_edit-profile');
    popupProfile.classList.add('popup_opened');
  }
  function handleAddPlaceClick() {
    isAddPlacePopupOpen = true;
    const popupPlace = document.querySelector('.popup_add-photo');
    popupPlace.classList.add('popup_opened');
  }
  function handleClick(card) {
    handleCardClick(card);
  }

  function closeAllPopups() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    handleCardClick([]);
  }
  return (
    <div className="App">
     <Header />
     <Main onEditProfile = {handleEditProfileClick}  onAddPlace = {handleAddPlaceClick} onEditAvatar = {handleEditAvatarClick} isEditProfilePopupOpen = {isEditAvatarPopupOpen} isAddPlacePopupOpen = {isAddPlacePopupOpen} isEditAvatarPopupOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onCardClick = {handleClick} selectedCard = {selectedCard}/>
     <Footer />
    </div>
  );
}

export default App;