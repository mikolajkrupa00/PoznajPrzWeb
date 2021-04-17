import './MarkersLayerControler.css'



const MarkersLayerControlerItem = ({category, label, changePlaceCategory}) => {

    return(
        <div className='markers_layer_controler_item' onClick={() => changePlaceCategory(category)}>
            {label}
        </div>
    )
}


export default MarkersLayerControlerItem