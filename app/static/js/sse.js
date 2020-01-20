const createAllert = (message, category = 'info') => {
    const li = document.createElement('li');
    li.setAttribute('role', 'alert')
    li.classList.add('alert');
    li.classList.add('alert-dismissible');
    li.classList.add('fade');
    li.classList.add('show');
    li.classList.add('mt-2');
    li.classList.add(`alert-${category}`);

    const span = document.createElement('span');
    span.innerText = message;
    li.appendChild(span);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    const closeIcon = document.createElement('span');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.innerHTML = '&times;';

    closeButton.appendChild(closeIcon);
    li.appendChild(closeButton);

    return li;
};

const displayInformation = (message, category = 'info') => {
    const flashList = document.getElementById('flashes');
    flashList.appendChild(createAllert(message, category));
};