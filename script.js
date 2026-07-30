var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, element) {
  // Remove active class from all tabs
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  // Hide all tab contents
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  // Activate clicked tab
  element.classList.add("active-link");

  document.getElementById(tabname).classList.add("active-tab");
}

// ================= MOBILE NAVBAR =================

function openMenu() {
  var navMenu = document.getElementById("nav-menu");

  navMenu.classList.toggle("show-menu");
}

// ================= CLOSE MENU AFTER CLICK =================

var navLinks = document.querySelectorAll("#nav-menu a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("nav-menu").classList.remove("show-menu");
  });
});

// ================= GOOGLE SHEET CONTACT FORM =================

const scriptURL =
  "https://script.google.com/macros/s/AKfycbw4DY-BrjGdTq04khyUYeOHIRfrGzwmSD1aHUAFb8jYdipJSFa5vzXbbS5m4_-jieHw/exec";

const form = document.querySelector(".contact-right form");

form.addEventListener("submit", async function (event) {
  // Prevent page refresh
  event.preventDefault();

  // Get submit button
  const submitButton = form.querySelector("button");

  // Change button text
  submitButton.disabled = true;
  submitButton.innerText = "Sending...";

  // Get form values
  const formData = {
    name: form.querySelector('input[name="Name"]').value,

    email: form.querySelector('input[name="Email"]').value,

    message: form.querySelector('textarea[name="Message"]').value,
  };

  try {
    // Send data to Google Apps Script
    await fetch(scriptURL, {
      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },

      body: JSON.stringify(formData),
    });

    // Success message
    alert("Message sent successfully!");

    // Clear form
    form.reset();
  } catch (error) {
    console.error("Error:", error);

    alert("Something went wrong. Please try again.");
  }

  // Restore button
  submitButton.disabled = false;

  submitButton.innerText = "Send Message";
});
