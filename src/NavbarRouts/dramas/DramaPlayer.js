import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Container, Box, Grid, Card } from "@mui/material";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const DramaPlayer = () => {
    const location = useLocation();
   
    const { selectedEpisode, remainingEpisodes } = location.state || {};

    const [currentEpisode, setCurrentEpisode] = useState(selectedEpisode);

    if (!currentEpisode) {
        return (
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    color: "#950101",
                    mt: 4,
                }}
            >
                No episode selected.
            </Typography>
        );
    }

    return (
        <Container sx={{ marginTop: "20px" }}>


            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            position: "sticky",
                            top: "30px", // Adjust as needed
                            zIndex: 10,

                            paddingBottom: "10px", // Adds spacing below title
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                paddingTop: "56.25%", // Aspect ratio for iframe
                                position: "relative",
                            }}
                        >
                            <iframe
                                src={currentEpisode.links}
                                title={currentEpisode.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: "1px solid #0fadbf",
                                    borderRadius: "5px",
                                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                }}
                            ></iframe>
                        </Box>

                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ marginTop: "10px", wordWrap: "break-word", color: 'grey' }}
                        >
                            <span style={{ fontWeight: "bold", color: "#0fadbf" }}>Title</span>: {currentEpisode.title}
                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={12} md={4}>
                    <Typography variant="h5" sx={{ color: "#0fadbf", marginBottom: "10px", fontWeight: "bold" }}>
                        Remaining Episodes
                    </Typography>

                    <Box
                        sx={{
                            borderRadius: "8px",
                            padding: "16px",
                            "&::-webkit-scrollbar": { width: "8px" },
                            "&::-webkit-scrollbar-thumb": { borderRadius: "4px" },
                            "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
                        }}
                    >
                        {remainingEpisodes.map((episode) => (
                            <Card
                                key={episode._id || episode.id}
                                sx={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                    position: "relative", // Ensures absolute positioning inside
                                }}
                                onClick={() => setCurrentEpisode(episode)}
                            >
                                {/* Wrapper for relative positioning */}
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        height: "auto",
                                    }}
                                >
                                    <iframe
                                        src={episode.links}
                                        title={episode.title}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    {/* Play Icon Positioned in Center */}
                                    <PlayArrowIcon
                                        sx={{
                                            position: "absolute",
                                            top: "47%",
                                            left: "51%",
                                            transform: "translate(-50%, -50%)",
                                            fontSize: 70,
                                            color: "white",
                                             
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "translate(-50%, -50%) scale(1.1)",
                                            },
                                        }}
                                    />
                                </Box>
                            </Card>
                        ))}
                    </Box>

                </Grid>
            </Grid>
        </Container>
    );
};

export default DramaPlayer;
