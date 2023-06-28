import { TITLE_TYPE } from "./dictionary";


export const getYear = (title, setMetadata) => {
  const year =  title?.first_air_date?.split("-")[0] ||
                title?.release_date?.split("-")[0];
  setMetadata(prev => ({...prev, year: year}));
}

export const getDuration = (title, setMetadata) => {
  if (title?.type === TITLE_TYPE.TV) {
    const duration = title?.number_of_seasons > 1 ? `${title?.number_of_seasons} temporadas`
                                                  : `${title?.number_of_episodes} episodios`;
    setMetadata(prev => ({...prev, duration: duration}));
  } else if (title?.type === TITLE_TYPE.MOVIE) {
    const hours = Math.floor(title.runtime / 60);
    const min = title.runtime % 60;
    const duration = `${hours} h ${min} min`;
    setMetadata(prev => ({...prev, duration: duration}));
  }
}

export const getCast = (title, setMetadata) => {
  const cast = title.cast.slice(0, 3).map(actor => actor.name);
  setMetadata(prev => ({...prev, cast: cast}));
}

export const getGenres = (title, setMetadata) => {
  const genres = title.genres.map(genre => genre.name);
  setMetadata(prev => ({...prev, genres: genres}));
}

export const getCrew = (title, setMetadata) => {
  const crew = title.crew.slice(0, 3).map(person => person.name);
  setMetadata(prev => ({...prev, crew: crew}));
}

export const getForYou = (setMetadata) => {
  const number = Math.floor((Math.random() * (99 - 88)) + 88);
  setMetadata(prev => ({...prev, forYou: number}));
}