// These are the constraints used to validate the form
const constraints = {
    email: {
        // Email is required
        presence: true,
        // and must be an email (duh)
        email: true
    }
};

// TODO: Drugie pole na hasło

$(document).ready(function () {
    bsCustomFileInput.init();

    // Hook up the form so we can prevent it from being posted
    var form = document.getElementById("form");
    form.addEventListener("submit", function (ev) {
        // ev.preventDefault();
        // handleFormSubmit(form);
    });

    console.log("Test");

    // Hook up the inputs to validate on the fly
    var inputs = document.querySelectorAll("input, textarea, select")
    for (var i = 0; i < inputs.length; ++i) {
        inputs.item(i).addEventListener("change", function (ev) {
            var errors = validate(form, constraints) || {};
            showErrorsForInput(this, errors[this.name])
        });
    }
});

function handleFormSubmit(form, input) {
    // validate the form against the constraints
    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
        showSuccess();
    }
}

// Recusively finds the closest parent that has the specified class
function closestParent(child, className) {
    if (!child || child == document) {
        return null;
    }
    if (child.classList.contains(className)) {
        return child;
    } else {
        return closestParent(child.parentNode, className);
    }
}

function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    $.each(formGroup.querySelectorAll(".help-block.error"), function (el) {
        el.parentNode.removeChild(el);
    });
}

// Adds the specified error with the following markup
// <p class="help-block error">[message]</p>
function addError(container, message) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = message;
    container.appendChild(block);
}

// Updates the inputs with the validation errors
function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    $.each(form.querySelectorAll("input[name], select[name]"), function (input) {
        // Since the errors can be null if no errors were found we need to handle
        // that
        showErrorsForInput(input, errors && errors[input.name]);
    });
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form-group");
        // Find where the error messages will be insert into
        // , messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
        // we first mark the group has having errors
        formGroup.classList.add("has-error");
        // then we append all the errors
        $.each(errors, function (error) {
            addError(formGroup, error);
        });
    } else {
        // otherwise we simply mark it as success
        formGroup.classList.add("has-success");
    }
}

