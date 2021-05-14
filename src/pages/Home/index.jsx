import images from '../../assets/img/carousel';
import images2 from '../../assets/img/carousel2';

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../../components/Layout";
import { 
	StyledCarousel, StyledItem,
	StyledImg, StyledCaption,
	RzeszowDescription, StyledLink, ZaletyBox, 
	ZaletyItem, ZaletyTitle, TopBox, 
	TopBoxHeader, TopBoxItem, TopBoxRow,
	TopBoxImg, TopBoxCaption, TopBoxRating, EventsBox, EventsBoxHeader, BackgroundBox, PlaceButton, StyledCarousel2, TopBoxImgBox
} from "./styles";
import { FaLeaf, FaStar } from 'react-icons/fa';
import { GrUserWorker } from 'react-icons/gr';
import { SiApacheairflow } from 'react-icons/si';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/HomePage/Footer';
import { useHistory } from 'react-router';

const zalety = [
	{
		Icon: FaLeaf,
		name: 'Dużo zieleni'
	},
	{
		Icon: GrUserWorker,
		name: 'Nowe miejsca pracy'
	},
	{
		Icon: SiApacheairflow,
		name: 'Czyste powietrze'
	}
]

const Home = () => {
	const history = useHistory();
	const [items, setItems] = useState([]);
	const [place, setPlace] = useState(null);

	useEffect(() => {
		axios.get('/rating/getRatingsStats/365')
		.then(res => {
			const { data } = res;

			const sorted = data.sort(
				(a, b) => a.numOfVisits < b.numOfVisits
			);

			const limited = sorted.slice(0, 4);

			setItems(limited);
		})
	}, []);

	useEffect(() => {
		axios.get('/place').then(res => setPlace(res.data))
	}, []);

	return (
		<Layout>
			<StyledCarousel
				indicators={false}
				controls={false}
			>
				{images.map((item, key) => {
					return (
						<StyledItem
							key={key}
						>
							<StyledImg
								className="d-block w-100"
								src={item}
								alt="Witamy w Rzeszowie"
							/>

							<StyledCaption>
								<h3>Witamy w Rzeszowie</h3>
							</StyledCaption>
						</StyledItem>
					)
				})}
			</StyledCarousel>

			<RzeszowDescription>
				Miasto na prawach powiatu położone w południowo-wschodniej Polsce,
				jest stolicą województwa podkarpackiego,
				powiatu rzeszowskiego oraz siedzibą najważniejszych instytucji regionu.
				Posiada ponad 190 tys. mieszkańców i ponad 120 km kw. powierzchni.
			</RzeszowDescription>

			<StyledLink
				href="https://pl.wikipedia.org/wiki/Rzesz%C3%B3w"
				target="_blank"
				rel="norel noref"
			>
				Czytaj więcej
			</StyledLink>

			<ZaletyBox
				noGutters
			>
				{ zalety.map((item, key) => {
					const { Icon, name } = item;
					return(
						<ZaletyItem
							xs={ 3 }
							key={ key }
						>
							<div>
								<Icon size={ 36 } color='black' />
							</div>
							
							<ZaletyTitle>{ name }</ZaletyTitle>
						</ZaletyItem>
					);
				}) }				
			</ZaletyBox>

			<TopBox>
				<TopBoxHeader>Najczęściej odwiedzane</TopBoxHeader>

				<TopBoxRow
					noGutters
				>
					{ items.map((item, key) => {
						console.log(item)
						return(
							<TopBoxItem
								key={ key }
								xs={ 6 }
							>
								<TopBoxImgBox>
									<TopBoxImg
										src='/img/logo192.png'
										alt='Miejsce'
									/>

									<TopBoxRating>
										{ parseFloat(item.averageValue).toFixed(1) }/10
										<FaStar size={ 16 } color='gold' />
									</TopBoxRating>
								</TopBoxImgBox>								

								<TopBoxCaption>
									{ item.name }
								</TopBoxCaption>
							</TopBoxItem>
						)
					}) }
				</TopBoxRow>
			</TopBox>

			<BackgroundBox />

			<EventsBox>
				<EventsBoxHeader>Nadchodzące wydarzenia</EventsBoxHeader>
			</EventsBox>

			<PlaceButton
				onClick={() => history.push("place", place?.placeId)}
			>To może Ci się spodobać</PlaceButton>

			<StyledCarousel2>
				{images2.map((item, key) => {
					return (
						<StyledItem
							key={key}
						>
							<StyledImg
								className="d-block w-100"
								src={item}
								alt="Rzeszów"
							/>
						</StyledItem>
					)
				})}
			</StyledCarousel2>

			<Footer />
		</Layout>
	);
}

export default Home;