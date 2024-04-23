import './App.css'
import * as React from 'react';
import Header from './assets/Header';
import ReportButton from './assets/ReportButton';
import Map from './assets/Map';
import Categories from './assets/Catogories';
import CssBaseline from '@mui/material/CssBaseline';
import ReportModal from './assets/ReportModal';

const mainMapConfig = {
    id: "mainMap",
    width: "100%",
    height: "calc(100vh - 64px)",
    center: [-122.259094, 37.871960],
    zoom: 14
}

function App() {
    const [reportModalOpen, setReportModalOpen] = React.useState(true);

    const toggleReportModal = (event) => {
      console.log("Modal toggled.");
      setReportModalOpen(reportModalOpen ? false : true);
    }

    return (
      <>
        <CssBaseline/>
        <div id="container">
          <Header/>
          <Map mapConfig={mainMapConfig}/>
          <ReportButton modalHandler={toggleReportModal}/>
          <Categories/>
          <ReportModal open={reportModalOpen} modalHandler={toggleReportModal}/>
        </div>
      </>
    );
}

export default App
