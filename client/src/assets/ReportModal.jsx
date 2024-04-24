import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MAPBOX_API from './credentials';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(80%, 800px)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const modalMapConfig = {
    id: "modalMap",
    width: "100%",
    height: "200px",
    center: [-122.259094, 37.871960],
    zoom: 16
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'Category A',
  'Category B',
  'Category C',
];

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const ReportModal = ({ open, modalHandler }) => {
    const theme = useTheme();
    const [tagName, setTagName] = React.useState([]);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setTagName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Modal
            open={open}
            onClose={modalHandler}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Report a New Issue
                </Typography>
                <Box sx={{
                    marginTop: '20px',
                    display: 'flex',
                }}>
                    <Box sx={{ width: '40%', paddingRight: '10px' }}>
                    <Map
                        mapboxAccessToken={MAPBOX_API}
                        initialViewState={{
                            longitude: modalMapConfig.center[0],
                            latitude: modalMapConfig.center[1],
                            zoom: modalMapConfig.zoom
                        }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        style={{
                            width: modalMapConfig.width,
                            height: modalMapConfig.height,
                        }}
                    >
                    </Map>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: '10px' }}>
                            Coordinates Here
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Address Here
                        </Typography>
                    </Box>
                    <Box sx={{ 
                        width: '60%',
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '300px',
                    }}>
                        <TextField id="issue-title" label="Title" variant="standard" sx={{ width: '100%', marginBottom: '20px' }} />
                        <FormControl sx={{ m: 0, width: '100%', marginBottom: '20px' }}>
                            <InputLabel id="issue-tags">Tags</InputLabel>
                            <Select
                            labelId="issue-tags"
                            id="issue-tags"
                            multiple
                            value={tagName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {categories.map((name) => (
                                <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, tagName, theme)}
                                >
                                {name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <TextField id="issue-detail" label="Detail" variant="outlined" multiline rows={5} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '20px' }}>
                    <Button variant="contained">Report</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ReportModal;