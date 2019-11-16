validate.validators.pesel = function (value, options, key, attributes) {
    if (value === null || value === undefined)
        return null;

    const pesel = value;

    if (!pesel.match(/^[0-9]*$/))
        return "^Pesel musi składać się wyłącznie z cyfr";

    if (pesel.length !== 11)
        return "^Pesel musi mieć 11 cyfr";

    const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    const controlNumber = parseInt(pesel.substring(10, 11));
    for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    const sumIsValid = 10 - sum === controlNumber;

    if (!sumIsValid)
        return "^Nieprawidłowa suma kontrolna";

    if (options.sexAttribute) {
        const sex = attributes[options.sexAttribute];
        const sexNumber = parseInt(pesel.substring(10, 11));
        const remider = sex === "M" ? 1 : 0;

        if (sexNumber % 2 !== remider) {
            return "^Nieprawidłowa cyfra płci"
        }
    }

    return null;
};

// Clear formGroup
function resetFormGroup(formGroup) {
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");

    for (const message of formGroup.getElementsByClassName("help-block")) {
        formGroup.removeChild(message);
    }
}

// Adds the specified error with the following markup
// <p class="help-block error">[message]</p>
function addError(container, message) {
    const block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = message;
    container.appendChild(block);
}

// Updates the inputs with the validation errors
function showErrors(form, errors) {
    const inputs = form.querySelectorAll('input:not([type="hidden"]):not([disabled]), select:not([hidden]), select[name]');
    for (const input of inputs) {
        showErrorsForInput(input, errors[input.name])
    }
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
    const formGroup = closestParent(input.parentNode, "form-group");
    resetFormGroup(formGroup);

    if (errors) {
        formGroup.classList.add("has-error");
        // addError(formGroup, errors[0]);
        for (const error of errors) {
            addError(formGroup, error);
        }
    } else {
        formGroup.classList.add("has-success");
    }
}

validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function (value, options) {
        if (typeof(value) === "function")
            value = value();
        return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function (value, options) {
        const format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
    }
});

function validateField(form, field) {
    const errors = validate(form, constraints) || {};
    showErrorsForInput(field, errors[field.name] || null);
}