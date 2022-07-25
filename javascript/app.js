const baseURL = 'https://api.themoviedb.org/3'
const key = '?api_key=7f65f07a5ffa52563f8a6b45d629f577'
const imageURL = 'https://image.tmdb.org/t/p/w500/'
const mainCarousel = document.querySelector('#carouselUpcoming')

const carouselUpcomingFunction = async () => {

    try {
        const response = await fetch(`${baseURL}/movie/upcoming${key}`)
        console.log(response)

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
        }

    } catch (error) {
        console.log(error)
    }


}

//call functions to execute
carouselUpcomingFunction();
