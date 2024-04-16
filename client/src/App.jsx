import './App.css'
import Header from './assets/Header';
import ReportButton from './assets/ReportButton';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline/>
      <div id="container">
        <Header/>
        <ReportButton/>
      </div>
    </>
  );
}

export default App
