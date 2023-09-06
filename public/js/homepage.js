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
  title: "Ed Sheeran: The Sensational Singer-Songwriter Making Waves in Music History",
  content: `In the ever-evolving world of music, certain artists manage to transcend boundaries and capture the hearts of millions worldwide. Ed Sheeran, the British singer-songwriter, is undeniably one of those exceptional talents. From his humble beginnings to global stardom, Sheeran's musical journey is a testament to the power of raw talent, dedication, and an unwavering passion for music.

  Early Life and Beginnings:
  Born on February 17, 1991, in Halifax, West Yorkshire, England, Edward Christopher Sheeran showed a profound interest in music from a young age. Raised in Framlingham, Suffolk, he learned to play the guitar at an early age and began writing his own songs in his early teens. Even before becoming a household name, Sheeran showcased his determination by performing at numerous open mic nights and small venues, honing his craft and captivating audiences with his soulful voice and heartfelt lyrics.

  The Rise to Fame:
  Sheeran's breakthrough came in 2011 with the release of his debut studio album "+," pronounced as "plus." The album featured the chart-topping singles "The A Team" and "Lego House," earning him critical acclaim and catapulting him to international recognition. With his signature blend of acoustic pop, folk, and R&B influences, Sheeran's music resonated with listeners of all ages, and he quickly amassed a dedicated fan base.

  The Red-Headed Superstar:
  Ed Sheeran's second album, "x" (pronounced "multiply"), released in 2014, solidified his status as a global superstar. The album's lead single, "Sing," showcased a more upbeat and pop-oriented sound, while hits like "Thinking Out Loud" and "Photograph" further cemented his reputation as a master storyteller with an emotive vocal delivery. "x" earned Sheeran multiple Grammy nominations and continued to top charts worldwide, setting new records for album sales and digital downloads.

  Divide and Conquer:
  In 2017, Ed Sheeran's third studio album, "÷" (pronounced "divide"), took the world by storm. The album's lead single, "Shape of You," became an instant anthem, dominating airwaves and playlists globally. "Castle on the Hill" and "Galway Girl" were also massive hits, showcasing Sheeran's versatility as an artist. "÷" broke numerous records and earned him the prestigious Grammy Award for Best Pop Vocal Album.

  Beyond Music:
  Ed Sheeran's impact extends beyond his music. He has consistently used his platform to support various charitable causes, advocating for social and environmental issues. Sheeran's involvement in charity work and philanthropy reflects his genuine commitment to making a positive impact on the world.

  The Comeback:
  After a brief hiatus, Ed Sheeran returned to the music scene with his 2019 album "No.6 Collaborations Project." The album featured an array of collaborations with artists from different genres, showcasing his ability to seamlessly adapt his sound and work with diverse talents.

  Legacy:
  Ed Sheeran's impact on the music industry is undeniable. His soul-stirring lyrics, captivating melodies, and genuine authenticity have earned him a special place in the hearts of fans worldwide. He has consistently sold out stadiums, headlined major music festivals, and inspired countless aspiring musicians.

  Conclusion:
  Ed Sheeran's remarkable journey from a young musician with a guitar to an international superstar serves as an inspiration to artists worldwide. His passion for music, dedication to his craft, and genuine connection with his audience are the hallmarks of a true artist. As Ed Sheeran continues to evolve and experiment with his sound, one thing remains certain: his music will continue to resonate and leave a lasting impact on generations to come. The red-headed singer-songwriter has undoubtedly etched his name in music history, and his star continues to shine brightly in the vast musical constellation.`,
  image: "./images/edsheeran.jpg" 
};

