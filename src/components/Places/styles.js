import styled from "styled-components";


const componentStyles = {

    // ---- FILTER CONTAINER ---- //
    CategoriesFilterContainer:styled.div`
    width: calc(100% - 30px);
    padding: 5px 15px;
    margin-top: 25px;
    overflow-y: scroll;
    white-space: nowrap;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    `,

    CategoriesFilterItem:styled.div`
    border-radius: 20px;
    padding: 5px 10px;
    border: 1px solid #DDD;
    background-color: ${props => props.bgColor ? "rgb(237, 246, 255)" : "white"};
    margin-right: 5px;
    display: inline-block;
    text-align: center;
    z-index: 1000;
    
    &:last-child{
        margin-right:15px;
    }

    :hover{
        cursor: pointer;
        border: 1px solid rgb(0, 110, 230);
        background-color: rgb(237, 246, 255);
    }
    `,

    SearchBarContainer:styled.div`
    padding: 0px 15px;
    display: flex;
    flex-direction: column;
    `,

    SearchBarRow:styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: space-between;

    &:nth-child(2){
        margin-top: 10px;
        justify-content: center;
    }
    `,

    SearchBarInput: styled.input`
    height: 35px;
    border-radius: 20px;
    border: 1px solid #DDD;
    margin: 0px;
    padding: 0px 30px;
    font-size: 16px;
    `,

    SearchBarButton: styled.button`
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 1px solid #DDD;
    display: flex;
    justify-content: center;
    align-items: center;
    `,

    // ---- PALCES CONTAINER ---- //
    PlacesContainer: styled.div`
    display: flex;
    flex-direction: column;
    `,
    Place: styled.div`   
    display:flex;
    flex-direction:row;
    margin: 5px 0px;
    padding: 15px 15px;
    background-color: white;
    border-bottom: 1px solid #CCC;

    //width: calc(100% - 30px);
            
    &:first-child{
        margin-top: 40px;
    }
    `,
    PlaceName:styled.div`
    font-size: 20px;
    margin-bottom: 2px;
    `,
    PlaceAddress: styled.div`
    `,
    PlaceCategory: styled.div`
    `,
    PlaceNumOfVisits: styled.div`
    `,
    PlaceDesc: styled.div`
    margin-left: 30px;
    text-align: left;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    white-space: nowrap;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    `,
    PlaceImgDiv: styled.div`
    display:flex;
    align-items: center;
    `,
    PlaceImg: styled.img`
    width:90px;
    height:90px;
    `,
    PlaceDescription: styled.div`
    `,
    
    PlaceContainer: styled.div`
    `,
    Navigation:styled.a`
    margin-top: 6px;
    align-self: start;
    `,
}

export default componentStyles