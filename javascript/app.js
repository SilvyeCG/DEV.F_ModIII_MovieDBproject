const baseURL = 'https://api.themoviedb.org/3'
const key = '?api_key=7f65f07a5ffa52563f8a6b45d629f577'
const imageURL = 'https://image.tmdb.org/t/p/w500/'

//get variables in the DOM
const homePageLoad = document.getElementById('homePageButton')
const displayGenres = document.getElementById('genresDisplay')
const tagsElement = document.getElementById('sections')
const closeElement = document.getElementById('closeSections')
const closeGenresSec = document.getElementById('closeGenreSection')
const mainCarousel = document.querySelector('#carouselUpcoming')
const mainContainer = document.getElementById('mainContainer')
const resultSearch = document.getElementById('searchBar')
const movieDetails = document.getElementById('castDetails')

homePageLoad.addEventListener('click', () =>{
    window.location.href = './index.html'
})

//buttons to show/hide the available genres NOTE: HIDE IS NOT WORKING

displayGenres.addEventListener('click', () => {
    tagsElement.innerHTML = '';
    closeElement.innerHTML = '';
    genres.forEach(genre => {
        const tagEl = document.createElement('button');
        tagEl.classList.add('col', 'mb-3', 'rounded-pill', 'bg-danger', 'm-3', 'p-1', 'text-center', 'tag');
        tagEl.id = genre.id;
        tagEl.innerText = genre.name;
        tagsElement.append(tagEl)
    })

    const closeEl = document.createElement('button');
    closeEl.setAttribute('id', 'closeGenreSection')
    closeEl.classList.add('col', 'mb-3', 'rounded-pill', 'border-info', 'border-2','m-3', 'p-1', 'text-center', 'text-white', 'bg-transparent');
    closeEl.innerHTML = `
        <i class="bi bi-chevron-double-up"></i>
    `
    closeElement.append(closeEl)

    
})

closeGenresSec?.addEventListener('click', () =>{
    
    tagsElement.innerHTML = '';
    closeElement.innerHTML = '';

})

//UPCOMING MOVIES CAROUSEL
const carouselUpcomingFunction = async () => {

    try {
        const response = await fetch(`${baseURL}/movie/upcoming${key}`)
        //verify the response status
        if (response.status === 200) {
            const data = await response.json();
            data.results.forEach(movie => {
                const carouselMoviesUpcoming = document.createElement('div')
                carouselMoviesUpcoming.classList.add('carousel-item')
                carouselMoviesUpcoming.innerHTML = `
                    <img src="${imageURL}${movie.poster_path}" class="d-block w-100" alt="...">
                `
                mainCarousel.appendChild(carouselMoviesUpcoming);
            });
        } else if (response.status == 401) {
            clearMainSection();
            const errorMessage = document.createElement('div')
            errorMessage.classList.add('container')
            errorMessage.innerHTML = `
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-danger text-center fw-bolder">Error: ${response.status}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-white text-center fw-bolder">Something went wrong. API Key invalid</p>
                    </div>
                </div>
            `
            mainContainer.appendChild(errorMessage)
        } else if (response.status == 404) {
            clearMainSection();
            const errorMessage = document.createElement('div')
            errorMessage.classList.add('container')
            errorMessage.innerHTML = `
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-danger text-center fw-bolder">Error: ${response.status}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-white text-center fw-bolder">Something went wrong. Results were not found</p>
                    </div>
                </div>
            `
            mainContainer.appendChild(errorMessage)
        } else {

        }

    } catch (error) {
        console.log(error)
    }

}

function clearMainSection() {
    mainContainer.innerHTML = ''
}

const TopRated = async () => {
    try {
        const response = await fetch(`${baseURL}/movie/top_rated${key}`)
        if (response.status === 200) {
            const data = await response.json();
            loadMovies(data)
        }
    } catch (error) {
        console.log(error)
    }
}


// async function getMovieDetails(movieId) {
//     let idMovieDetail = movieId
//     const  cast = await fetch(`${baseURL}/movie/${idMovieDetail}/credits${key}`)
//     if (cast.status ===200) {
//         const dataCast = await cast.json();
//         console.log(dataCast.cast)
//         window.location.href = './pages/movieDetails.html'
//         let castDetails = ''
//         dataCast.cast.forEach(actor =>{
//             console.log(actor.name)
            
//             castDetails += `
//                 <div class="col mb-3">
//                     <a href="#" id="movieInfo"><img class='img-fluid' src= '${imageURL}${actor.profile_path}' alt=""></a>
//                     <p class='title text-info text-center'>${actor.name}</p>
//                 </div>
//             `
//             document.getElementById('castDetails').innerHTML = castDetails
//         })
//     }

// }

function getMovieDetails(movieId) {

    //window.location.href = '../pages/movieDetails.html'
    movieData(movieId)
    castMovie(movieId)

    async function movieData(movieId){
        try{
            const response = await fetch(`${baseURL}/movie/${movieId}${key}`)
            if(response.status === 200){
                const data = await response.json();
                console.log(data.title)
            }
        }catch(error){
            console.log(error)
        }
    }

     async function castMovie(movieId){
         try {
             const cast = await fetch(`${baseURL}/movie/${movieId}/credits${key}`)
             if (cast.status === 200) {
                 const dataCast = await cast.json();
 
                 console.log(dataCast.cast)
                 // let castDetails = ''
                 dataCast.cast.forEach(actor => {
                     //console.log(actor.name)

                 })
             }
         } catch (error) {
             console.log(error)
         }
     }
 }

function loadMovies(data) {
    let movies = ''
    let i = 0
    data.results.forEach(movie => {
        if (i < 15) {
            movies += `
        <div class='col mb-3' onclick='getMovieDetails(${movie.id})'>
            <div class="card bg-black flex-row border border-danger  border-3">
                <div class="w-50">
                    <a href="#" id="movieInfo"><img class='img-fluid' src= '${imageURL}${movie.poster_path}'></a>
                </div>
                <div class="card-body">
                    <a href="#" id="movieInfo" class="bg-info text-center fs-4"><p class='title text-info'>${movie.title}</p></a>
                    <p class="text-transparent text-center fs-5"> . </p>
                    <p class="text-white text-center fs-5">Vote average:</p>
                    <p class="text-center text-danger fs-2">${movie.vote_average}</p>
                </div>
                
            </div> 
        </div>
        `
            document.getElementById('contenedor').innerHTML = movies
            i++
        }
    })

}

//call functions to execute
carouselUpcomingFunction();
TopRated();


/*
 fetch:

 1. para buscar peliculas por nombre:

...search/movie?api_key=7f65f07a5ffa52563f8a6b45d629f577&query=The+Curse+of+the+Black+pearl
{baseURL}/search/movie${key}&query=${queryData}


*/