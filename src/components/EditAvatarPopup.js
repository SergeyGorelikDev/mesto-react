import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatar = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value
    });
  } 
  
  return (
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonCaption='Cохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
          <label className="popup__field">
            <input ref={avatar} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="avatar" id="link-input" required></input>
            <span className="popup__input-error" id="link-input-error"></span>
          </label>
        </PopupWithForm>
  );
}

export default EditAvatarPopup;