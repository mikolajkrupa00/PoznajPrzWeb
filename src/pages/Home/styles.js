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

export {
	Wrapper, LeftWrapper, RightWrapper,
	MapWrapper
}