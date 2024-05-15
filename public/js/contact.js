(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let form = document.querySelector("#contact-form");

  document
    .querySelector("#contact-form-button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let formValid = true;
      if (!form.checkValidity()) {
        formValid = false;
      }
      form.classList.add("was-validated");
      if (formValid) {
        sendTheEmail();
      }
    });
  function sendTheEmail() {
    console.log("Thank you for clicking.");
    let firstName = document.querySelector("#first-name").value;
    let lastName = document.querySelector("#last-name").value;
    let email = document.querySelector("#mail").value;
    let message = document.querySelector("#msg").value;
    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Email: " + email);
    console.log("Message: " + message);
  }
})();
