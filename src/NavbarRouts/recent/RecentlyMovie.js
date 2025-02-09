import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RecentlyMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const fetchedPages = useRef(new Set());
  const fetchMovies = async (pageNumber) => {
    if (fetchedPages.current.has(pageNumber)) return; // Prevent duplicate calls
    fetchedPages.current.add(pageNumber);
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/tmdb/recently-add/movies?page=${pageNumber}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data?.movies && Array.isArray(data.movies)) {
        setMovies((prevMovies) => [...prevMovies, ...data.movies]);
        setTotalPages(data.totalPages || 1);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <Container>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ margin: "20px 0", fontWeight: "bold", color: "#0fadbf" }}
      >
        Recently Added Movies
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie) => (
          <Grid item xs={6} sm={3} md={3} lg={2} key={movie.id}>
            <Box
              sx={{
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                borderRadius: "8px",
                overflow: "hidden",
              }}
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={movie.posterimage || "https://via.placeholder.com/150"}
                alt={movie.title || "Movie poster"}
                style={{ width: "100%", height: "250px", borderRadius: "8px" }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#0fadbf", padding: "10px", fontSize: "14px" }}
              >
                {movie.title || "Untitled"}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}

      {page < totalPages && !loading && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button variant="contained" onClick={handleLoadMore} sx={{ bgcolor: "#0fadbf", color: "#fff" }}>
            Load More
          </Button>
        </Box>
      )}

      {/* Movie Modal */}
      <Modal open={Boolean(selectedMovie)} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : "60%",
            bgcolor: "white",
            boxShadow: 24,
            p: 2,
            height: isMobile ? "70%" : "80%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#0fadbf", fontWeight: "bold" }}>
              {selectedMovie?.title || "Movie Title"}
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: "#0fadbf" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {selectedMovie?.links ? (
              <iframe
                src={selectedMovie.links}
                width="100%"
                height="100%"
                title={selectedMovie?.title || "Movie"}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "8px" }}
              />
            ) : (
              <Typography variant="h6" sx={{ color: "#333", textAlign: "center" }}>
                No Video Available
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default RecentlyMovie;