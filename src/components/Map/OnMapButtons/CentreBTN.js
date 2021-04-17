import centre_point from '../../../assets/img/on_map_buttons/centre_point.png'


const CentreBTN = ({mapInstance}) => {

    const duration = 1.5

    const centreMap = () => {
        mapInstance.setView([50.041187, 21.999121], mapInstance.getZoom(), 
            {
            "animate": true,
            "duration": duration
            } 
        )

        setTimeout(() => {
            mapInstance.setZoom(13)
        }, duration*1000)
    }

    return(
        <div className='centre_btn circle_button' onClick={centreMap}>
            <img src={centre_point} alt='' width='32px' height='32px'></img>
        </div>
    )
}

export default CentreBTN