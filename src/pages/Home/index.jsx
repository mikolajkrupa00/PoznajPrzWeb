import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/index"
import Map from "../../components/HomePage/Map";
import {
	Wrapper, LeftWrapper, RightWrapper,
	MapWrapper, ClockWrapper, DigitalClock, PlaceWrapper, Button, Description, Header, Picture, InfoHeader, RzeszowPicture, RzeszowWrapper, RzeszowHeader, RzeszowDescription, RzeszowRight, RzeszowLeft
} from "./styles";
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import axios from "axios";
import { useHistory } from "react-router";
import rzeszowJpg from '../../assets/img/rzeszow.jpg';
import Footer from '../../components/HomePage/Footer'

const HomePage = () => {
	const history = useHistory();
	const [value, setValue] = useState(new Date()),
		[place, setPlace] = useState(null);

	useEffect(() => {
		const interval = setInterval(
			() => setValue(new Date()),
			1000
		);

		return () => {
			clearInterval(interval);
		}
	}, []);

	useEffect(() => {
		axios.get('/place').then(res => setPlace(res.data))
	}, [])

	console.log(place);

	return (
		<>
			<Layout>
				<Wrapper>
					<LeftWrapper>
						<PlaceWrapper>
							<InfoHeader>
								Losowo wybrane miejsce dla Ciebie:
						</InfoHeader>

							<Picture
								src="img/logo192.png"
								alt="Tymczasowe zdjęcie"
							/>

							<Header>{place?.name}</Header>
							<Description>{place?.description}</Description>

							<Button
								onClick={() => history.push("place", place?.placeId)}
							>Przejdź</Button>
						</PlaceWrapper>

						<Calendar />
					</LeftWrapper>

					<RightWrapper>
						<RzeszowWrapper>
							<RzeszowLeft>
								<RzeszowPicture
									src={rzeszowJpg}
									alt="Rzeszów jest ładny"
								/>
							</RzeszowLeft>

							<RzeszowRight>
								<RzeszowHeader>Rzeszów</RzeszowHeader>
								<RzeszowDescription>
									Miasto na prawach powiatu położone w południowo-wschodniej Polsce,
									jest stolicą województwa podkarpackiego,
									powiatu rzeszowskiego oraz siedzibą najważniejszych instytucji regionu.
									Posiada ponad 190 tys. mieszkańców i ponad 120 km kw. powierzchni.
								</RzeszowDescription>
							</RzeszowRight>
						</RzeszowWrapper>

						<RzeszowWrapper>
							<RzeszowLeft>
								<ClockWrapper>
									<Clock
										value={value}
									/>

									<DigitalClock>
										{("" + value.getHours()).padStart(2, "0")}:
									{("" + value.getMinutes()).padStart(2, "0")}:
									{("" + value.getSeconds()).padStart(2, "0")}
									</DigitalClock>
								</ClockWrapper>
							</RzeszowLeft>

							<RzeszowRight>
								<MapWrapper>
									<Map />
								</MapWrapper>
							</RzeszowRight>
						</RzeszowWrapper>
					</RightWrapper>
				</Wrapper>
			</Layout>

			<Footer />
		</>
	)

}

export default HomePage