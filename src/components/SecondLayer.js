import React, { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import imagenMetroid from '../assets/images/metroid_ii_final_boss__hd_by_billysan291-d2zahfk.jpg'
import  FirstLayer  from './FirstLayer';



export const SecondLayer = ({ name1, clan1 }) => {


  return (
    <div>
      <h1>metroid_ii_final_boss__hd_by_billysan291</h1>
     {/*<img src={imagenMetroid} alt="Mymage" /> */} 
      <FirstLayer/>
    </div>
  );
}