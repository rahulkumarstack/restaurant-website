// =====================================
// AURELLE RESTAURANT
// By Rahul Gupta
// =====================================

// 1. Mobile Navigation

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    ```
const isOpen = navLinks.classList.toggle("open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.textContent = isOpen ? "✕" : "☰";
```

});

// Close mobile menu after clicking a link

navLinks.querySelectorAll("a").forEach(function (link) {

    ```
link.addEventListener("click", function () {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";

});
```

});

// 2. Menu Category Filters

const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(function (button) {

    ```
button.addEventListener("click", function () {

    const selectedCategory = button.dataset.category;

    // Update active button

    filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    // Show matching food cards

    foodCards.forEach(function (card) {

        const cardCategory = card.dataset.category;

        if (
            selectedCategory === "all" ||
            cardCategory === selectedCategory
        ) {

            card.hidden = false;

        } else {

            card.hidden = true;

        }

    });

});
```

});

// 3. Reservation Form

const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

const bookingDate = document.getElementById("bookingDate");
const guestPhone = document.getElementById("guestPhone");

// Prevent selecting a past date

const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

bookingDate.min = localToday;

// Demo form submission

reservationForm.addEventListener("submit", function (event) {

    ```
event.preventDefault();

const name = document.getElementById("guestName").value.trim();
const phone = guestPhone.value.trim();
const date = bookingDate.value;
const guests = document.getElementById("guestCount").value;

// Basic validation

if (name.length < 2) {

    formMessage.textContent =
        "Please enter a valid name.";

    return;

}

if (!/^[6-9][0-9]{9}$/.test(phone)) {

    formMessage.textContent =
        "Please enter a valid 10-digit Indian mobile number.";

    guestPhone.focus();

    return;

}

if (!date || date < localToday) {

    formMessage.textContent =
        "Please select today or a future date.";

    return;

}

// Important: this is a frontend demo only.
// No reservation is sent to a restaurant server.

formMessage.textContent =
    "Thanks, " + name + "! Your demo request is ready for " +
    guests + " guest(s) on " + date +
    ". This is not a confirmed booking.";

reservationForm.reset();

bookingDate.min = localToday;
```

});

// 4. Automatically Update Footer Year

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// 5. Small Mouse Tilt Effect on Desktop Food Cards

const cards = document.querySelectorAll(".food-card");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !reducedMotion
) {

    ```
cards.forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 4;
        const rotateX = ((y / rect.height) - 0.5) * -4;

        card.style.transform =
            "perspective(800px) rotateX(" +
            rotateX + "deg) rotateY(" +
            rotateY + "deg) translateY(-4px)";

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "";

    });

});
```

}
