"use client"
import React, { useState } from 'react'

const DROPMENU = () => {
  
    const [state, setState] = useState("state")
    const [city, setCity] = useState("city")



    return (
        <div  >
            <select name="state" id="state">
                <option value="pryagraj"> praygraj</option>
                <option value="lucknow">  luncknow</option>
            </select>


            <select name="state" id="state">
                <option value="prayagraj">Prayagraj</option>
                <option value="lucknow">Lucknow</option>
            </select>


        </div >
    )
}

export default DROPMENU
