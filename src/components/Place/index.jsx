import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import Layout from "../Layout/index"
import componentStyles, { FileInput, Header, 
	RatingCol, RatingForm, RatingRow, UploadFile,
	RatingSubmit } from "./styles";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser from 'react-html-parser';
import { localStorageService } from "../../services/localStorageService"
import { BiLeftArrowAlt } from 'react-icons/bi';

const PlacePage = (props) => {


	const { register, handleSubmit, errors, reset } = useForm();
	let iconStyles = { color: '#303030', fontSize: "25px" };
	const placeId = props.location.state;
	const history = useHistory();
	const [place, setPlace] = useState(true)
	const [ratings, setRatings] = useState()
	const [comment, setComment] = useState()
	const [file, _setFile] = useState(null);

	const { PlacesContainer, GoBack, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImg, PlaceDescription, RatingsContainer, AddRatingContainer,
		Rating, PlaceContainer, RatingComment, RatingDate, RatingUsername, RatingValue, RatingTop, RatingBottom, EditButton, Navivation, AddRatingInput,
		RatingCommentArea } = componentStyles;

	const { role, username, userId } = localStorageService // 0 admin
	useEffect(() => {
		Axios.get(`/place/${placeId}`).then(res => setPlace(res.data))
		Axios.get(`/rating/getRatings/${placeId}`).then(res => setRatings(res.data))
	}, [])

	const deleteRating = (ratingId) => {
		Axios.delete(`/rating/${ratingId}`);
		setRatings(ratings.filter(x => x.ratingId != ratingId));
	}

	const addRating = (data) => {
		var request = new FormData();
		request.append('ratingDate', new Date());
		request.append('comment', comment);
		request.append('value', data.value);
		request.append('userId', userId);
		request.append('placeId', placeId);
		request.append('file', file);

		Axios.request({
			url: "/rating",
			method: 'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: request,
			onUploadProgress: e => console.log(e)
		})
		.then(res => setRatings([...ratings, {
			ratingDate: new Date().toDateString(),
			ratingId: res.data.ratingId,
			comment: request.comment,
			value: +request.value,
			username: username,
			isVisible: true
		}]));

		reset();
	}

	const blockUser = (username) => {
		console.log(username);
		Axios.put(`/user/blockUser/${username}`)
	}

	const setFile = e => {
		const { files } = e.target;

		if(files.length === 1) {
			const file = files[0];

			_setFile(file);
		}
	}

	return (
		<Layout>
			<PlacesContainer>
				{place &&
					<PlaceContainer>
						<Place>
							<GoBack onClick={() => history.goBack()}><BiLeftArrowAlt style={iconStyles} /></GoBack>
							<PlaceImg src="logo192.png" />
							<PlaceDesc>
								<PlaceName>{place.name}</PlaceName>
								<Navivation href={`https://www.google.com/maps/search/?api=1&query=${place.attitude},${place.latitude}`} target="_blank">nawiguj</Navivation>
								<PlaceAddress>{place.address}</PlaceAddress>
								<PlaceCategory>kategoria :  {place.categoryName}</PlaceCategory>
								<PlaceDescription>opis : {place.description}</PlaceDescription>
							</PlaceDesc>
						</Place>
						{ratings &&
							<>
								<RatingsContainer>
									{ratings.map((rating, index) =>
										<Rating>
											{console.log(rating)}
											<RatingTop>
												<RatingUsername>{rating.username}</RatingUsername>
												<RatingDate>{rating.ratingDate}</RatingDate>
												<RatingValue>ocena: {rating.value}</RatingValue>
												{(role === '0' || username === rating.username) && <EditButton onClick={() => deleteRating(rating.ratingId)}>usuń</EditButton>}
												{role === '0' && <EditButton onClick={() => blockUser(rating.username)}>zablokuj</EditButton>}
											</RatingTop>
											<RatingComment>
												{rating.isVisible ? <>{ReactHtmlParser(rating.comment)}</> : "użytkownik zablokowany"}
											</RatingComment>
										</Rating>
									)}
								</RatingsContainer>
								{role !== "2" ? username &&
									<RatingForm onSubmit={handleSubmit(addRating)}>
										<RatingRow>
											<RatingCol>
												ocena : <AddRatingInput type="number" {...register('value', { required: true })} />
												<AddRatingInput defaultValue={place.placeId} type="hidden" {...register('placeId')} />
												komentarz: <ReactQuill theme="snow" value={comment || ''} onChange={setComment} />
											</RatingCol>

											<RatingCol>
												<UploadFile>
													<Header>Dodaj zdjęcie</Header>
													<FileInput
														type='file'
														id='file'
														name='file'
														accept='image/*'
														onChange={ e => setFile(e) }
													/>
												</UploadFile>
											</RatingCol>
										</RatingRow>										

										<RatingSubmit type="submit">dodaj komentarz</RatingSubmit>
									</RatingForm> :
									<>
										Zostałeś zablokowany skontaktuj się z administratorem
                                        </>
								}
							</>
						}
					</PlaceContainer>
				}
			</PlacesContainer>
		</Layout>
	)
}

export default PlacePage;