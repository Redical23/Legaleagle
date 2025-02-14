"use client"
import React from 'react'
import SLIDENAV from './SLIDENAV'
import { useModelContext } from '../context/Context';
import { useRouter } from 'next/navigation';
const FULLBAR = () => {
  const { isModelOpen, setIsModelOpen,updateAvtarURL} = useModelContext();
  const crop = ()=> {    setIsModelOpen(!isModelOpen);
  };
  const router =useRouter()
  return (
    <div className='nav30'>
  <div className='avtarhome'>
    <img className='avtarsize' onClick={crop} src={updateAvtarURL} alt="error" />
  </div>
  <div>
    <SLIDENAV />
  </div>
  
  <div className="search-bar flex items-center bg-white rounded-lg overflow-hidden w-1/2 md:w-full">
    <div className="flex items-center justify-center bg-gray-200 rounded-l-lg">
      <div className="flex w-10 items-center justify-center border-r border-gray-200 bg-white p-2">
        <svg viewBox="0 0 20 20" aria-hidden="true" className="w-5 fill-gray-500">
          <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
        </svg>
      </div>
    </div>
    <input type="text" className="w-full bg-white pl-2 text-base font-semibold outline-none" placeholder="" id="" />
    <button className="bg-blue-500 p-2 text-white font-semibold hover:bg-blue-800 transition-colors rounded-r-lg">
      Search
    </button>
  </div>

  <a className='nav25' onClick={() => router.push("/setting")}>setting</a>
</div>

  )
}

export default FULLBAR
