import styled from "styled-components";


const componentStyles = {

    BriefDescriptionWrapper: styled.div`
    height: 210px;
    width: calc(100% - 30px);
    position: absolute;
    bottom: 0px;
    z-index: 1001;
    background-color: whitesmoke;
    transiition: height 1s;
    padding: 15px 15px 10px 15px;

    display: flex;
    flex-direction: column;
    `,

    TopDiv: styled.div`
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `,

    PlaceName: styled.div`
    font-size: 22px;
    font-weight: 500;
    width: 80%;
    overfolw: hide;
    text-align: left;
    `,

    CloseButton: styled.div`
    `,

    MiddleDiv: styled.div`
    height: 190px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `,

    PlaceImg: styled.div`
    height: 135px;
    width: 135px;
    background-color: lightblue;
    `,

    PlaceDescription: styled.div`
    height: 135px;
    width: 50%;
    overflow: hidden;
    text-align: left;
    `,

   
    BottomDiv: styled.div`
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `,

    Address: styled.div`
    width: 80%;
    text-align: left;
    overfolw: hidden;
    `,

    GoToDescriptionButton: styled.div`
    display: block;
    `

}

export default componentStyles