// React Hooks and Fn
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	// State To Hold The Current User Logged In To The App
	const [currentUser, setCurrentUser] = useState({});

	const [users, setusers] = useState({});

	/*State To Hold All User Booking During His Browsing 
	[Would Be Very Useful in Case of Real Database to not Fetch again 
		every Time the user Booking Data after Update]
	*/

	console.log("User name",users)
	const [userBookingData, setUserBookingData] = useState([]);

	useEffect(() => {
        // Fetch user data from the backend
        axios.get(`https://hotel-point-application-backend.vercel.app/profile`) // Replace with your actual API endpoint
            .then(response => {
                setusers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        return () => {
            setCurrentUser({});
        };
    }, []);
	useEffect(() => {
		// LoggedUser Should Be Fetched in Case we have Database
		const loggedUser = { userName: "Yash kumar Pal", email: 'm.khaled100@ymail.com', phoneNumber: '+20 109 0292 306', bookings: [] };
		setCurrentUser(loggedUser);

		return () => {
			setCurrentUser({});
		};
	}, []);


	useEffect(() => {
		// Update Current User Data After Update The Bookings [Should Be Posted To Database]
		setCurrentUser((prev) => {
			return { ...prev, bookings: userBookingData };
		});
	}, [userBookingData]);

	// Fn To Handle The Cancelation of Prev. Booking
	const handleCancelBooking = (cancledHotel) => {
		setUserBookingData((prev) => {
			return prev.filter((booking) => booking.hotel.hotelName !== cancledHotel.hotelName);
		});
	};

	return <UserContext.Provider value={{ currentUser, setUserBookingData, userBookingData, handleCancelBooking }}>{children}</UserContext.Provider>;
};
