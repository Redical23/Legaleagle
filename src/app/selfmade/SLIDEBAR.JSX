// "use client"


// import React, { useRef, useState } from 'react'
// import { SlMenu } from "react-icons/sl"; 
// import { useModelContext } from '../context/Context';
// import { useRouter } from 'next/navigation';

// const SLIDEBAR = ({togglelaw,togglenews}) => {
    
//     let [toggle, settoggle] = useState(true)
//     const handletoggle = () => { settoggle(!toggle) }
//     const router = useRouter();
//     const { isModelOpen, setIsModelOpen,updateAvtarURL} = useModelContext();
//     const crop = ()=> {    setIsModelOpen(!isModelOpen);
//     };
 
    

   
    
    
 
   
       

     

//     return (
      
            

//         <div>
           
//             <button onClick={handletoggle}> <SlMenu /></button>
//             <div className={toggle ? "hidden" : "show"}>
//                 <nav className="lin">
//                     <div>
//                      <img src= {updateAvtarURL} alt="error" />
//                      <button onClick={crop}>change image</button>
//                     </div>
//                     <div className='md'>
//                     <a onClick={() => router.push("/news")}>news</a>
//                     <a onClick={() => router.push("/lawyer")}>hire a lawyer</a>
//                     <a onClick={() => router.push("/professional")}>professional</a>
//                     <a onClick={() => router.push("/primum")}>primum</a>
//                     <a onClick={() => router.push("/chats")}>Chats</a>
//                     <a onClick={() => router.push("/setting")}>setting</a>
//                     </div>
                    
                    
//                 </nav>
//             </div>
//         </div>
     
//     )
// }

// export default SLIDEBAR
