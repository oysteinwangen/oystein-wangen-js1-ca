const apiKey = "3957450-287d8f08397456bf01b762222";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const photoId = params.get("id");

const url = "https://pixabay.com/api/?key=" + apiKey + "&id=" + photoId;

const detailsContainer = document.querySelector(".details-container");
const htmlTitle = document.querySelector("title");

async function fetchDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    detailsContainer.innerHTML = `<div>
    <img id="full-photo" class="full-photo" src=${details.hits[0].largeImageURL}></img>
    <div class="image-details">
    <div class="image-detail">
    <img src="../media/camera.svg" class="detail-icon">
    <p class="listing-username-text">Taken by: ${details.hits[0].user}</p>
    </div>
    <div class="image-detail">
    <img src="../media/tag.svg" class="detail-icon">
    <p class="listing-username-text">Tags: ${details.hits[0].tags}</p>
    </div>
    <div class="image-detail">
    <img src="../media/eye.svg" class="detail-icon">
    <p class="listing-username-text">Views: ${details.hits[0].views}</p>
    </div>
    <div class="image-detail">
    <img src="../media/heart.svg" class="detail-icon">
    <p class="listing-username-text">Likes: ${details.hits[0].likes}</p>
    </div>
    </div>
    </div>
    `;

    /* LIGHTBOX */
    const image = document.querySelector("#full-photo");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);
    image.addEventListener("click", (e) => {
      lightbox.classList.add("active-lightbox");
      fullPhoto = `<img style="max-width: 95vw; max-height: 95vh" src=${details.hits[0].largeImageURL}></img>`;
      lightbox.innerHTML = fullPhoto;
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) return;
      lightbox.classList.remove("active-lightbox");
    });

    htmlTitle.innerHTML = details.hits[0].user;
  } catch (error) {
    detailsContainer.innerHTML = "";
    detailsContainer.innerHTML = error;
  }
}

fetchDetails();
