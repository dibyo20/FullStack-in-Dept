const posts = [
    {
        name: "Aarav Sharma",
        time: "2h",
        img: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
        description: "Sunset vibes"
    },
    {
        name: "Priya Mehta",
        time: "5h",
        img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Coffee break"
    },
    {
        name: "Rohan Verma",
        time: "1h",
        img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        description: "Mountain trip"
    },
    {
        name: "Sneha Kapoor",
        time: "8h",
        img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        description: "Beach day"
    },
    {
        name: "Kabir Singh",
        time: "3h",
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        description: "City lights"
    },
    {
        name: "Ananya Iyer",
        time: "6h",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        description: "Ocean waves"
    },
    {
        name: "Dev Patel",
        time: "4h",
        img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        description: "Night vibes"
    },
    {
        name: "Neha Gupta",
        time: "9h",
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        description: "Chill mode"
    },
    {
        name: "Rahul Jain",
        time: "7h",
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        description: "Nature walk"
    },
    {
        name: "Ishita Roy",
        time: "10h",
        img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        description: "Golden hour"
    },
    {
        name: "Aditya Nair",
        time: "12h",
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        description: "Road trip"
    },
    {
        name: "Karan Malhotra",
        time: "13h",
        img: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
        description: "Workout done"
    },
    {
        name: "Simran Kaur",
        time: "14h",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        description: "Selfie mood"
    },
    {
        name: "Arjun Reddy",
        time: "15h",
        img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        description: "Adventure time"
    },
    {
        name: "Meera Joshi",
        time: "16h",
        img: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
        description: "Sky view"
    },
    {
        name: "Yash Thakur",
        time: "18h",
        img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        description: "Late night"
    },
    {
        name: "Nikita Shah",
        time: "20h",
        img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
        description: "Happy moments"
    },
    {
        name: "Varun Khanna",
        time: "22h",
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        description: "Travel goals"
    },
];

let content = document.querySelector(".content");
content.innerHTML = posts.map((elem, idx) => {
    return `
        <div class="card" key=${idx}>
                <div class="profile">
                    <div class="icon">
                        <i class="fa-solid fa-circle-user"></i>
                    </div>
                    <div>
                        <h4>${elem.name}</h4>
                        <span>${elem.time}</span>
                    </div>
                </div>
                <div class="card-image">
                    <img src="${elem.img}" alt="post">
                    <i class="ri-heart-3-fill liked"></i>
                </div>
                <div class="card-actions">
                    <div class="actions">
                        <i class="fa-regular fa-heart "><span class="likecount">0</span></i>
                        <i class="fa-regular fa-comment "></i>
                        <i class="fa-solid fa-retweet "></i>
                        <i class="fa-solid fa-paper-plane "></i>
                    </div>
                    <div class="save">
                        <i class="fa-regular fa-bookmark "></i>
                    </div>
                </div>
                <div class="card-footer">
                    <strong>${elem.name}</strong> ${elem.description}
                </div>
            </div>
    `;
}).join("");

// posts.forEach((elem, idx) => {
//     let card = document.createElement("div");
//     card.classList.add("card");
//     card.innerHTML = `
//                 <div class="profile">
//                     <div class="icon">
//                         <i class="fa-solid fa-circle-user"></i>
//                     </div>
//                     <div>
//                         <h4>${elem.name}</h4>
//                         <span>${elem.time}</span>
//                     </div>
//                 </div>
//                 <div class="card-image">
//                     <img src="${elem.img}" alt="post">
//                     <i class="ri-heart-3-fill liked"></i>
//                 </div>
//                 <div class="card-actions">
//                     <div class="actions">
//                         <i class="fa-regular fa-heart "><span class="likecount">1</span></i>
//                         <i class="fa-regular fa-comment "></i>
//                         <i class="fa-solid fa-retweet "></i>
//                         <i class="fa-solid fa-paper-plane "></i>
//                     </div>
//                     <div class="save">
//                         <i class="fa-regular fa-bookmark "></i>
//                     </div>
//                 </div>
//                 <div class="card-footer">
//                     <strong>${elem.name}</strong> ${elem.description}
//                 </div>
//     `;
//     console.log(elem, idx);
//     document.body.appendChild(card);
// });

let images = document.querySelectorAll(".card-image");
let arr = new Array(images.length).fill(0);

images.forEach((img, idx) => {
    let likeIcon = img.querySelector(".liked");

    img.addEventListener("dblclick", () => {
        let likecount = document.querySelectorAll(".likecount")[idx]; // This will select the particular post's like count.

        likeIcon.style.opacity = 0.9;
        likeIcon.style.transform = "translate(-15%, -15%) scale(1) rotate(0deg)";
        arr[idx]++;
        likecount.innerHTML = arr[idx];

        setTimeout(() => {
            likeIcon.style.opacity = 0;
            likeIcon.style.transform = "translate(0%, -300%) scale(0) rotate(20deg)";
        }, 700);

        setTimeout(() => {
            likeIcon.style.transform = "translate(0%, 0%) scale(0) rotate(-90deg)";
        }, 900);
    });
});

let likeBtn = document.querySelector(".likeBtn");

likeBtn.addEventListener("click", () => {
    console.table(arr);
})