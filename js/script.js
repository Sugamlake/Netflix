// descargar peliculas
const downloadMovies = (movies) => {
    movies.forEach(typeMovie => {
        fetch(`http://www.omdbapi.com/?s=${typeMovie}&apikey=${apiKey}`).then(
            async (res) => {
                let data = JSON.parse(await res.text()).Search;
                console.log(data);
                printMovie(typeMovie,analizeData(data))
            }
        )
    });
}
// tratamiento de la película: Posters
const analizeData = (movies) => {
    return movies.map((movie) => ({
        ...movie,
        Poster:
            movie.Poster === "N/A"
            ? "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
            : movie.Poster,
    }));
};
// pintar película: Carrusel
const printMovie = (typeMovie,movies) => {
    let mainSection = document.getElementById("mainSection");
    mainSection.innerHTML += `
    <div class="movie__section">
        <h1>Movies about ${typeMovie}</h1>
        <div class="mainSection__carousel" id="section${typeMovie}">
        </div>
    </div>
    `;
    let sectionMovie = document.getElementById(`section${typeMovie}`);
    movies.forEach(movie => {
        sectionMovie.innerHTML += `
            <div class="carouselCard">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div class="carouselText">
                    <h2>${movie.Title}</h2>
                <div>
            </div>
        `
    })
}
// llamar la función downloadMovies
downloadMovies(["Iron Man", "Jurassic World", "Marvel", "Disney", "Cowboys", "sex", "Animals","Comedy", "Impossible Mission", "Thriller", "Game of thrones", "Batman", "Top gun", "Caribbean Pirates"])
