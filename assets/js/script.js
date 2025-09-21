document.addEventListener("DOMContentLoaded", function() {
    checkAuth();

    
    let token = localStorage.getItem("authToken");
    if (token) {
      document.getElementById("welcome-msg").textContent = "Welcome, " + token + "!";
    }

   
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("authToken"); 
        window.location.href = "../index.html"; 
      });
    }

    
    let searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", function () {
        let searchInput = document.getElementById("search-input"); 
        let city = searchInput.value.trim(); 
        let loader = document.getElementById("loader1");
        let result = document.getElementById("weatherResult"); 

        if (!city) {
          alert("Please type a city");
          return;
        }

        loader.classList.remove("d-none");

        let apikey = "b668e602bab34b5db48120650251809";
        let url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${encodeURIComponent(city)}`;

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

            result.innerHTML = `
              <div class="card text-center shadow-lg col-12 col-sm-8 col-md-8 col-lg-6 col-xl-4 mx-auto mt-3">
                <div class="card-body text-center">
                  <h5 class="card-title">${cityName}, ${country}</h5>
                  <p class="card-text">🌡 ${temp}°C</p>
                  <p class="card-text">${condition}</p>
                </div>
              </div>
            `;
          })
          .catch(error => {
            result.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
          })
          .finally(() => {
            searchInput.value = "";           
            loader.classList.add("d-none");   
          });
    });

}); 


function checkAuth() {
  let token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "../index.html"; 
  }
}
