import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const LogoScreen = () => {
    const navigate = useNavigate();
    const text = "NestFllix".split("");

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/movie-dashboard");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2, 
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1, 
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ backgroundColor: "black", color: "white" }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: "flex", alignItems: "center" }}
            >
                {text.map((letter, index) => (
                    <motion.span
                        key={index}
                        custom={index}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            fontSize: "4rem",
                            fontWeight: "bold",
                            marginRight: "3px",
                            color: "#950101",
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

            {/* Loading Line below "NestFllix" */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "150px" }}
                transition={{ duration: 5, ease: "linear" }}
                style={{
                    height: "5px",
                    background: "#950101",
                    marginTop: "10px",
                    alignSelf: "center",
                    borderRadius: "2px",
                }}
            />
        </Box>
    );
};

export default LogoScreen;