import styled from "styled-components"

const componentStyles = {

    Wrapper: styled.div`
    margin-top: 100px;
    font-size: 50px;
    color: lightblue;
    text-align: center;
    `,
    
    ButtonsWrapper: styled.div`
    margin-top: 10px;
    overflow-y: scroll;
    white-space: nowrap;
    width: calc(100%);
    `,
    Button: styled.button`
    background-color: ${props => props.inputColor || "rgb(0, 110, 230)"};
    border-radius: 10px;
    padding: 5px 10px;
    border 5px;
    color: white;
    display: inline-flex;
    margin-right: 5px;

    :hover{
        cursor: pointer;
    }
    `,

    ProfileGora: styled.div`
    display: inline-flex;
    justifyContent:center;
    background-color: whitesmoke;
    width:100%;
   `,

    ProfileIntro: styled.div`
    display:flex;
    flex-direction:row;
    background-color: white;
    padding: 25px 10px;
    `,
    ProfileImg: styled.img`
    width: 100px;
    height: 100px;
    `,
    ProfileDesc: styled.div`
    margin-left: 30px;
    text-align: left;
    width: calc(100% - 130px);
    `,
    ProfileName:styled.div`
    font-weight: 550;
    font-size: 19px;
    margin-bottom: 5px;
    `,
    ProfileStatus: styled.div`
    font-size: 15px;
    `,
    ProfileActive: styled.div`
    font-size: 15px;
    `,
    ProfileEmail: styled.div`
    `,

    //////PLACES


    // ---- FILTER CONTAINER ---- //
    CategoriesFilterContainer:styled.div`
    width: calc(100% - 30px);
    padding: 5px 15px;
    margin-top: 25px;
    overflow-y: scroll;
    white-space: nowrap;
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
        //width: 65%;
        //padding: 0px 30px;
        margin-top: 10px;
        justify-content: center;
    }
    `,

    SearchBarInput: styled.input`
    width: 65%;
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
    white-space: nowrap
    `,
    PlaceImgDiv: styled.div`
    display:flex;
    align-items: center;
    `,
    PlaceImg: styled.img`
    width:70px;
    height:70px;
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