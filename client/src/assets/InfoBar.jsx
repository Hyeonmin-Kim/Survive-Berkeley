import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; 

const InfoBar = ({ infoBarHandler, open }) => {
    const closeInfoBar = () => {
        infoBarHandler(false);
      };
    
    const [upCount, setupCount] = useState(0);
    const [downCount, setdownCount] = useState(0);

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
                    height: "235px",
                    position: "absolute",
                    right: "20px",
                    top: "15px",
                    borderBottom: 1,
                    overflow: "auto"
                }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>Robbery at Sproul Plaza</Typography>
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>gun shooting, robbery</Typography>
                <Typography component="legend">On 04-28-2024 18:00, a robbery occurred at UC Berkeley Main Campus - Upper Capmus 
                Plaza. While in the area of Upper Splroul Plaza, 2 suspects used physical force to rob a victim of his backpack and contecnts!
                Suspects are still at the area. Please avoid the area.
                </Typography>
                </Box>

                <Typography component="legend" sx={{ fontWeight: "bold", position: "absolute", bottom: "340px", left: "20px" }}>Review and Comment</Typography>
                <Box
                    component="form"
                    sx={{ width: "100%" }}
                    noValidate
                    autoComplete="off">
                    <TextField
                        id="outlined-multiline-static"
                        label="New Comment"
                        multiline
                        rows={2}
                        defaultValue=""
                        sx={{
                            width: "calc(100% - 40px)",
                            position: "absolute",
                            bottom: "255px",
                            left: "20px"
                        }}
                    />
                </Box>
                <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ position: "absolute", bottom: "215px", left: "20px" }}>
                    <Button onClick={() => setupCount(upCount + 1)} startIcon={<ThumbUpIcon/>}>{upCount}</Button>
                    <Button onClick={() => setdownCount(downCount + 1)} startIcon={<ThumbDownIcon/>}>{downCount}</Button>
                </ButtonGroup>
                <Button variant="contained" size="medium" sx={{ position: "absolute", bottom: "215px", right: "20px" }}>Add</Button>

                <Box sx={{
                    width: "calc(100% - 40px)",
                    height: "200px",
                    position: "absolute",
                    right: "20px",
                    bottom: "10px",
                    border: 1,
                    borderRadius: 1,
                    overflow: "auto"
                }}>
                    <Box sx={{ margin: "5px 10px", borderBottom:1 }}>
                        <Typography fontSize="small">I was there when it happened. Shit was crazy. Also I am pretty sure
                        that he had the green pants on. Be careful.</Typography>
                    </Box>
                    <Box sx={{ margin: "5px 10px", borderBottom:1 }}>
                        <Typography fontSize="small">I was there when it happened. Shit was crazy. Also I am pretty sure
                        that he had the green pants on. Be careful.</Typography>
                    </Box>
                    <Box sx={{ margin: "5px 10px", borderBottom:1 }}>
                        <Typography fontSize="small">I was there when it happened. Shit was crazy. Also I am pretty sure
                        that he had the green pants on. Be careful.</Typography>
                    </Box>
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