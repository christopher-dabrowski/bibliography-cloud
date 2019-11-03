/*global moment, $, bsCustomFileInput, validateField, 
validate, showErrorsForInput, showErrors*/

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
            tooEarly: "^Rok musi być co powyżej 1900",
            latest: () => { return moment().format("YYYY-MM-DD"); },
            tooLate: "^Ten dzień jeszcze nie miał miejsca!"
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
            tooShort: "^Login musi mieć co najmniej %{count} znaki",
            maximum: 12,
            tooLong: "^Login musim mieć co najwyżej %{count} znaków"
        },
        // loginValidator: true
    },
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
    },
    agreement: {
        presence: { message: "^" }
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
        if (input.name === "login")
            input.addEventListener("change", function (ev) {
                validateLogin(form, ev.target);
            });
        else
            input.addEventListener("change", function (ev) {
                validateField(form, ev.target);
            });
    }

    // Revalidate pesel on sex change
    const sexRadio = document.querySelectorAll("#femaleRadioButton, #maleRadioButton");
    for (const radio of sexRadio) {
        // eslint-disable-next-line no-unused-vars
        radio.addEventListener("change", function (ev) {
            const peselInput = document.getElementById("pesel");
            if (peselInput.value)
                validateField(form, peselInput);
        });
    }
});

function validateLogin(form, field) {
    const errors = validate(form, constraints) || {};

    asyncIsLoginFree(field.value).then((result) => {
        if (!result) {
            const message = "Podany login jest zajęty";
            if (errors.login === undefined)
                errors.login = [];
            // For some reason append() doesn't work here
            errors.login[errors.login.length] = message;
        }

        showErrorsForInput(field, errors[field.name] || null);
    }).catch((error) => {
        // Ignore login check
        console.error(error);
        showErrorsForInput(field, errors[field.name] || null);
    });
}

function handleFormSubmit(form) {
    // validate the form against the constraints
    let errors = validate(form, constraints);

    const finish = () => {
        // then we update the form to reflect the results
        showErrors(form, errors || {});
        if (!errors) {
            document.getElementById("form").submit();
        }
        else {
            setTimeout(() => { alert("Niektóre pola zawierają błędy"); }, 30);
        }
    };

    const loginInput = document.getElementById("loginInput");
    asyncIsLoginFree(loginInput.value).then((result) => {
        const message = result ? "" : "Podany login jest zajęty";
        if (result !== "") {
            if (errors.login === undefined)
                errors.login = [];
            // For some reason append() doesn't work here
            errors.login[errors.login.length] = message;
        }
    }).catch((error) => {
        // Ignore login check
        console.error("Login check failed");
        console.error(error);
    }).finally(() => {
        finish();
    });

}

// Check if login is free
function asyncIsLoginFree(login) {
    return new Promise((resolve, reject) => {
        const url = `https://pi.iem.pw.edu.pl/user/${login}`;
        var request = new XMLHttpRequest();
        request.open("GET", url);

        request.onload = function () {
            if (request.status == 404) {
                // User not found so login is free
                console.log("Please ignore this 404 error");
                resolve(true);
            }
            else if (request.status === 200) {
                // Login is taken
                resolve(false);
            } else {
                reject(Error(`Unable to verify user; error code:${request.statusText}`));
            }
        };
        request.onerror = function () {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(Error("There was a network error."));
        };

        request.send();
    });
}