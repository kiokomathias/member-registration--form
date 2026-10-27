
// 1. Select all required HTML elements
const form = document.getElementById("memberForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const genderInput = document.getElementById("gender");
const addressInput = document.getElementById("address");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const genderError = document.getElementById("genderError");
const addressError = document.getElementById("addressError");

const successMessage = document.getElementById("successMessage");
const memberList = document.getElementById("memberList");
const memberCount = document.getElementById("memberCount");
const darkModeBtn = document.getElementById("darkModeBtn");

// Log elements to confirm they are found
console.log("Form:", form);
console.log("Inputs:", nameInput, emailInput, phoneInput);
console.log("Select:", genderInput);
console.log("Textarea:", addressInput);
console.log("Errors:", nameError, emailError, phoneError,
    genderError, addressError);
console.log("Success message:", successMessage);
console.log("Member list:", memberList);
console.log("Member counter:", memberCount);
console.log("Dark mode button:", darkModeBtn);

// Group fields with their matching error elements
const fields = [
    { input: nameInput, error: nameError },
    { input: emailInput, error: emailError },
    { input: phoneInput, error: phoneError },
    { input: genderInput, error: genderError },
    { input: addressInput, error: addressError }
];

// 2. Validate each field
function validateField(input, error) {
    const value = input.value.trim();
    let message = "";

    if (value === "") {
        message = "This field is required.";
    } else if (input === nameInput && value.length < 2) {
        message = "Name must have at least 2 characters.";
    } else if (
        input === emailInput &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
        message = "Enter a valid email address.";
    } else if (
        input === phoneInput &&
        !/^\+?[0-9\s()-]{10,16}$/.test(value)
    ) {
        message = "Enter a valid phone number.";
    }

    error.textContent = message;
    input.setAttribute("aria-invalid", String(message !== ""));

    return message === "";
}

// 3. Clear or update errors when the user edits a field
fields.forEach(function (field) {
    field.input.addEventListener("input", function () {
        validateField(field.input, field.error);
    });

    field.input.addEventListener("change", function () {
        validateField(field.input, field.error);
    });
});

// 4. Update the member counter
function updateMemberCount() {
    memberCount.textContent =
        memberList.querySelectorAll("li").length;
}

// 5. Capture form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    fields.forEach(function (field) {
        if (!validateField(field.input, field.error)) {
            isValid = false;
        }
    });

    if (!isValid) {
        successMessage.textContent = "";
        return;
    }

    // 6. Create a new member
    const li = document.createElement("li");
    const details = document.createElement("span");

    details.textContent =
        nameInput.value.trim() + " | " +
        emailInput.value.trim() + " | " +
        phoneInput.value.trim() + " | " +
        genderInput.value + " | " +
        addressInput.value.trim();

    // 7. Create a remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
        li.remove();
        updateMemberCount();
    });

    li.appendChild(details);
    li.appendChild(removeButton);
    memberList.appendChild(li);

    // 8. Update counter and show success
    updateMemberCount();
    successMessage.textContent = "Member registered successfully!";

    // 9. Reset form and clear errors
    form.reset();

    fields.forEach(function (field) {
        field.error.textContent = "";
        field.input.setAttribute("aria-invalid", "false");
    });
});

 darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "Light Mode";
    } else {
        darkModeBtn.textContent = "Dark Mode";
    }
});