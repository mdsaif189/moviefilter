const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let search = document.querySelector("#search");
let moiveBox = document.querySelector("#movie-box");

async function getMovies(url) {
  try {
    let response = await fetch(url);
    // if (!response.ok) {
      let data = await response.json();
      console.log(data);
      showMovies(data)
    // }
  } catch (error) {
    console.log("error");
  }
}
 getMovies(APIURL);


const showMovies = (data) => {
    moiveBox.innerHTML = "";
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;

            const box = document.createElement("div")
            box.classList.add("box")
            box.innerHTML = `
                <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title">
                        <h2> ${result.original_title}  </h2>
                        <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p>
                        ${result.overview}
                    </p>
                 </div>
            `
            moiveBox.appendChild(box)
        }
    )
}

search.addEventListener("keyup",(event)=> {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL);
        }
    }
)

