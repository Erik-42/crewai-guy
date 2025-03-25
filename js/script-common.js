// // Mise à jour automatique de l'année dans le footer
// document.getElementById("current-year").textContent = new Date().getFullYear();

// document.querySelectorAll('.file[data-is-text="true"] a').forEach((link) => {
// 	link.addEventListener("click", function (e) {
// 		e.preventDefault();
// 		const filePath = this.parentNode.getAttribute("data-file-path");
// 		fetch(filePath)
// 			.then((response) => response.text())
// 			.then((text) => {
// 				document.getElementById("file-content").textContent = text;
// 				document.getElementById("text-viewer").style.display = "block";
// 			})
// 			.catch((error) => {
// 				console.error("Error loading file:", error);
// 				alert("Fichier non trouvé !");
// 			});
// 	});
// });

// function closeViewer() {
// 	document.getElementById("text-viewer").style.display = "none";
// }

// // Gestion de la fermeture en cliquant en dehors
// window.onclick = function (event) {
// 	const modal = document.getElementById("text-viewer");
// 	if (event.target === modal) {
// 		modal.style.display = "none";
// 	}
// };
// // Gestion des clics
// document.querySelectorAll('.file[data-is-text="true"] a').forEach((link) => {
// 	link.addEventListener("click", function (e) {
// 		e.preventDefault();
// 		const filePath = this.parentNode.getAttribute("data-file-path");
// 		fetch(filePath)
// 			.then((response) => response.text())
// 			.then((text) => {
// 				const viewer = document.getElementById("text-viewer");
// 				const content = document.getElementById("file-content");

// 				if (filePath.endsWith(".md")) {
// 					content.innerHTML = marked.parse(text); // Conversion Markdown
// 					content.classList.add("markdown-content");
// 				} else {
// 					content.textContent = text; // Texte brut pour LICENSE
// 					content.classList.remove("markdown-content");
// 				}

// 				viewer.style.display = "block";
// 			})
// 			.catch((error) => {
// 				console.error("Error loading file:", error);
// 				alert("Fichier non trouvé !");
// 			});
// 	});
// });

// // Gestion de la touche ESC
// document.addEventListener("keydown", (e) => {
// 	if (e.key === "Escape") {
// 		closeViewer();
// 	}
// });

// // Ouverture du viewer
// viewer.style.display = "block";

// // Scroll vers le haut à chaque ouverture
// content.scrollTo(0, 0);
// async function showViewer(file) {
// 	try {
// 		const response = await fetch(file);
// 		const content = await response.text();
// 		const fileContent = document.getElementById("file-content");

// 		if (file.endsWith(".json")) {
// 			// Afficher le JSON brut avec coloration syntaxique
// 			fileContent.innerHTML = hljs.highlight(content, {
// 				language: "json",
// 			}).value;
// 		} else if (file.endsWith(".md")) {
// 			// Traitement Markdown standard
// 			fileContent.innerHTML = marked.parse(content);
// 		} else {
// 			// Autres fichiers avec préformatage
// 			fileContent.innerHTML = `<pre>${hljs.highlightAuto(content).value}</pre>`;
// 		}

// 		viewer.style.display = "block";
// 		document.addEventListener("keydown", escClose);
// 	} catch (err) {
// 		console.error("Erreur de chargement :", err);
// 	}
// }

// Déclaration des constantes globales
const viewer = document.getElementById("text-viewer");
const content = document.getElementById("file-content");

// Mise à jour automatique de l'année dans le footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Gestion unique des clics sur les fichiers
document.querySelectorAll('.file[data-is-text="true"] a').forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		const filePath = this.parentNode.getAttribute("data-file-path");
		loadFileContent(filePath);
	});
});

// Fonction unique de chargement
async function loadFileContent(filePath) {
	try {
		const response = await fetch(filePath);
		const text = await response.text();

		// Réinitialisation du contenu
		content.classList.remove("markdown-content");
		content.innerHTML = "";

		if (filePath.endsWith(".md")) {
			content.innerHTML = marked.parse(text);
			content.classList.add("markdown-content");
		} else if (filePath.endsWith(".json")) {
			const jsonContent = JSON.parse(text);
			content.innerHTML = `<pre class="json-content">${formatJsonAsTree(
				jsonContent
			)}</pre>`;
		} else {
			content.textContent = text;
		}

		viewer.style.display = "block";
		content.scrollTo(0, 0); // Scroll après affichage
	} catch (error) {
		console.error("Error loading file:", error);
		alert("Fichier non trouvé ou format non supporté !");
	}
}

// Fonction pour formater le JSON en structure de répertoire
function formatJsonAsTree(json, indent = "") {
	let result = "";
	if (Array.isArray(json)) {
		json.forEach((item) => {
			if (item.type === "directory") {
				result += `${indent}├── ${item.name}/\n`;
				result += formatJsonAsTree(item.children, indent + "│   ");
			} else {
				result += `${indent}└── ${item.name}\n`;
			}
		});
	}
	return result;
}

// Gestion de la fermeture
function closeViewer() {
	viewer.style.display = "none";
	content.innerHTML = ""; // Nettoyage du contenu
}

// Fermeture modale
window.onclick = function (event) {
	if (event.target === viewer) closeViewer();
};

// Gestion touche ESC
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && viewer.style.display === "block") closeViewer();
});
