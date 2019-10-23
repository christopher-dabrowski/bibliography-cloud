let tmp; //Variable for testing 
// TODO: Remove tmp

validate.validators.pesel = function(value, options, key, attributes) {
    console.log(value);
    console.log(options);
    if (attributes.sex !== undefined) {
        console.log("Jest płeć");
        console.log(attributes.sex);
    }
    if (attributes.sex == 'M') {
        console.log("hhh");
        return "^Ok";
    }
    else {
        console.log("nach");
        return null;
    }

    return attributes.sex != 'F' ? null : 23;
    return "^is totally wrong";
  };

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
    lastname: {
        presence: {message: "^Nazwisko jest wymagane"},
        format: {
            // Last name must begin with [A-Z] or a Polish character, followed by at least one lowercase [a-z] or a Polish character
            pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/,
            message: "^Nazwisko musi zaczynać się wielką literą, po które wystąpią małe litery"
            }
    },
    birthdate: {
        presence: {message: "^Data urodzin jest wymagana"},
        date: {
            earliest: "1900-01-01",
            tooEarly: "^Rok musi być co powyżej 1900"
        }
    },
    email: {
        // Email is required
        presence: {message : "^Email jest wymagany"},
        // and must be an email (duh)
        email: {message: "^Nieprawidłowy format"}
    },
    login: {
        presence: {message : "^Login jest wymagany"},
        format: {
            pattern: /[a-z]*/,
            message: "^Login może zawierać tylko małe liter od a do z"
        },
        length: {
            minimum: 3,
            tooShort: "^Login musi mieć co najmniej %{count} znaków",
            maximum: 12,
            tooLong: "^Login musim mieć co najwyżej %{count} znaków"
        }
    },
    // TODO: Validate login
    password: {
        presence: {message: "^Hasło jest wymagane"},
        // must be at least 8 characters of [A-Za-z]
        format: {
            pattern: /^[A-Za-z]*$/,
            message: "^Hasło musi się składać z wielkich liter od A do Z"
        },
        length: {
            minimum: 8,
            tooShort: "^Hasło musi mieć co najmniej %{count} znaków",
        }
    },
    passwordConformation: {
        presence: {message: "^Potwierdzenie hasła jest wymagane"},
        equality: {
            attribute: "password",
            message: "^hasła nie są takie same"
        }
    },
    pesel: {
        pesel: {
            aa: "mma",
            message: "^hej"
        }
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

    // Don't submit form on enter
    form.onkeypress = (ev) => {
        if (ev.key == "Enter") 
            ev.preventDefault();
    };

    // Hook up the inputs to validate on the fly
    const inputs = document.querySelectorAll("input, textarea, select");
    for (const input of inputs) {
        input.addEventListener("change", function (ev) {
            validateField(ev.target);
        });
    }

    // Revalidate pesel on sex change
    const sexRadio = document.querySelectorAll("#femaleRadioButton, #maleRadioButton");
    for (const radio of sexRadio) {
        radio.addEventListener("change", function (ev) {
            validateField(document.getElementById("pesel"));
        });
    }
});

function validateField(field) {
    const form = document.getElementById("form");
    const errors = validate(form, constraints) || {};
    showErrorsForInput(field, errors[field.name] || null);
}

function handleFormSubmit(form, input) {
    // validate the form against the constraints
    const errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
        document.getElementById("form").submit();
    }
    else {
        setTimeout(() => {alert("Niektóre pola zawierają błędy")}, 10);
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

// Updates the inputs with the validation errors
function showErrors(form, errors) {
    const inputs = form.querySelectorAll("input[name], select[name]");
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
    parse: function(value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
});