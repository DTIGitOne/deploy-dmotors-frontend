import React, { useEffect, useState } from 'react';
import DateIcon from "../SVG/DateIcon";
import FuelIcon from "../SVG/FuelIcon";
import MileageIcon from "../SVG/MileageIcon";
import MotorIcon from "../SVG/MotorIcon";
import TransmitionTypeIcon from "../SVG/TransmitionTypeIcon";
import { Button } from "@mui/material";
import "../CustomCSS/Card.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setResultLoading } from "../Redux/Slices/PageSlice";
import LoaderIcon from "../SVG/LoaderIcon";
import useMediaQuery from '@mui/material/useMediaQuery';

const CardCar = ({brand , model , image , date , power , gearbox , mileage , fuel , price , id}) => {
   const [imageLoaded, setImageLoaded] = useState(false);
   const [fuelDisplay, setFuelDisplay] = useState("");

   const navigate = useNavigate();

   const openVehicle = (carId) => {
      navigate(`/cars/${carId}`);
   };

   useEffect(() => {
      if (fuel === "combustion/electric(phev)") {
          setFuelDisplay("PHEV");
          console.log("PHEV");
      } else if (fuel === "combustion/electric(hev)") {
          setFuelDisplay("HEV");
      } else {
          setFuelDisplay(fuel);
      }
  }, [fuel]);

   const dispatch = useDispatch();

   const handleImageLoad = () => {
      setImageLoaded(true);
      dispatch(setResultLoading(false));
   };

   const handleImageStartLoading = () => {
      dispatch(setResultLoading(true));
   };

   const isLargeScreen = useMediaQuery('(min-width: 1024px)');

   return (
      <div className={`h-auto flex justify-center items-center mb-4 ${isLargeScreen ? 'specialCardCar' : ''}`}>
         <div id='boxDirectionCard' className="cardBox flex flex-col bg-white">
            <div className={`imageBox h-1/2 w-full ${isLargeScreen ? 'specialCardCar' : ''}`}>
               <img 
                  className="h-full w-full object-cover" 
                  onLoad={handleImageLoad} 
                  style={{ display: imageLoaded ? 'block' : 'none' }} 
                  onLoadStart={handleImageStartLoading} 
                  src={image} 
                  alt="https://stmartinblue.com/images/cars/default_car.jpg"
               />   
               {!imageLoaded && <div className="h-full w-full flex justify-center items-center p-24"><LoaderIcon /></div>}
            </div>
            <div className="h-full w-full flex flex-col p-2">
               <div id="ListingNameModel" className="flex justify-center items-center text-xl font-semibold" style={{ height: "15%"}}>
                  <span className="font-normal pr-1">{brand}</span> <p>{model}</p>
               </div>
               <div id="flexWrapContainer" className="flex flex-wrap" style={{ height: "55%"}}>
                  <div className="h-1/2 w-1/3 flex items-center gap-2">
                     <DateIcon />
                     <div className="flex justify-center items-center w-2/3 h-1/2 p-1 bg-slate-300 rounded-xl" style={{fontSize: "12px", fontWeight: "600"}}>{date}</div>
                  </div>
                  <div className="h-1/2 w-1/3 flex items-center gap-2">
                     <MotorIcon />
                     <div className="flex justify-center items-center p-1 w-2/3 h-1/2 bg-slate-300 rounded-xl" style={{fontSize: "11px", fontWeight: "600"}}>{power} kW</div>
                  </div>
                  <div className="h-1/2 w-1/3 flex items-center gap-2">
                     <TransmitionTypeIcon />
                     <div className="flex justify-center items-center w-2/3 h-1/2 bg-slate-300 rounded-xl" style={{fontSize: "10px", fontWeight: "600"}}>{gearbox}</div>
                  </div>
                  <div className="h-1/2 w-1/3 flex items-center gap-2">
                     <MileageIcon />
                     <div className="flex justify-center items-center w-2/3 h-1/2 bg-slate-300 rounded-xl" style={{fontSize: "10px", fontWeight: "600"}}>{mileage} Km</div>
                  </div>
                  <div className="h-1/2 w-1/3 flex items-center gap-2 pl-1">
                     <FuelIcon />
                     <div className="flex justify-center items-center w-2/3 h-1/2 bg-slate-300 rounded-xl" style={{fontSize: "12px", fontWeight: "600"}}>{fuelDisplay}</div>
                  </div>
               </div>
               <div id="priceCardCardText" className="text-2xl flex justify-center items-center font-semibold mb-1" style={{ height: "10%"}}>
                  {price.toLocaleString()} €
               </div>
               <Button onClick={() => openVehicle(id)} sx={{ fontWeight: 700 , color: "#0066FF"}}>View</Button>
            </div>
         </div>
      </div>
   );
}

export default CardCar;
