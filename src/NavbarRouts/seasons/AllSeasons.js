import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import LoadingComponent from '../Loader/LoadingComponent';
import { Container, Grid, Typography, Box, Button, CircularProgress } from '@mui/material';
// import LatestSeasons from './LatestSeasons';

const AllSeasons = () => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {


        const fetchSeasons = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seasons`);
                setSeasons(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch seasons.');
                setLoading(false);
            }
        };

        fetchSeasons();
    }, []);


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
        <Container>

            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    margin: '30px 0',
                    fontWeight: 'bold',
                    color: '#0fadbf',
                    
                    fontSize: '30px',
                    
                }}
            >
                Seasons
            </Typography>           
            <Grid container spacing={2} justifyContent="center">
                <Grid
                    container
                    spacing={3}
                    style={{ width: '100%' }}
                >
                    {seasons.map((season) => (
                        <Grid
                            item
                            xs={6}
                            sm={3}
                            md={2}
                            lg={2}
                            key={season._id}
                        >
                            <Box
                                sx={{
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
                                onClick={() => navigate(`/season/${season._id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={season.poster}
                                    alt={season.title}
                                    style={{
                                        width: '100%',
                                        height: '240px',
                                        transition: 'filter 0.3s ease-in-out',
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    style={{
                                        color: '#0fadbf',                                        
                                        fontWeight: 'bold',
                                        textAlign: 'center',                                        
                                    }}
                                >
                                    {season.title}
                                </Typography>
                                
                            </Box>
                        </Grid>

                    ))}
                </Grid>


            </Grid>
            {/* <LatestSeasons /> */}
        </Container>
    );
};

export default AllSeasons;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import LoadingComponent from '../Loader/LoadingComponent';
// import { Container, Grid, Typography, Box, Pagination, IconButton } from '@mui/material';
// import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// const AllSeasons = () => {
//     const [seasons, setSeasons] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const navigate = useNavigate();

//     const fetchAirSeasons = async (page) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/popular-shows?page=${page}`);
//             setSeasons(response.data.results || []);
//             setTotalPages(response.data.total_pages || 0);
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to fetch airing seasons.');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchAirSeasons(page);
//     }, [page]);

//     const handlePageChange = (event, value) => {
//         setPage(value);
//     };

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
//             {/* Fixed Circular Back Button */}
//             <IconButton
//                 onClick={() => navigate('/movies/dashboard')}
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
//                 <Typography
//                     variant="caption"
//                     sx={{ fontSize: '10px', color: '#fff', marginTop: '2px' }}
//                 >
//                     Back
//                 </Typography>
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
//                     textAlign:'center'
//                 }}
//             >
//                 Seasons
//             </Typography>

//             <Grid container spacing={2} justifyContent="center">
//                 {seasons.map((season) => (
//                     <Grid item xs={6} sm={6} md={4} lg={4} key={season.id}>
//                         <Box
//                             sx={{
//                                 border: '1px solid #950101',
//                                 borderRadius: '10px',
//                                 padding: '16px',
//                                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                                 height: '100%',
//                             }}
//                             onClick={() => navigate(`/season/${season.id}`)}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             <img
//                                 src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
//                                 alt={season.name}
//                                 style={{
//                                     width: '100%',
//                                     height: 'auto',
//                                     borderRadius: '10px',
//                                 }}
//                             />
//                             <Typography
//                                 variant="h6"
//                                 style={{
//                                     color: '#950101',
//                                     margin: '10px 0',
//                                     fontWeight: 'bold',
//                                 }}
//                             >
//                                 {season.name}
//                             </Typography>
//                             <Typography
//                                 variant="body2"
//                                 style={{
//                                     fontSize: '12px',
//                                     color: '#fff',
//                                 }}
//                             >
//                                 <span style={{ fontWeight: 'bold', color: '#950101' }}>
//                                     Air Date
//                                 </span>
//                                 : {season.first_air_date}
//                             </Typography>
//                         </Box>
//                     </Grid>
//                 ))}
//             </Grid>

//             <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
//                 <Pagination
//                     count={totalPages}
//                     page={page}
//                     onChange={handlePageChange}
//                     color="primary"
//                     sx={{
//                         '& .MuiPaginationItem-root': {
//                             color: '#950101',
//                         },
//                     }}
//                 />
//             </Box>
//         </Container>
//     );
// };

// export default AllSeasons;
