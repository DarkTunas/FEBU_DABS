let menu = document.querySelector("#icono-menu");
let navegacion = document.querySelector(".navegacion");



menu.addEventListener("click", function(){
    navegacion.classList.toggle("active");
});

window.onscroll = () => {
    navegacion.classList.remove("active")
}