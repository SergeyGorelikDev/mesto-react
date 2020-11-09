import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import React, { useState, useEffect } from 'react';

function App() {
  const [selectedCard, handleCardClick] = useState([]);
  const [isEditAvatarPopupOpen, editAvatar] = useState(false);
  const [isEditProfilePopupOpen, editProfile] = useState(false);
  const [isAddPlacePopupOpen, addPlace] = useState(false);
  
  function handleEditAvatarClick() {
    editAvatar(true);
  }

  function handleEditProfileClick() {
    editProfile(true);
  }
  function handleAddPlaceClick() {
    addPlace(true);
  }
  function handleClick(card) {
    handleCardClick(card);
  }

  function closeAllPopups() {
    editAvatar(false);
    editProfile(false);
    addPlace(false);
    handleCardClick([]);
  }
  return (
    <div className="App">
     <Header />
     <Main onEditProfile = {handleEditProfileClick}  onAddPlace = {handleAddPlaceClick} onEditAvatar = {handleEditAvatarClick} isEditProfilePopupOpen = {isEditProfilePopupOpen} isAddPlacePopupOpen = {isAddPlacePopupOpen} isEditAvatarPopupOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onCardClick = {handleClick} selectedCard = {selectedCard}/>
     <Footer />
    </div>
  );
}

export default App;