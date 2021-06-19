import styled from "styled-components"

const componentStyles = {

    ButtonsWrapper: styled.div`
    margin-top: 0px;
    width: calc(100%);
    background-color: white;
    text-align: left;
    `,
    
    Down: styled.div`
    background-color: white;
    `,

    ButtonsWrapper2: styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
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

    Button2: styled.div`
    display:flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    padding: 0px 8px;
    height: 30px;
    background-color: whte;
    border-color: ${props => props.inputColor || "black"};
    color: ${props => props.inputColor || "black"};
    font-size: 14px;
    

    & > img{
        width: 26px;
        height: 26px;
    }
    `,

   
    ProfileIntro: styled.div`
    display:flex;
    flex-direction:row;
    background-color: white;
    padding: 25px 10px 0px 10px;
    `,

    UsernameLabel: styled.div`
    padding-bottom: 20px;
    font-size: 18px;
    `,



   

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
    margin: 4px 0px; 
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