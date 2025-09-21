document.getElementById("signUp").addEventListener("click", function () {
      let name = document.getElementById("signUpInput").value.trim();
      let password = document.getElementById("signUpPassword").value.trim();

      if (!name || !password) {
        alert("All fields are required!");
        return;
      }

      let user = { name, password };
      localStorage.setItem("user", JSON.stringify(user));

      document.getElementById("signUpInput").value = "";
      document.getElementById("signUpPassword").value = "";

      document.getElementById("signUpSection").classList.add("d-none");
      document.getElementById("loginSection").classList.remove("d-none");

      alert("Account created successfully! Please log in.");
    });
    
    document.getElementById("login").addEventListener("click", function () {
      let name = document.getElementById("loginInput").value.trim();
      let password = document.getElementById("loginPassword").value.trim();

      if (!name || !password) {
        alert("Please enter your name and password!");
        return;
      }

      let savedUser = JSON.parse(localStorage.getItem("user"));

      if (savedUser && savedUser.name === name && savedUser.password === password) {
        
        document.getElementById("loginInput").value = "";
        document.getElementById("loginPassword").value = "";

        alert("Welcome back, " + savedUser.name + "!");
        window.location.href = "./pages/weather.html";
      } else {
        alert("Invalid name or password!"); 
      }
    });

    document.getElementById("toLoginLink").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("signUpSection").classList.add("d-none");
      document.getElementById("loginSection").classList.remove("d-none");
    });

    document.getElementById("toSignUpLink").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginSection").classList.add("d-none");
      document.getElementById("signUpSection").classList.remove("d-none");
    });