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
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AutoHideSnackbar from './AutoHideSnackbar';

import { getAddress, nullAddress } from './utils';

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
  'gun shooting',
  'murder',
  'aggrevated assualt',
  'sex offense',
  'robbery',
  'burglary and theft',
  'fire',
  'traffic accident',
  'natural disaster',
  'other(crime)',
  'other(accident)'
];

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const MIN_TITLE_LENGTH = 5;
const MIN_DETAIL_LENGTH = 10;

const ReportModal = ({ open, modalHandler, lng, lat }) => {
    const modalMapConfig = {
        id: "modalMap",
        width: "100%",
        height: "200px",
        center: [lng || -122.259094, lat || 37.871960],
        zoom: 16
    }
    const modalMapRef = React.useRef();

    const theme = useTheme();
    const [tagName, setTagName] = React.useState([]);
    const [address, setAddress] = React.useState(nullAddress);
    const [title, setTitle] = React.useState("");
    const [titleError, setTitleError] = React.useState(true);
    const [titleErrMsg, setTitleErrMsg] = React.useState(false);
    const [detail, setDetail] = React.useState("");
    const [detailError, setDetailError] = React.useState(true);
    const [detailErrMsg, setDetailErrMsg] = React.useState(false);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTagName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCenterChange = async () => {
        const { lng, lat } = modalMapRef.current.getCenter();
        const currAddress = await getAddress(lng, lat);
        setAddress(currAddress);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log([address, title, tagName, detail]);

        if (titleError) {
            setTitleErrMsg(true);
        } else if (detailError) {
            setDetailErrMsg(true);
        } else {
            // close modal
            modalHandler();
            // reset
            setAddress(nullAddress);
            setTitle("");
            setTagName([]);
            setDetail("");
            setTitleError(true);
            setDetailError(true);
        }
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
                <form onSubmit={handleSubmit}>
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
                        ref={modalMapRef}
                        onLoad={handleCenterChange}
                        onDragEnd={handleCenterChange}
                    >
                        <AddLocationIcon fontSize='large' color='primary' sx={{
                            position: 'absolute',
                            top: 'calc(50% - 17.5px)',
                            left: 'calc(50% - 17.5px)'
                        }}/>
                    </Map>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: '10px' }}>
                        {address.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {address.address}
                    </Typography>
                    </Box>
                    <Box sx={{ 
                        width: '60%',
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '300px',
                    }}>
                        <TextField 
                            id="issue-title" 
                            label="Title" 
                            variant="standard" 
                            sx={{ width: '100%', marginBottom: '20px' }} 
                            value={title}
                            error={titleError}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleError(e.target.value.length < MIN_TITLE_LENGTH);
                            }}
                        />
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
                        <TextField 
                            id="issue-detail" 
                            label="Detail" 
                            variant="outlined" 
                            multiline 
                            rows={5} 
                            value={detail}
                            error={detailError}
                            onChange={(e) => {
                                setDetail(e.target.value);
                                setDetailError(e.target.value.length < MIN_TITLE_LENGTH);
                            }}
                        />
                    </Box> 
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '20px' }}>
                    <Button variant="contained" type='submit' color={titleError || detailError ? 'grey': 'primary'}>Report</Button>
                </Box>
                </form>
                <AutoHideSnackbar
                    open={titleErrMsg}
                    setOpen={setTitleErrMsg}
                    message={`Title should have at least ${MIN_TITLE_LENGTH} characters.`}
                    duration={5000}
                />
                <AutoHideSnackbar
                    open={detailErrMsg}
                    setOpen={setDetailErrMsg}
                    message={`Detail should have at least ${MIN_DETAIL_LENGTH} characters.`}
                    duration={5000}
                />
            </Box>
        </Modal>
    );
};

export default ReportModal;