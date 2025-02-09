import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Container, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PakTvDrama = () => {
  const [dramas, setDramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seasons/dashboard/tv`);
        setDramas(response.data);
      } catch (error) {
        console.error("Error fetching TV dramas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDramas();
  }, []);

  const handleDramaClick = (title) => {
    navigate(`/drama/${encodeURIComponent(title)}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ margin: '20px 0', fontWeight: 'bold', color: '#0fadbf' }}>
        Pakistani TV Dramas
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {dramas.map((drama) => (
            <Grid item xs={6} sm={3} md={2} key={drama.id}>
              <Card
              onClick={() => handleDramaClick(drama.title)}
              sx={{
                background:'white',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                },}}
              >
                <CardMedia component="img" height="260" image={drama.poster} alt={drama.title} />
                
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PakTvDrama;
