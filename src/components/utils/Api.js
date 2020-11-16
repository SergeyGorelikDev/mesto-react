class Api {
    constructor() {
        this.baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-16'
    }
    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getCardList() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                }
            })
            .then(this._getResponseData);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                }
            })
            .then(this._getResponseData);
    }

    setUserInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this._getResponseData);
    }

    setUserAvatar({ avatar }) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(this._getResponseData);
    }

    postPhoto({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._getResponseData);
    }

    deletePhoto(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                'Content-Type': 'application/json'
            }
        });
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
                method: isLiked ? 'PUT' : 'DELETE',
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                }
            })
            .then(this._getResponseData);
    }

}

const api = new Api();

export default api;