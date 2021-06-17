import './OtherCategoriesTab.css'
import { useTranslation } from "react-i18next";

const CategoryCardItem = ({category, changePlaceCategoryAndExit}) =>{

    const {t} = useTranslation();
    const tnm = 'map.'  //translation namespace

    return(
        <div className='categoryCardItem' onClick={() => changePlaceCategoryAndExit(category.category)}> {t(tnm+category.category)} </div>
    )
}


const CategoryCard = ({name, cardCategories, changePlaceCategoryAndExit}) => {


    const {t} = useTranslation();
    const tnm = 'map.main_'  //translation namespace

    return(
        
        <div className='categoryCard'>

                <div className='categoryCardTitle'> {t(tnm+name)} </div>

                <div className='categoryCardItemsGrid'>

                    { cardCategories.map((cardCategory, id) => {

                        return(
                            <CategoryCardItem key={id} category={cardCategory} changePlaceCategoryAndExit={changePlaceCategoryAndExit}/>
                        )
                    }) }
                    
                    
                </div>
            
            </div>
    )

}

export default CategoryCard