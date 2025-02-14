import React, { useState } from 'react'



const Searchbar = () => {
    let [input,setinput]=useState()
  return (
   
    <div>
        <input type='search'  placeholder='SEARCH'  value={input}
         onChange={(e)=>setinput(e.target.value)}/>
    </div>
  )
}

export default Searchbar
