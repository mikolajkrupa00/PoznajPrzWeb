import L from 'leaflet'
import {useState, useEffect} from 'react'
import { LayerGroup, Marker, useMap} from 'react-leaflet'
import {useHistory} from 'react-router-dom'
import { localStorageService } from "../../../services/localStorageService"
import {markers} from '../Data'  //szcztuczna baza danych
import MarkersLayerControler from './MarkersLayerControler'
import OtherCategoriesTab from './OtherCategoriesTab'
import MarkerBriefDescription from './MarkerBriefDescription/index'


function Icon(size, iconImg) {

    const icon = L.icon({
        iconUrl: process.env.PUBLIC_URL + iconImg,
        iconSize: size
        //iconAnchor: [20, 45],
    })


    return icon
   
}

function M() {


}

const MarkersLayer = () => {

    const map = useMap()
    const history = useHistory();

    const [iconSize, setIconSize] = useState([20, 20])
    const [placeCategory, setPlaceCategory] = useState('all')
    const [otherCategories, setOtherCategories] = useState('off')
    const [briefDescription, setBriefDescription] = useState(false)

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

    
    const onMarkerClick = (markerObj) => {

        setBriefDescription(true)
        var pos =  markerObj.position;
        //TODO: dodac prawdziwe srodkowanie mapy na 'onMarkerClick', wymaga zmiany wysokosci diva 'mapWrapper'
        //TODO: dodac wyroznienie do kliknietego markera'
        pos[0] -= 0.003
        map.setView(pos)
        console.log(markerObj.id)
        localStorage.setItem('clickedMarker', JSON.stringify(markerObj))
        console.log("Added to localStorage")
    }

    const goToDescription = () => {
        var clickedMarker = JSON.parse(localStorage.getItem('clickedMarker'))

        console.log('Object from local storeage: ', clickedMarker)
        history.push("places/" + clickedMarker.id)
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
                                <Marker key={id} position={marker.position} icon={Icon(iconSize, marker.iconPath)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                            )
                        }
                        else{
                            
                            if(marker.category === placeCategory){
                                return(
                                    <Marker key={id} position={marker.position} icon= {Icon(iconSize, marker.iconPath)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                                )
                            }
    
                        }
                    }
                    else{

                        if(map.getZoom() >= marker.min_zoom_to_render){

                            if(placeCategory === 'all'){
                                return(
                                    <Marker key={id} position={marker.position} icon= {Icon(iconSize, marker.iconPath)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                                )
                            }
                            else{
                                
                                if(marker.category === placeCategory){
                                    return(
                                        <Marker key={id} position={marker.position} icon= {Icon(iconSize, marker.iconPath)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                                    )
                                }
        
                            }
                        }
                    }
                                            
                })
            }

            
            {briefDescription && <MarkerBriefDescription closeBriefDescription={() => setBriefDescription(false)} goToDescription={goToDescription}/>}
            
        </LayerGroup>
    )
          

}

export default MarkersLayer