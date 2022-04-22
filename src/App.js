import logo from './cryptologo.png'
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data,setData] = useState([])
  const [inputted,setInputted] = useState('')
  const url ='https://api.nomics.com/v1/currencies/ticker?key=7bfcfe8b6be178300a8a6d266a66b6619a678a46&ids=BTC,ETH,XRP,BNB,XMR,LTC&interval=1d,30d&convert=EUR&platform-currency=&per-page=100&page=1'

  const handleChange = e => {
    console.log(e.target.value)
    setInputted(e.target.value)
  }

  const filtered = !inputted ? data : data.filter((dt) => dt.name.toLowerCase().includes(inputted.toLowerCase())) 

  useEffect(() => {
    fetch(url,{method:'GET'})
    .then(response=> response.json())
    .then(res => {
      setData(res)
      console.log(res)
    })
    .catch(error => console.log(error))
  },[])

  



  return (
    <div className="App">
      <header>
        <img src={logo} alt='the logo' className='mt-10 ml-12' />
      </header>
      <div className='mx-auto text-white'>
      <h2 className="font-['Gilroy'] font-bold mx-auto text-3xl text-center w-4/12 leading-12">Get daily price updates of your favorite coins.</h2>
      <div className='mx-auto flex justify-center mt-6'>
      <input type='text' value={inputted}  onChange={handleChange} className="py-3 px-4 text-sm font-['Gilroy'] bg-inherit border border-green-500 w-1/5 focus:outline-none focus:border-1 focus:border-green-500 placeholder-inherit" placeholder='Type the coin name here' />

      </div >
      <div className='flex justify-center mt-12'>
      <table className="font-['Gilroy']">
        <thead className=''>
          <tr className="text-sm">
            <th className='font-thin px-12 bg-slate-800'>Coin Name</th>
            <th className='font-thin px-12 bg-slate-800'>Price</th>
            <th className='font-thin px-12 bg-slate-800'>Market Cap</th>
            <th className='font-thin px-12 bg-slate-800'>Status</th>
            <th className='font-thin px-12 bg-slate-800'>High</th>
          </tr>
        </thead>
        {filtered.map(dat => 
        <tbody className='text-sm'>
          <tr>    
            <td className='font-bold px-12 py-4'>{dat.name} <span><img src={dat.logo_url} className='w-4'/></span></td>
            <td className='font-thin px-12'>{dat.price}</td>
            <td className='font-thin px-12'>{dat.market_cap}</td>
            <td className='font-thin px-12'>{dat.status}</td>
            <td className='font-thin px-12'>{dat.high}</td>
          </tr>
        </tbody>
        )}
      </table>
      </div>
      </div>
      
    </div>
  );
}

export default App;
