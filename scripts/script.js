let tmp; //Variable for testing 
// TODO: Remove tmp

// These are the constraints used to validate the form
const constraints = {
    firstname: {
        // ^ at the start of the message prevents auto insert of field name
        presence: { message: "^Imię jest wymagane" },
        format: {
            // Name must begin with [A-Z] or a Polish character, followed by at least one lowercase [a-z] or a Polish character
            pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/,
            message: "^Imię musi zaczynać się wielką literą, po które wystąpią małe litery"
        }
    },
    lastname: {
        presence: { message: "^Nazwisko jest wymagane" },
        format: {
            // Last name must begin with [A-Z] or a Polish character, followed by at least one lowercase [a-z] or a Polish character
            pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/,
            message: "^Nazwisko musi zaczynać się wielką literą, po które wystąpią małe litery"
        }
    },
    birthdate: {
        presence: { message: "^Data urodzin jest wymagana" },
        date: {
            earliest: "1900-01-01",
            tooEarly: "^Rok musi być co powyżej 1900"
        }
    },
    email: {
        // Email is required
        presence: { message: "^Email jest wymagany" },
        // and must be an email (duh)
        email: { message: "^Nieprawidłowy format" }
    },
    login: {
        presence: { message: "^Login jest wymagany" },
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
        presence: { message: "^Hasło jest wymagane" },
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
        presence: { message: "^Potwierdzenie hasła jest wymagane" },
        equality: {
            attribute: "password",
            message: "^hasła nie są takie same"
        }
    },
    pesel: {
        presence: { message: "^Pesel jest wymagany" },
        pesel: {
            sexAttribute: "sex"
        }
    },
    photo: {
        presence: { message: "^Zdjęcie jest wymagane" },
        format: {
            pattern: /^.*\.((jpg)|(png)|(bmp)|(gif))$/,
            message: "^Nieprawidłowy format pliku"
        },
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
            validateField(form, ev.target);
        });
    }

    // Revalidate pesel on sex change
    const sexRadio = document.querySelectorAll("#femaleRadioButton, #maleRadioButton");
    for (const radio of sexRadio) {
        radio.addEventListener("change", function (ev) {
            const peselInput = document.getElementById("pesel");
            if (peselInput.value)
                validateField(form, peselInput);
        });
    }
});

function handleFormSubmit(form, input) {
    // validate the form against the constraints
    const errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
        document.getElementById("form").submit();
    }
    else {
        setTimeout(() => { alert("Niektóre pola zawierają błędy") }, 10);
    }
}