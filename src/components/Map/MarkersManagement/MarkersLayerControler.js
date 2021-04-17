import './MarkersLayerControler.css'
import MarkersLayerControlerItem from './MarkersLayerControlerItem'
import {categories} from '../Data'

const MarkersLayerControler = ({changePlaceCategory}) => {


    //tu potrzebuje dostac wszystkie kategorie jakie sa dostepne w naszej bazie danych 
    //lub pociagnac z bazy danych na starcie wszystkie potrzebne kategorie
    
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