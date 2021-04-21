import L from 'leaflet'
import {useState, useEffect} from 'react'
import { LayerGroup, Marker, useMap} from 'react-leaflet'
import {useHistory} from 'react-router-dom'
import Axios from "axios";
// import {markers} from '../Data'  //szcztuczna baza danych
import MarkersLayerControler from './MarkersLayerControler'
import OtherCategoriesTab from './OtherCategoriesTab'
import MarkerBriefDescription from './MarkerBriefDescription/index'


function Icon(size, marker) {

    //const path to icon in public folder: img/place_category_icons/{CATEGORY_NAME}.png
    var iconPath = 'img/place_category_icons/' + marker.categoryName + '.png'
    
    const icon = L.icon({
        iconUrl: process.env.PUBLIC_URL + iconPath,
        iconSize: size
        //iconAnchor: [20, 45],
    })


    return icon
   
}


const MarkersLayer = () => {

    const map = useMap()
    const history = useHistory();
    

    const [iconSize, setIconSize] = useState([20, 20])
    const [markers, setMarkers] = useState();
    const [placeCategory, setPlaceCategory] = useState('all')
    const [otherCategories, setOtherCategories] = useState('off')
    const [briefDescription, setBriefDescription] = useState(false)
    const [clickedMarker, setClickedMarker] = useState('');

    useEffect(() => {
        
        //call once when component is rendered
        map.on('zoom', resizeMarkersIcon)
        Axios.get("/place/getPlaces").then(res => {setMarkers(res.data); console.log(res.data)})
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
        var pos =  [markerObj.attitude, markerObj.latitude]
        //TODO: dodac prawdziwe srodkowanie mapy na 'onMarkerClick', wymaga zmiany wysokosci diva 'mapWrapper'
        //TODO: dodac wyroznienie do kliknietego markera'
        pos[0] -= 0.003
        map.setView(pos)
        console.log(markerObj.placeId)
        localStorage.setItem('clickedMarker', JSON.stringify(markerObj))
        console.log("Added to localStorage")
        setClickedMarker(markerObj)
    }

    const goToDescription = () => {
        //var clickedMarker = JSON.parse(localStorage.getItem('clickedMarker'))
        //console.log('Object from local storeage: ', clickedMarker)
        //history.push("places/" + clickedMarker.id)
        history.push("place", clickedMarker.placeId)
    }

   

    
    return(

        <LayerGroup iconSize={iconSize}>

            {otherCategories === 'on' ? <OtherCategoriesTab closeOtherCategories={closeOtherCategoriesWindow} changePlaceCategory={changePlaceCategory}/> : '' }

            <MarkersLayerControler changePlaceCategory={changePlaceCategory}/>

            {markers &&   
                markers.map((marker, id) => 
                {   
                    
                    if(marker.zoom <= 10){

                        if(placeCategory === 'all'){
                            return(
                                <Marker key={id} position={[marker.attitude, marker.latitude]} icon={Icon(iconSize, marker)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                            )
                        }
                        else{
                            
                            if(marker.categoryName === placeCategory){
                                return(
                                    <Marker key={id} position={[marker.attitude, marker.latitude]} icon={Icon(iconSize, marker)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                                )
                            }
    
                        }
                    }
                    else{

                        if(map.getZoom() >= marker.zoom){

                            if(placeCategory === 'all'){
                                return(
                                    <Marker key={id} position={[marker.attitude, marker.latitude]} icon={Icon(iconSize, marker)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                                )
                            }
                            else{
                                
                                if(marker.categoryName === placeCategory){
                                    return(
                                        <Marker key={id} position={[marker.attitude, marker.latitude]} icon={Icon(iconSize, marker)} eventHandlers={{ click: (e) => onMarkerClick(marker) }} />
                                    )
                                }
        
                            }
                        }
                    }
                                            
                })
            }

            
            {briefDescription && <MarkerBriefDescription closeBriefDescription={() => setBriefDescription(false)} goToDescription={goToDescription} clickedMarker={clickedMarker}/>}
            
        </LayerGroup>
    )
          

}

export default MarkersLayer