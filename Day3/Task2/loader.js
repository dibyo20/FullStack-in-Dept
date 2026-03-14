let btn = document.querySelector(".btn");
let h = document.querySelector(".header");
let innerdiv = document.querySelector(".inner-loader")

let a = 0;
btn.addEventListener("click", function () {
    btn.style.pointerEvents = "none";
    let intervalId = setInterval(function () {
        a++;
        h.innerHTML = a + "%";
        innerdiv.style.width = a + "%";
    }, 30);

    setTimeout(function () {
        clearInterval(intervalId);
        btn.innerHTML = "Downloaded!!!";
        btn.style.opacity = "0.5";
    }, 3000);
});