let h = document.querySelector(".header");
let btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
    h.innerHTML = "Changing..";
    setTimeout(function () {
        h.innerHTML = "I am Srijan";
    }, 2000)
})