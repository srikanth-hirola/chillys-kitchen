import React from 'react'
import servericon from '/images/home/Dashboard/database.png'
import notesicon from '/images/home/Dashboard/notes.png'
import clockicon from '/images/home/Dashboard/clock.png'
import customersicon from '/images/home/Dashboard/customer.png'
import { Link } from 'react-router-dom'
import './DashboardMain.css'
import DashboardTable from './DashboardTable'
const DashboardMain = () => {
    return (
        <>
            <div className='DashboardMain-parent'>
                <div className='DashboardMain-cards-parent'>
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <Link to='/products'>
                                <div className="DashboardMain-cards-sub-parent">
                                    <div className='DashboardMain-cards-sub'>
                                        <div className='DashboardMain-cards-sub-content'>
                                            <div className='DashboardMain-cards-sub-image'>
                                                <img src={servericon} alt="" />
                                            </div>
                                            <p>Total Products</p>
                                        </div>
                                        <h5>₹ 77.21</h5>
                                    </div>

                                    {/* <div className='DashboardMain-cards-sub-text'>
                            <p className='text-success'>+ 3.16%</p>
                            <p> From last month</p>
                        </div> */}
                                </div>
                            </Link>

                        </div>
                        <div className="col-sm-6 col-md-6">
                            <Link to='/orders'>
                                <div className="DashboardMain-cards-sub-parent">
                                    <div className='DashboardMain-cards-sub'>
                                        <div className="DashboardMain-cards-sub-content">
                                            <div className='DashboardMain-cards-sub-image'>
                                                <img src={notesicon} alt="" />
                                            </div>
                                            <p>Total Orders</p>
                                        </div>
                                        <h5>₹ 2,107</h5>
                                    </div>

                                    {/* <div className='DashboardMain-cards-sub-text'>
                            <p className='text-danger'>- 1.18% </p>
                            <p> From last month</p>
                        </div> */}
                                </div>
                            </Link>

                        </div>
                        <div className="col-sm-6 col-md-6">
                            <Link to='/orders'>
                                <div className="DashboardMain-cards-sub-parent">
                                    <div className='DashboardMain-cards-sub'>
                                        <div className="DashboardMain-cards-sub-content">
                                            <div className='DashboardMain-cards-sub-image'>
                                                <img src={clockicon} alt="" />
                                            </div>
                                            <p>Total Sales</p>
                                        </div>
                                        <h5>₹ 653</h5>
                                    </div>
                                    {/* <div className='DashboardMain-cards-sub-text'>
                            <p className='text-success'>+ 2.24%</p>
                            <p> From last month</p>
                        </div> */}
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="DashboardMain-cards-sub-parent">
                                <div className='DashboardMain-cards-sub'>
                                    <div className="DashboardMain-cards-sub-content">
                                        <div className='DashboardMain-cards-sub-image'>
                                            <img src={customersicon} alt="" />
                                        </div>
                                        <p>Customers</p>
                                    </div>
                                    <h5>₹ 653</h5>
                                </div>
                                {/* <div className='DashboardMain-cards-sub-text'>
                            <p className='text-success'>+ 2.24%</p>
                            <p> From last month</p>
                        </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* table component */}
            <DashboardTable />

        </>
    )
}

export default DashboardMain;