const formSentButton = document.getElementById('form-sent-button');
formSentButton.addEventListener('click', validForm);
function validForm(){
    const nameField = document.getElementById('y_name');
    const name = nameField.value;
    const nameSample = /^[A-z]+$/;
    if (!nameSample.test(name)){
        nameField.style.borderColor = 'red';
        alert('Введите корректное имя!');
        return;
    }
    else nameField.style.borderColor = 'initial';

    const phoneField = document.getElementById('y_phone');
    const phone = phoneField.value;
    const phoneSample = /^\+7(\d){10}$/;
    if (!phoneSample.test(phone)){
        phoneField.style.borderColor = 'red';
        alert('Введите корректный телефон!');
        return;
    }
    else phoneField.style.borderColor = 'initial';

    const emailField = document.getElementById('email');
    const email = emailField.value;
    const emailSample = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    if (!emailSample.test(email)){
        emailField.style.borderColor = 'red';
        alert('Введите корректный E-mail!');
        return;
    }
    else emailField.style.borderColor = 'initial';
}