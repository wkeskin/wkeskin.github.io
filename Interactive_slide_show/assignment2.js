"use strict";

window.addEventListener("load", createLightbox);

function createLightbox(){
   // Lightbox Container
   let lightbox = document.getElementById("lightbox");

   // Parts of the Lightbox
   let title = document.createElement("h1");
   let counter = document.createElement("div");
   let prev = document.createElement("div");
   let next = document.createElement("div");
   let play = document.createElement("div");
   let images = document.createElement("div");

   //creating parable
   let lightboxElements ={
      "lbTitle" : title,
      "lbCounter" : counter,
      "lbPrev" : prev,
      "lbNext" : next,
      "lbPlay" : play,
      "lbImages" : images,
   }

   for (let key in lightboxElements){
      lightbox.appendChild(lightboxElements[key]);
      lightboxElements[key].id = key;
   }

   for (let i=0; i < imgCount; i++){
      let img = document.createElement("img");
      img.src = imgFiles[i];
      img.alt = imgCaptions[i];
      img.onclick = createOverlay;
      images.appendChild(img);
   }

   title.textContent = lightboxTitle;

   let currentImg = 1;
      counter.textContent = `${currentImg} / ${imgCount}`;
      prev.innerHTML = "&#9664;";
      prev.onclick = showPrev;
      next.innerHTML = "&#9654;";
      next.onclick = showNext;
      play.innerHTML = "&#9199;"
      let intervalId;
      play.onclick = function(){
         if (intervalId){
            window.clearInterval(intervalId);
            intervalId = undefined;
         } else {
            showNext();
            intervalId = setInterval(showNext, 1500);
         }        
      }
      
   function showNext(){
         images.appendChild(images.firstElementChild);
         (currentImg < imgCount) ? currentImg++: currentImg = 1;
         counter.textContent = `${currentImg} / ${imgCount}`;
   }

   function showPrev() {
      images.insertBefore(images.lastElementChild, images.firstElementChild);
      (currentImg > 1) ? currentImg--: currentImg = imgCount;
      counter.textContent = `${currentImg} / ${imgCount}`;
   }

   // Image viewer
   function createOverlay(){
      let overlay = document.createElement("div");
      overlay.id = "lbOverlay";

      let figure = document.createElement("figure");
      overlay.appendChild(figure);

      let overlayImg = this.cloneNode("true");
      figure.appendChild(overlayImg);

      let figCaption = document.createElement("figcaption");
      figCaption.textContent = overlayImg.alt;
      figure.appendChild(figCaption);


      // Next and Previous buttons
    let prevButton = document.createElement("div");
    prevButton.id = "lbPrevButton";
    prevButton.innerHTML = "&#9664;";
    //prevButton.onclick = showPrevImage;
    overlay.appendChild(prevButton);

    let nextButton = document.createElement("div");
    nextButton.id = "lbNextButton";
    nextButton.innerHTML = "&#9654;";
    //nextButton.onclick = showNextImage;
    overlay.appendChild(nextButton);

   

      let closeButton = document.createElement("div");
      closeButton.id = "lbOverlayClose";
      closeButton.innerHTML = "&times;";
      closeButton.onclick = function(){
         document.body.removeChild(overlay);
      }
      overlay.appendChild(closeButton);

      // PART OF FAVOURITE IMAGE LIST
            //Favourite button
            let addFavorite = document.createElement("div");
            addFavorite.id = "addFav";
            addFavorite.textContent = "\u2665 Add to Favourite";
            addFavorite.onclick = favList;
            overlay.appendChild(addFavorite);
            //Favorite 
            let favoriteList = document.createElement("div");
            favoriteList.id = "favoriteList";
            favoriteList.innerText ="Favorite Images"
            overlay.appendChild(favoriteList);

            //New Array
            const favoriteImages = [];

            //Favorite button function
            function favList(){
               if (favoriteImages.length >= 5) {
               alert("You can only add up to 5 favorites. Please remove one first.");
                return;
               }

               const image = this.cloneNode("true");
               favList.appendChild(image)
               const removeBtn = document.createElement('button');
               removeBtn.classList.add('remove-btn');
               removeBtn.textContent = 'Remove';
               removeBtn.addEventListener('click', removeFromFavorites);

               const favoriteItem = document.createElement('div');
               favoriteItem.classList.add('favorite');
               favoriteItem.appendChild(image);
               favoriteItem.appendChild(removeBtn);

               favorites.appendChild(favoriteItem);
               favoriteImages.push(favoriteItem);
            }

      document.body.appendChild(overlay);
      
   }
}
