const baseURL = 'https://api.themoviedb.org/3'
const key = '?api_key=7f65f07a5ffa52563f8a6b45d629f577'
const imageURL = 'https://image.tmdb.org/t/p/w500/'

//get variables in the DOM
const displayGenres = document.getElementById('genresDisplay')
const mainCarousel = document.querySelector('#carouselUpcoming')
const tagsElement = document.getElementById('sections')
const mainContainer = document.getElementById('mainContainer')
const topRated = document.getElementById('carouselMovies')
const arrowLeft = document.getElementById('btnLeft')
const arrowRight = document.getElementById('btnRight')


//button to show the available genres NOTE: HIDE IS NOT WORKING
displayGenres.addEventListener('click', () => {    
    tagsElement.innerHTML = '';
    genres.forEach(genre =>{
        const tagEl = document.createElement('button');
        tagEl.classList.add('col' , 'mb-3' ,'rounded-pill', 'bg-danger', 'm-3', 'p-1', 'text-center' , 'tag');
        tagEl.id = genre.id;
        tagEl.innerText = genre.name;
        tagsElement.append(tagEl)
    })
})

//upcoming movies carousel
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
        }else if(response.status == 401){
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
        }else if(response.status == 404){
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
        }else{

        }

    } catch (error) {
        console.log(error)
    }

}

function clearMainSection(){
    mainContainer.innerHTML = ''
}

const carouselTopRated = async () =>{
    try{
        const response = await fetch(`${baseURL}/movie/top_rated${key}`)
        if (response.status === 200){
            const data = await response.json();
            console.log(data)
            data.results.forEach(movie =>{
                const carouselTopRated = document.createElement('div')
                carouselTopRated.classList.add('movie')
                carouselTopRated.innerHTML = `
                    <a href="#"><img src="${imageURL}${movie.poster_path}" alt="${movie.original_title}"></a>
                `
                topRated.appendChild(carouselTopRated)
            })

        }
    }catch(error){

    }
}

arrowLeft.addEventListener('click', () =>{
    topRated.scrollLeft += topRated.offsetWidth;
})
/*
flechaDer.addEventListener('click', () =>{
    fila.scrollLeft += fila.offsetWidth;

    //para cambiar el indicador si se cambia con las flechas
    const indicatorActive = document.querySelector('.indicadores .active');
    if(indicatorActive.nextSibling){
        indicatorActive.nextSibling.classList.add('active')
        indicatorActive.classList.remove('active')
    }
}) */
//call functions to execute
carouselUpcomingFunction();
carouselTopRated();