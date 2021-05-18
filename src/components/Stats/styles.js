import styled from "styled-components";


const componentStyles = {

    PlacesContainer: styled.div`
    display:flex;
    flex-grow:1;
    flex-direction:column;
    justify-content: center;
    background-color: #f0f0f0;
    padding-bottom:15px;
    `,
    DaysInput: styled.div`
    margin-top: 50px;
    display:block;
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
    transition: .5s;
    `,
    InputPlace: styled.input`
    padding: 10px;
    border: solid 1px #d0d0d0;
    border-radius:1em;
    width: 255px;
    outline: none;
    transition: .5s;
    `,
    Button: styled.button`
    width: 60px;
    padding: 10px 5px;
    border: solid 1px #d0d0d0;
    border-top-right-radius:1em;
    border-bottom-right-radius:1em;
    background-color: #d0d0d0;
    transition: .5s;
    &:hover{
        background-color: #e0e0e0;
    }
    `,
    Place: styled.div`
    margin:10px 0px;
    display:flex;
    background-color: #fafafa;
    padding: 20px;
    text-align: left;
    border-bottom: 2px solid #d0d0d0;
    
    transition:.5s;
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
    AverageRating: styled.div`
    `,
    Message: styled.span`
    color: firebrick;
    font-weight: bold;
    margin-bottom: 10px;
    transition:.5s;
    `
}

export default componentStyles