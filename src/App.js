import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header/Header";
import { lightTheme, darkTheme } from "../src/theme";
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";

import MovieDetails from "./components/moviedetails/MovieDetails";
import Trending from "./NavbarRouts/Movies/trending/Trending";
import TopRated from "./NavbarRouts/Movies/Toprated/TopRated";
import Upcoming from "./NavbarRouts/Movies/Upcoming/Upcoming";

import TrendingTv from "./NavbarRouts/TvShows/trending/TrendingTv";
import TopRatedTv from "./NavbarRouts/TvShows/Toprated/TopRatedTv";
import UpComingTv from "./NavbarRouts/TvShows/Upcoming/UpComingTv";
import PopularPeoples from "./NavbarRouts/Poeples/PopularPeoples";
import TrendingMore from "./NavbarRouts/More/trending/TrendingMore";
import TopRatedMore from "./NavbarRouts/More/Toprated/TopRatedMore";
import UpComingMore from "./NavbarRouts/More/Upcoming/UpComingMore";
import PopularMovie from "./NavbarRouts/Movies/Popular/PopularMovie";
import PeopleDatiels from "./NavbarRouts/Poeples/PeopleDatiels";
import TVSeriesDetails from "./NavbarRouts/Poeples/TVSeriesDetails";
import Punjabi from "./NavbarRouts/MoviesCategories/punjabi/Punjabi";
import English from "./NavbarRouts/MoviesCategories/english/English";
import Hindi from "./NavbarRouts/MoviesCategories/hindi/Hindi";
import Cartoons from "./NavbarRouts/cartoons/Cartoons";
import AllSeasons from "./NavbarRouts/seasons/AllSeasons";
import SeasonEpisodes from "./NavbarRouts/seasons/SeasonEpisodes";
import EpisodePlayer from "./NavbarRouts/seasons/EpisodePlayer";
import Fitness from "./NavbarRouts/fitness/Fitness";
import Trailers from "./NavbarRouts/trailers/Trailers";
import Songs from "./NavbarRouts/songs/Songs";
import RecentlyMovie from "./NavbarRouts/recent/RecentlyMovie";
import PakTvDrama from "./NavbarRouts/dramas/PakTvDrama";
import DramaEpisodes from "./NavbarRouts/dramas/DramaEpisodes";
import DramaPlayer from "./NavbarRouts/dramas/DramaPlayer";
import LogoScreen from "./OpeningScreen/LogoScreen";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {location.pathname !== "/" && <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/" element={<LogoScreen />} />
        <Route path="/movie-dashboard" element={<TrendingMovies />} />
        <Route path="/zxyxvyXdF/:id" element={<MovieDetails />} />

        {/* Navbar routes */}
        {/* Movies */}
        <Route path="/movies/PopularMovies" element={<PopularMovie />} />
        <Route path="/movies/nowPlaying" element={<Trending />} />
        <Route path="/movies/topRated" element={<TopRated />} />
        <Route path="/movies/upComing" element={<Upcoming />} />

        {/* Trailers */}
        <Route path="/movies-trailers-latest-trailers" element={<Trailers />} />

        {/* TvShows */}
        <Route path="/TvShow/trending" element={<TrendingTv />} />
        <Route path="/TvShow/topRated" element={<TopRatedTv />} />
        <Route path="/TvShow/upComing" element={<UpComingTv />} />

        {/* People */}
        <Route path="/people/popularPeople" element={<PopularPeoples />} />
        <Route path="/people/detail/:id" element={<PeopleDatiels />} />

        {/* More */}
        <Route path="/more/trending" element={<TrendingMore />} />
        <Route path="/more/topRated" element={<TopRatedMore />} />
        <Route path="/more/upComing" element={<UpComingMore />} />

        <Route path="/detail/tv-series/:seriesId" element={<TVSeriesDetails />} />

        {/* Categories Movies */}
        <Route path="/movies/punjabi-movies" element={<Punjabi />} />
        <Route path="/movies/english-movies" element={<English />} />
        <Route path="/movies/hindi-movies" element={<Hindi />} />
        <Route path="/all-cartoons" element={<Cartoons />} />

        {/* Seasons */}
        <Route path="/all-seasons" element={<AllSeasons />} />
        <Route path="/season/:id" element={<SeasonEpisodes />} />
        <Route path="/movie/season/episodes" element={<EpisodePlayer />} />

        {/* Fitness */}
        <Route path="/health-&-exercise-&-fitness" element={<Fitness />} />

        {/* Songs */}
        <Route path="/all-hi-ur-en-pun-songs" element={<Songs />} />

        {/* Recently Movies */}
        <Route path="/all-recently-movies" element={<RecentlyMovie />} />
        <Route path="/all-pak-tv-darama" element={<PakTvDrama />} />
        <Route path="/drama/:name" element={<DramaEpisodes />} />
        <Route path="/drama-pak-tv-episode-play" element={<DramaPlayer />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
