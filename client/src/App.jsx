import './App.css'
import * as React from 'react';
import Header from './assets/Header';
import ReportButton from './assets/ReportButton';
import MainMap from './assets/MainMap';
import Categories from './assets/Catogories';
import CssBaseline from '@mui/material/CssBaseline';
import ReportModal from './assets/ReportModal';
import InfoBar from './assets/InfoBar';
import CenterButton from './assets/CenterButton';
import Popup from './assets/Popup';

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

    const toggleReportModal = () => {
      setReportModalOpen(reportModalOpen ? false : true);
    }

    const toggleInfoBar = () => {
      setInfoBarOpen(infoBarOpen ? false : true);
    }

    return (
      <>
        <CssBaseline/>
        <div id="container">
          <Header/>
          <MainMap 
            hooker={setMainMap} 
            popupHandler={setPopupOpen} 
            highlightPins={highlightPins} 
            highlightPinHandler={setHighlightPins} 
            currentLocation={currentLocation} 
            currentLocationHandler={setCurrentLocation} 
          />
          <ReportButton 
            modalHandler={toggleReportModal} 
            currentLocation={currentLocation} 
            modalMapCenterHandler={setReportModalCenter} 
          />
          <CenterButton mainMap={mainMap} />
          <Categories/>
          <InfoBar open={infoBarOpen}/>
          <ReportModal 
            open={reportModalOpen} 
            modalHandler={toggleReportModal}
            lng={reportModalCenter.lng}
            lat={reportModalCenter.lat}
          />
          <Popup 
            open={popupOpen} 
            popupHandler={setPopupOpen} 
            modalHandler={toggleReportModal}
            highlightPins={highlightPins} 
            highlightPinHandler={setHighlightPins}
            modalMapCenterHandler={setReportModalCenter}
          />
        </div>
      </>
    );
}

export default App
