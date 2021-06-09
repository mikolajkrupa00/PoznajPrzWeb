import styled from "styled-components"

const componentStyles = {
    EditProfileMain: styled.div`
        font-family: Arial;
        color: #707070;
        background: #E6E6E6;
        width: 90%;
        min-height: 502px;
        margin: 5px auto;
        position: relative;
        top: max(calc((100vh - (var(--top_navbar_height) + 502px)) / 2), 0px);
        border: 1px solid #E9E9E9;
        border-radius: 5px;
        box-shadow: 0px 0px 10px #707070;

        @media (min-width: 700px) {
            width: 630px;
        }
    `,
    EditProfileForm: styled.form`
        display: flex;
        flex-direction: column;
    `,
    EditProfileTitle: styled.label`
        text-align: center;
        margin-top: 30px;
        margin-bottom: 25px;
        font-size: 35px;
        font-weight: bold;
    `,
    EditProfileLabel: styled.label`
        margin: 2px 40px;
        text-align: left;
        font-size: 15px;
        color: ${props => props.error ? "#CC0000" : "#707070"};
    `,
    EditProfileInput: styled.input`
        margin: 0px 30px 15px 30px;
        border: 1px solid ${props => props.error ? "#CC0000" : "#707070"};
        border-radius: 15px;
        font-size: 15px;
        padding: 5px 10px;
        font-family: Arial;
        color: #707070;
        :hover {
            box-shadow: 0px 0px 5px #707070;
        }
        ${props => props.error && "background-color: #FFEEEE;"}
    `,
    EditProfileInputError: styled.label`
        margin: -13px 40px 3px 40px;
        font-size: 11px;
        color: #CC0000;
        min-height: 16px;
        text-align: left;
    `,
    EditProfileButton: styled.button`
        margin: 15px ${props => props.inrow ? "5px" : "auto"};
        display: inline;
        border: 1px solid #707070;
        border-radius: 15px;
        font-size: 15px;
        padding: 5px 15px;
        font-family: Arial;
        font-weight: bold;
        color: #707070;
        background: ${props => props.color || "#E6E6E6"};
        :hover:not([disabled]) {
            box-shadow: 0px 0px 5px #707070;
        }
        :disabled {
            opacity: 0.7;
        }
    `,
    EditProfileButtonsRow: styled.div`
        text-align: center;
        display: inline-block;
    `,
    EditProfileInfoText: styled.label`
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${props => props.error ? "#CC0000" : "#00CC00"};
        font-weight: bold;
        font-size: 14px;
        margin: -10px 30px;
        padding: auto 0px;
        min-height: 41.6px;
    `
}

export default componentStyles