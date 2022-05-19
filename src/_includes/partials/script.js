const nav = document.querySelector("nav");
const menuToggler = document.querySelector(".menu-toggler");

menuToggler.onclick = () => {
    nav.classList.toggle("active");
    menuToggler.setAttribute("aria-expanded",
        menuToggler.getAttribute("aria-expanded") === "true" ? "false" : "true");
};