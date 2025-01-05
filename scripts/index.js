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
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editModalProf = document.querySelector("#edit-profile-modal");
const closeEditProfBtn = editModalProf.querySelector(".modal__close-btn");
const editModalInputName = editModalProf.querySelector("#profile-name-input");
const editModalInputDescription = editModalProf.querySelector(
  "#profile-description-input"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
// const editFormElem = editModalProf.querySelector(".modal__form");
const editFormElem = document.forms["edit-profile"];

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const newPostBtn = document.querySelector(".profile__add-btn");
const newCardModal = document.querySelector("#new-card-modal");
const closeCardModal = newCardModal.querySelector(".modal__close-btn");

const newCardModalLinkInput = newCardModal.querySelector(
  "#new-card-link-input"
);
const newCardModalNameInput = newCardModal.querySelector(
  "#new-card-name-input"
);
const cardImage = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
editProfileBtn.addEventListener("click", () => {
  editModalInputName.value = profileName.textContent;
  editModalInputDescription.value = profileDescription.textContent;
  openModal(editModalProf);
});
newPostBtn.addEventListener("click", () => {
  // newCardModalLinkInput.value = cardImage.src;
  // newCardModalNameInput.value = cardTitle.textContent;
  openModal(newCardModal);
});

closeEditProfBtn.addEventListener("click", () => {
  closeModal(editModalProf);
});

closeCardModal.addEventListener("click", () => {
  closeModal(newCardModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElem = cardElement.querySelector(".card__title");
  cardNameElem.textContent = data.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
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

editFormElem.addEventListener("submit", handleEditFormSubmit);
