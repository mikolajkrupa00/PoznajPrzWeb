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
    margin-bottom: 20px;
    `,
    Input: styled.input`
    padding: 10px;
    border: solid 1px #d0d0d0;
    `,
    Button: styled.button`
    padding: 10px;
    border: solid 1px #d0d0d0;
    &:hover{
        background-color: #d0d0d0;
    }
    `,
    Place: styled.div`
    width: 100%;
    margin:10px 0px;
    display:flex;
    background-color: #fafafa;
    padding: 20px;
    text-align: left;
    border-bottom: 2px solid #d0d0d0;
    `,
    PlaceName:styled.h3`
    `,
    PlaceAddress: styled.div`
    `,
    PlaceCategory: styled.div`
    `,
    PlaceNumOfVisits: styled.div`
    `,
    PlaceDesc: styled.div`
    margin-left: 30px;
    `,
    PlaceImg: styled.img`
    margin-top:10px;
    margin-left:10px;
    width: 20vw;
    max-height:20vw;
    `,
    Stats: styled.h4`
    margin-bottom: 5px;
    font-weight: bold;
    `,
    NumOfComments: styled.div`
    `,
    AverageRating: styled.div`
    `,
}

export default componentStyles