document
  .getElementById("pythonFileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fileName = document.getElementById("fileName").value;
    const fileContent = document.getElementById("fileContent").value;

    fetch("/save_python_file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, fileContent }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("result").innerText =
          data.message || data.error;
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
