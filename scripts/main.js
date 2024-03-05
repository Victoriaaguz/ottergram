"use strict";

const detailImageSelector = `[data-image-role="target"]`;
const detailTitleSelector = `[data-image-role="title"]`;
const detailFrameSelector = `[data-image-role="frame"]`;
const thumbnailLinkSelector = `[data-image-role="trigger"]`;

// add comments
const preButtonSelector = '[data-action="prev"]';
const nextButtonSelector = '[data-action="next"]';

const hiddenDetailClass = "hidden-detail";
const tinyEffectClass = "is-tiny";
const disabledButtonClass = "disabled";

// add comments
const thumbnails = document.querySelectorAll(thumbnailLinkSelector);
let currentIndex = 0; 

function setDetails(imageURL, titleText) {
  const detailImage = document.querySelector(detailImageSelector);
  detailImage.setAttribute("src", imageURL);

  const detailTitle = document.querySelector(detailTitleSelector);
  detailTitle.textContent = titleText;
}

function imageFromThumbnail(thumbnail) {
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumbnail(thumbnail) {
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumbnail(thumbnail) {
  setDetails(imageFromThumbnail(thumbnail), titleFromThumbnail(thumbnail));
}

function addThumbnailClickHandler(thumbnail) {
  thumbnail.addEventListener("click", (event) => {
    event.preventDefault();
    setDetailsFromThumbnail(thumbnail);
    showDetails();
  });
}

function hideDetails() {
  document.body.classList.add(hiddenDetailClass);
}

function showDetails() {
  document.body.classList.remove(hiddenDetailClass);

  const frame = document.querySelector(detailFrameSelector);
  frame.classList.add(tinyEffectClass);
  setTimeout(() => frame.classList.remove(tinyEffectClass), 50);
}
// Function to toggle button state
function toggleButtonState(){
  const prevButton = document.querySelector(prevButtonSelector);
  const nextButton = document.querySelector(nextButtonSelector);

  if (currentIndex == 0){
    prevButton.classList.add(disabledButtonClass);
  }else {
    prevButton.classList.remove(disabledButtonClass);
  }
  
  if (currentIndex == thumbnails.length -1 ) {
    nextButton.classList.add(disabledButtonClass);
  } else{
    nextButton.classList.remove(disabledButtonClass);
  }
}

document
  .querySelectorAll(thumbnailLinkSelector)
  .forEach(addThumbnailClickHandler);
// add click handler to thumbnail
thumbnails.forEach((thumbnail, index) =>
 addThumbnailClickHandler(thumbnail, index)
);
// handle thumbnail click
document.querySelector(preButtonSelector).addEventListener("click", (event) =>{
 event.preventDefault();
 if (currentIndex > 0) {
  currentIndex --;
  setDetailsFromThumbnail(thumbnails[currentIndex]);
  toggleButtonState();
 }
});
 // function with event parameter
document.querySelector(nextButtonSelector).addEventListener("click", (event) =>{
 event.preventDefault();
 if  (currentIndex < thumbnails.length -1) {
  currentIndex ++ ;
  setDetailsFromThumbnail(thumbnails[currentIndex]);
  toggleButtonState();
 }
});

document.body.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    hideDetails();
  }
});