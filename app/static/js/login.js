/*global $, bsCustomFileInput, validateField,
validate, showErrorsForInput, showErrors*/

// These are the constraints used to validate the form
const constraints = {
    login: {
        presence: { message: "^Brak loginu" },
        format: {
            pattern: /[a-z]*/,
            message: "^Login może zawierać tylko małe liter od a do z"
        }
    },
    password: {
        presence: { message: "^Brak hasła" },
        // must be at least 8 characters of [A-Za-z]
        format: {
            pattern: /^[A-Za-z]*$/,
            message: "^Hasło musi się składać z wielkich liter od A do Z"
        }
    }
};

$(document).ready(function () {
    // Hook up the form so we can prevent it from being posted
    const form = document.getElementById("form");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });

    // Hook up the inputs to validate on the fly
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([disabled]), select:not([hidden]), select[name]');
    for (const input of inputs) {
        input.addEventListener("change", function (ev) {
            validateField(form, ev.target);
        });
    }
});

function handleFormSubmit(form) {
    // validate the form against the constraints
    const errors = validate(form, constraints);

    showErrors(form, errors || {});
    if (!errors) {
        document.getElementById("form").submit();
    }
}