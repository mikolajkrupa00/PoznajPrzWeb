import styled from "styled-components"

const componentStyles ={
    BlockUserInput: styled.input`
    padding: 8px;
    border: solid 1px #d0d0d0;
    border-top-left-radius:1em;
    border-bottom-left-radius:1em;
    outline: none;
    `,
    BlockUserContainer: styled.div`
    `,
    BlockUserSubmit: styled.button`
    padding: 8px;
    border: solid 1px #d0d0d0;
    border-top-right-radius:1em;
    border-bottom-right-radius:1em;
    `,

    BlockedUsers:styled.div`
    margin-top: 35px;
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
    UnblockMessageDiv: styled.div`
    margin: 15px 0px;
    height: 20px;
    line-height: 20px;
    `,
    BlockMessageDiv: styled.div`
    margin: 15px 0px;
    height: 20px;
    line-height: 20px;
    `,

}
export default componentStyles;
