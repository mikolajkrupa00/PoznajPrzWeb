import styled from "styled-components";

const StyledFooter = styled.footer`
    margin-top: 40px;
    position: relative;
    bottom: -40px;
    width: 100%;
    height: 160px;
    background-color: #ccc;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer = () => {
	return (
		<StyledFooter>
			Poznaj Rzeszów
		</StyledFooter>
	)
}

export default Footer;