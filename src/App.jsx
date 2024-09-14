import { useEffect, useState } from 'react'
import axios from 'axios'


import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [data,setData]=useState([])
  const [filterdata,setFilterData]=useState([])
  useEffect(()=>{
    async function fetchData(){
      try {
        let apiRes = await axios.get('/data.json')
        //console.log(apiRes.data)
        setData(apiRes.data)
        
      } catch (error) {
        console.log("api fetch error--", error)
      }
    } 
    fetchData()
  },[])
  useEffect(()=>{
    if(input===""){
      setFilterData([])
      return
    }
    console.log(data[0])
    console.log(input)
    let fltrcntrs = data.filter(eachobj=>
      eachobj.country.toLowerCase().includes(input.toLowerCase()) ||
      eachobj.capital.toLowerCase().includes(input.toLowerCase()) 
    )
    console.log("---filterdata---",fltrcntrs)
    setFilterData(fltrcntrs)
  }, [data,input])
  const changeHandler = (e)=>{
    setInput(e.target.value)
  }
  const selectHandler=(sltdvalue)=>{
    console.log(` ${sltdvalue.country} - ${sltdvalue.capital}`)
    setInput(` ${sltdvalue.country} - ${sltdvalue.capital}`)
    setFilterData([])
  }

  return (
    <>
      <div className='searchbar-app'>
          <h2>Search Country Here..</h2>
          <div className="search-bar">
            <input type="text"  id="search-text" value = {input} onChange={changeHandler} />
            {
              filterdata?.length>0 && (
                <ul>
              {filterdata.map((item, index) => (
                <li key={index} onClick={()=>selectHandler(item)} className='suggestion'>
                  {item.country} - {item.capital}
                </li>
              ))}
            </ul>
              )
            }
          </div>
       </div>
    </>
  )
}

export default App
