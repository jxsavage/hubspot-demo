import React from "react"
import Typography from '@mui/material/Typography';
import "./App.css"
import ResponsiveAppBar from "./ResponsiveAppBar"
import CRMProvider from "./CRMProvider"
import AllCompanies from "./AllCompanies"
import { Link } from "@mui/material";

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
      <Typography variant='h3'>Jake Savage's Hubspot API Demo</Typography>
      <Link target="_blank" href='https://github.com/jxsavage/hubspot-demo'>To view the source code and README on my GitHub click here!</Link>
      <AllCompanies/>
    </div>
    <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/21751537.js"></script>
    </CRMProvider>
    
  )
}

export default App
