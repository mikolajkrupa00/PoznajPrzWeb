import LocalizationBTN from './LocalizationBTN'
import CentreBTN from './CentreBTN'
import './OnMapButtons.css'

import {useMap} from 'react-leaflet'

const OnScreenButtons = () => {

    const map = useMap()
       
    return(
        <div className='on_screen_buttons_wrapper'>
            <LocalizationBTN mapInstance={map}/>
            <CentreBTN mapInstance={map}/>
        </div>        
    )
}

export default OnScreenButtons