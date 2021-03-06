import './MarkersLayerControler.css'
import MarkersLayerControlerItem from './MarkersLayerControlerItem'
import Axios from "axios";
import {useState, useEffect} from 'react'
// import {categories} from '../Data'

const MarkersLayerControler = ({changePlaceCategory}) => {

    const [markersCategories, setMarkersCategories] = useState([])

    useEffect(() => {
        
        //call once when component is rendered
        Axios.get("/category").then(res => {setMarkersCategories(res.data); console.log(res.data)})
    }, [])

    
    return(
        <div className='markers_layer_controler_wrapper'>
            
            <MarkersLayerControlerItem key={'all'} category={'main_all'}  changePlaceCategory={changePlaceCategory}/>

            {
                markersCategories.map((category, id) => (
                    <MarkersLayerControlerItem key={id} category={category.name}  changePlaceCategory={changePlaceCategory}/>
                ))
            }

            <MarkersLayerControlerItem key={'more'} category={'main_more'}  changePlaceCategory={changePlaceCategory}/>
            
        </div>
    )
}


export default MarkersLayerControler