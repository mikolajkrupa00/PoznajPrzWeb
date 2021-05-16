import styled from "styled-components"


export default{
    AdminContainer: styled.div`
    `,
    BlockUserInput: styled.input`
    padding: 8px;
    border: solid 1px #d0d0d0;
    border-top-left-radius:1em;
    border-bottom-left-radius:1em;
    `,
    BlockUserContainer: styled.div`
    margin-top: 30px;
    `,
    BlockUserSubmit: styled.button`
    padding: 8px;
    border: solid 1px #d0d0d0;
    border-top-right-radius:1em;
    border-bottom-right-radius:1em;
    `,
    PlaceRow: styled.div`
    `,
    Place: styled.div`
    margin-top:50px;
    display:flex;
    flex-direction:row;
    `,
    PlaceName:styled.div`
    `,
    PlaceAddress: styled.div`
    `,
    PlaceCategory: styled.div`
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
    ConfirmButton:styled.button`
    `,
    BlockedUsers:styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    `,
    User:styled.div`
    border-top: solid 1px #d0d0d0;
    margin-top: 15px;
    padding: 15px 0;
    &:last-child{
        border-bottom: solid 1px #d0d0d0;
    }
    `,
    UserName: styled.div`
    margin-bottom: 5px;
    `,
    UserEmail: styled.div`
    `,
    UnlockUserSubmit: styled.button`
    margin-top: 10px;
    padding: 8px;
    width: 180px;
    border: solid 1px #d0d0d0;
    border-radius:1em;
    `,
}