const musicArticle2 = {
  title: "Arctic Monkeys: Pioneers of Indie Rock and Trailblazers of Musical Brilliance",
  content: `In the ever-changing landscape of the music industry, few bands have left as profound an impact as the Arctic Monkeys. Hailing from Sheffield, England, this remarkable quartet burst onto the scene in the mid-2000s, captivating audiences with their raw energy, poetic lyrics, and a distinct blend of indie and rock sensibilities. Their meteoric rise to fame is a testament to their extraordinary talent, innovative spirit, and unwavering dedication to their craft.

  A Humble Beginning:
  
  Formed in 2002, the Arctic Monkeys started as a group of friends with a shared passion for music. Their early days were marked by small gigs in local pubs and clubs, where they honed their skills and refined their sound. The band's frontman, Alex Turner, proved to be a gifted lyricist from the start, penning songs that resonated deeply with audiences and showcased a keen understanding of the human experience.
  
  The MySpace Sensation:
  
  The turning point for the Arctic Monkeys came with the advent of social media, particularly MySpace. Harnessing the power of the internet, the band self-released demos and live recordings, generating an unprecedented online following. The buzz around their music quickly spread like wildfire, and the Arctic Monkeys became a sensation before the world even knew it. Their unique blend of indie rock and Turner's evocative lyrics struck a chord with listeners, solidifying their place as the vanguard of a new wave of British indie music.
  
  "Whatever People Say I Am, That's What I'm Not":
  
  In 2006, the Arctic Monkeys released their debut album, "Whatever People Say I Am, That's What I'm Not." The album made history as the fastest-selling debut in the UK at the time, catapulting the band to international stardom. Songs like "I Bet You Look Good on the Dancefloor" and "When the Sun Goes Down" became anthems of a generation, embodying the spirit of youthful rebellion and the raw essence of indie rock.
  
  Innovators and Evolution:
  
  The Arctic Monkeys' subsequent albums showcased their evolution as musicians and songwriters. From "Favourite Worst Nightmare" to "AM," the band continuously pushed the boundaries of their sound while staying true to their indie roots. Their ability to experiment with different styles while maintaining their unique identity set them apart from their peers. The album "AM" saw the band embracing elements of R&B and hip-hop, resulting in a mesmerizing and mature sonic experience.
  
  Captivating Live Performances:
  
  Known for their electrifying live performances, the Arctic Monkeys' stage presence has been nothing short of mesmerizing. Whether performing in intimate venues or headlining major festivals, the band's energy and connection with their audience have been unparalleled. Alex Turner's charismatic and enigmatic persona, combined with the band's tight musicianship, creates an unforgettable experience for concert-goers.
  
  Transcending Genres and Borders:
  
  Beyond their musical prowess, the Arctic Monkeys' impact extends beyond the boundaries of indie rock. Their influence has seeped into mainstream culture, reaching listeners from all corners of the globe. Their success has transcended genres and generations, making them a household name worldwide. Their music has become a soundtrack to the lives of countless fans, and their artistic integrity continues to inspire musicians across genres.
  
  Legacy and Lasting Impact:
  
  The Arctic Monkeys' legacy as indie rock pioneers is firmly cemented in the annals of music history. Their honest storytelling, fueled by Alex Turner's evocative lyrics, continues to resonate with fans young and old. Their work has inspired a new wave of musicians, ensuring that their influence will endure for generations to come. Their commitment to artistic evolution and dedication to pushing the boundaries of music stand as a testament to their enduring relevance and impact on the music world.
  
  Conclusion:
  
  The Arctic Monkeys' journey from a group of friends making music in Sheffield to becoming one of the most influential indie rock bands of their time is nothing short of extraordinary. Their musical brilliance, combined with their authenticity and innovation, has left an indelible mark on the hearts of music enthusiasts worldwide. As they continue to evolve and create, the Arctic Monkeys' status as trailblazers of the indie rock genre remains unshakable, and their artistry continues to shine brightly, guiding the way for future generations of musicians and fans alike.`,
  image: "./images/artic.jpg" 
};



const musicArticle3 = {
    title: "Calvin Harris: A Musical Maestro Redefining Electronic Dance Music",
    content: `In the dynamic world of electronic dance music (EDM), few names shine as brightly as that of Calvin Harris. Hailing from Scotland, this musical maestro has transcended boundaries, shattered records, and become a global icon in the realm of electronic music. With a career spanning over two decades, Calvin Harris has continuously evolved his sound, leaving an indelible mark on the music industry and captivating audiences worldwide.

    A Journey of Musical Discovery:
    
    Born as Adam Richard Wiles on January 17, 1984, in Dumfries, Scotland, Calvin Harris discovered his passion for music at a young age. He embarked on a musical journey as a teenager, experimenting with electronic sounds and production techniques in his bedroom studio. Harris's insatiable curiosity and relentless pursuit of musical perfection would ultimately become the foundation of his meteoric rise to fame.
    
    The Breakthrough:
    
    In 2007, Calvin Harris released his debut album, "I Created Disco," which introduced the world to his infectious blend of disco, synth-pop, and electro-house. The album's lead single, "Acceptable in the 80s," became an instant hit, catapulting Harris into the limelight. His unique ability to infuse catchy melodies with pulsating beats and energetic rhythms set him apart from his contemporaries, earning him widespread acclaim.
    
    Collaborations and Chart Dominance:
    
    As Calvin Harris's reputation grew, so did his collaborations with prominent artists. He worked with the likes of Rihanna, Ellie Goulding, and Dua Lipa, producing chart-topping hits that dominated the airwaves. His collaborations showcased his versatility as a producer, seamlessly blending genres and creating chart-toppers across multiple music styles.
    
    The Evolution of Sound:
    
    Harris's artistic evolution is a testament to his commitment to pushing the boundaries of his sound. He fearlessly embraced new influences, transitioning from his disco-influenced roots to explore a more mainstream pop sound. This transition saw him reach new heights of commercial success with hits like "Summer," "Feel So Close," and "This Is What You Came For."
    
    EDM Superstar and Festival Headliner:
    
    As one of the world's highest-paid DJs, Calvin Harris's live performances have become legendary. From Las Vegas residencies to headlining major music festivals, his electrifying sets have captivated audiences across the globe. Harris's mastery of crafting euphoric moments on the dancefloor has solidified his status as an EDM superstar.
    
    Beyond the Beats:
    
    Calvin Harris's influence extends beyond his role as a musical artist. He is also known for his skills as a songwriter and record producer, and his collaborations have earned him numerous prestigious awards, including Grammy Awards and Brit Awards. Moreover, he has been recognized for his charitable endeavors, using his platform to support various causes and organizations.
    
    A Lasting Legacy:
    
    Calvin Harris's impact on the electronic dance music landscape is undeniable. He has played a pivotal role in popularizing EDM and bringing it to the mainstream audience. His genre-defying approach to music and trailblazing spirit have inspired countless aspiring musicians, leaving a lasting legacy on the music industry.
    
    Conclusion:
    
    Calvin Harris's journey from a young music enthusiast in Scotland to a global electronic dance music sensation is a testament to his unwavering passion, relentless work ethic, and unmatched talent. His ability to evolve and innovate while staying true to his musical roots has earned him the admiration of fans and fellow artists alike. As the EDM world continues to evolve, one thing remains certain: Calvin Harris's musical brilliance and influence will continue to reverberate through the dancefloors, shaping the future of electronic dance music for generations to come.`,
    image: "./images/calvin.jpg" 
};

