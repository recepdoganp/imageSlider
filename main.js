const slider = document.querySelector(".slider");
const imageContainers = document.querySelectorAll(".image");
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");

let images = {
  0: "../img/allec-gomes-on-feed-AuucNRZ_yJY-unsplash.jpg",
  1: "../img/dominik-scythe-5q5CAz_bOAg-unsplash.jpg",
  2: "../img/marian-kroell-1xmS2m6HaTI-unsplash.jpg",
  3: "../img/roksolana-zasiadko-3wbxAMUj7sg-unsplash.jpg",
  4: "../img/sergey-pesterev-lGMufbnB87A-unsplash.jpg",
};

const getPicture = async (images) => {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?count=5&orientation=landscape",
    {
      headers: {
        Authorization: "Client-ID jNNI_5opEOSSFLCGocvO7bCtVR89r8TJ81nSaYJ2HR8",
      },
    }
  );
  if (res.ok) {
    const result = await res.json();
    result.forEach((img, index) => {
      images[index] = img.urls.regular;
    });
    // slider.style.background = `url(${result.urls.regular}) no-repeat center center/cover`;
    console.log(result);
  }
  await setImages(images);
};

const setImages = (images) => {
  for (let [img, imgUrl] of Object.entries(images)) {
    imageContainers[
      img
    ].style.background = `url(${imgUrl}) no-repeat center center/cover`;
    imageContainers[img].addEventListener("click", makeActive);
  }
  changeBackground();
};

// add evet listener for clicking on image and making it active
const makeActive = (e) => {
  if (!e.target.classList.value.includes("active")) {
    imageContainers.forEach((img) => {
      if (img.classList.value.includes("active")) {
        img.classList.remove("active");
      }
    });
    e.target.classList.add("active");
    changeBackground();
  }
};

// change slider background
const changeBackground = () => {
  imageContainers.forEach((img) => {
    if (img.classList.value.includes("active")) {
      slider.style.background = img.style.background;
    }
  });
};

const goRight = (e) => {
  let activeElement = document.querySelector(".active");
  if (activeElement.nextElementSibling.classList.value.includes("image")) {
    activeElement.classList.remove("active");
    activeElement.nextElementSibling.classList.add("active");
    console.log("next");
  } else {
    activeElement.classList.remove("active");
    imageContainers[0].classList.add("active");
    console.log("to the beggining");
  }
  changeBackground();
};
const goLeft = (e) => {
  let activeElement = document.querySelector(".active");
  if (activeElement.previousElementSibling.classList.value.includes("image")) {
    activeElement.classList.remove("active");
    activeElement.previousElementSibling.classList.add("active");
    console.log("previous");
  } else {
    activeElement.classList.remove("active");
    imageContainers[4].classList.add("active");
    console.log("to the last");
  }
  changeBackground();
};

rightArrow.addEventListener("click", goRight);
leftArrow.addEventListener("click", goLeft);

document.addEventListener("DOMContentLoaded", getPicture(images));
