import styled from "styled-components";


const componentStyles = {

    PlacesContainer: styled.div`
    display:flex;
    flex-grow:1;
    flex-direction:column;
    justify-content: center;
    background-color: #f0f0f0;
    `,
    DaysInput: styled.div`
    margin-top: 50px;
    `,
    PlaceInput: styled.div`
    margin-top: 5px;
    margin-bottom: 20px;
    `,
    Input: styled.input`
    padding: 10px;
    border: solid 1px #d0d0d0;
    border-top-left-radius:1em;
    border-bottom-left-radius:1em;
    outline: none;
    `,
    InputPlace: styled.input`
    padding: 10px;
    border: solid 1px #d0d0d0;
    border-radius:1em;
    width: 255px;
    outline: none;
    `,
    Button: styled.button`
    width: 60px;
    padding: 10px;
    border: solid 1px #d0d0d0;
    border-top-right-radius:1em;
    border-bottom-right-radius:1em;
    &:hover{
        background-color: #d0d0d0;
    }
    `,
    Place: styled.div`
    margin:10px 0px;
    display:flex;
    background-color: #fafafa;
    padding: 20px;
    text-align: left;
    border-bottom: 2px solid #d0d0d0;
    `,
    PlaceName:styled.div`
    font-size: 20px;
    font-weight:bold;
    `,
    PlaceAddress: styled.div`
    `,
    PlaceNumOfVisits: styled.div`
    `,
    PlaceDesc: styled.div`
    margin-left: 30px;
    `,
    PlaceImg: styled.img`
    margin-top:10px;
    margin-left:10px;
    width: 70px;
    height:70px;
    `,
    Stats: styled.div`
    margin-top: 8px;
    margin-bottom: 5px;
    font-weight: bold;
    `,
    Counter:styled.div`
    `,
    NumOfComments: styled.div`
    `,
    AverageRating: styled.div`
    `,
}

export default componentStyles