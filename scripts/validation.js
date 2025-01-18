const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formElem, inputElem, errorMessage, config) => {
  const errorMessElem = formElem.querySelector(`#${inputElem.id}-error`);
  errorMessElem.textContent = errorMessage;
  inputElem.classList.add(config.inputErrorClass);
};

const hideInputError = (formElem, inputElem, config) => {
  const errorMessElem = document.querySelector(`#${inputElem.id}-error`);
  errorMessElem.textContent = "";
  inputElem.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElem, inputElem, config) => {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, config);
  } else {
    hideInputError(formElem, inputElem, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElem, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElem, config);
  } else {
    buttonElem.disabled = false;
    buttonElem.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonElem, config) => {
  buttonElem.disabled = true;
  buttonElem.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formElem, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElem, input, config);
  });
};

const setEventListeners = (formElem, config) => {
  const inputList = Array.from(formElem.querySelectorAll(config.inputSelector));
  const buttonElement = formElem.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElem, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElem) => {
    setEventListeners(formElem, config);
  });
};
enableValidation(settings);
