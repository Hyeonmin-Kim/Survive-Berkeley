import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const InfoBar = ({ infoBarHandler, open }) => {
    const closeInfoBar = () => {
        infoBarHandler(false);
      };
    
    const [value, setValue] = React.useState(2);

    return (
        <Grow in={open}>
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
                    width: "calc(100% - 40px)",
                    height: "200px",
                    position: "absolute",
                    right: "20px",
                    top: "15px",
                    overflow: "auto"
                }}>
                <Typography variant="h5">Robbery at Sproul Plaza</Typography>
                <Typography variant="h7">gun shooting, robbery</Typography>
                <Typography component="legend">On 04-28-2024 18:00, a robbery occurred at UC Berkeley Main Campus - Upper Capmus 
                Plaza. While in the area of Upper Splroul Plaza, 2 suspects used physical force to rob a victim of his backpack and contecnts!
                Suspects are still at the area. Please avoid the area. 
                </Typography>
                </Box>

                <Box sx={{
                    position: "absolute", left: "20px", bottom: "350px"
                }}>
                <Typography component="legend">Rate and review</Typography>
                <Rating 
                name="Rate and review" 
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                />
                </Box>

                <Box sx={{
                    width: "calc(100% - 40px)",
                    height: "200px",
                    position: "absolute",
                    right: "20px",
                    bottom: "145px",
                    backgroundColor: "lightblue",
                    overflow: "auto"
                }}>
                    <Box sx={{
                        width: "270px",
                        height: "50px",
                        margin: "10px auto",
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
                            width: "calc(100% - 40px)",
                            position: "absolute", 
                            right: "20px",
                            bottom: "55px"
                        }}
                    />
                    
                <Button variant="contained" sx={{ position: "absolute", bottom: "10px", right: "20px" }}>Add</Button>
                </Box>
                <CloseIcon fontSize='small' color='disabled' sx={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    cursor: "pointer"
                    }} onClick={closeInfoBar}/>

            </Box>
        </Slide>
        </Grow>
    );
};

export default InfoBar;