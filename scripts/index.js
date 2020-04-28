const mainContainer = document.querySelector(".container");
const btnDoggo = document.querySelector(".button-doggo");

const selectDropDown = document.querySelector("select");
const inputNum = document.getElementById("inputNum");
const imageContainer = document.querySelector(".image-container");

function loadList() {
  console.log("load list");
  $.get("https://dog.ceo/api/breeds/list").then(function (obj) {
    console.log(obj["message"]);
    // selectDropDown.textContent = obj["message"];
  });
}

inputNum.addEventListener("change", function (e) {
  var numImages = e.target.value;
  console.log(numImages);
});

// var arrDogBreeds = ["husky", "pug"];

window.addEventListener("DOMContentLoaded", function () {
  $.get("https://dog.ceo/api/breeds/list").then(function (obj) {
    var arrDogBreeds = obj["message"];
    for (let i of arrDogBreeds) {
      var optionDogBreed = document.createElement("option");
      optionDogBreed.textContent = i;
      optionDogBreed.setAttribute("value", i);
      selectDropDown.appendChild(optionDogBreed);
    }
  });
});

// generate image upon breed change
/*
selectDropDown.addEventListener("change", function (e) {
  var doggoImage = document.createElement("IMG");
  var breed = e.target.value;
  let URL = "https://dog.ceo/api/breed/" + breed + "/images/random";
  $.get(URL, function (obj) {
    doggoImage.src = obj["message"];
    doggoImage.alt = "Random Dog Image";
    doggoImage.className = "random-dog-img";
  });
  // assign the image to doggoImage
  btnDoggo.insertAdjacentElement("afterend", doggoImage);
});
*/

// Event Handler for "Generate Doggo Button"
btnDoggo.onclick = function generateDogImg() {
  var num = inputNum.value;
  if (num == 0) {
    alert("First, select the number of doggo images to generate!");
  }

  // if random selected
  if (document.getElementById("option1").classList.contains("active")) {
    for (i = 0; i < num; i++) {
      var URL = "https://dog.ceo/api/breeds/image/random";
      $.get(URL, function (obj) {
        var doggoImage = document.createElement("IMG");
        doggoImage.src = obj["message"];
        doggoImage.alt = "Random Dog Image";
        doggoImage.className = "random-dog-img";
        console.log(doggoImage);
        imageContainer.appendChild(doggoImage);
      });
      // assign the image to doggoImage

      setTimeout(function () {}, 50000);
      console.log(i);
    }
  } else if (document.getElementById("option2").classList.contains("active")) {
    var breedValue = selectDropDown.options[selectDropDown.selectedIndex].value;
    if (breedValue == "" && num > 0) {
      alert("First, select a breed from the dropdown");
    } else {
      for (i = 0; i < num; i++) {
        let URL = "https://dog.ceo/api/breed/" + breedValue + "/images/random";
        $.get(URL, function (obj) {
          var doggoImage = document.createElement("IMG");
          doggoImage.src = obj["message"];
          doggoImage.alt = "Random Dog Image";
          doggoImage.className = "random-dog-img";
          imageContainer.appendChild(doggoImage);
        });
        // assign the image to doggoImage
      }
    }
  }
};

// - Add the bootstrap files to your page and style the page using some of the bootstrap components.
// - A nicer form layout
// - Some columns for multiple dog responses
// - Change the button to a spinner when it is loading
// - Display the response image in a modal
// - Add a progress bar somehow
// - Add multiple dogs to a carousel after each request
