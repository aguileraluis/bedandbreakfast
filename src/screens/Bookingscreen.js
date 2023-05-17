import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
    duration : 2000
});

function Bookingscreen() {
    const { roomid } = useParams();
    const { fromdate } = useParams();
    const { todate } = useParams();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();
    const [rentPerDay, setrentPerDay] = useState();

    const totaldays = (moment.duration((moment(todate, 'DD-MM-YYYY')).diff(moment(fromdate, 'DD-MM-YYYY'))).asDays());
    const [totalamount, settotalamount] = useState();

    // console.log(total)

    useEffect(() => {
        const fetchSingle = async () => {
            try {
                setloading(true);
                const data = (await axios.post('/api/rooms/getroombyid', { roomid, fromdate, todate, totaldays, rentPerDay })).data
                let name = (data.name);
                if (name.includes("Joy")) {
                    const joytotal = JSON.parse(localStorage.getItem("Joy"))
                    settotalamount(joytotal)
                } else if (name.includes("Faith")) {
                    const faithtotal = JSON.parse(localStorage.getItem("Faith"))
                    settotalamount(faithtotal)
                } else if (name.includes("Love")) {
                    const lovetotal = JSON.parse(localStorage.getItem("Love"))
                    settotalamount(lovetotal)
                } else if (name.includes("Hope")) {
                    const hopetotal = JSON.parse(localStorage.getItem("Hope"))
                    settotalamount(hopetotal)
                } else if (name.includes("Grace")) {
                    const gracetotal = JSON.parse(localStorage.getItem("Grace"))
                    settotalamount(gracetotal)
                } else if (name.includes("Peace")) {
                    const peacetotal = JSON.parse(localStorage.getItem("Peace"))
                    settotalamount(peacetotal)
                }
                
                setrentPerDay(data.rentPerDay);
                setroom(data)
                setloading(false);
            } catch (error) {
                seterror(true);
                setloading(false);
            }
        }

        fetchSingle().catch(console.error);
    }, [roomid, fromdate, todate, totaldays, rentPerDay]);

    async function onToken(token){
        const bookingDetails = {
            room,
            fromdate,
            todate,
            totalamount,
            totaldays,
            rentPerDay,
            token

        }

        try {
            setloading(true);
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
            setloading(false);
            Swal.fire('Congratulations', 'Your room booked successfully', 'success').then(result=>{
                window.location.href='/home'
                return result;
            });

            localStorage.clear();
            return result;
        } catch (error) {
            setloading(false);
           Swal.fire('OOps', 'Something went wrong', 'error'); 
            return console.log(error);
        }
    }

    return (

        <div className="m-5" data-aos="flip-left">
            {loading ? (<Loader />) : room ? (

                <div className="row justify-content-center mt-5 bs">

                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className="bigimg" alt="bigimage" />
                    </div>

                    <div className="col-md-6">
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />

                            <b>
                                <p>Your Booking</p>
                                <p>From Date : {fromdate}</p>
                                <p>To Date : {todate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>


                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days : {totaldays + 1} day stay</p>
                                <p>Total Amount : {totalamount}</p>
                            </b>
                        </div>


                        <div style={{ float: "right" }}>

                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency={'USD'}
                                stripeKey="pk_test_51KWrgOEQ6YTqHunyX0uoWgUrVGqOACgCQPEcX947w2u602fVYWIlA6OWheyblRORUwhc47omYPsCrQNAaV7zAtXz00XZIzQEdg"
                            >
                                <button className="btn btn-primary">Pay Now</button>
                            </StripeCheckout>

                        </div>

                    </div>
                </div>
            ) : (
                <Error error={error} />
            )
            }
        </div>
    )
}

export default Bookingscreen;