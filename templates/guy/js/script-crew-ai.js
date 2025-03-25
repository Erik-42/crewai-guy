function startCrewAI() {
  fetch("/crewai")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").innerHTML = data.result;
    });
}

function runCrewAI() {
  fetch("/run_crewai")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").innerHTML = data.result;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").innerHTML =
        "Une erreur s'est produite.";
    });
}
