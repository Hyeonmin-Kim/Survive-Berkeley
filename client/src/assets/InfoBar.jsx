import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

const InfoBar = ({ open }) => {
    return (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <Box sx={{
                width: "350px",
                height: "calc(100vh - 114px)",
                position: "absolute",
                bottom: "30px",
                right: "20px",
                borderRadius: "5px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                backgroundColor: "white"
            }}>
                <Box sx={{
                        width: "300px",
                        height: "150px",
                        margin: "10px auto",
                        backgroundColor: "black"
                }}>
                </Box>
                Information Bar Here 
                <Box sx={{
                    width: "300px",
                    height: "300px",
                    margin: "10px auto",
                    backgroundColor: "lightblue",
                    overflow: "auto"
                }}>
                    Review Here
                    <Box sx={{
                        width: "270px",
                        height: "100px",
                        margin: "0 auto",
                        backgroundColor: "ivory"
                    }}>
                    </Box>
                </Box>
                <Box
                    component="form"
                    sx={{
                        width: "100%"
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-multiline-static"
                        label="New Comment"
                        multiline
                        rows={2}
                        defaultValue=""
                        sx={{
                            width: "calc(100% - 50px)",
                            margin: "0 25px"
                        }}
                    />
                </Box>


            </Box>
        </Slide>
        
    );
};

export default InfoBar;