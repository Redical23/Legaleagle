"use client"
import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import { useModelContext } from '../context/Context';
import  setCanvasPreview from "./setCanvasPreview"

const imagecropper = () => {
  const imgRef = useRef(null)
  const { isModelOpen , setIsModelOpen ,  setupdateAvtarURL  } = useModelContext();
  
 const closeModels=()=>{setIsModelOpen(!isModelOpen); }
  
  const priviewcanvasref = useRef(null)
  const [imgSrc, setimgSrc] = useState('')
  const [crop, setCrop] = useState();
  const [error, setError] = useState('');
  const aspectratio = 1;
  const min_width = 150;


  const onselectfile = (e) => {

    const file = e.target.files?.[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageurl = reader.result?.toString() || "";
      imageElement.src = imageurl
      imageElement.addEventListener('load', (e) => {
        if (error) setError("")
        const { naturalWidth, naturalHeight } = e.currentTarget;
        console.log('Natural Width:', naturalWidth);
        console.log('Natural Height:', naturalHeight);
        if (naturalWidth < min_width || naturalHeight < min_width) {
          setError('Error: Image size is too small.');
          return setimgSrc('');
        }
      })
      setimgSrc(imageurl)
    });
    reader.readAsDataURL(file);

  }
  const onimgload = (e) => {
    const { width, height } = e.currentTarget;
    const cropwithpercent = ((min_width / width) * 100)
    const crop = makeAspectCrop({
      unit: "%",
      width: cropwithpercent
    }, aspectratio, width,
      height
    )
    const centrecrop = centerCrop(crop, width, height)
    setCrop(centrecrop)
  }
  const updatepics =(imgSrc)=>{setupdateAvtarURL(imgSrc)}

  return (
    <div>
      <input type="file" accept="image/*" onChange={onselectfile} />
      <button type='button' onClick={closeModels} >Close</button>
      {error && <p>{error}</p>}


      {imgSrc && (
        <div>

          <ReactCrop
            onChange={(pixelcrop, percentcrop) => setCrop(percentcrop)}
            crop={crop}
            circularCrop
            keepSelection
            aspect={aspectratio}
            minWidth={min_width}
          >
            <img ref={imgRef} src={imgSrc} alt="upload" style={{ maxWidth: "70vh" }} onLoad={onimgload} /></ReactCrop>
          <button onClick={() => {
            setCanvasPreview(
              imgRef.current,
              priviewcanvasref.current,
              convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)

            );
            const dataurl =priviewcanvasref.current.toDataURL()
            
            
            
            updatepics(dataurl)
            
             closeModels();
            
            
          }} >croppriview</button>


</div>
      )}

      {crop && (
        <canvas
        
          ref = {priviewcanvasref}
          className="mt-4"
          style={{
            
            border: '1px solid black',
            objectFit: 'contain',
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
};
export default imagecropper