const hipHopArticles = [
 
  {
    title: "Dr. Dre: The Iconic Producer and Hip-Hop Visionary Who Shaped a Genre",
    content: `In the vast landscape of hip-hop, few figures loom as large as Dr. Dre. As a pioneer, producer, rapper, and visionary, he has left an indelible mark on the music industry, transforming hip-hop into a global cultural phenomenon. From his early days as a member of N.W.A. to his groundbreaking solo work and trailblazing ventures, Dr. Dre's influence and legacy are immeasurable.

    A Glimpse into the Compton Streets:
    
    Born Andre Romelle Young on February 18, 1965, in Compton, California, Dr. Dre's journey into music was deeply rooted in his experiences growing up in a neighborhood marked by socio-economic challenges and racial tensions. However, music offered an escape and an opportunity for Dre to channel his creativity and emotions into something extraordinary.
    
    N.W.A. and the Birth of Gangsta Rap:
    
    In the late 1980s, Dr. Dre, along with Eazy-E, Ice Cube, MC Ren, and DJ Yella, formed the revolutionary rap group N.W.A. Their debut album, "Straight Outta Compton," released in 1988, gave birth to a new subgenre known as gangsta rap. With raw and unapologetic lyrics, N.W.A. shed light on the harsh realities of life in the inner city, challenging societal norms and sparking intense debates.
    
    The Rise of Death Row Records:
    
    In the early 1990s, Dr. Dre co-founded Death Row Records, a record label that would become a powerhouse in the hip-hop industry. Under Death Row, Dre released his seminal solo album, "The Chronic," in 1992. The album was a game-changer, blending funk-infused beats with G-funk elements and featuring collaborations with Snoop Dogg and other notable artists. "The Chronic" solidified Dre's status as a hip-hop icon and set the stage for the West Coast's dominance in the rap scene.
    
    The Evolution of a Producer:
    
    Beyond his exceptional rapping skills, Dr. Dre's true genius lay in his production abilities. Known for his meticulous attention to detail and unmatched ear for crafting unforgettable beats, he became one of the most sought-after producers in the industry. His work with artists like Snoop Dogg, Tupac Shakur, and Eminem elevated their careers and cemented his reputation as a musical visionary.
    
    The Eminem Connection:
    
    In the late 1990s, Dr. Dre took another pivotal step in his career when he discovered and mentored a young, aspiring rapper named Marshall Mathers, known today as Eminem. The collaboration between Dre and Eminem resulted in the release of "The Slim Shady LP," launching Eminem's career into stratospheric heights and further solidifying Dr. Dre's role as a catalyst for new talent.
    
    Aftermath Entertainment and Cultural Impact:
    
    In 1996, Dr. Dre founded Aftermath Entertainment, a record label that would continue to nurture emerging artists and produce groundbreaking albums. Throughout the 2000s, Dr. Dre remained influential behind the scenes, focusing on producing while also working on his own long-awaited album "Detox," which, though it never saw a full release, maintained an aura of anticipation among fans.
    
    A Legacy that Transcends Generations:
    
    Dr. Dre's influence extends far beyond the music he created. His contributions to the hip-hop genre have shaped its trajectory, influencing subsequent generations of artists and producers. Moreover, his business ventures, such as the Beats Electronics headphone line, further solidified his status as a savvy entrepreneur and cultural icon.
    
    Conclusion:
    
    Dr. Dre's journey from the streets of Compton to becoming a titan of the music industry is a testament to his talent, determination, and groundbreaking vision. As an artist, producer, and mentor, he has left an unparalleled legacy that continues to resonate with fans and artists alike. Dr. Dre's imprint on hip-hop culture is timeless, and his impact will forever reverberate through the beats, rhymes, and spirits of generations to come.`,
    image: "./images/dr.jpg" 
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
    videoId: "6vgqRjH4Pmw", // Replace VIDEO_ID with the YouTube video ID you want to display
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
