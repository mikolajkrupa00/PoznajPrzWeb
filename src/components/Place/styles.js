import styled from "styled-components";


const componentStyles = {

    PlacePageContainer: styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    `,
    
    // ----- TOP BAR ----- //
    TopBar: styled.div`
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    border-bottom: 1px solid #DDD;
    `,

    GoBack: styled.div`
    `,

    // ----- PLACE INTRO ----- //
    PlaceIntro: styled.div`
    display:flex;
    flex-direction:row;
    background-color: white;
    padding: 25px 10px;
    `,
    PlaceImg: styled.img`
    width: 100px;
    height: 100px;
    `,
    PlaceDesc: styled.div`
    margin-left: 30px;
    text-align: left;
    width: calc(100% - 130px);
    `,
    PlaceName:styled.div`
    font-weight: 550;
    font-size: 19px;
    margin-bottom: 5px;
    `,
    PlaceAddress: styled.div`
    font-size: 15px;
    `,
    PlaceCategory: styled.div`
    font-size: 15px;
    `,
    PlaceNumOfVisits: styled.div`
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
    border 0px;
    color: white;
    display: inline-block;
    margin-right: 5px;

    :hover{
        cursor: pointer;
    }
    `,
    Navigation:styled.a`
    text-decoration: none;
    color: inherit;
    `,


    // ----- GALLERY ----- //
    Gallery: styled.div`
    background-color: whitesmoke;
    height: 80px;
    width: 100%;
    padding: 10px 0px;
    overflow-y: scroll;
    white-space: nowrap;
    `,
    Photo: styled.div`
    height: 80px;
    width: 120px;
    background-color: lightblue;
    margin-right: 4px;
    display: inline-block;
    overflow-y: scroll;
    
    `,
    
     
    // ----- PLACE DESCRIPTION ----- //
    PlaceDescription: styled.div`
    background-color: white;
    padding: 20px 10px;
    `,
    DescriptionContent: styled.div`
    height: ${props => props.inputHeigh || '250px'};
    background-color: white;
    padding: 20px 10px;
    text-align: left;
    overflow-x: hidden;
    border-top: 1px solid #DDD;
    margin-bottom: 8px;

    :focus{
        overflow-x: scroll;
    }
   
    `,
    DescriptionButton: styled.div`
    `,


    // ----- RAITINGS CONTAINER ----- //
    RatingsContainer: styled.div`
    background-color: whitesmoke;
    padding: 20px 10px;
    `,

    RatingsPanel: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
    `,

    RatingsPanelMessages: styled.div`
    display: flex;
    justify-content: center;
    min-height: 18px;
    line-height: 18px;
    padding: 2px 5px;
    color: red;
    margin-bottom: 25px;
    `,

    RatingForm: styled.form`
    display:flex;
    flex-direction:column;
    margin: 40px 0px;
    background-color: #CCC;
    padding: 10px 0px;
    border: 1px solid #777;
    border-radius: 5px;
    padding: 15px;
    `,

    RatingFormTopPanel: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    `,

    RatingFormRaitingWrapper: styled.div`
    display: flex;
    margin: 20px 0px;
    `,
    AddRatingContainer:styled.div`
    `,
    AddRatingInput: styled.input`
    width: 100%;
    `,

    RatingFormLable: styled.div`
    display: flex;
    align-items: flex-start;
    margin-right: 25px;
    `,
    RaitingTextareaWrapper: styled.div`
    `,
    RaitingTextarea: styled.textarea`
    min-height: 75px;
    width: 100%;
    margin-bottom: 20px; 
    `,

    
    RatingFormAddImageWrapper: styled.div`
    display: flex;
    margin-bottom: 20px; 
    `,

    RatingSubmitWrapper: styled.div`
    align-items: center;
    `,
    RatingSubmit : styled.button`
    padding: 5px 10px;
    margin-auto;
    border-radius: 15px;
    border 0px;
    margin-top: 10px;
    
    `,
    

    Rating: styled.div`
    background-color: #EEE;
    margin-top:20px;
    border: 1px solid #777;
    border-radius: 5px;
    padding: 10px;

    `,
    RatingTop:styled.div`
    display:flex;
    justify-content: space-between;
    `,

    RatingComment:styled.div`
    margin: 15px 0px;
    `,
    RatingDate:styled.div`
    font-size: 14px;
    `,
    RatingUsername:styled.div`
    `,
    RatingValue:styled.div`
    // width:70px;
    margin-left:20px;
    `,
    
    RatingBottom:styled.div`
    display:flex;
    justify-content: space-between;
    `,
    RatingOptions:styled.div`
    display:flex;
    `,
    EditButton: styled.button`
    margin-left: 15px;
    width:70px;
    `,
    
}

const RatingForm = styled.form`
    display:flex;
    flex-direction:column;
    margin-top:50px;
    padding: 10px;
`;

const RatingRow = styled.div`
    display: flex;
    flex-direction: row;
`

const RatingCol = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    flex-grow: 1;
`;

const UploadFile = styled.div`
    margin-left: 36px;

`;

const Header = styled.h3`

`;

const FileInput = styled.input`
    margin-top: 10px;
`;

const RatingSubmit = styled.button`
    margin-top: 60px;
`;

export default componentStyles;
export {
    RatingForm,
    UploadFile,
    Header,
    FileInput,
    RatingRow,
    RatingCol,
    RatingSubmit
}