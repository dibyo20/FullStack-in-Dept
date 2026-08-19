let i = document.querySelector(".icon");
let img = document.querySelector(".img");


img.addEventListener("dblclick", () => {
    console.log("liked");
    i.style.opacity = 0.9;
    i.style.transform = "translate(-15%, -15%) scale(1) rotate(0deg)";

    setTimeout(() => {
        i.style.opacity = 0;
        i.style.transform = "translate(0%, -300%) scale(0) rotate(20deg)";
    }, 700);
    setTimeout(() => {
        i.style.transform = "translate(0%, 0%) scale(0) rotate(-90deg)";
    }, 900);
})