import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchShowById } from "./showSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Rating } from "flowbite-react";
import ShowModal from "./ShowModal";
import ShowCredit from "../credits/showCredits/ShowCredit";
import { IoMdArrowRoundBack } from "react-icons/io";
import SimilarSeries from "./SimilarSeries";


type ProviderType = {
	provider_id: number;
	provider_name: string;
	logo_path: string;
	flatrate: ProviderType[];
	rent: ProviderType[];
	buy: ProviderType[];
};

const ShowDetails = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [userLocation, setUserLocation] = useState<any>();
	const [watchProviders, setWatchProviders] = useState<ProviderType>();
	const { id } = useParams();
	const Navigate = useNavigate();

	const dispatch = useAppDispatch();


		useEffect(() => {
			const getUserLocation = async () => {
				try {
					const resp = await fetch(
						`https://api.geoapify.com/v1/ipinfo?apiKey=${
							import.meta.env.VITE_APP_GEO_API_KEY
						}`
					);
					const userLocationData = await resp.json();
					setUserLocation(userLocationData.country.iso_code);
				} catch (error) {
					console.log(error);
				}
			};
			getUserLocation();
		}, []);

		useEffect(() => {
			dispatch(fetchShowById(id as string));
		}, [dispatch, id]);

			useEffect(() => {
				const getWatchProviders = async () => {
					try {
						const apiKey = import.meta.env.VITE_APP_API_KEY;
						const response = await fetch(
							`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`
						);
						const data = await response.json();
						const watchProviders = data.results[userLocation];
						setWatchProviders(watchProviders);
					} catch (error) {
						console.log(error);
					}
				};
				getWatchProviders();
			}, [id, userLocation]);

	const show = useAppSelector((state) => state.shows.show);
	const loading = useAppSelector((state) => state.shows.status === "loading");

	useEffect(() => {
		dispatch(fetchShowById(id as string));
	}, [dispatch, id]);

	if (!show) {
		return <h1>No show found</h1>;
	}

	const goBack = () => {
		Navigate(-1);
	};

	const ratingOutOf5 = show.vote_average / 2;
	const numberOfStars = Math.round(ratingOutOf5);

	const starComponents = Array.from({ length: numberOfStars }, (_, index) => (
		<Rating.Star key={index} />
	));

	return (
		<div className="flex flex-col gap-1 sm:mx-12 mx-2 overflow-hidden">
			<div className="h-10 flex gap-1">
				<IoMdArrowRoundBack
					title="Go Back"
					className="text-lg self-center hover:text-blue-700 cursor-pointer"
					onClick={goBack}
				/>
				<span className="self-center">Go Back</span>
			</div>
			<div className="flex flex-col lg:flex-row w-full gap-1">
				{loading ? (
					<Spinner aria-label="Default status example" />
				) : (
					<div className="flex flex-col text-xs flex-1">
						<div className="flex flex-col justify-center bg-white items-center w-100 sm:flex-row shadow-md sm:h-96 rounded-lg gap-1">
							<div className="flex flex-col items-center justify-center w-full h-full sm:w-full sm:h-full rounded">
								<img
									src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
									alt={show.name}
									className="w-full h-64 sm:w-full sm:h-72 rounded-t-lg rounded-b-none sm:rounded-none sm:rounded-l-lg flex-1"
								/>
								{watchProviders && (
									<div className="flex flex-col w-full gap-0.5 my-1">
										{watchProviders?.flatrate?.length > 0 && (
											<div className="flex justify-start gap-1 items-center flex-wrap">
												<h5 className="sm:text-lg px-1">
													<span className="text-sm font-semibold">
														Stream :
													</span>
												</h5>
												{watchProviders?.flatrate
													?.splice(0, 2)
													.map((provider: ProviderType) => (
														<div
															key={provider.provider_id}
															className="flex gap-1 justify-start items-center px-1"
														>
															<img
																src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
																alt={provider.provider_name}
																className="w-5 h-5"
															/>
															<span className="text-sm dark:text-white">
																{provider.provider_name
																	.split(" ")
																	.slice(0, 1)
																	.join("")}
															</span>
														</div>
													))}
											</div>
										)}
										{watchProviders?.buy?.length > 0 && (
											<div className="flex justify-start gap-1 items-center flex-wrap">
												<h5 className="sm:text-lg px-1">
													<span className="text-xs font-semibold">Buy :</span>
												</h5>
												{watchProviders?.buy
													?.splice(0, 2)
													.map((provider: ProviderType) => (
														<div
															key={provider.provider_id}
															className="flex gap-1 justify-start items-center px-1"
														>
															<img
																src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
																alt={provider.provider_name}
																className="w-5 h-5"
															/>
															<span className="text-sm dark:text-white">
																{provider.provider_name
																	.split(" ")
																	.slice(0, 1)
																	.join("")}
															</span>
														</div>
													))}
											</div>
										)}
										{watchProviders?.rent?.length > 0 && (
											<div className="flex justify-start gap-1 items-center flex-wrap">
												<h5 className="sm:text-lg px-1">
													<span className="text-sm font-semibold">Rent :</span>
												</h5>
												{watchProviders?.rent
													?.slice(0, 2)
													.map((provider: ProviderType) => (
														<div
															key={provider.provider_id}
															className="flex gap-1 justify-start items-center px-1"
														>
															<img
																src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
																alt={provider.provider_name}
																className="w-5 h-5"
															/>
															<span className="text-sm dark:text-white">
																{provider.provider_name
																	.split(" ")
																	.slice(0, 1)
																	.join("")}
															</span>
														</div>
													))}
											</div>
										)}
									</div>
								)}
								{show.networks && (
									<div className="w-full h-6 flex gap-1 p-1 mt-1">
										<h5 className="font-semibold">Network :</h5>
										<img
											src={`https://image.tmdb.org/t/p/w500${show?.networks[0].logo_path}`}
											alt={show?.networks[0].name}
											className="h-4"
										/>
									</div>
								)}
							</div>
							<div className="flex flex-col w-full sm:w-1/2 gap-2">
								<div className="flex flex-col justify-center gap-1 items-start flex-1">
									<h3 className="sm:text-lg px-1">
										<span className="sm:text-lg font-bold">Title: </span>
										{show.name}
									</h3>
									<p className="line-clamp-5 sm:text-lg px-1">
										<span className="sm:text-lg font-bold">Details: </span>
										{show.overview || "No details available"}
									</p>
									<div className="flex">
										<p className="sm:text-lg px-1 w-full">
											<span className="sm:text-lg font-bold">Rating: </span>
										</p>
										<Rating>{starComponents}</Rating>
									</div>
									<p className="sm:text-lg px-1">
										<span className="sm:text-lg font-bold">Released: </span>
										{show.first_air_date}
									</p>
									<div className="flex gap-2 justify-start items-center w-full py-2 px-1">
										<ShowModal show={show} />
										<span>Watch Trailer</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className="flex shadow-md p-2 bg-white rounded-lg lg:1/2">
					<ShowCredit />
				</div>
			</div>
			<div className="overflow-x-auto mb-2 bg-white p-1 rounded-md">
				<h4 className="capitalize">Similar Series</h4>
				<SimilarSeries seriesId={id} />
			</div>
		</div>
	);
};

export default ShowDetails;
