import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { server } from '../../server';

const SideBar = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const logoutHandler = () => {
        axios
            .get(`${server}/user/logout`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
                window.location.reload(true);
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    return (
        <div className='ContactDetails-sub2-main-parent'>
            <div className='ContactDetails-sub2'>
                <h3>Hello {user?.name}</h3>
                <p>Welcome to your Account</p>
                <div className='ContactDetails-sub2-list'>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='ContactDetails-sub2-list-content'>
                                <div className='ContactDetails-sub2-list-content-image'>
                                    <img src="DronesHomepage/userimage.png" alt="" />
                                </div>
                                <Link to="/profile">
                                    <p>Profile</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className='ContactDetails-sub2-list-content'>
                                <div className='ContactDetails-sub2-list-content-image'>
                                    <img src="DronesHomepage/my orders.png" alt="" />
                                </div>
                                <Link to='/orderspage'>
                                    <p>My orders</p>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className='Profilepage-sub2-list-content'>
                                <div className='Profilepage-sub2-list-content-image'>
                                    <img src="DronesHomepage/addresshome.png" alt="" />
                                </div>
                                <Link to="/contactDetailsPage">
                                    <p>Address</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className='ContactDetails-sub2-list-content'>
                                <div className='ContactDetails-sub2-list-content-image'>
                                    <img src="DronesHomepage/sign out.png" alt="" />
                                </div>
                                <p onClick={logoutHandler}>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar