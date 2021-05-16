import styled from "styled-components";

const StyledFooter = styled.footer`
    margin-top: 24px;
    margin-bottom: -20px;
    width: 100%;
    height: 160px;
    background-color: #555;
    color: #fff;
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