import styled from "styled-components"

const componentStyles = {
    Wrapper: styled.div`
    margin-top: 100px;
    font-size: 50px;
    color: lightblue;
    text-align: center;
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
    border 5px;
    color: white;
    display: inline-flex;
    margin-right: 5px;

    :hover{
        cursor: pointer;
    }
    `,

    AddPlaceMain: styled.div`
    
    `,
    AddPlaceForm: styled.div`
    display:flex;
    flex-direction:column;
    
    `,
    AddPlaceLabel: styled.label`
    `,
    AddPlaceInput: styled.input`
    `,
    AddPlaceSubmit: styled.button`
    `,
    AddPlaceTextArea: styled.textarea`
    `,
    DropDownList: styled.select`
    `,
    DropDownOption: styled.option`
    `,

}

export default componentStyles