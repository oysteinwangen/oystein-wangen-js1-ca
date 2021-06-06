const photosContainer = document.querySelector(".photo-container");
const apiKey = "3957450-287d8f08397456bf01b762222";
const url =
  "https://pixabay.com/api/?key=" +
  apiKey +
  "&category=nature&order=latest&editors_choice=true&page=1&per_page=30&image_type=photo";

async function fetchPhotos() {
  try {
    const response = await fetch(url);
    const photos = await response.json();

    photosContainer.innerHTML = "";

    for (let i = 0; i < photos.hits.length; i++) {
      if (!photos.hits[i].user) {
        continue;
      }
      if (i >= 15) {
        break;
      }

      photosContainer.innerHTML += `<a href="/details.html?id=${photos.hits[i].id}" class="listing">
        <img class="listing-photo" src="${photos.hits[i].webformatURL}></img>""
        <div class="properties">
        <div class="w10"></div>
        <div class="property-div">
        <img class="property-img" src="../media/camera.svg" alt="Camera"></img>
        Taken by: ${photos.hits[i].user}</div>
        <div class="property-div">
        <img class="property-img" src="../media/heart.svg" alt="Heart"></img>
        Likes: ${photos.hits[i].likes}</div>
        <div class="w20"></div>
        </div>
        </a>`;
    }
  } catch (error) {
    photosContainer.innerHTML = "";
    photosContainer.innerHTML = error;
  }
}

fetchPhotos();
