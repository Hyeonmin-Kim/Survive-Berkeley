import './App.css'
import Header from './assets/Header';
import ReportButton from './assets/ReportButton';
import Map from './assets/Map';
import Categories from './assets/Catogories';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline/>
      <div id="container">
        <Header/>
        <Map/>
        <ReportButton/>
        <Categories/>
      </div>
    </>
  );
}

export default App
