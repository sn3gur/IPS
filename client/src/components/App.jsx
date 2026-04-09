import { useState } from 'react'
import logo from '../assets/logo-ips.png'
import TradeView from '../components/tradeview/TradingViewWidget'
import '../App.css'
import Form from '../components/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">

          <img src={logo} width="250" height="250" />
          
      </section>

        <section id="center">
       
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
      
      <div style={{ height: "80vh", width: "100%",marginBottom:"10%"}} >
        <Form />
        <h1 style={{ marginBottom:"10%"}} >Implementation Stock Market Chart</h1>
        
       
          <TradeView/> 
           
        </div>

   
      <section id="spacer"></section>
      
      
      

        
    </>
  )
}

export default App
