import { useEffect} from 'react'
import {useMap} from 'react-leaflet'
import { BiLeftArrowAlt } from 'react-icons/bi';

import './OtherCategoriesTab.css'

import {grouped_categories} from '../Data'
import CategoryCard from './CategoryCard'

const OtherCategoriesTab = ({closeOtherCategories, changePlaceCategory}) => {

   const map = useMap()
   let iconStyles = { color: '#303030', fontSize: "25px" };

    useEffect(() => {

        // Anything in here is fired on component mount.
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        console.log('useEffect on component mount')
        //TODO: add Axios request

        return () => {
            // Anything in here is fired on component unmount.
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            console.log('useEffect on component unmount')
        }

    }, [])


    const changePlaceCategoryAndExit = (category) => {
        
        setTimeout(() => {
            closeOtherCategories()
            changePlaceCategory(category)
        }, 500)
        
    }

   

   
    return(
        <div className='otherCategoriesCardWrapper'>

           
            <div className='managmentWrapper'>
                <div className='closeCategoryWrapper' onClick={closeOtherCategories}> <BiLeftArrowAlt style={iconStyles}/></div>
                <div className='otherCategoriesWrapperTitle'>Pozostałe Kategorie</div>
                <div style={{width: '30px', height: '30px'}}></div>
            </div>
            
            {
                grouped_categories.map((group, id) => {

                    return(
                        <CategoryCard 
                            key={id} 
                            name={group.groupName} 
                            cardCategories={group.groupCategories} 
                            changePlaceCategoryAndExit={changePlaceCategoryAndExit}          
                        />
                    )
                        
                })

            }
        
        </div>
    )

}

export default OtherCategoriesTab