import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, InputBase, Box, Menu, MenuItem, CssBaseline, Container, CircularProgress, Drawer, List, ListItem, Select
} from "@mui/material";
import { Search, Close, WbSunny, Brightness4, Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const SearchContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  padding: "5px 10px",
  borderRadius: "5px",
  width: "100%",
}));

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorMovie, setAnchorMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorPeople, setAnchorPeople] = useState(null);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#fff";
  }, [isDarkMode]);


  // const countryOptions = [
  //   { value: "en", label: "🇺🇸 English" },
  //   { value: "fr", label: "🇫🇷 French" },
  //   { value: "de", label: "🇩🇪 German" },
  //   { value: "es", label: "🇪🇸 Spanish" },
  //   { value: "zh", label: "🇨🇳 Chinese" },
  //   { value: "ar", label: "🇸🇦 Arabic" },
  //   { value: "hi", label: "🇮🇳 Hindi" },
  //   { value: "ru", label: "🇷🇺 Russian" },
  //   { value: "ja", label: "🇯🇵 Japanese" },
  //   { value: "pt", label: "🇵🇹 Portuguese" },
  //   { value: "it", label: "🇮🇹 Italian" },
  //   { value: "ko", label: "🇰🇷 Korean" },
  //   { value: "nl", label: "🇳🇱 Dutch" },
  //   { value: "tr", label: "🇹🇷 Turkish" },
  //   { value: "sv", label: "🇸🇪 Swedish" },
  //   { value: "pl", label: "🇵🇱 Polish" },
  //   { value: "uk", label: "🇺🇦 Ukrainian" },
  //   { value: "th", label: "🇹🇭 Thai" },
  //   { value: "id", label: "🇮🇩 Indonesian" },
  //   { value: "vi", label: "🇻🇳 Vietnamese" },
  //   { value: "fi", label: "🇫🇮 Finnish" },
  //   { value: "el", label: "🇬🇷 Greek" },
  //   { value: "he", label: "🇮🇱 Hebrew" },
  //   { value: "hu", label: "🇭🇺 Hungarian" },
  //   { value: "cs", label: "🇨🇿 Czech" },
  //   { value: "da", label: "🇩🇰 Danish" },
  //   { value: "no", label: "🇳🇴 Norwegian" },
  //   { value: "ro", label: "🇷🇴 Romanian" },
  //   { value: "bg", label: "🇧🇬 Bulgarian" },
  //   { value: "ms", label: "🇲🇾 Malay" },
  //   { value: "fa", label: "🇮🇷 Persian" },
  //   { value: "ta", label: "🇱🇰 Tamil" },
  //   { value: "ur", label: "🇵🇰 Urdu" },
  //   { value: "bn", label: "🇧🇩 Bengali" },
  //   { value: "sk", label: "🇸🇰 Slovak" },
  //   { value: "sr", label: "🇷🇸 Serbian" },
  //   { value: "hr", label: "🇭🇷 Croatian" },
  //   { value: "lt", label: "🇱🇹 Lithuanian" },
  //   { value: "lv", label: "🇱🇻 Latvian" },
  //   { value: "et", label: "🇪🇪 Estonian" },
  //   { value: "sl", label: "🇸🇮 Slovenian" },
  //   { value: "is", label: "🇮🇸 Icelandic" },
  //   { value: "mt", label: "🇲🇹 Maltese" },
  //   { value: "ga", label: "🇮🇪 Irish" },
  //   { value: "cy", label: "🏴 Welsh" },
  //   { value: "eu", label: "🇪🇸 Basque" },
  //   { value: "gl", label: "🇪🇸 Galician" },
  //   { value: "af", label: "🇿🇦 Afrikaans" },
  //   { value: "sw", label: "🇰🇪 Swahili" },
  // ];


  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/dashboard/search`, {
        params: { query },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  const handleThemeToggle = () => setIsDarkMode(!isDarkMode);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: isDarkMode ? "black" : "#032541" }}>
        <>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Mobile Menu Button */}
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { xs: "block", md: "none" } }}>
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* Menu Icon (Visible only on laptop screens) */}
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#fff" }}>
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Drawer Menu */}
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ cursor: "pointer", display: 'flex', padding: '15px', backgroundColor: '#032541' }} onClick={() => { navigate('/movie-dashboard'); setMobileOpen(false) }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginRight: '6px' }}>
                    NestFllix
                  </Typography>
                  <Box sx={{ background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", width: '60px', height: '16px', borderRadius: '20px', marginTop: '8px' }}></Box>

                </Box>
                <List>
                  <ListItem button onClick={() => { setDrawerOpen(false); navigate('/movies/punjabi-movies'); }} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    <LanguageIcon sx={{ mr: 2, color: '#0fadbf' }} /> Punjabi movies
                  </ListItem>
                  <ListItem button onClick={() => { setDrawerOpen(false); navigate('/movies/hindi-movies'); }} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    <LanguageIcon sx={{ mr: 2, color: '#0fadbf' }} /> Hindi movies
                  </ListItem>
                  <ListItem button onClick={() => { setDrawerOpen(false); navigate('/movies/english-movies'); }} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    <LanguageIcon sx={{ mr: 2, color: '#0fadbf' }} /> English movies
                  </ListItem>
                  <ListItem button onClick={() => { setDrawerOpen(false); navigate('/all-cartoons'); }} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    <ChildCareIcon sx={{ mr: 2, color: '#0fadbf' }} /> Cartoons
                  </ListItem>
                  <ListItem button onClick={() => { setDrawerOpen(false); navigate('/all-hi-ur-en-pun-songs'); }} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    <LibraryMusicIcon sx={{ color: '#0fadbf', mr: 2 }} /> Songs
                  </ListItem>
                  <ListItem sx={{ cursor: "pointer", fontWeight: 'bold' }} onClick={() => { navigate('/health-&-exercise-&-fitness'); setMobileOpen(false) }}>
                    <MonitorHeartIcon sx={{ mr: 2, color: '#0fadbf' }} /> Fitness
                  </ListItem>
                </List>
              </Drawer>

              {/* Logo */}
              <Box sx={{ cursor: "pointer", display: 'flex' }} onClick={() => navigate('/movie-dashboard')}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginRight: '6px'
                  }}
                >
                  NestFllix
                </Typography>
                <Box
                  sx={{
                    background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                    width: '60px',
                    height: '16px',
                    borderRadius: '20px',
                    marginTop: '8px'
                  }}
                />
              </Box>
            </Box>
            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}>
              <MenuItem onClick={() => navigate('/all-recently-movies')}>Recently movies</MenuItem>
              <Typography onClick={(e) => setAnchorMovie(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff", marginTop: '7px' }}>
                Movies
              </Typography>

              <Menu anchorEl={anchorMovie} open={Boolean(anchorMovie)} onClose={() => setAnchorMovie(null)}>
                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/PopularMovies'); }} sx={{ color: '#0fadbf' }}>
                  Popular
                </MenuItem>

                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/nowPlaying') }} sx={{ color: '#0fadbf' }}>Now Playing</MenuItem>
                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/topRated') }} sx={{ color: '#0fadbf' }}>Top Rated</MenuItem>
                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/upComing') }} sx={{ color: '#0fadbf' }}>Upcoming</MenuItem>
              </Menu>
              <MenuItem onClick={() => navigate('/movies-trailers-latest-trailers')}>Trailers</MenuItem>
              <MenuItem onClick={() => navigate('/all-seasons')}>Seasons</MenuItem>
              {/* <MenuItem onClick={() => navigate('/movies/hindi-movies')}>Drama</MenuItem> */}
              <MenuItem onClick={() => navigate('/all-pak-tv-darama')}>PakTVFlix</MenuItem>
              {/* <MenuItem onClick={() => navigate('/health-&-exercise-&-fitness')}>Fitness</MenuItem> */}
              <Typography onClick={(e) => setAnchorPeople(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff", marginTop: '7px' }}>
                Peoples
              </Typography>
              <Menu anchorEl={anchorPeople} open={Boolean(anchorPeople)} onClose={() => setAnchorPeople(null)}>
                <MenuItem onClick={() => { setAnchorPeople(null); navigate('/people/popularPeople') }} sx={{ color: '#0fadbf' }}>Popular People</MenuItem>
              </Menu>

              {/* <TranslasteComponent/> */}
              {/* <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                size="small"
                className="bg-white rounded"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0fadbf",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0fadbf",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0fadbf",
                  },
                  "& .MuiSelect-icon": {
                    color: "#0fadbf",
                  },
                  "& .MuiSelect-select": {
                    color: "#0fadbf",
                  },
                }}
              >
                {countryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select> */}

            </Box>

            {/* Right Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton color="inherit" onClick={() => setShowSearch(!showSearch)}>
                {showSearch ? <Close sx={{ color: "#0fadbf" }} /> : <Search sx={{ color: "#0fadbf" }} />}
              </IconButton>
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {isDarkMode ? <WbSunny /> : <Brightness4 />}
              </IconButton>
            </Box>


          </Toolbar>
        </>

        {/* Search Bar */}
        {showSearch && (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "10px", backgroundColor: "white" }}>
            <SearchContainer>
              <InputBase
                placeholder="Search for movies, TV shows, or people"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </Box>
        )}

        {/* Search Results */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}><CircularProgress /></Box>
        ) : (
          <Box sx={{ width: "98%", maxHeight: "300px", overflowY: "auto", backgroundColor: "whitesmoke", margin: "auto", color: 'black' }}>
            {searchResults.map((result) => (
              <MenuItem key={result.id} onClick={() => { navigate(`/zxyxvyXdF/${result.id}`); setSearchQuery(''); setShowSearch(false) }}>
                {result.title || result.name}
              </MenuItem>
            ))}
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} >
        <Box sx={{ cursor: "pointer", display: 'flex', padding: '15px', backgroundColor: '#032541' }} onClick={() => { navigate('/movie-dashboard'); setMobileOpen(false) }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginRight: '6px' }}>
            NestFllix
          </Typography>
          <Box sx={{ background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", width: '40px', height: '16px', borderRadius: '20px', marginTop: '8px' }}></Box>
          {/* <TranslasteComponent /> */}
        </Box>
        <List>
          <ListItem onClick={(e) => { setAnchorMovie(e.currentTarget) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}>
            <MovieFilterIcon sx={{ mr: 2, color: '#0fadbf' }} /> Movies
          </ListItem>
          <ListItem sx={{ cursor: "pointer", fontWeight: 'bold' }} onClick={() => { navigate('/movies-trailers-latest-trailers'); setMobileOpen(false) }}>
            <VideoLibraryIcon sx={{ mr: 2, color: '#0fadbf' }} /> Trailers
          </ListItem>
          <ListItem sx={{ cursor: "pointer", fontWeight: 'bold' }} onClick={() => { navigate('/all-seasons'); setMobileOpen(false) }}>
            <CoronavirusIcon sx={{ mr: 2, color: '#0fadbf' }} /> Seasons
          </ListItem>
          <ListItem sx={{ cursor: "pointer", fontWeight: 'bold' }} onClick={() => { navigate('/all-pak-tv-darama'); setMobileOpen(false) }}>
            <LiveTvIcon sx={{ mr: 2, color: '#0fadbf' }} /> PakTVFlix
          </ListItem>


          <Menu anchorEl={anchorMovie} open={Boolean(anchorMovie)} onClose={() => setAnchorMovie(null)}>
            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/PopularMovies'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>
              Popular
            </MenuItem>

            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/nowPlaying'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Now Playing</MenuItem>
            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/topRated'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Top Rated</MenuItem>
            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/upComing'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Upcoming</MenuItem>
          </Menu>
          <ListItem sx={{ cursor: "pointer", fontWeight: 'bold' }} onClick={() => { navigate('/health-&-exercise-&-fitness'); setMobileOpen(false) }}>
            <MonitorHeartIcon sx={{ mr: 2, color: '#0fadbf' }} /> Fitness
          </ListItem>
          <ListItem button onClick={() => { navigate('/movies/punjabi-movies'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><LanguageIcon sx={{ mr: 2, color: '#0fadbf' }} />Punjabi movies</ListItem>
          <ListItem button onClick={() => { navigate('/movies/hindi-movies'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><LanguageIcon sx={{ mr: 2, color: '#0fadbf' }} />Hindi movies</ListItem>
          <ListItem button onClick={() => { navigate('/movies/english-movies'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><LanguageIcon sx={{ mr: 2, color: '#0fadbf' }} />English movies</ListItem>
          <ListItem button onClick={() => { navigate('/all-cartoons'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><ChildCareIcon sx={{ mr: 2, color: '#0fadbf' }} />Cartoons</ListItem>
          <ListItem sx={{ cursor: "pointer", fontWeight: 'bold' }} onClick={() => { navigate('/all-hi-ur-en-pun-songs'); setMobileOpen(false) }}>
            <LibraryMusicIcon sx={{ mr: 2, color: '#0fadbf' }} /> Songs
          </ListItem>

          <ListItem onClick={(e) => setAnchorPeople(e.currentTarget)} sx={{ cursor: "pointer", fontWeight: 'bold' }}>
            <PeopleIcon sx={{ mr: 2, color: '#0fadbf' }} />Peoples
          </ListItem>
          <Menu anchorEl={anchorPeople} open={Boolean(anchorPeople)} onClose={() => setAnchorPeople(null)}>
            <MenuItem onClick={() => { setAnchorPeople(null); navigate('/people/popularPeople'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Popular People</MenuItem>
          </Menu>

        </List>
         

      </Drawer>
    </>
  );
};

export default Header;
