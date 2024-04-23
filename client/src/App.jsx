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

function App() {
    const [reportModalOpen, setReportModalOpen] = React.useState(false);
    const [infoBarOpen, setInfoBarOpen] = React.useState(false);

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
          <MainMap/>
          <ReportButton modalHandler={toggleReportModal}/>
          <CenterButton/>
          <Categories/>
          <InfoBar open={infoBarOpen}/>
          <ReportModal open={reportModalOpen} modalHandler={toggleReportModal}/>
        </div>
      </>
    );
}

export default App
