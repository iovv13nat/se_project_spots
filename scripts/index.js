const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor caffee",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];
const openModalList = document.querySelectorAll(".modal");
console.log(openModalList);
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editModalProf = document.querySelector("#edit-profile-modal");
const closeButtons = document.querySelectorAll(".modal__close-btn");
const editModalInputName = editModalProf.querySelector("#profile-name-input");
const editModalInputDescription = editModalProf.querySelector(
  "#profile-description-input"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
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

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleModalEsc);
}

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
  cardNameElem.textContent = data.name;

  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(cardPreviewModal);

    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
  });

  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalInputName.value;
  profileDescription.textContent = editModalInputDescription.value;
  closeModal(editModalProf);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { link: cardLinkInput.value, name: cardNameInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);

  closeModal(newCardModal);
}

editFormElem.addEventListener("submit", handleEditFormSubmit);
newCardFormModal.addEventListener("submit", handleNewCardSubmit);
