export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error:${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });

    // return fetch(`${this._baseUrl}/cards`, {
    //   headers: this._headers,
    // }).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    // return fetch(`${this._baseUrl}/users/me`, {
    //   headers: this._headers,
    // }).then(this._checkResponse);
  }

  editUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });

    // return fetch(`${this._baseUrl}/users/me`, {
    //   method: "PATCH",
    //   headers: this._headers,
    //   body: JSON.stringify({ name, about }),
    // }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });

    // return fetch(`${this._baseUrl}/cards`, {
    //   method: "POST",
    //   headers: this._headers,
    //   body: JSON.stringify({ name, link }),
    // }).then(this._checkResponse);
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });

    // return fetch(`${this._baseUrl}/cards/${id}`, {
    //   method: "DELETE",
    //   headers: this._headers,
    // }).then(this._checkResponse);
  }
  avatarSubmit(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });

    // return fetch(`${this._baseUrl}/users/me/avatar`, {
    //   method: "PATCH",
    //   headers: this._headers,
    //   body: JSON.stringify({ avatar }),
    // }).then(this._checkResponse);
  }
  handleLikeCard(id, isLiked) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });

    // return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    //   method: isLiked ? "DELETE" : "PUT",
    //   headers: this._headers,
    // }).then(this._checkResponse);
  }
}
