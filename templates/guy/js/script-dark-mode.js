document.getElementById("toggleDarkMode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    this.innerText =
        this.innerText === "Activer le mode sombre"
            ? "Désactiver le mode sombre"
            : "Activer le mode sombre";
});