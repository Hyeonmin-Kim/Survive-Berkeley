import './App.css'
import * as React from 'react';
import { useEffect } from 'react';
import { socket } from './socket';
import Header from './assets/Header';
import ReportButton from './assets/ReportButton';
import MainMap from './assets/MainMap';
import Categories from './assets/Catogories';
import CssBaseline from '@mui/material/CssBaseline';
import ReportModal from './assets/ReportModal';
import InfoBar from './assets/InfoBar';
import CenterButton from './assets/CenterButton';
import Popup from './assets/Popup';
import AutoHideSnackbar from './assets/AutoHideSnackbar';
import { backendURL } from './assets/utils';

const mainMapConfig = {
  id: "mainMap",
  width: "100%",
  height: "calc(100vh - 64px)",
  center: [-122.259094, 37.871960],
  zoom: 15
};

function App() {
    const [reportModalOpen, setReportModalOpen] = React.useState(false);
    const [infoBarOpen, setInfoBarOpen] = React.useState(false);
    const [popupOpen, setPopupOpen] = React.useState(false);
  
    const [mainMap, setMainMap] = React.useState(null);

    const [reportModalCenter, setReportModalCenter] = React.useState({
      lng: undefined,
      lat: undefined
    });

    const [currentLocation, setCurrentLocation] = React.useState([]);
    const [highlightPins, setHighlightPins] = React.useState([]);
    const [incidentPins, setIncidentPins] = React.useState([]);

    const [reportSuccessMsg, setReportSuccessMsg] = React.useState(false);
    const [reportFailMsg, setReportFailMsg] = React.useState(false);

    const toggleReportModal = () => {
      setReportModalOpen(reportModalOpen ? false : true);
    }

    const toggleInfoBar = () => {
      setInfoBarOpen(infoBarOpen ? false : true);
    }

    const fetchIncidents = () => {
      fetch(`${backendURL}/incidents`)
        .then(res => res.json())
        .then(data => {
          setIncidentPins(data);
          return data;
        })
        .catch(error => { 
          console.log(error);
          return [];
        });
    }

    useEffect(() => {
      fetchIncidents();
      socket.on('connect', () => {
        console.log("connected!");
      });
      socket.on('incidentUpdate', (allIncidents) => {
        console.log(`New incidents: ${allIncidents}`);4
        setIncidentPins(allIncidents);
      })
    }, []);

    return (
      <>
        <CssBaseline/>
        <div id="container">
          <Header/>
          <MainMap 
            hooker={setMainMap} 
            popupHandler={setPopupOpen} 
            infoBarHandler={setInfoBarOpen}
            highlightPins={highlightPins} 
            highlightPinHandler={setHighlightPins} 
            currentLocation={currentLocation} 
            currentLocationHandler={setCurrentLocation}
            incidentPins={incidentPins}
          />
          <ReportButton 
            modalHandler={toggleReportModal} 
            currentLocation={currentLocation} 
            modalMapCenterHandler={setReportModalCenter} 
          />
          <CenterButton mainMap={mainMap} />
          <Categories/>
          <InfoBar 
            open={infoBarOpen}
            infoBarHandler={setInfoBarOpen}
            />
          <ReportModal 
            open={reportModalOpen} 
            modalHandler={toggleReportModal}
            lng={reportModalCenter.lng}
            lat={reportModalCenter.lat}
            reportSuccessMsgHandler={setReportSuccessMsg}
            reportFailMsgHandler={setReportFailMsg}
          />
          <Popup 
            open={popupOpen} 
            popupHandler={setPopupOpen} 
            modalHandler={toggleReportModal}
            highlightPins={highlightPins} 
            highlightPinHandler={setHighlightPins}
            modalMapCenterHandler={setReportModalCenter}
          />
          <AutoHideSnackbar
              open={reportSuccessMsg}
              setOpen={setReportSuccessMsg}
              message={"Report added successfully!"}
              duration={5000}
          />
          <AutoHideSnackbar
              open={reportFailMsg}
              setOpen={setReportFailMsg}
              message={"Something went wrong!"}
              duration={5000}
          />
        </div>
      </>
    );
}

export default App
