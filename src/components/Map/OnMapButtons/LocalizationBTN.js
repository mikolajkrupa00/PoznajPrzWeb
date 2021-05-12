import {useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import L from 'leaflet'
import location_denied from '../../../assets/img/on_map_buttons/location_denied.png'
import location_granted from '../../../assets/img/on_map_buttons/location_granted.png'
import location_prompt from '../../../assets/img/on_map_buttons/location_prompt.ico'
import location_hunting from '../../../assets/img/on_map_buttons/location_hunting.png'
import man_icon from '../../../assets/img/user_location_marker/standing-man.png'




const LocalizationButtonIcon = forwardRef((props, ref) => {

    const [geolocationPermission, setGeolocationPermission] = useState('')
    const [locationState, setLocationState] = useState('')
   
    useEffect(() => {
        //call once when component is mounted
        console.log('useEffect on mount')
        geolocationPermissionsChecker()
    }, [])

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        
        //setGeolocationPermission
        setLocationIconBasedOnGeolocationPermisson(state) {
            console.log('setLocationIconBasedOnGeolocationPermisson')
            setGeolocationPermission(geolocationPermission)
            setLocationState('')
        },

        //set own GeolocationPermissionState
        setOwnGeolocationPermissonState(state) {
            console.log('setLocationIconBasedOnGeolocationPermisson')
            setGeolocationPermission(state)
            setLocationState('')
        },

        //setLocationState
        setLocationIconBasedOnLocationState() {
            console.log('setLocationIconBasedOnLocationState')
            setLocationState('hunting')
        },

      }));


    function geolocationPermissionsChecker(){

        //possible states: granted prompt denied
        //console.log('Geolocation Permissions Checker')
        navigator.permissions.query({name:'geolocation'}).then(
            function(permissionStatus) {

                console.log('Geolocation Permissions Checker - state: ', permissionStatus.state)
                setGeolocationPermission(permissionStatus.state)
                              
                
                permissionStatus.onchange = function() {
                    console.log('Geolocation permission state has changed to: ', this.state);
                    setGeolocationPermission(this.state)              
                  };
                
           });
    }

    var button_icon = undefined
    if(geolocationPermission === 'prompt') button_icon = location_prompt
    if(geolocationPermission === 'granted') button_icon = location_granted
    if(geolocationPermission === 'denied') button_icon = location_denied
    if(locationState === 'hunting') button_icon = location_hunting

    return(
        <img src={button_icon} alt='' width='32px' height='32px'></img>
    )
  
   
});



const LocalizationBTN = ({mapInstance}) => {

    const childRef = useRef()    

    const icon = L.icon({
        iconUrl: man_icon,
        iconSize: [30, 30],
        //iconAnchor: [20, 45],
    })    

    var marker = L.marker([0,0], {icon: icon})
    var markerRadius = L.circle()

    const localize = () => {
    
        mapInstance.locate({setView: true, maxZoom: 13, timeout:10000})
        mapInstance.on('locationfound', onLocationFound);
        mapInstance.on('locationerror', onLocationError);

        childRef.current.setLocationIconBasedOnLocationState()
    }

    const onLocationFound = (e) => {
        var radius = e.accuracy;
        var latlng = e.latlng
              
        markerRadius.setLatLng(latlng)
        markerRadius.setRadius(radius)
        markerRadius.addTo(mapInstance)

        marker.setLatLng(latlng)
        marker.addTo(mapInstance)

        childRef.current.setLocationIconBasedOnGeolocationPermisson()
    }

    function onLocationError(e) {
        alert(e.message);
        //childRef.current.setOwnGeolocationPermissonState('denied')
        childRef.current.setLocationIconBasedOnGeolocationPermisson()
    }

 
    return(
        <div className='localization_btn circle_button' onClick={localize}>
            <LocalizationButtonIcon  ref={childRef}/>
        </div>
    )

    
}

export default LocalizationBTN