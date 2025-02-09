import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Dialog, DialogContent, Typography } from '@mui/material';
// import LoadingComponent from '../Loader/LoadingComponent';

const Trailers = () => {
  const [trailers, setTrailers] = useState([]); // All loaded trailers
  const [currentTrailer, setCurrentTrailer] = useState(0); // Index of the currently displayed trailer
  const [page, setPage] = useState(1); // Current page for fetching trailers
  const [hasMore, setHasMore] = useState(true); // Whether there are more trailers to load
  const [loading, setLoading] = useState(false); // Loading state
  const [openPopup, setOpenPopup] = useState(true); // Popup visibility state
  const containerRef = useRef(null);

  const CHUNK_SIZE = 10;

  // Fetch trailers from the API with pagination
  const fetchTrailers = async (pageNumber) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tmdb/punjabi-movies-trailers`,
        { params: { page: pageNumber, limit: CHUNK_SIZE } }
      );
      const newTrailers = response.data.results || [];
      setTrailers((prev) => [...prev, ...newTrailers]);
      setHasMore(newTrailers.length === CHUNK_SIZE); // If less than CHUNK_SIZE, no more data
    } catch (error) {
      console.error('Error fetching trailers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailers(page);
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenPopup(false); // Close the popup after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const index = Math.round(scrollTop / clientHeight);
    setCurrentTrailer(index);

    // Trigger fetching the next page when nearing the bottom
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getIframeWidth = () => {
    const screenWidth = window.innerWidth;
    return screenWidth <= 768 ? '100%' : '60%';
  };

  if (loading && trailers.length === 0) {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
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
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Netflix is presented by Asian people
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Enjoy the best of entertainment!
          </Typography>
        </DialogContent>
      </Dialog>

      <div
        ref={containerRef}
        className="scroll-container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          position: 'relative',
        }}
        onScroll={handleScroll}
      >
        {trailers.map((trailer, index) => (
          <div
            key={index}
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              scrollSnapAlign: 'start',
              background: '#000',
              color: '#fff',
              position: 'relative',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.trailerKey}?autoplay=${
                currentTrailer === index ? 1 : 0
              }`}
              title={trailer.movieTitle}
              width={getIframeWidth()}
              height="90%"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ marginTop: '-60px' }}
            />
          </div>
        ))}
        {loading && hasMore && (
          <Container
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50px',
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
