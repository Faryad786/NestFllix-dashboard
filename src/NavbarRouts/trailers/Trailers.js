import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";

const Trailers = () => {
  const [trailers, setTrailers] = useState([]); // All loaded trailers
  const [currentTrailer, setCurrentTrailer] = useState(0); // Index of the currently displayed trailer
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(true);
  const containerRef = useRef(null);

  const CHUNK_SIZE = 10;

  const fetchTrailers = async (totalPages) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tmdb/letest/trailer/dashboard?page=${page}`
        
      );
      const newTrailers = response.data.data || [];
      setTrailers((prev) => [...prev, ...newTrailers]);
      setHasMore(newTrailers.length === CHUNK_SIZE);
    } catch (error) {
      console.error("Error fetching trailers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailers(page);
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenPopup(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const index = Math.round(scrollTop / clientHeight);
    setCurrentTrailer(index);
  };

  const handleTrailerPlay = (index) => {
    setCurrentTrailer(index);

    // If the last trailer is playing, fetch the next page
    if (index === trailers.length - 1 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getIframeWidth = () => {
    return window.innerWidth <= 768 ? "90%" : "60%";
  };

  if (loading && trailers.length === 0) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (trailers.length === 0) {
    return <p>No trailers available</p>;
  }

  return (
    <>
      {/* Popup Dialog */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogContent
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Netflix is presented by Asian people
          </Typography>
          <Typography variant="body2" style={{ marginTop: "10px" }}>
            Enjoy the best of entertainment!
          </Typography>
        </DialogContent>
      </Dialog>

      <div
        ref={containerRef}
        className="scroll-container"
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          position: "relative",
        }}
        onScroll={handleScroll}
      >
        {trailers.map((trailer, index) => (
          <div
            key={index}
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              scrollSnapAlign: "start",
              color: "#fff",
              position: "relative",
              borderRadius:'15px'
            }}
          >
            <iframe
              src={`${trailer.links}?autoplay=${
                currentTrailer === index ? 1 : 0
              }`}
              title={trailer.title}
              width={getIframeWidth()}
              height="85%"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ marginTop: "-60px" }}
              onPlay={() => handleTrailerPlay(index)} // Trigger fetching the next page
            />
          </div>
        ))}
        {loading && hasMore && (
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
            }}
          >
            <CircularProgress />
          </Container>
        )}
      </div>
    </>
  );
};

export default Trailers;
