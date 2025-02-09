import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress, Grid, Card, CardMedia, Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const DramaEpisodes = () => {
  const { name } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seasons/dashboard/drama/${name}`);
        const sortedEpisodes = response.data.sort((a, b) => a.episodeNumber - b.episodeNumber);
        setEpisodes(sortedEpisodes);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [name]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#0fadbf" }}>
        {decodeURIComponent(name)} - Episodes
      </Typography>
      {loading ? (
        <CircularProgress sx={{ margin: "auto" }} />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {episodes.map((episode, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Card
                sx={{
                  background: "white",
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() =>
                  navigate('/drama-pak-tv-episode-play', {
                    state: {
                      selectedEpisode: {
                        id: episode._id,
                        title: episode.title,
                        links: episode.links,
                        episodeNumber: episode.episodeNumber,
                      },
                      remainingEpisodes: episodes.filter((ep) => ep._id !== episode._id),
                    },
                  })
                }
              >
                {/* Video Thumbnail with Play Icon */}
                <Box sx={{ position: "relative", height: "260px" }}>
                  <CardMedia component="iframe" height="260" image={episode.links} alt={episode.title} />
                  <PlayArrowIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "52%",
                      transform: "translate(-50%, -50%)",
                      fontSize: 70,
                      color: "white",
                      
                      borderRadius: "50%",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        color: "white",
                        transform: "translate(-50%, -50%) scale(1.1)",
                      },
                    }}
                  />
                </Box>
                
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DramaEpisodes;
