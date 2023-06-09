// ==================== CREAR SECCION ====================
const crearSeccion = (title, nombre, num) => {
    const generalContainer = document.getElementById('generalContainer');
    const div = document.createElement('div');
    div.setAttribute('id', nombre);
    div.classList.add('movies');
    div.innerHTML = `
        <div class="title">
            <h1>${title}</h1>
            <span>Explorar todos</span>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 320 512" style="enable-background:new 0 0 320 512;" xml:space="preserve">
            <path d="M293.7,231.8L99.4,61.8c-14.1-12.4-36.3-12.4-50.4,0L26.3,81.7C19.1,87.9,15,96.8,15,105.9c0,9.1,4.1,17.9,11.2,24.2
            L169.6,256L26.2,381.9C19.1,388.2,15,397,15,406.1c0,9.1,4.1,17.9,11.3,24.2L49,450.2c7.1,6.2,16.1,9.3,25.2,9.3
            c9.1,0,18.1-3.1,25.2-9.3l194.3-169.9h0c7.2-6.3,11.3-15.1,11.3-24.2C305,246.9,300.9,238,293.7,231.8z"/>
            </svg>
        </div>
        <div id="${nombre}Slider" class="slider responsive shadow"></div>
        <div id="prev${num}" class="arrow_prev">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 158.9 315.6" style="enable-background:new 0 0 158.9 315.6;" xml:space="preserve">
            <polygon points="118.5,315.6 158.9,285.4 63.2,157.8 158.9,30.2 118.5,0 0,157.8 "/>
            </svg>
        </div>
        <div id="next${num}" class="arrow_next">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 158.9 315.6" style="enable-background:new 0 0 158.9 315.6;" xml:space="preserve">
            <polygon points="40.3,0 0,30.2 95.7,157.8 0,285.4 40.3,315.6 158.9,157.8 "/>
            </svg>
        </div>
    `
    generalContainer.appendChild(div);
}

