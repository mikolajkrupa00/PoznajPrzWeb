import styled from "styled-components"

const Wrapper = styled.main`
  display: flex;
	width: calc(100vw - 40px);
	height: calc(100vh - 40px - var(--top_navbar_height));
	padding: 10px;
`;

const LeftWrapper = styled.div`
	width: 25%;
	flex-grow: 1;
`;

const RightWrapper = styled.div`
	width: 75%;
	flex-grow: 1;
`;

const MapWrapper = styled.div`
	width: 100%;
	height: 300px;
`;

const ClockWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px;
	flex-direction: column;
`;

const DigitalClock = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 20px;
	font-size: 2rem;
`;

const PlaceWrapper = styled.div`
	max-width: 320px;
	max-height: 640px;
	overflow-y: hidden;
	background: #fff;
	box-shadow: 0 0 10px aqua;
	margin: 10px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Button = styled.button`
	margin-top: 10px;
`;

const InfoHeader = styled.h3`
	font-family: 'Calibri';
`;

const Header = styled.h3`
	font-family: 'Calibri';
`;

const Description = styled.small`
	font-family: 'Calibri';
`;

const Picture = styled.img`
	width: 192px;
	height: 192px;
`;

const RzeszowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	height: 300px;
	padding: 10px;
	margin: 10px;
`;

const RzeszowLeft = styled.div`
	width: 50%;
`;

const RzeszowPicture = styled.img`
	height: 300px;
	width: 100%;
`;

const RzeszowRight = styled.div`
	width: 50%;
	padding: 10px;
`;

const RzeszowHeader = styled.h1`
	font-family: 'Calibri';
`;

const RzeszowDescription = styled.span`
	font-family: 'Calibri';
`;

export {
	Wrapper, LeftWrapper, RightWrapper,
	MapWrapper, ClockWrapper, DigitalClock,
	PlaceWrapper, Button, Description, Header,
	Picture, InfoHeader, RzeszowWrapper,
	RzeszowPicture, RzeszowHeader,
	RzeszowDescription, RzeszowRight,
	RzeszowLeft
}