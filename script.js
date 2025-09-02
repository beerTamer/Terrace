document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.querySelector('.header_button');
    const modal = document.getElementById('formModal');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const leftArrow = document.querySelector('.left_arrow');
    const rightArrow = document.querySelector('.right_arrow');
    const cardsContainer = document.querySelector('.cards_container');

    nameInput.addEventListener('input', () => {
        let value = nameInput.value;
        nameInput.value = value.replace(/[^A-Za-zА-Яа-я\s-]/g, '');
    });

    phoneInput.addEventListener('input', () => {
        let value = phoneInput.value.replace(/\D/g, '');
        let formattedValue = '+7';

        if (value.length > 1) {
            formattedValue += ' (' + value.substring(1, 4);
        }
        if (value.length >= 4) {
            formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length >= 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 9) {
            formattedValue += '-' + value.substring(9, 11);
        }

        phoneInput.value = formattedValue;

        if (value.length > 11) {
            phoneInput.value = formattedValue.substring(0, 18); 
        }
    });

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) {
            phoneInput.value = '+7';
        }
    });

    orderButton.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        resetForm();
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        nameError.textContent = '';
        phoneError.textContent = '';
        nameError.style.display = 'none';
        phoneError.style.display = 'none';

        const namePattern = /^[A-Za-zА-Яа-я\s-]{2,}$/;
        if (!namePattern.test(nameInput.value.trim())) {
            nameError.textContent = 'Имя может содержать только буквы, пробелы или дефисы (мин. 2 символа)';
            nameError.style.display = 'block';
            isValid = false;
        }

        const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Введите полный номер телефона в формате +7 (999) 999-99-99';
            phoneError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            console.log('Форма отправлена:', {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim()
            });
            alert('Заявка успешно отправлена!');
            resetForm();
            modal.classList.remove('active');
        }
    });

    const scrollAmount = 390; 
    leftArrow.addEventListener('click', () => {
        cardsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        cardsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    function resetForm() {
        nameInput.value = '';
        phoneInput.value = '+7';
        nameError.textContent = '';
        phoneError.textContent = '';
        nameError.style.display = 'none';
        phoneError.style.display = 'none';
    }
});