// ==================== MOVIE LOGOS ====================
const getLogos = async(type, id) => {
    const logosID = await fetch(`http://api.themoviedb.org/3/${type}/${id}/images?api_key=4c42277c85a8a8f307d358420965071c`);
    try {
        const movie = await logosID.json();
        const movieLogos = movie.logos;
        const logo = movieLogos.find(logo => logo.iso_639_1 == "en") || movieLogos.find(logo => logo.iso_639_1) || movieLogos.find(logo => logo.iso_639_1 == null);
        if (logo !== undefined) {
            return logo.file_path;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

// ==================== MOVIE VIDEOS ====================
const getVideos = async(type, id) => {
    const videoID = await fetch(`http://api.themoviedb.org/3/${type}/${id}/videos?api_key=4c42277c85a8a8f307d358420965071c`);
    try {
        const movie = await videoID.json();
        const results = movie.results.find(video => video.type == "Trailer");
        if (results !== undefined) {
            return results.key
        }
    } catch (error) {
        console.log('Error', error);
    }
    
}


// ==================== CAST MOVIE ====================
const getCredits = async(type, id) => {
    const creditsID = await fetch(`http://api.themoviedb.org/3/${type}/${id}/credits?api_key=4c42277c85a8a8f307d358420965071c`);
    try {
        const movie = await creditsID.json();
        const credits = movie.cast;
        if (credits !== undefined) {
            const names = credits.map(person => person.name);
            const cast = names.slice(0, 4).join(", ");
            return cast;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

// ==================== CREATORS MOVIE ====================
const getCreators = async(type, id) => {
    const creditsID = await fetch(`http://api.themoviedb.org/3/${type}/${id}/credits?api_key=4c42277c85a8a8f307d358420965071c`);
    try {
        const movie = await creditsID.json();
        const credits = movie.crew;
        const names = credits.map(person => person.name);
        const creators = names.slice(0, 2).join(", ");
        return creators;
    } catch (error) {
        console.log('Error', error);
    }
}

// ==================== SIMILAR TITLES ====================
const getSimilar = async(type, id) => {
    const respuesta = await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=4c42277c85a8a8f307d358420965071c&language=es-ES`);
    try {
        const datos = await respuesta.json()
        const filter = datos.results.filter(movie => movie.backdrop_path);
        const moviesResults = filter.slice(0, 9);

        const similarTitles = document.getElementById('similarTitles');
        let i = 0;
        let titles = "";
        moviesResults.forEach(async title => {
            let logo = await getLogos(type, title.id)
            // ----- FOR YOU -----
            const forYou = Math.floor((Math.random() * (99 - 88)) + 88);
            // ----- FECHA -----
            const date = title.release_date || title.last_air_date || title.first_air_date;
            
            if (logo !== undefined) {
                titles += `
                <div id="${title.id}" class="titleCard">
                    <div data-id="${title.id}" class="poster">
                        <img class="titleImg" src="https://image.tmdb.org/t/p/w300/${title.backdrop_path}">
                        <div class="titleLogo">
                            <img src="https://image.tmdb.org/t/p/w154/${logo}">
                        </div>
                        <svg class="play" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="titleCard-playSVG"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                    </div>
                    <div class="titleMeta">
                        <div data-id="${title.id}" class="metaL">
                            <span class="forYou">${forYou} % para ti</span>
                            <span class="age">18+</span>
                            <span class="year">${date.slice(0, 4)}</span>
                        </div>
                        <div data-image="add" class="metaR">
                            <img class="metaImg" data-image="add" src="../img/add.svg">
                        </div>
                    </div>
                    <div data-id="${title.id}" class="overview">
                        <p>${title.overview}</p>
                    </div>
                </div>`
            } else{
                titles += `
                <div id="${title.id}" class="titleCard">
                    <div data-id="${title.id}" class="poster">
                        <img class="titleImg" src="https://image.tmdb.org/t/p/w300/${title.backdrop_path}">
                        <svg class="play" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="titleCard-playSVG"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                    </div>
                    <div class="titleMeta">
                        <div data-id="${title.id}" class="metaL">
                            <span class="forYou">${forYou} % para ti</span>
                            <span class="age">18+</span>
                            <span class="year">${date.slice(0, 4)}</span>
                        </div>
                        <div data-image="add" class="metaR">
                            <img class="metaImg" data-image="add" src="../img/add.svg">
                        </div>
                    </div>
                    <div data-id="${title.id}" class="overview">
                        <p>${title.overview}</p>
                    </div>
                </div>`
            }
            similarTitles.innerHTML = titles;
            i++
        });

        $(similarTitles).on('click', '.poster', function (e){
            const id = $(e.currentTarget).attr("data-id");
            getInfo(type, id);
            // console.clear();
        });

        $(similarTitles).on('click', '.metaL', function (e){
            const id = $(e.currentTarget).attr("data-id");
            getInfo(type, id);
            // console.clear();
        });

        $(similarTitles).on('click', '.overview', function (e){
            const id = $(e.currentTarget).attr("data-id");
            getInfo(type, id);
            // console.clear();
        });

        $(similarTitles).on('click', '.metaImg', function (e){
            const id = $(e.currentTarget).attr("data-image");
            if (id == "add") {
                this.src = "../img/added.svg";
                this.dataset.image = "added";
            }else if (id == "added") {
                this.src = "../img/add.svg";
                this.dataset.image = "add";
            }
        });

        // const miLista = document.querySelector('.miLista');
        // const imgList = document.querySelector('.imgList');
        // miLista.addEventListener('click', ()=>{
        //     if (imgList.dataset.image == "add") {
        //         imgList.src = "../img/added.svg";
        //         imgList.dataset.image = "added";
        //         return
        //     }else if (imgList.dataset.image == "added") {
        //         imgList.src = "../img/add.svg";
        //         imgList.dataset.image = "add";
        //     }
        // })
    } catch (error) {
        console.log('Error', error);
    }
}

// ==================== INFORMACION ====================
const bgInfo = document.getElementById('bgInfo');
const movieInfo = document.getElementById('movieInfo');

const getInfo = async(type, id) => {
    const respuesta = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4c42277c85a8a8f307d358420965071c&language=es-ES`);
    try {
        const datos = await respuesta.json();
        // ----- DURACION -----
        if (type == "movie") {
            const horas = Math.floor(datos.runtime / 60);
            minutos = datos.runtime % 60;
            var duracion = `${horas} h ${minutos} min`
        } else if(type == "tv") {
            if (datos.number_of_seasons == 1) {
                var duracion = `${datos.number_of_episodes} episodios`
            } else{
                var duracion = `${datos.number_of_seasons} temporadas`
            }
        }

        // ----- GENERO -----
        const genres = datos.genres;
        const generos = genres.map(genero => genero.name);
        const gene = generos.join(", ");

        // ----- FECHA -----
        const date = datos.release_date || datos.last_air_date || datos.first_air_date;
        // ----- FOR YOU -----
        const forYou = Math.floor((Math.random() * (99 - 88)) + 88);
        // TITLE
        const title = datos.name || datos.title || datos.original_name || datos.original_title

        const titlePage = document.getElementById('titlePage');
        titlePage.innerText = `${title}`

        // ----- VARS -----
        logoURL = await getLogos(type, id);
        cast = await getCredits(type, id);
        creators = await getCreators(type, id);
        videoKey = await getVideos(type, id);

        bgInfo.classList.add('bgInfo');
        movieInfo.classList.add('movieInfo');
        if (logoURL == undefined) {
            movieInfo.innerHTML = `
            <div class="imgInfo">
                <div id="backdrop">
                    <iframe id="player" class="player" width="900" height="510" src="https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&controls=0&iv_load_policy=3&showinfo=1&rel=0&fs=0&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <img class="backdrop" src="https://image.tmdb.org/t/p/w1280/${datos.backdrop_path}">
                </div>
                <div class="logoBtns">
                    <button id="btnPlay" class="reproducir">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                        <span>Reproducir</span>
                    </button>
                    <button class="miLista">
                        <img class="imgList" data-image="add" src="../img/add.svg">
                        <div class="listText">
                            <span>Agregar a Mi lista</span>
                        </div>
                    </button>
                    <button class="rate">
                        <div class="yourRate">
                            <img src="../img/like.svg">
                        </div>
                        <div class="scores">
                            <div class="score" data-image="dislike">
                                <img src="../img/dislike.svg">
                                <div class="listText">
                                    <span>No es para mí</span>
                                </div>
                            </div>
                            <div class="score" data-image="like">
                                <img src="../img/like.svg">
                                <div class="listText">
                                    <span>Me gusta</span>
                                </div>
                            </div>
                            <div class="score" data-image="loves">
                                <img src="../img/loves.svg">
                                <div class="listText">
                                    <span>Me encanta</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                <div id="exit" class="exit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-uia="previewModal-closebtn" role="button" aria-label="close" tabindex="0"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="#fff"></path></svg>
                </div>
                <div class="sound">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="#fff"></path></svg>            </div>
                </div>
                <div class="shadowBack"></div>
            </div>
            <div class="info">
                <div class="metadataL">
                    <div class="metadata">
                        <span class="forYou">${forYou} % para ti</span>
                        <span class="year">${date.slice(0, 4)}</span>
                        <span class="duration">${duracion}</span>
                        <span class="quality">HD</span>
                        <svg viewBox="0 0 58.07 24" class="svg-icon svg-icon-audio-description"><path fill="#fff" d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z" transform="translate(-0.5 -2.62)"></path></svg>
                    </div>
                    <div class="sipnosis">
                        <p>${datos.overview}</p>
                    </div>
                </div>
                <div class="metadataR">
                    <div class="created"><span>Elenco:</span> ${cast}, y más</div>
                    <div class="created"><span>Géneros:</span> ${gene}</div>
                    <div class="created"><span>Creado por:</span> ${creators}</div>
                </div>
                <div class="similar">
                    <h3>Más títulos similares a este</h3>
                    <div class="titlesContainer">
                        <div id="similarTitles" class="similarTitles">
                            
                        </div>
                    </div>
                </div>
                <div class="acercaDe">
                    <h3>Acerca de <span>${title}</span></h3>
                    <div class="created"><span>Creado por:</span> ${creators}</div>
                    <div class="created"><span>Elenco:</span> ${cast}, y más</div>
                    <div class="created"><span>Géneros:</span> ${gene}</div>
                </div>
            </div>
            `
            await getSimilar(type, id);
        } else if (logoURL !== undefined){
            movieInfo.innerHTML = `
            <div class="imgInfo">
                <div id="backdrop">
                    <iframe id="player" class="player" width="900" height="510" src="https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&controls=0&iv_load_policy=3&showinfo=1&rel=0&fs=0&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <img class="backdrop" src="https://image.tmdb.org/t/p/w1280/${datos.backdrop_path}">
                </div>
                <div class="logoBtns">
                    <div class="divLogo">
                        <img class="logo" src="https://image.tmdb.org/t/p/w300/${logoURL}">
                    </div>
                    <button id="btnPlay" class="reproducir">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                        <span>Reproducir</span>
                    </button>
                    <button class="miLista">
                        <img class="imgList" data-image="add" src="../img/add.svg">
                        <div class="listText">
                            <span>Agregar a Mi lista</span>
                        </div>
                    </button>
                    <button class="rate">
                        <div class="yourRate">
                            <img src="../img/like.svg">
                        </div>
                        <div class="scores">
                            <div class="score" data-image="dislike">
                                <img src="../img/dislike.svg">
                                <div class="listText">
                                    <span>No es para mí</span>
                                </div>
                            </div>
                            <div class="score" data-image="like">
                                <img src="../img/like.svg">
                                <div class="listText">
                                    <span>Me gusta</span>
                                </div>
                            </div>
                            <div class="score" data-image="loves">
                                <img src="../img/loves.svg">
                                <div class="listText">
                                    <span>Me encanta</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                <div id="exit" class="exit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard" data-uia="previewModal-closebtn" role="button" aria-label="close" tabindex="0"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="#fff"></path></svg>
                </div>
                <div class="sound">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="#fff"></path></svg>
                </div>
                <div class="shadowBack"></div>
            </div>
            <div class="info">
                <div class="metadataL">
                    <div class="metadata">
                        <span class="forYou">${forYou} % para ti</span>
                        <span class="year">${date.slice(0, 4)}</span>
                        <span class="duration">${duracion}</span>
                        <span class="quality">HD</span>
                        <svg viewBox="0 0 58.07 24" class="svg-icon svg-icon-audio-description"><path fill="#fff" d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z" transform="translate(-0.5 -2.62)"></path><path fill="#fff" d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z" transform="translate(-0.5 -2.62)"></path></svg>
                    </div>
                    <div class="sipnosis">
                        <p>${datos.overview}</p>
                    </div>
                </div>
                <div class="metadataR">
                    <div class="created"><span>Elenco:</span> ${cast}, y más</div>
                    <div class="created"><span>Géneros:</span> ${gene}</div>
                    <div class="created"><span>Creado por:</span> ${creators}</div>
                </div>
                <div class="similar">
                    <h3>Más títulos similares a este</h3>
                    <div class="titlesContainer">
                        <div id="similarTitles" class="similarTitles">
                            
                        </div>
                    </div>
                </div>
                <div class="acercaDe">
                    <h3>Acerca de <span>${title}</span></h3>
                    <div class="created"><span>Creado por:</span> ${creators}</div>
                    <div class="created"><span>Elenco:</span> ${cast}, y más</div>
                    <div class="created"><span>Géneros:</span> ${gene}</div>
                </div>
            </div>
            `
            await getSimilar(type, id);
        }
        if (videoKey !== undefined) {
            setTimeout(async function(){
                const backdrop = document.querySelector('.backdrop');
                backdrop.style.opacity = '0';
            }, 5000);
        }
        const miLista = document.querySelector('.miLista');
        const imgList = document.querySelector('.imgList');
        const listText = document.querySelector('.listText span')
        miLista.addEventListener('click', ()=>{
            if (imgList.dataset.image == "add") {
                imgList.src = "../img/added.svg";
                imgList.dataset.image = "added";
                listText.innerText = "Quitar de Mi lista";
            }else if (imgList.dataset.image == "added") {
                imgList.src = "../img/add.svg";
                imgList.dataset.image = "add";
                listText.innerText = "Agregar a Mi lista";
            }
        });
        
        const scores = document.querySelectorAll('.score');
        const yourRate = document.querySelector('.yourRate img')

        for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            score.addEventListener('click', ()=>{
                const data = score.dataset.image;
                if (yourRate.getAttribute("src") == `../img/${data}1.svg`) {
                    yourRate.setAttribute("src", `../img/like.svg`);
                } else{
                    yourRate.setAttribute("src", `../img/${data}1.svg`);
                }
            })
        }
    } catch (error) {
        console.log('Error', error);
    }
}


// ====================== CARGAR PELICULAS ======================
const cargarPeliculas = async(type, movies, movies2, title, nombre, num, container) => {
    const respuesta = await fetch(`https://api.themoviedb.org/3/${movies}?api_key=4c42277c85a8a8f307d358420965071c&${movies2}`);
    try {
        const datos = await respuesta.json()

        crearSeccion(title, nombre, num);
        let peliculas = "";
        const moviesResults = datos.results;
        moviesResults.forEach(pelicula => {
            peliculas += `
            <div id="${pelicula.id}" class="card">
                <img class="cardImg" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            </div>`
            document.getElementById(container).innerHTML = peliculas;
        });
        
        // ---------- PEDIR INFO ----------
        $(`#${nombre}Slider`).on('click', '.card', async function (e){
            const id = $(e.currentTarget).attr("id");
            await getInfo(type, id);
            movieInfo.clientHeight
            movieInfo.style.opacity = "1";
            movieInfo.style.transform = "scale(1.0)";
            bgInfo.style.opacity = "1";
            // console.clear();
        });
    
        // ---------- EXIT CARD INFO ----------
        window.addEventListener('click', function(e){
            const exit = document.getElementById('exit');
            if (!movieInfo.contains(e.target) || exit.contains(e.target)){
                movieInfo.style.opacity = "0";
                movieInfo.style.transform = "scale(0.90)";
                bgInfo.style.opacity = "0";
                if (movieInfo.innerHTML !== "") {
                    setTimeout(() => {
                    movieInfo.classList.remove('movieInfo');
                    movieInfo.innerHTML = "";
                    bgInfo.classList.remove('bgInfo');
                }, 300);
                }
                const titlePage = document.getElementById('titlePage');
                titlePage.innerText = "Home - Nesquik";
                // console.clear();
            }
        });
    
        // ---------- CREAR CARROUSEL ----------
        $(`#${nombre}Slider`).slick({
            prevArrow: `#prev${num}`,
            nextArrow: `#next${num}`,
            dots: true,
            infinite: true,
            speed: 700,
            slidesToShow: 6,
            slidesToScroll: 6,
            autoplay: false,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    autoplay: false,
                    }
                },
                {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    autoplay: false,
                    }
                },
                {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: false,
                    }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: false,
                    }
                }
            ]
        });
        $(`#${nombre}Slider`).slick('slickSetOption', 'slidesToScroll', 6, true);
    } catch (error) {
        console.log('Error', error);
    }
}

cargarPeliculas("tv", "discover/tv", "sort_by=first_air_date.desc&with_networks=213&with_status=3&page=4", "Agregados recientemente","latest", "1", "latestSlider");
cargarPeliculas("movie", "discover/movie", "with_genres=28", "Peliculas de acción","action", "2", "actionSlider");
cargarPeliculas("tv", "discover/tv", "with_networks=213", "Tendencias","trends", "3", "trendsSlider");
cargarPeliculas("movie", "discover/movie", "with_genres=35&page=4", "Comedias","comedia", "4", "comediaSlider");
cargarPeliculas("tv", "discover/tv", "with_networks=213&with_genres=18&page=2", "Series dramáticas","tvDrama", "5", "tvDramaSlider");
cargarPeliculas("tv", "discover/tv", "with_networks=213&with_original_language=ko", "Series coreanas","corea", "6", "coreaSlider");