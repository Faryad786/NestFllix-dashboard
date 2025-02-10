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

    const letterVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (index) => ({
            opacity: 1,
            x: 0,
            transition: { delay: index * 0.1, duration: 0.2 },
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
            <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                {text.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        style={{
                            fontSize: "4rem",
                            fontWeight: "bold",
                            background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginRight: "2px",
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}

                {/* Blinking Cursor Effect */}
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    style={{
                        background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                        width: "10px",
                        height: "50px",
                        marginLeft: "4px",
                        borderRadius: "2px",
                    }}
                />
            </Box>

            {/* Loading Line below "NestFllix" */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "150px" }}
                transition={{ duration: 5, ease: "linear" }}
                style={{
                    height: "5px",
                    background: "linear-gradient(to right, #0fadbf, yellow)",
                    marginTop: "10px",
                    alignSelf: "center",
                    borderRadius: "2px",
                }}
            />
        </Box>
    );
};

export default LogoScreen;
