import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import ResponsiveAppBar from "./ResponsiveAppBar"
import CRMProvider from "./CRMProvider"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <LambdaDemo />
//         </header>
//       </div>
//     )
//   }
// }
const menuLinks = [
  {}
]
const siteTitle = `Jake Savage Hubspot API Demo`
const App = () => {
  return (
    <CRMProvider>
    <div className="App">
      <ResponsiveAppBar menuLinks={menuLinks} siteTitle={siteTitle} ></ResponsiveAppBar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <LambdaDemo />
      </header>
    </div>
    </CRMProvider>
  )
}

export default App
