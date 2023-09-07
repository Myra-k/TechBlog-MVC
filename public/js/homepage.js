// Authorization token that must have been created previously.
const token = 'BQCj9f8Rp2Tlvz8CqAx9HbdqTGLoMW_KThjxqYoXynlOASRX0FY0IxIzyY5WRwBuuVXo3Elgk1aHb8UI7Q64jmV6JSRGxiqahc3GDYMdEfq_affFKtbJZmgn-BD1Iun-DXV3ed4vuPPLRDs0MHGcuCAGw0yRnPuoZizHbBZnLHZZoNvk8WaE3I66cU35VtcZT5eeMCoAm6-H_0bSar_xisxp-Ns4k5m_aEIbxuWt1It1tJuBLG1PDMAR54tvAGoS5wMtIA';
// Function to make API requests
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

// Function to get top tracks from Spotify API
async function getTopTracks() {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

// Function to display top tracks
async function displayTopTracks() {
  try {
    const topTracks = await getTopTracks();
    const topTracksDiv = document.getElementById("top-tracks");
    let tracksHTML = "";

    topTracks.forEach((track, index) => {
      tracksHTML += `<div class="track">
                       <div class="rank">${index + 1}</div>
                       <div class="info">
                         <h3>${track.name}</h3>
                         <p>${track.artists.map(artist => artist.name).join(', ')}</p>
                       </div>
                     </div>`;
    });

    topTracksDiv.innerHTML = tracksHTML;
  } catch (error) {
    console.error(error);
  }
}

// Function to get recommended tracks from Spotify API
async function getRecommendations() {
  const topTracksIds = [
    '5NXthnJecYXjt7sTEWETTY', '52okn5MNA47tk87PeZJLEL', '1jo3TwNGCXfNdB5uba3ZVv', '57VeLYXrvNxe8Vs18K2M9W', '2FDTHlrBguDzQkp7PVj16Q',
  ];

  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

// Function to display recommended tracks
function displayRecommendedTracks(recommendedTracks) {
  const recommendedTracksDiv = document.getElementById("recommended-tracks");
  let tracksHTML = "";

  recommendedTracks.forEach((track, index) => {
    tracksHTML += `<div class="track">
                     <div class="rank">${index + 1}</div>
                     <div class="info">
                       <h3>${track.name}</h3>
                       <p>${track.artists.map(artist => artist.name).join(', ')}</p>
                     </div>
                   </div>`;
  });

  recommendedTracksDiv.innerHTML = tracksHTML;
}

// Function to fetch and display live tracks
async function fetchLiveTracks() {
  try {
    const recommendedTracks = await getRecommendations();
    displayRecommendedTracks(recommendedTracks);
  } catch (error) {
    console.error(error);
  }
}

// Function to create and display the Spotify playlist
async function createPlaylist(tracksUri) {
  const { id: user_id } = await fetchWebApi('v1/me', 'GET');

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
    }
  );

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

// Function to display the embedded Spotify playlist
function displayEmbeddedPlaylist(playlistId) {
  const playlistContainer = document.getElementById("playlist-container");
  const iframe = document.createElement("iframe");
  iframe.title = "Spotify Embed: Recommendation Playlist";
  iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.minHeight = "360px";
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";
  playlistContainer.appendChild(iframe);
}



// Function to display the music article
function displayMusicArticle(article) {
    const articleContainer = document.getElementById("article-container");
    let articleHTML = `
    <h2 class="article-title">${article.title}</h2>
        <div class="article">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <br>
            <textarea readonly class="article-content">${article.content}</textarea>
        </div>`;
    articleContainer.innerHTML += articleHTML; 
}

const musicArticle = {
  title: "What is the Underlying Importance of Technology?",
  content: `Of course, this does raise the question of why technology is so important. Why should people keep up with the best tech blogs? It comes down to how technology brings the essential parts of life together.

  Technological innovation helps people optimize both their professional and personal lives.
   This can come about through improved exchange of information thanks to IT. But the importance of 
   technology is seen in every field. New tech helps enhance the quality of life length of life and improves 
   our day-to-day experiences. Technology offers potential solutions to most problems as long as we stay informed.`,
  image: "./images/tech 2.jpeg" 
};

const musicArticle2 = {
  title: "Can a $599 camera bring Polaroid back?",
  content: `Vintage Polaroid cameras, often found on eBay, are notorious for their unreliable performance. 
  The chances of these older models working correctly or producing well-exposed photos are quite low. However,
   the Polaroid I-2, priced at $599.99, offers a fresh take on instant photography. What sets it apart is its
    manual control system, featuring a lens ring and a single button beneath a small digital display. 
    During a two-week trial for a Full Frame episode, it became evident that the manual controls significantly 
    improve the success rate of capturing good photos, while the automatic mode falls short of expectations.
     The review includes video footage with photo samples, critiques, and cinematic shots of this camera, 
     which could potentially influence the future of instant photography.`,
  image: "./images/090523_Polaroid_I_2_ADiBenedetto_0005.0.jpg" 
};



const musicArticle3 = {
    title: "Apple is reportedly spending ‘millions of dollars a day’ training AI",
    content: `According to a recent report from The Information, Apple is dedicating substantial financial resources to advance artificial intelligence (AI). The company is actively engaged in the development of various AI models through multiple teams.

    One of Apple's AI units, referred to as "Foundational Models," specializes in conversational AI and comprises approximately 16 members, including former Google engineers. It is under the leadership of John Giannandrea, Apple's AI head, who was recruited in 2018 with the aim of enhancing Siri. Interestingly, Giannandrea has reportedly expressed doubts to colleagues about the practicality of chatbots powered by AI language models.
    
    Apple has several other teams focused on AI as well. One such team, the Visual Intelligence unit, is focused on creating models for generating images. Another group is actively researching multimodal AI, which possesses the ability to recognize and generate images, videos, and text.
    
    These AI models are envisioned to serve diverse purposes. For instance, Apple is developing a chatbot intended for customer interactions within the context of AppleCare services. Another application is aimed at streamlining the automation of complex tasks using Siri.
    
    According to insiders involved in its development, Apple's most advanced Large Language Model (LLM), internally 
    known as Ajax GPT, has undergone training using an astonishing "more than 200 billion parameters." Remarkably, 
    it is claimed to surpass the capabilities of OpenAI's GPT-3.5, which served as the foundation for the initial 
    version of ChatGPT launched last year. It's worth noting that Ajax GPT was initially developed for internal use
     and remains tightly controlled within the company`,
    image: "./images/apple.jpeg" 
};

const hipHopArticles = [
 
  {
    title: "A Complex Series of Failures Resulted in the Compromise of Government Emails Hosted by Microsoft",
    content: `In the early part of July, Microsoft revealed that the Chinese hacking group Storm-0558 had managed to access emails from approximately 25 organizations, including various US government agencies. Today, Microsoft is elucidating the sequence of internal errors that led to this breach, emphasizing the critical responsibility of maintaining a vast and expanding software infrastructure in an increasingly digitally insecure world.

    According to Microsoft's investigation summary, Storm-0558 gained entry to corporate and government email systems by acquiring a "Microsoft account consumer key." This key allowed them to create access tokens for their intended targets.
    
    The chain of events that led to Storm-0558 obtaining this key was intricate, akin to a Rube Goldberg machine. When a system took a debugging snapshot of a malfunctioning process, it failed to properly strip sensitive information, including the "crash dump," which contained the key. This mishap occurred despite the standard procedure being the removal of such sensitive data. The key-laden crash dump was then transferred from the "isolated production network" to Microsoft's debugging environment by company engineers, mistakenly assuming it was devoid of sensitive data.
    
    Subsequently, a crucial safety check, which should have detected the key, failed to do so. Finally, Storm-0558 compromised a Microsoft engineer's corporate account, providing them with access to the debugging environment that should never have had the key in the first place.
    
    While there are no definitive logs showing precisely how the key left Microsoft's systems, this route is deemed the most likely one taken by the hackers.
    
    Adding to the complexity, this was a consumer key, but it granted unauthorized access to enterprise Microsoft accounts. Microsoft had introduced common key metadata publishing in 2018 to accommodate software supporting both consumer and enterprise accounts. However, the necessary updates to authenticate keys accurately were not implemented. Mail system engineers assumed these updates had been made, resulting in a lack of additional authentication, rendering the mail system unable to differentiate between consumer and enterprise keys.
    
    In essence, had these libraries been updated correctly, even with the other failures in the process, the Storm-0558 hackers might not have been able to breach the enterprise email accounts they targeted.
    
    Microsoft asserts that it has addressed all the identified issues, including the initial error that led to the key being included in the crash dump. The company also emphasizes its commitment to continuously strengthening its systems. It's worth noting that Microsoft has faced criticism for its security practices, with some, including Senator Ron Wyden and Tenable CEO Amit Yoran, describing them as "negligent" and accusing Microsoft of being slow to respond to security vulnerabilities.
    `,
    image: "./images/microsoft.jpeg" 
  },
];



// Display the music articles and hip-hop articles when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    displayMusicArticle(musicArticle);
    displayMusicArticle(musicArticle2);
    displayMusicArticle(musicArticle3);

    hipHopArticles.forEach((article) => {
        displayMusicArticle(article);
    });
});

