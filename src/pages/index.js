import Api from "../utils/Api.js";

import "./index.css";
import {
  enableValidation,
  settings,
  setEventListeners,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";

// const initialCards = [
//   ,
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },

//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor caffee",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },

//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },

//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },

//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },

//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const openModalList = document.querySelectorAll(".modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editModalProf = document.querySelector("#edit-profile-modal");
const closeButtons = document.querySelectorAll(".modal__close-btn");
const editModalInputName = editModalProf.querySelector("#profile-name-input");
const editModalInputDescription = editModalProf.querySelector(
  "#profile-description-input"
);
const editModalSaveBtn = editModalProf.querySelector(".modal__submit-btn");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const editFormElem = document.forms["edit-profile"];
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const newPostBtn = document.querySelector(".profile__add-btn");
const newCardModal = document.querySelector("#new-card-modal");
const cardLinkInput = newCardModal.querySelector("#new-card-link-input");
const cardNameInput = newCardModal.querySelector("#new-card-name-input");
const cardSubmitBtn = newCardModal.querySelector(".modal__submit-btn");
const newCardFormModal = document.forms["new-card-form"];
const cardPreviewModal = document.querySelector("#preview-modal");
const previewModalImage = cardPreviewModal.querySelector(".modal__image");
const previewModalCaption = cardPreviewModal.querySelector(".modal__caption");

// Delete modal
const deleteCardModal = document.querySelector("#delete-modal");
const deleteForm = deleteCardModal.querySelector(".modal__form");
const deleteCardModalBtn = deleteCardModal.querySelector(".modal__submit-btn");
const cancelCardModalBtn = deleteCardModal.querySelector(
  ".modal__submit-btn_cancel"
);

// Avatar modal

const profileAvatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["avatar-form"];
const avatarSubmitBtn = profileAvatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = profileAvatarModal.querySelector(".modal__close-btn");
const avatarInput = profileAvatarModal.querySelector("#modal-avatar-input");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9cdeb135-122a-4f81-ae44-c5ef338e99f0",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()

  .then(([cards, userData]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleModalEsc);
}
let selectedCard;
let selectedCardId;
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;

  openModal(deleteCardModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const deleteCardModalBtn = evt.submitter;
  setButtonText(deleteCardModalBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then((data) => {
      selectedCard.remove();
      selectedCard = "";
      selectedCardId = "";
      closeModal(deleteCardModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(deleteCardModalBtn, false, "Delete", "Deleting");
    });
}
cancelCardModalBtn.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

function handleModalEsc(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}
editProfileBtn.addEventListener("click", () => {
  editModalInputName.value = profileName.textContent;
  editModalInputDescription.value = profileDescription.textContent;
  resetValidation(
    editFormElem,
    [editModalInputName, editModalInputDescription],
    settings
  );
  openModal(editModalProf);
});

newPostBtn.addEventListener("click", () => {
  openModal(newCardModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

openModalList.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElem = cardElement.querySelector(".card__title");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }
  cardNameElem.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  function handleLikeBtn(evt, id) {
    const isLiked = evt.target.classList.contains("card__like-btn_liked");
    api
      .handleLikeCard(id, isLiked)
      .then(() => {
        evt.target.classList.toggle("card__like-btn_liked");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  cardLikeBtn.addEventListener("click", (evt) => {
    handleLikeBtn(evt, data._id, data.isLiked);
  });

  cardDeleteBtn.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImage.addEventListener("click", () => {
    openModal(cardPreviewModal);

    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
  });

  return cardElement;
}

profileAvatarBtn.addEventListener("click", () => {
  openModal(profileAvatarModal);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const editModalSaveBtn = evt.submitter;
  setButtonText(editModalSaveBtn, true);

  api
    .editUserInfo({
      name: editModalInputName.value,
      about: editModalInputDescription.value,
    })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editModalProf);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(editModalSaveBtn, false);
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardSubmitBtn = evt.submitter;

  setButtonText(cardSubmitBtn, true);
  api
    .addNewCard({ name: cardNameInput.value, link: cardLinkInput.value })
    .then((cardData) => {
      const inputValues = {
        link: cardData.link,
        name: cardData.name,
      };
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);
      closeModal(newCardModal);
      evt.target.reset();
      disableButton(cardSubmitBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(cardSubmitBtn, false);
    });
}
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const avatarSubmitBtn = evt.submitter;

  setButtonText(avatarSubmitBtn, true);
  avatarSubmitBtn.disabled = true;

  api
    .avatarSubmit(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      evt.target.reset();
      disableButton(avatarSubmitBtn, settings);
      closeModal(profileAvatarModal);
    })
    .catch((err) => {
      console.error(err);
      avatarSubmitBtn.disabled = false;
    })
    .finally(() => {
      setButtonText(avatarSubmitBtn, false);
    });
}

deleteCardModal.addEventListener("submit", handleDeleteSubmit);
profileAvatarModal.addEventListener("submit", handleAvatarSubmit);

editFormElem.addEventListener("submit", handleEditFormSubmit);
newCardFormModal.addEventListener("submit", handleNewCardSubmit);
enableValidation(settings);
