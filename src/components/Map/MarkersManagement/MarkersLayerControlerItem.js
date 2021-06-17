import './MarkersLayerControler.css'
import { useTranslation } from "react-i18next";


const MarkersLayerControlerItem = ({category, changePlaceCategory}) => {

    const {t} = useTranslation();
    const tnm = 'map.'  //translation namespace

    return(
        <div className='markers_layer_controler_item' onClick={() => changePlaceCategory(category)}>
            {t(tnm+category)}  {/* label*/}
        </div>
    )
}


export default MarkersLayerControlerItem