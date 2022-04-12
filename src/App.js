import React from "react"
import Typography from '@mui/material/Typography';
import "./App.css"
import ResponsiveAppBar from "./ResponsiveAppBar"
import CRMProvider from "./CRMProvider"
import AllCompanies from "./AllCompanies"

const menuLinks = [
  {
    name: 'Companies',
    link: '#companies'
  }
]
const siteTitle = `Hubspot API Demo`
const App = () => {
  return (
    <CRMProvider>
    <div className="App">
      <ResponsiveAppBar menuLinks={menuLinks} siteTitle={siteTitle} ></ResponsiveAppBar>
      <Typography variant='h2'>Jake Savage's Hubspot API Demo</Typography>
      <AllCompanies/>
    </div>
    <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/21751537.js"></script>
    </CRMProvider>
    
  )
}

export default App
