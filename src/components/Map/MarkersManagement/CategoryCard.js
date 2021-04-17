import './OtherCategoriesTab.css'


const CategoryCardItem = ({category, changePlaceCategoryAndExit}) =>{

    return(
        <div className='categoryCardItem' onClick={() => changePlaceCategoryAndExit(category.category)}> {category.label} </div>
    )
}


const CategoryCard = ({name, cardCategories, changePlaceCategoryAndExit}) => {

    return(
        
        <div className='categoryCard'>

                <div className='categoryCardTitle'> {name} </div>

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