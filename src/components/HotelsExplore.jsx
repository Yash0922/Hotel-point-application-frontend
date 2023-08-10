// Api Functions


// React Hooks
import { useEffect,useContext } from 'react';
import { ModalsControllerContext } from '../contexts/ModalsControllerContext';
// Components
import { HotelCard } from './HotelCard';

export const HotelsExplore = () => {
	const {hotelsData, setHotelsData } = useContext(ModalsControllerContext);
	useEffect(() => {
		const controller = new AbortController();

		

		return () => {
			controller.abort('Cancel Previous Request');
		};
	}, []);
console.log(hotelsData	)
	return (
		<>
			<section className='container my-5' id='hotels-explore'>
				<h2 className='my-5 fw-bold fs-1'>Explore Our Hotels</h2>
				<div className='d-flex row w-100 justify-content-around align-items-center mx-0'>
					{hotelsData.map((hotel, i) => (
						<HotelCard hotel={hotel} key={hotel.title} id={i} />
					))}
				</div>
			</section>
		</>
	);
};
