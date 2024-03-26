import { useEffect, useState } from 'react'
import { updateUserInformation } from '../../redux/actions/user';
import toast from 'react-hot-toast';
// import axios from 'axios';
// import { server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
import UserProfileModal from './UserProfileModal';
import Navbar from '../../components/common/Navbar';



const ProfilePage = () => {
    const [showPassword, setShowPassword] = useState(true);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { user, error, successMessage, loading } = useSelector((state) => state.user);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setName(user && user?.name)
        setEmail(user && user?.email)
        setPhoneNumber(user && user?.phoneNumber)
    }, [user])


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch({ type: "clearMessages" });
        }
    }, [dispatch, error, successMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(name, email, phoneNumber, password));
    };

    // const handleImage = async (e) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             axios
    //                 .put(
    //                     `${server}/user/update-avatar`,
    //                     { avatar: reader.result },
    //                     {
    //                         withCredentials: true,
    //                     }
    //                 )
    //                 .then(() => {
    //                     dispatch(loadUser());
    //                     toast.success("avatar updated successfully!");
    //                 })
    //                 .catch((error) => {
    //                     toast.error(error);
    //                 });
    //         }
    //     };
    //     reader.readAsDataURL(e.target.files[0]);
    // };

    return (
        <>
            {loading ? <Loader /> :
                <div className='profile-based-details'>
                   <Navbar/>

                    <div className='Profilepage-sub3 overflow-hidden'>

                        <div className='row'>

                            <div className='Profilepage-sub3-headings col-md-3 col-lg-3'>

                                <div className='Userprofilemodal'>
                                    <UserProfileModal />
                                </div>
                            </div>

                            {/* <br /> */}

                            <div className='col-md-9 col-lg-9'>
                                <div className='profile-data-in-chilly'>
                                    <div className='my-info-padding'>
                                        <h3>My Info</h3>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="col-md-12">
                                            <div className='Profile-details'>
                                                <div className='Profile-details-sub1'>
                                                    <label className='form-label' htmlFor="Your Name">Your Name</label>
                                                    <div className='Profile-details-sub1-text'>
                                                        <input className='form-control' type="text" placeholder='Enter name' required
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className='Profile-details'>
                                                <div className='Profile-details-sub1'>
                                                    <label className='form-label' htmlFor="Email Address">Email Address</label>
                                                    <div className='Profile-details-sub1-text'>
                                                        <input className='form-control' type="email" placeholder='abcdef@gmail.col' required
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className='Profile-details'>
                                                <div className='Profile-details-sub1'>
                                                    <label className='form-label' htmlFor="Phone Number">Phone Number</label>
                                                    <div className='Profile-details-sub1-text'>
                                                        <input className='form-control' type="tele" placeholder='897465959' required
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)} />
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className='Profile-details'>
                                                <div className='Profile-details-sub1'>
                                                    <label className='form-label' htmlFor="Password">Password</label>
                                                    <div className='Profile-details-sub1-text relative'>
                                                        <input className='form-control' type={showPassword ? "password" : "text"} required
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)} />
                                                        <FontAwesomeIcon className="cursor-pointer" icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />
                                                    </div>

                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            className={`w-[250px] h-[40px] border border-[#3a24db] text-center bg-[#3a24db] rounded-[3px] text-light mt-8 cursor-pointer profile-button-hover`}
                                            required
                                            value="Update"
                                            type="submit"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProfilePage