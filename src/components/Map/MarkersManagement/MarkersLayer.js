import L from 'leaflet'
import {useState, useEffect} from 'react'
import { LayerGroup, Marker, useMap} from 'react-leaflet'
import {markers} from '../Data'  //szcztuczna baza danych
import MarkersLayerControler from './MarkersLayerControler'
import OtherCategoriesTab from './OtherCategoriesTab'


function Icon(size, iconImg) {

    const icon = L.icon({
        iconUrl: process.env.PUBLIC_URL + iconImg,
        iconSize: size
        //iconAnchor: [20, 45],
    })


    return icon
   
}

const MarkersLayer = () => {

    const map = useMap()

    const [iconSize, setIconSize] = useState([20, 20])
    const [placeCategory, setPlaceCategory] = useState('all')
    const [otherCategories, setOtherCategories] = useState('off')

    useEffect(() => {
        
        //call once when component is rendered
        map.on('zoom', resizeMarkersIcon)        
    }, [])


    const changePlaceCategory = (category) =>{

        console.log('changePlaceCategory to:', category )
        if(category === 'more')
            setOtherCategories('on')
        else
            setPlaceCategory(category)
    }

    const closeOtherCategoriesWindow = () => {

        setOtherCategories('off')
    }

    const resizeMarkersIcon = () => {

        var zoom = map.getZoom()

        console.log('Resize markes icon size on zoom event')
        console.log('zoom: ', zoom)

        var zoomLine = 10;
        var defaultWidth = 20
        var defaultHight = 20
               
        if( zoom > 10){

            var rate = zoom / zoomLine
            defaultWidth *= rate
            defaultHight *= rate

            setIconSize([defaultWidth, defaultHight])
        }else{
            setIconSize([defaultWidth, defaultHight])
        }

        console.log('zoom:', zoom, " w:",defaultWidth, " h:",defaultHight)

      
    }


    
    return(

        <LayerGroup iconSize={iconSize}>

            {otherCategories === 'on' ? <OtherCategoriesTab closeOtherCategories={closeOtherCategoriesWindow} changePlaceCategory={changePlaceCategory}/> : '' }

            <MarkersLayerControler changePlaceCategory={changePlaceCategory}/>

            {   
                markers.map((marker, id) => 
                {   
                    if(marker.min_zoom_to_render === 'none'){

                        if(placeCategory === 'all'){
                            return(
                                <Marker key={id} position={marker.position} icon={Icon(iconSize, marker.iconPath)} />
                            )
                        }
                        else{
                            
                            if(marker.category === placeCategory){
                                return(
                                    <Marker key={id} position={marker.position} icon= {Icon(iconSize, marker.iconPath)} />
                                )
                            }
    
                        }
                    }else{
                        
                        if(map.getZoom() >= marker.min_zoom_to_render){

                            if(placeCategory === 'all'){
                                return(
                                    <Marker key={id} position={marker.position} icon= {Icon(iconSize, marker.iconPath)} />
                                )
                            }
                            else{
                                
                                if(marker.category === placeCategory){
                                    return(
                                        <Marker key={id} position={marker.position} icon= {Icon(iconSize, marker.iconPath)} />
                                    )
                                }
        
                            }
                        }
                    }

                    
                }                   
            )}
        </LayerGroup>
    )
          

}

export default MarkersLayer