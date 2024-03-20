import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { server } from '../../server';


const UserProfileModal = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const logoutHandler = () => {
        axios
            .get(`${server}/user/logout`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
                window.location.reload(true);
                navigate("/user-login");
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };
    return (
        <>
            <div className='UserProfileModal-parent'>
                <div className=" bd-example m-0 border-0">
                    {/* Example Code */}
                    <a className="btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <p>Open</p>
                        {/* <div className='Usermodaltoggle-image'>
                            <img src="/DronesHomepage/usermodalmoreicon.png" alt="" />
                        </div> */}
                    </a>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="">
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
                                                <div className='ContactDetails-sub2-list-content'>
                                                    <div className='ContactDetails-sub2-list-content-image'>
                                                        <img src="DronesHomepage/refund.png" alt="" />
                                                    </div>
                                                    <Link to="/refundpage">
                                                        <p>Refunds</p>
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
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default UserProfileModal;
