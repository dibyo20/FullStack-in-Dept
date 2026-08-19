let btn = document.querySelector(".btn");

btn.addEventListener("click", function () {
    let c1 = Math.floor(Math.random() * 256);
    let c2 = Math.floor(Math.random() * 256);
    let c3 = Math.floor(Math.random() * 256);

    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let div = document.createElement("div");

    div.classList.add("box");
    div.style.backgroundColor = `rgb(${c1},${c2},${c3})`;
    btn.style.backgroundColor = `rgb(${c1},${c2},${c3})`;

    div.style.left = x + "px"; // This sets the left position of the div to x pixels from the left edge of the window.
    div.style.top = y + "px"; // This sets the top position of the div to y pixels from the top edge of the window.

    document.body.appendChild(div);
    console.log(c1, c2, c3);
});