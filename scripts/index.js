// Функция для создания карточки на основе template
function createCard(data) {
    // Получаем шаблон
    const template = document.getElementById('card-template').content;
    const cardElement = template.querySelector('.card').cloneNode(true);
  
    // Находим элементы карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    // Заполняем карточку данными
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    // Добавляем слушатель для лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Устанавливаем обработчик для удаления карточки
    deleteButton.addEventListener('click', () => {
        const card = deleteButton.closest('.card');
        if (card) {
        card.remove();
        }
    });

    // Открытие поп-апа с картинкой
    cardImage.addEventListener('click', () => {
        popupImage.src = data.link;
        popupImage.alt = data.name;
        openModal(imagePopup);
    });
  
    // Возвращаем готовую карточку
    return cardElement;
  }
  

  
// Получаем список для размещения карточек
const cardList = document.querySelector('.places__list');

// Функция для добавления всех карточек из массива
function renderInitialCards(cards) {
    cards.forEach(cardData => {
        const card = createCard(cardData);
        cardList.append(card);
    });
    }

// Рендерим начальные карточки
renderInitialCards(initialCards);
  


// Получаем поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');

// Функция для открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция для закрытия поп-апа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Находим все кнопки закрытия поп-апов
const closeButtons = document.querySelectorAll('.popup__close');

// Добавляем обработчик для каждой кнопки
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup'); // Находим соответствующий поп-ап
    closeModal(popup); // Закрываем поп-ап
  });
});


// Обработчики для поп-апа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Открытие поп-апа редактирования профиля
function handleEditButtonClick() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

// Сохранение данных из формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
}

// Добавляем обработчики событий
editButton.addEventListener('click', handleEditButtonClick);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);



// Обработчики для поп-апа добавления карточки
const addButton = document.querySelector('.profile__add-button');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

// Открытие поп-апа добавления карточки
function handleAddButtonClick() {
    cardFormElement.reset();
    openModal(cardPopup);
}

// Сохранение данных из формы добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard({
        name: cardNameInput.value,
        link: cardLinkInput.value
    });
    cardList.prepend(newCard);
    closeModal(cardPopup);
}

// Добавляем обработчики событий
addButton.addEventListener('click', handleAddButtonClick);
cardFormElement.addEventListener('submit', handleCardFormSubmit);



// Добавляем анимацию всем поп-апам
function addAnimationToPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
      popup.classList.add('popup_is-animated');
    });
  }
  
// Вызываем функцию добавления анимации при загрузке скрипта
addAnimationToPopups();