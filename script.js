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
const btnContainer = document.getElementById("btn-container");
const carouselContainer = document.getElementById("thumbnail-container");

// generate thumbnail images
const generateThumbnails = () => {
  imgs.forEach((ele, index) => {
    const img = document.createElement("img");
    img.src = ele.src;
    img.alt = ele.alt;
    img.ariaLabel = ele.alt;
    img.tabIndex = "1";
    img.setAttribute("id", index);
    carouselContainer.appendChild(img);
  });
};

// create large image tag
const createLargeImage = () => {
  const img = document.createElement("img");
  img.src = imgs[0].src;
  img.alt = imgs[0].alt;
  img.ariaLabel = imgs[0].alt;
  img.ariaLive = "polite";
  img.setAttribute("id", "large-img");
  img.setAttribute("class", "large-image");
  img.setAttribute("data-index", "0-l");
  imgContainer.appendChild(img);
};

// Navigation btns
const createNavigationButtons = () => {
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.ariaLabel = "Previous image";
  nextBtn.textContent = ">";
  nextBtn.ariaLabel = "Next image";
  prevBtn.setAttribute("class", "prev-btn");
  nextBtn.setAttribute("class", "next-btn");

  btnContainer.appendChild(prevBtn);
  btnContainer.appendChild(nextBtn);
  return [prevBtn, nextBtn];
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

const handleCarouselKeydown = (ele, index, e) => {
  if (e.code === "Enter") {
    const largeImg = document.getElementById("large-img");
    if (index === parseInt(e.target.id)) {
      largeImg.src = ele.src;
      largeImg.alt = ele.alt;
      largeImg.ariaLabel = ele.alt;
      largeImg.role = "button";
      largeImg.setAttribute("data-index", `${index}-l`);
    }
  }
};

// loop through array, add event listener to carouselContainer
imgs.forEach((ele, index) => {
  carouselContainer.addEventListener("click", (e) => {
    handleCarouselClick(ele, index, e);
  });
  carouselContainer.addEventListener("keydown", (e) => {
    handleCarouselKeydown(ele, index, e);
  });
});

// Get index of large image
const getIndexOfLargeImage = (largeImg) => {
  const hyphenIndex = largeImg.dataset.index.indexOf("-");

  let largeImgIndex = parseInt(
    largeImg.dataset.index.substring(0, hyphenIndex)
  );
  return largeImgIndex;
};

// Change large image
const updateNextLargeImage = (index, element) => {
  const lastIndexOfArr = imgs.length - 1;
  if (index === lastIndexOfArr) {
    const index = 0;
    element.src = imgs[index].src;
    element.alt = imgs[index].alt;
    element.ariaLabel = imgs[index].alt;
    document.getElementById(`${index}`).focus();
    element.setAttribute("data-index", `${index}-l`);
    return;
  }
  index++;
  element.src = imgs[index].src;
  element.alt = imgs[index].alt;
  element.ariaLabel = imgs[index].alt;
  document.getElementById(`${index}`).focus();
  element.setAttribute("data-index", `${index}-l`);
};

const updatePrevLargeImage = (index, element) => {
  const lastIndexOfArr = imgs.length - 1;
  if (index === 0) {
    element.src = imgs[lastIndexOfArr].src;
    element.alt = imgs[lastIndexOfArr].alt;
    element.ariaLabel = imgs[lastIndexOfArr].alt;
    document.getElementById(`${index}`).focus();
    element.setAttribute("data-index", `${lastIndexOfArr}-l`);
    return;
  }
  index--;
  element.src = imgs[index].src;
  element.alt = imgs[index].alt;
  element.ariaLabel = imgs[index].alt;
  document.getElementById(`${index}`).focus();
  element.setAttribute("data-index", `${index}-l`);
};

const handleClickForNextBtn = () => {
  const largeImg = document.getElementById("large-img");
  let largeImgIndex = getIndexOfLargeImage(largeImg);
  updateNextLargeImage(largeImgIndex, largeImg);
};

const handleClickForPrevBtn = () => {
  const largeImg = document.getElementById("large-img");
  let largeImgIndex = getIndexOfLargeImage(largeImg);
  updatePrevLargeImage(largeImgIndex, largeImg);
};

createLargeImage();
generateThumbnails();
const [prevBtn, nextBtn] = createNavigationButtons();

nextBtn.addEventListener("click", handleClickForNextBtn);
prevBtn.addEventListener("click", handleClickForPrevBtn);
