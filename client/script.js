const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const uploadedImages = document.getElementById("uploaded-images");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener("drop", handleDrop, false);

fileInput.addEventListener("change", handleFiles, false);

function preventDefaults(e) {
  e.preventDefault();
}

function highlight() {
  dropArea.classList.add("highlight");
}

function unhighlight() {
  dropArea.classList.remove("highlight");
}

async function handleFiles() {
  const files = fileInput.files;
  await uploadFiles(files);
}

async function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  await uploadFiles(files);
}

async function uploadFiles(files) {
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://drag-drop-q2z7.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      displayUploadedFile(data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Failed to upload file. Please try again.`);
    }
  }
}

function displayUploadedFile(url) {
  const img = document.createElement("img");
  img.src = url;
  uploadedImages.appendChild(img);
}
