

let searchBtn = document.getElementById("search-btn");
let username = localStorage.getItem("username");
loader.classList.remove("d-none");

  if (username) {
    document.getElementById("welcome-msg").textContent = "Welcome, " + username + "!";
  }






searchBtn.addEventListener("click", function () {
let searchInput = document.getElementById("search-input").value;
let loader = document.getElementById("loader1");
if(!searchInput) {alert("Please type a city"); return;}

//Fetch:
let apikey = "b668e602bab34b5db48120650251809";
let url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${encodeURIComponent(searchInput)}`;
let card = document.getElementById("weatherCard");

fetch(url)
.then(res => {
  if (!res.ok) {
    return res.json().then(errorData => {
      throw new Error(errorData.error.message);
    });
  }
   return res.json();
})

.then(data => {
    let cityName = data.location.name;
    let country = data.location.country;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
  
    

    card.innerHTML = `
    <div class=" card text-center shadow-lg w-50 w-sm-75 w-md-50 w-lg-25">
      <div class="card-body text-center">
        <h5 class="card-title">${cityName}, ${country}</h5>
        <p class="card-text">🌡 ${temp}°C</p>
        <p class="card-text">${condition}</p>
      </div>
    </div>
    `;
})

.catch(error => {
    card.innerHTML = `
    <div class="alert alert-danger">Error: ${error.message}</div>`;
})
});















