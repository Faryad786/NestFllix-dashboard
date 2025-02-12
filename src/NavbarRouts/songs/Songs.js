import React, { useEffect, useState, useCallback } from "react";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, CardMedia, Box, Button, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const Songs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/all/songs?page=${page}`);
            setData((prevData) => [...prevData, ...response.data.songs]);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLoadMore = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleOpenModal = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: "#0fadbf" }}>
                Songs
            </Typography>
            <Grid container spacing={3}>
                {data.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card
                            sx={{
                                cursor: "pointer",
                                position: "relative",
                                boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": { transform: "scale(1.05)" },
                                background: "white",
                            }}
                            onClick={() => handleOpenModal(item)}
                        >
                            <Box sx={{ position: "relative", display: "inline-block" }}>
                                <CardMedia
                                    component="iframe"
                                    height="200"
                                    image={item.links}
                                    alt={item.title}
                                    sx={{ objectFit: "cover", width: "100%" }}
                                    onClick={handleCloseModal}
                                />
                                <PlayArrowIcon
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        fontSize: 50,
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                            <CardContent>
                                <Typography variant="body2" sx={{ color: "#0fadbf" }}>
                                    {item.views}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {page < totalPages && !loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleLoadMore}>
                        Load More
                    </Button>
                </Box>
            )}
            {/* Modal for video */}
            <Modal open={!!selectedItem} >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: 800,
                        height: '90%',
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#0fadbf" }}>
                            Song
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ width: "100%", height: "450px", overflow: "hidden", display: "flex", justifyContent: "center" }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${selectedItem?.links}?autoplay=1`}
                            title={selectedItem?.title}
                            frameBorder="0"
                            allow="autoplay"
                            allowFullScreen
                        ></iframe>

                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default Songs;