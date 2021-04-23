import styled from "styled-components";


const componentStyles = {

    PlacesContainer: styled.div`
    `,
    Place: styled.div`
    margin-top:50px;
    display:flex;
    flex-direction:row;
    `,
    GoBack: styled.div`
    `,
    PlaceName:styled.div`
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
    width:50px;
    height:50px;
    `,
    PlaceDescription: styled.div`
    `,
    RatingsContainer: styled.div`
    `,
    Rating: styled.div`
    margin-top:20px;
    `,
    PlaceContainer: styled.div`
    `,
    RatingComment:styled.div`
    margin-top:5px;
    `,
    RatingDate:styled.div`
    width:150px;
    margin-left:20px;
    `,
    RatingUsername:styled.div`
    width:70px;
    `,
    RatingValue:styled.div`
    width:70px;
    margin-left:20px;
    `,
    RatingTop:styled.div`
    display:flex;
    flex-directon:row;
    `,
    EditButton: styled.button`
    margin-left: 15px;
    width:70px;
    `,
    Navivation:styled.a`
    `,
    AddRatingContainer:styled.div`
    `,
    AddRatingInput: styled.input`
    `,
    RatingCommentArea: styled.textarea`
    `,
    
}

const RatingForm = styled.form`
    display:flex;
    flex-direction:column;
    margin-top:50px;
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