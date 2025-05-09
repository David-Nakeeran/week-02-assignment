const imgs = [
  {
    src: "./assets/images/landscape1.png",
    alt: "Beautiful image of iceberg",
  },
  {
    src: "./assets/images/landscape2.jpg",
    alt: "Beautiful image of the nights sky",
  },
  {
    src: "./assets/images/landscape3.jpg",
    alt: "Overlooking lake with backdrop of snowy mountains",
  },
  {
    src: "./assets/images/landscape4.jpg",
    alt: "Iceberg with backdrop of mounts in the distance",
  },
  {
    src: "./assets/images/landscape5.jpg",
    alt: "Close up of iceberg, that looks like it's standing out of the water",
  },
  {
    src: "./assets/images/landscape6.jpg",
    alt: "Block of ice that has a bluey tinge of colour",
  },
];

const imgContainer = document.getElementById("img-container");
const carouselContainer = document.getElementById("thumbnail-container");

// generate thumbnail images
const generateThumbnails = () => {
  imgs.forEach((ele, index) => {
    const img = document.createElement("img");
    img.src = ele.src;
    img.alt = ele.alt;
    img.ariaLabel = ele.alt;
    img.tabIndex = "0";
    img.setAttribute("id", index);
    carouselContainer.appendChild(img);
  });
};

// create large image tag
const createLargeImage = () => {
  const img = document.createElement("img");
  const backImg = imgs[0].src;
  img.src = imgs[0].src;
  img.alt = imgs[0].alt;
  img.ariaLabel = imgs[0].alt;
  img.setAttribute("id", "large-img");
  img.setAttribute("class", "large-image");
  img.setAttribute("data-index", "0-l");
  imgContainer.appendChild(img);
};

// callbacks
const handleCarouselClick = (ele, index, e) => {
  const largeImg = document.getElementById("large-img");
  if (index === parseInt(e.target.id)) {
    largeImg.src = ele.src;
    largeImg.alt = ele.alt;
    largeImg.ariaLabel = ele.alt;
    largeImg.role = "button";
    largeImg.setAttribute("data-index", `${index}-l`);
  }
};

// loop through array, add event listener to carouselContainer
imgs.forEach((ele, index) => {
  carouselContainer.addEventListener("click", (e) => {
    handleCarouselClick(ele, index, e);
  });
});

createLargeImage();
generateThumbnails();
