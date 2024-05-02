import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; 
import { backendURL } from './utils';

const InfoBar = ({ infoBarHandler, open, currIncidentID }) => {
    const [upCount, setupCount] = useState(0);
    const [downCount, setdownCount] = useState(0);

    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([])
    const [detail, setDetail] = useState("");

    React.useEffect(() => {
        const getIncident = async () => {
            if (!open) return;
            const res = await fetch(`${backendURL}/incident/${currIncidentID}`);
            const data = await res.json();
            const { title: titleData, tags: tagsData, detail: detailData } = data;
            setTitle(titleData);
            setTags(tagsData);
            setDetail(detailData);
        };
        getIncident();
    }, [currIncidentID]);
    
    const closeInfoBar = () => {
        infoBarHandler(false);
      };

    return (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit> 
            <Box sx={{
                width: "350px",
                height: "calc(100vh - 114px)",
                padding: "20px",
                position: "absolute",
                bottom: "30px",
                right: "20px",
                borderRadius: "5px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                backgroundColor: "white",
                overflow: "auto"
            }}>
                
                <Box sx={{ marginBottom: "30px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "10px" }}>{title}</Typography>
                <Stack direction="row" spacing={1} sx={{ marginBottom: "10px" }}>
                    {tags.map((tag) => 
                        <Chip label={tag}/>
                    )}
                </Stack>
                <Typography variant="body2">{detail}</Typography>
                </Box>

                <Box
                component="form"
                sx={{ width: "100%" }}
                noValidate
                autoComplete="off">
                    <Typography component="legend" sx={{ fontWeight: "bold", marginBottom: "15px" }}>Review and Comment</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="New Comment"
                        multiline
                        rows={2}
                        defaultValue=""
                        sx={{ width: "100%", marginBottom: "10px" }}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{}}>
                    <Button onClick={() => setupCount(upCount + 1)} startIcon={<ThumbUpIcon/>}>{upCount}</Button>
                    <Button onClick={() => setdownCount(downCount + 1)} startIcon={<ThumbDownIcon/>}>{downCount}</Button>
                </ButtonGroup>
                <Button variant="contained" size="medium" sx={{ marginTop: "0" }}>Add</Button>
                </Box>
                

                <Box sx={{
                    marginTop: "20px"
                }}>
                    <Box sx={{ paddingBottom: "5px", marginBottom: "10px", borderBottom: "1px solid lightGrey" }}>
                        <Typography fontSize="small">I was there when it happened. Shit was crazy. Also I am pretty sure
                        that he had the green pants on. Be careful.</Typography>
                    </Box>
                    <Box sx={{ paddingBottom: "5px", marginBottom: "10px", borderBottom: "1px solid lightGrey" }}>
                        <Typography fontSize="small">I was there when it happened. Shit was crazy. Also I am pretty sure
                        that he had the green pants on. Be careful.</Typography>
                    </Box>
                    <Box sx={{ paddingBottom: "5px", marginBottom: "10px", borderBottom: "1px solid lightGrey" }}>
                        <Typography fontSize="small">I was there when it happened. Shit was crazy. Also I am pretty sure
                        that he had the green pants on. Be careful.</Typography>
                    </Box>
                </Box> 

                <CloseIcon fontSize='small' color='disabled' sx={{
                    position: "absolute",
                    right: "20px",
                    top: "20px",
                    cursor: "pointer"
                    }} onClick={closeInfoBar}/>

            </Box>
        </Slide>
    );
};

export default InfoBar;