let tmp; //Variable for testing 

// These are the constraints used to validate the form
const constraints = {
    firstname: {
        // ^ at the start of the message prevents auto insert of field name
        presence: {message: "^Imię jest wymagane"},
        format: {
            // Name must begin with [A-Z] or a Polish character, followed by at least one lowercase [a-z] or a Polish character
            pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/,
            message: "^Imię musi zaczynać się wielką literą, po które wystąpią małe litery"
            }
    },
    email: {
        // Email is required
        presence: {message : "^Email jest wymagany"},
        // and must be an email (duh)
        // email: true
    }
};

$(document).ready(function () {
    bsCustomFileInput.init(); // Make file input field responsive 

    // Hook up the form so we can prevent it from being posted
    const form = document.getElementById("form");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });

    // Hook up the inputs to validate on the fly
    var inputs = document.querySelectorAll("input, textarea, select")
    for (var i = 0; i < inputs.length; ++i) {
        inputs.item(i).addEventListener("change", function (ev) {
            console.log(validate(form, constraints))
            var errors = validate(form, constraints) || {};
            showErrorsForInput(ev.target, errors[ev.target.name])
        });
    }
});

function handleFormSubmit(form, input) {
    // validate the form against the constraints
    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
        document.getElementById("form").submit();
    }
}

// Recursively finds the closest parent that has the specified class
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

// Clear formGroup
function resetFormGroup(formGroup) {
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    
    for(const message of formGroup.getElementsByClassName("help-block")) {
        formGroup.removeChild(message);
    }
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

// TODO: Get how showErrors() work
// Updates the inputs with the validation errors
function showErrors(form, errors) {
    return; 
    // TODO: Show errors

    // We loop through all the inputs and show the errors for that input
    $.each(form.querySelectorAll("input[name], select[name]"), function (input) {
        // Since the errors can be null if no errors were found we need to handle
        // that
        showErrorsForInput(input, errors && errors[input.name]);
    });
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
    const formGroup = closestParent(input.parentNode, "form-group");
    resetFormGroup(formGroup);
    
    if (errors) {
        formGroup.classList.add("has-error");
        for (const error of errors) {
            addError(formGroup, error);
        }
    } else {
        formGroup.classList.add("has-success");
    }
}

