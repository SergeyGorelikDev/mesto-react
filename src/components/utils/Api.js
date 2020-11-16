class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getCardList() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then(this._getResponseData);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
            .then(this._getResponseData);
    }

    getAllNeededData() {
        return Promise.all([this.getUserInfo(), this.getCardList()]);
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this._getResponseData);
    }

    setUserAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(this._getResponseData);
    }

    postPhoto({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._getResponseData);
    }

    deletePhoto(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: isLiked ? 'PUT' : 'DELETE',
                headers: this._headers
            })
            .then(this._getResponseData);
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
        'Content-Type': 'application/json'
    }
});
export default api;