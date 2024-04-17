
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CallIcon from '@mui/icons-material/Call';

const Categories = () => {
    return (
        <Stack direction="row" spacing={1} sx={{
            position: "absolute",
            top: "84px",
            left: "20px"
        }}>
            <Chip icon={<DirectionsWalkIcon/>} label="BearWalk" sx={{ backgroundColor: "white" }} />
            <Chip icon={<DirectionsBusIcon/>} label="Night Safety Shuttle" variant="outlined" sx={{ backgroundColor: "white" }} />
            <Chip icon={<CallIcon/>} label="Safety Call Booth" variant="outlined" sx={{ backgroundColor: "white" }} />
        </Stack>
    );
};

export default Categories;