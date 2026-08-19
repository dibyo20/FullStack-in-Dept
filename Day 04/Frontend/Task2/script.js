let arr = [
    {
        name: "Paris",
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        description: "The city of lights and love, known for its romantic charm.\nHome to the iconic Eiffel Tower and rich art culture."
    },
    {
        name: "New York",
        img: "https://images.unsplash.com/photo-1549921296-3a6b5d4f2f77",
        description: "A fast-paced city that never sleeps.\nFamous for Times Square, skyscrapers, and diverse culture."
    },
    {
        name: "Tokyo",
        img: "https://images.unsplash.com/photo-1505066836043-7c98b68b5f7b",
        description: "A blend of modern technology and ancient traditions.\nKnown for neon lights, sushi, and temples."
    },
    {
        name: "Rome",
        img: "https://images.unsplash.com/photo-1526481280691-7c1f3b4b5b7d",
        description: "A historic city filled with ancient architecture.\nHome to the Colosseum and Roman heritage."
    },
    {
        name: "Dubai",
        img: "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
        description: "A futuristic city in the desert.\nKnown for luxury shopping and the Burj Khalifa."
    },
    {
        name: "London",
        img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
        description: "A historic yet modern capital city.\nFamous for Big Ben, the Thames, and royal heritage."
    },
    {
        name: "Sydney",
        img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
        description: "A coastal city with stunning beaches.\nKnown for the Sydney Opera House and Harbour Bridge."
    },
    {
        name: "Bali",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        description: "A tropical paradise with scenic beauty.\nFamous for beaches, temples, and vibrant culture."
    },
    {
        name: "Istanbul",
        img: "https://images.unsplash.com/photo-1527838832700-5059252407fa",
        description: "A city connecting two continents.\nRich in history, culture, and stunning mosques."
    },
    {
        name: "Cape Town",
        img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        description: "A coastal gem with breathtaking landscapes.\nKnown for Table Mountain and scenic coastlines."
    }
];

arr.forEach((elem, idx) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img class="img" alt="img" src="${elem.img}" />
      <h2>${elem.name}</h2>
      <h3>${elem.description}</h3>
    `;
    console.log(elem, idx);
    document.body.appendChild(card);
});