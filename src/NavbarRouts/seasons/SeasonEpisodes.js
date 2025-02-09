import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, Box, Button, IconButton, CircularProgress } from '@mui/material';
// import LoadingComponent from '../Loader/LoadingComponent';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
const SeasonEpisodes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seasons/${id}/episodes`);
                const sortedEpisodes = response.data.sort((a, b) => a.episodeNumber - b.episodeNumber);
                setEpisodes(sortedEpisodes);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch episodes.');
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [id]);

    if (loading) {
        return (
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container >
           
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    margin: '20px 0',
                    fontWeight: 'bold',
                    color: '#0fadbf',
                    
                    fontSize: '30px',
                }}
            >
                Episodes
            </Typography>

            <Grid container spacing={3}>
                {episodes.map((episode) => (
                    <Grid item xs={6} sm={3} md={2} lg={2} key={episode._id}>
                        <Box
                            style={{
                                borderRadius:'5px',
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                },
                            }}

                            onClick={() =>
                                navigate('/movie/season/episodes', {
                                    state: {
                                        selectedEpisode: {
                                            id: episode._id,
                                            title: episode.title,
                                            description: episode.description,
                                            links: episode.links,
                                            episodeNumber: episode.episodeNumber,
                                            poster: episode.poster,
                                        },
                                        remainingEpisodes: episodes.filter((ep) => ep._id !== episode._id),
                                    },
                                })
                            }
                        >
                            <img
                                src={episode.poster}
                                alt={episode.title}
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    transition: 'filter 0.3s ease-in-out',
                                }}
                            />
                            {/* <Typography
                                variant="h6"
                                style={{ color: '#950101', margin: '10px 0', textAlign: 'center' }}
                            >
                                {episode.title}
                            </Typography> */}
                            <Typography sx={{ textAlign: 'center', color:'grey' }}>
                                Episode: {episode.episodeNumber}
                            </Typography>
                            {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom:'10px' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#950101',
                                        '&:hover': {
                                            backgroundColor: '#800101',
                                        },
                                    }}
                                    onClick={() =>
                                        navigate('/movie/season/episodes', {
                                            state: {
                                                selectedEpisode: {
                                                    id: episode._id,
                                                    title: episode.title,
                                                    description: episode.description,
                                                    links: episode.links,
                                                    episodeNumber: episode.episodeNumber,
                                                    poster: episode.poster,
                                                },
                                                remainingEpisodes: episodes.filter((ep) => ep._id !== episode._id),
                                            },
                                        })
                                    }
                                >
                                    Watch
                                </Button>
                            </div> */}
                        </Box>

                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SeasonEpisodes;


// SeasonEpisodes Component
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Grid, Typography, Box, Button, IconButton } from '@mui/material';
// import LoadingComponent from '../Loader/LoadingComponent';
// import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// const SeasonEpisodes = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [episodes, setEpisodes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [source, setSource] = useState('');

//     useEffect(() => {
//         const fetchEpisodes = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/${id}/seasons`);
//                 const data = response.data;

//                 if (data.source === 'local') {
//                     setEpisodes(data.episodes);
//                     setSource('local');
//                 } else if (data.source === 'tmdb') {
//                     const sortedEpisodes = data.series.seasons
//                         .flatMap((season) => season.episodes)
//                         .sort((a, b) => a.episode_number - b.episode_number);
//                     setEpisodes(sortedEpisodes);
//                     setSource('tmdb');
//                 }
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch episodes.');
//                 setLoading(false);
//             }
//         };

//         fetchEpisodes();
//     }, [id]);

//     if (loading) {
//         return (
//             <Container
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     height: '100vh',
//                 }}
//             >
//                 <LoadingComponent />
//             </Container>
//         );
//     }

//     if (error) return <Typography color="error">{error}</Typography>;

//     return (
//         <Container>
//             <IconButton
//                 onClick={() => navigate('/all/Seasons')}
//                 sx={{
//                     position: 'fixed',
//                     top: '80px',
//                     left: '16px',
//                     zIndex: 1100,
//                     backgroundColor: '#950101',
//                     color: '#fff',
//                     width: '50px',
//                     height: '50px',
//                     borderRadius: '50%',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     '&:hover': {
//                         backgroundColor: '#750101',
//                     },
//                 }}
//             >
//                 <KeyboardReturnIcon />
//                 <Typography variant="caption" sx={{ fontSize: '10px', color: '#fff', marginTop: '2px' }}>Back</Typography>
//             </IconButton>

//             <Typography
//                 variant="h4"
//                 gutterBottom
//                 sx={{
//                     margin: '50px 0',
//                     fontWeight: 'bold',
//                     color: '#950101',
//                     fontFamily: 'Bebas Neue',
//                     fontSize: '30px',
//                     textAlign: 'center',
//                 }}
//             >
//                 Episodes
//             </Typography>

//             <Grid container spacing={3}>
//                 {episodes.map((episode) => (
//                     <Grid item xs={6} sm={6} md={4} lg={4} key={episode._id || episode.id}>
//                         <Box
//                             style={{
//                                 border: '1px solid #950101',
//                                 borderRadius: '10px',
//                                 padding: '20px',
//                                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                             }}
//                         >
//                             <img
//                                 src={
//                                     source === 'local'
//                                         ? episode.poster
//                                         : `https://image.tmdb.org/t/p/w500${episode.still_path}`
//                                 }
//                                 alt={episode.title || episode.name}
//                                 style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
//                             />
//                             <Typography
//                                 variant="h6"
//                                 style={{ color: '#950101', margin: '10px 0' }}
//                             >
//                                 {source === 'local' ? episode.title : episode.name}
//                             </Typography>
//                             <Typography>
//                                 Air Date: {source === 'local' ? episode.releaseDate : episode.air_date}
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 sx={{
//                                     backgroundColor: '#950101',
//                                     '&:hover': { backgroundColor: '#800101' },
//                                 }}
//                                 style={{ marginTop: '10px' }}
//                                 onClick={() =>
//                                     navigate('/movie/season/episodes', {
//                                         state: {
//                                             selectedEpisode: {
//                                                 id: episode._id || episode.id,
//                                                 title: source === 'local' ? episode.title : episode.name,
//                                                 description: episode.description || episode.overview || 'No description available.',
//                                                 episodeNumber: episode.episodeNumber || episode.episode_number,
//                                                 poster:
//                                                     source === 'local'
//                                                         ? episode.poster
//                                                         : `https://image.tmdb.org/t/p/w500${episode.still_path}`,
//                                                 links: episode.links || '',
//                                             },
//                                             remainingEpisodes: episodes.filter(
//                                                 (ep) => ep._id !== episode._id && ep.id !== episode.id
//                                             ),
//                                         },
//                                     })
//                                 }
//                             >
//                                 Watch
//                             </Button>
//                         </Box>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };

// export default SeasonEpisodes;