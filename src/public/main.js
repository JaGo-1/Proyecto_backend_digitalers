/*NAV BACKGROUND*/

const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.style.background = "rgb(195,0,188)";
  } else {
    header.style.background = "transparent";
  }
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*MENU SHOW*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*MENU HIDDEN*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*====================================================== */
window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100);
});

//platListTable.hbs delete button
document.addEventListener("DOMContentLoaded", function () {
  var deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var itemId = button.getAttribute("data-id");
      var deleteUrl = "/delete/" + itemId;
      window.location.href = deleteUrl;
    });
  });
});

//platListTable.hbs edit button
document.addEventListener("DOMContentLoaded", function () {
  var deleteButtons = document.querySelectorAll(".update-button");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var itemId = button.getAttribute("data-id");
      var updateUrl = "/update/" + itemId;
      window.location.href = updateUrl;
    });
  });
});

//Register

async function registerUser() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  emailError.textContent = "";

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById("username").value,
        email: emailInput.value,
        password: document.getElementById("password").value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      emailError.textContent = data.message;
    } else {
      console.log("Usuario registrado con éxito");
      window.location.href = data.redirectUrl;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

//LOGIN

async function loginUser() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      console.log("Inicio de sesión exitoso");
      window.location.href = data.redirectUrl;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}
