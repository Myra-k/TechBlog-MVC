
document.addEventListener("DOMContentLoaded", function() {
    loadMusicUpdates();
});

function loadMusicUpdates() {
    const musicUpdatesURL = "your_backend_endpoint_here"; // Replace this with your backend URL

    fetch(musicUpdatesURL)
        .then(response => response.json())
        .then(data => {
            const musicUpdatesDiv = document.getElementById("music-updates");
            let updatesHTML = "";

            // Assuming the API returns an array of music updates
            data.forEach(update => {
                updatesHTML += `<article>
                                    <h2>${update.title}</h2>
                                    <p>${update.content}</p>
                                    <p><em>Published on: ${update.date}</em></p>
                                </article>`;
            });

            musicUpdatesDiv.innerHTML = updatesHTML;
        })
        .catch(error => {
            console.error("Error fetching music updates:", error);
            document.getElementById("music-updates").innerText =
                "Failed to load music updates.";
        });
}
