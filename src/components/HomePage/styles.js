import { Carousel, Col, Row } from "react-bootstrap";
import styled from "styled-components"
import mostMazowieckiego from '../../assets/img/most_mazowieckiego.jpg';

const StyledCarousel = styled(Carousel)`
	height: 300px;
`;

const StyledCarousel2 = styled(StyledCarousel)`
	height: 300px;
    margin-top: 18px
`;

const StyledCaption = styled(Carousel.Caption)`
	top: 50%;
	left: 50%;
	bottom: unset;
	right: unset;
	transform: translate(-50%, -50%);
	width: 100%;

	& > h3 {
		font-weight: 700 !important;
	}
`;

const StyledItem = styled(Carousel.Item)`
	height: 300px;

	&:before {
		content:"";
		display:block;
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background:rgba(0,0,0,0.4);
	}
`;

const StyledImg = styled.img`
	height: 100%;
	object-fit: cover;
`;

const RzeszowDescription = styled.div`
	font-family: 'Calibri';
    padding: 10px;
    text-align: left !important;
`;

const StyledLink = styled.a`
    margin-left: auto;
    display: flex;
    width: max-content;
    margin-right: 18px;
    text-decoration: underline;
    z-index: -1;
`;

const ZaletyBox = styled(Row)`
    padding: 16px;
    justify-content: space-between;
    margin-top: 18px;
    background-color: #eee;
`;

const ZaletyItem = styled(Col)`

`;

const ZaletyTitle = styled.div`
    padding-top: 10px;
`;

const TopBox = styled.div`
    margin-top: 18px;
    padding: 10px;
`;

const TopBoxHeader = styled.h4`

`;

const TopBoxRow = styled(Row)`

`;

const TopBoxItem = styled(Col)`
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopBoxImgBox = styled.div`
    position: relative;
    max-width: 256px;
`;

const TopBoxImg = styled.img`
    width: 100%;
    padding: 16px;
`;

const TopBoxCaption = styled.div`

`;

const TopBoxRating = styled.div`
    position: absolute;
    bottom: 40px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);

    & > svg {
        margin-left: 6px;
    }
`;

const EventsBox = styled.div`
    margin-top: 18px;
    padding: 10px;
`;

const EventsBoxHeader = styled.h4`

`;

const BackgroundBox = styled.div`
    height: 200px;
    background-image: url('${mostMazowieckiego}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 18px;
`;

const PlaceButton = styled.button`
    border: none;
    background: #555;
    color: #fff;
    padding: 10px 50px;
`;

export {
    StyledCaption,
    StyledCarousel,
    StyledCarousel2,
    StyledImg,
    StyledItem,
    RzeszowDescription,
    StyledLink,
    ZaletyBox,
    ZaletyItem,
    ZaletyTitle,
    TopBox, TopBoxHeader,
    TopBoxRow, TopBoxItem,
    TopBoxImg, TopBoxCaption,
    TopBoxRating, TopBoxImgBox,
    EventsBox, EventsBoxHeader,
    BackgroundBox,
    PlaceButton
}