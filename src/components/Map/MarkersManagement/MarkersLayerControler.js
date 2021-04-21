import './MarkersLayerControler.css'
import MarkersLayerControlerItem from './MarkersLayerControlerItem'
import Axios from "axios";
import {useState, useEffect} from 'react'
import {categories} from '../Data'

const MarkersLayerControler = ({changePlaceCategory}) => {


    useEffect(() => {
        
        //call once when component is rendered
        //Axios.get("/category").then(res => {console.log(res.data)})
    }, [])

    
    return(
        <div className='markers_layer_controler_wrapper'>

            {
                categories.map((category, id) => (
                    <MarkersLayerControlerItem key={id} category={category.category} label={category.label} changePlaceCategory={changePlaceCategory}/>
                ))
            }
            
        </div>
    )
}


export default MarkersLayerControler