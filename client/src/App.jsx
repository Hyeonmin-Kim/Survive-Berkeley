// import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Button from '@mui/material/Button';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:3000').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Button variant="contained" onClick={apiCall}>Make API Call</Button>

      </header>
    </div>
  );
}

export default App
