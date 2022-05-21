const nav = document.querySelector("nav");
const menuToggler = document.querySelector(".menu-toggler");
// const menu = document.querySelector("#menu");

menuToggler.onclick = () => {
    const isOpened = nav.classList.toggle("active");
    menuToggler.setAttribute("aria-expanded", isOpened ? "true" : "false");
};