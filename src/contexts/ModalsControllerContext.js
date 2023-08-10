// React Hooks and Fn
import { createContext, useState,useEffect } from 'react';
import axios from 'axios';
export const ModalsControllerContext = createContext();

export const ModalsControllerContextProvider = ({ children }) => {
	// State To Toggle The Show/UnShow of User Booking List
	const [toggleUserBookingsView, setToggleUserBookingsView] = useState(false);

	// State To Toggle The Show/UnShow of Hotel Booking Form
	const [toggleHotelBookView, setToggleHotelBookView] = useState(false);

	// State To Check If User Confirmed His Booking [For Optimistic Rendring Of Hotel Card In Case We Have Real API]
	const [bookingConfirmed, setBookingConfirmed] = useState(false);

	// State To Hold The Hotel Selected By The User [Took It As Reffrence]
	const [currentSelectedHotel, setCurrentSelectedHotel] = useState({});

	const [hotelsData, setHotelsData] = useState([]);

    useEffect(() => {
        // Make an API request to fetch hotel data
        axios.get('http://localhost:8080/allData') // Replace with your actual API endpoint
            .then(response => {
                setHotelsData(response.data.Visitors);
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
            });
    }, []);

	return (
		<ModalsControllerContext.Provider
			value={{
				hotelsData,
				setHotelsData,
				toggleUserBookingsView,
				setToggleUserBookingsView,
				toggleHotelBookView,
				setToggleHotelBookView,
				currentSelectedHotel,
				setCurrentSelectedHotel,
				bookingConfirmed,
				setBookingConfirmed,
			}}>
			{children}
		</ModalsControllerContext.Provider>
	);
};
