// Appliquer le thème sombre par défaut
document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("dark-mode");
  document.querySelector(".container").classList.add("dark-mode");
  const toggleButton = document.getElementById("toggleDarkMode");
  toggleButton.innerText = "Désactiver le mode sombre"; // Mettre à jour le texte du bouton
});

document
  .getElementById("toggleDarkMode")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    this.innerText =
      this.innerText === "Activer le mode sombre"
        ? "Désactiver le mode sombre"
        : "Activer le mode sombre";
  });

// document.getElementById("toggleDarkMode").addEventListener("click", function () {
//     document.body.classList.toggle("dark-mode");
//     document.querySelector(".container").classList.toggle("dark-mode");
//     this.innerText =
//         this.innerText === "Activer le mode sombre"
//             ? "Désactiver le mode sombre"
//             : "Activer le mode sombre";
// });
