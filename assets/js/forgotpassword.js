document.addEventListener("DOMContentLoaded", function() {

    const resetBtn = document.getElementById("resetPassword");

    resetBtn.addEventListener("click", function() {
        const name = document.getElementById("validName").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!name || !newPassword || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        
        let users = JSON.parse(localStorage.getItem("users")) || [];

        
        const userIndex = users.findIndex(u => u.name === name);

        if (userIndex === -1) {
            alert("User not found! Please sign up first.");
            return;
        }


        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));

        alert("Password reset successfully! Please login.");

        
        window.location.href = "../index.html"; 
    });

});