// Fetch and display the top tracks and recommended tracks
document.addEventListener("DOMContentLoaded", async function () {
  displayTopTracks();
  fetchLiveTracks();

  const tracksUri = [
    'spotify:track:5NXthnJecYXjt7sTEWETTY', 'spotify:track:52okn5MNA47tk87PeZJLEL', 'spotify:track:1jo3TwNGCXfNdB5uba3ZVv',
    'spotify:track:57VeLYXrvNxe8Vs18K2M9W', 'spotify:track:2FDTHlrBguDzQkp7PVj16Q', // Add more tracks if needed
  ];
  const createdPlaylist = await createPlaylist(tracksUri);
  displayEmbeddedPlaylist(createdPlaylist.id);
});





// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
// Function to handle user input and generate responses
document.addEventListener("DOMContentLoaded", function () {
  const chatbotMessages = document.getElementById("chatbot-messages");
  const userInput = document.getElementById("user-input");

  // Function to add a new message to the chatbot
  function addMessage(className, message) {
    const templateSource = document.getElementById("message-template").innerHTML;
    const template = Handlebars.compile(templateSource);
    const context = { className, message };
    const html = template(context);
    chatbotMessages.innerHTML += html;
  }

  // Function to handle user input and generate responses
  function handleUserInput() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
      addMessage("user", userMessage);

      // Bot's responses based on user input
      setTimeout(function () {
        let botResponse;
        switch (userMessage.toLowerCase()) {
          case "what is your name?":
            botResponse = "I'm just a demo chatbot!";
            break;
          case "how old are you?":
            botResponse = "I don't have an age. I'm just a computer program.";
            break;
          case "what is the capital of france?":
            botResponse = "The capital of France is Paris.";
            break;
          case "tell me a joke.":
            botResponse = "Why don't scientists trust atoms? Because they make up everything!";
            break;
          // Add more cases for other questions and responses here
          default:
            botResponse = "Sorry, I'm not sure how to respond to that.";
            break;
        }

        addMessage("bot", botResponse);
      }, 500);

      userInput.value = "";
    }
  }

  // Listen for Enter key press to handle user input
  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });
});







// Replace YOUR_YOUTUBE_API_KEY with your actual YouTube API key
const youtubeAPIKey = "YAIzaSyCY8ADsA7nL-sYx0-70daCqWOhHfJ4jfnY";
let youtubePlayer;

// Function to create the YouTube player
function createYouTubePlayer() {
  youtubePlayer = new YT.Player("youtube-player-container", {
    height: "360",
    width: "640",
    videoId: "hxeDjAxvJ8", // Replace VIDEO_ID with the YouTube video ID you want to display
  });
}

// Load YouTube API asynchronously
function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Initialize YouTube player when the API is ready
function onYouTubeIframeAPIReady() {
  createYouTubePlayer();
}

loadYouTubeAPI();
