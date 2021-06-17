import { useEffect, useState} from 'react'
import {useMap} from 'react-leaflet'
import { BiLeftArrowAlt } from 'react-icons/bi';

import './OtherCategoriesTab.css'

import Axios from "axios";
import { useTranslation } from "react-i18next";
import CategoryCard from './CategoryCard'

const OtherCategoriesTab = ({closeOtherCategories, changePlaceCategory}) => {

   const map = useMap()
   const {t} = useTranslation();
   const tnm = 'map.'  //translation namespace
   const [groupedCategories, setGroupedCategories] = useState([])
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
        Axios.get("/category").then(res => {parseData(res.data); console.log()})

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

    const parseData = (data) => {

        let parsedData = []
        let currCategoryName = '';
        let index
       
        console.log("parseData:")       
       
        data.map((item ) => {

            if(currCategoryName !== item.categoryTypeName){
                parsedData.push({})
                currCategoryName = item.categoryTypeName
                index = parsedData.push() - 1;
                console.log("index: ", index)
                console.log(parsedData[index])
                parsedData[index].groupName = item.categoryTypeName
                parsedData[index].groupCategories = []
                parsedData[index].groupCategories.push({ category: item.name})
            }
            else{

                parsedData[index].groupCategories.push({ category: item.name})
            }

        })

        console.log("parsedData:", parsedData)

        setGroupedCategories(parsedData)
    
    }
    
   
    return(
        <div className='otherCategoriesCardWrapper'>

           
            <div className='managmentWrapper'>
                <div className='closeCategoryWrapper' onClick={closeOtherCategories}> <BiLeftArrowAlt style={iconStyles}/></div>
                <div className='otherCategoriesWrapperTitle'>{t(tnm+"main_title")}</div>
                <div style={{width: '30px', height: '30px'}}></div>
            </div>
            
            {
                groupedCategories.map((group, id) => {

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