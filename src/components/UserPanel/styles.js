import styled from "styled-components"

const componentStyles = {

    ButtonsWrapper: styled.div`
    margin-top: 0px;
    overflow-y: scroll;
    width: calc(100%);
    background-color: white;
    text-align: left;
    `,
    
    Down: styled.div`
    background-color: white;
    `,

    ButtonsWrapper2: styled.div`
    margin-top: 10px;
    overflow-y: scroll;
    white-space: nowrap;
    width: calc(100%);
    background-color: whitesmoke;
    `,
    Button: styled.button`
    background-color: ${props => props.inputColor || "rgb(0, 110, 230)"};
    border-radius: 10px;
    padding: 5px 10px;
    border 5px;
    color: black;
    display: inline-flex;
    margin-right: 5px;

    :hover{
        cursor: pointer;
    }
    `,

    ProfileIntro: styled.div`
    display:flex;
    flex-direction:row;
    background-color: white;
    padding: 25px 10px;
    `,

    //////PLACES

    // ---- PLACES CONTAINER ---- //
    PlacesContainer: styled.div`
    display: flex;
    flex-direction: column;
    `,
    Place: styled.div`   
    display:flex;
    padding: 5px;
    background-color: white;
    border-bottom: 1px solid #CCC;

    //width: calc(100% - 30px);
     
    `,
    PlaceDetails: styled.div`
     display:flex;
    flex-direction:column;
    width: 100%;
    `,
    PlaceLabel: styled.span`
    font-size: 12px;
    font-weight: bold;
    font-variant: small-caps;
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

    PlaceComment:styled.div`

    `,

    PlaceRating:styled.div`

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

    
    AdminContainer : styled.div`
    transition: 0.2s;
    `,
    
}



export default componentStyles