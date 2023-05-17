import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

function Adminscreen() {
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings/>
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms/>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom/>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Adminscreen;

export function Bookings() {

    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = (await axios.get("/api/bookings/getallbookings")).data
                setbookings(data)
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(error);
            }
        }
        fetchBookings().catch(console.error);
    }, [])

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Bookings</h1>
                {loading && (<Loader />)}

                <table className="table table-bordered table-dark">
                    <thead className="bs thead-dark">
                        <tr>
                            <th>Booking Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Rent Per day</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(booking=> {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.rentPerDay}</td>
                                <td>{booking.totalamount}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>

                {bookings.length && (<h1>There are total {bookings.length} bookings. </h1>)}
            </div>
        </div>
    )
}

export function Rooms() {

    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = (await axios.get("/api/rooms/getallrooms")).data
                setrooms(data)
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(error);
            }
        }
        fetchRooms().catch(console.error);
    }, [])


    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Rooms</h1>
                {loading && (<Loader />)}

                <table className="table table-bordered table-dark">
                    <thead className="bs thead-dark">
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Rent Per Day</th>
                            <th>Type</th>
                            <th>Max Count</th>   
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && (rooms.map(room=> {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.rentPerDay}</td>
                                <td>{room.type}</td>
                                <td>{room.maxcount}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>




                {rooms.length && (<h1>There are total {rooms.length} rooms. </h1>)}
            </div>
        </div>
    );
}

export function Addroom() {

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(); 
    const [name, setname] = useState(''); 
    const [rentPerDay, setrentPerDay] = useState(); 
    const [maxcount, setmaxcount] = useState(); 
    const [description, setdescription] = useState(); 
    const [type, settype] = useState(); 
    const [imageurl1, setimageurl1] = useState();
    const [imageurl2, setimageurl2] = useState();
    const [imageurl3, setimageurl3] = useState();

    async function addRoom(){

        const newroom = {
            name,
            rentPerDay,
            maxcount,
            description,
            type,
            imageurls:[imageurl1, imageurl2, imageurl3]
        }

        try {
            setloading(true);
            const result = await (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result);
            setloading(false);
            Swal.fire('Congrats', "Your New Room Added Successfully", "success").then(result=>{
                window.location.href='/'
            }); 
        } catch (error) {
            console.log(error);
            setloading(false);
            Swal.fire('OOps', 'Something went wrong', 'error')
        }
    }


    return (
       
        <div className="row">
            <div>
            {loading && <Loader/>}
            </div>
          
            <div className="col-md-6">
                
                <input type='text' className="form-control" placeholder="Room Name"
                value={name} onChange={(e)=>{setname(e.target.value)}}/>
                <input type='text' className="form-control" placeholder="Rent Per Day"
                value={rentPerDay} onChange={(e)=>setrentPerDay(e.target.value)}/>
                <input type='text' className="form-control" placeholder="Type"
                value={type} onChange={(e)=>{settype(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Description"
                value={description} onChange={(e)=>setdescription(e.target.value)}/>
            </div>

            <div className="col-md-6">
            <input type='text' className='form-control' placeholder="Max Count"
            value={maxcount} onChange={(e)=>setmaxcount(e.target.value)}/>
                <input type="text" className="form-control" placeholder='Image URL 1'
                value={imageurl1} onChange={(e)=>setimageurl1(e.target.value)}/>
                <input type="text" className="form-control" placeholder='Image URL 2'
                value={imageurl2} onChange={(e)=>setimageurl2(e.target.value)}/>
                <input type="text" className="form-control" placeholder='Image URL 3'
                value={imageurl3} onChange={(e)=>setimageurl3(e.target.value)}/>
            

            <div className="text-right">
            
                <button className="btn btn-primary mt-2" onClick={addRoom}>Add Room</button>

            </div>

            </div>

        </div>
    )
}
