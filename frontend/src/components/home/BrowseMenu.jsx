/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const BrowseMenu = ({menuContent}) => {
  return (
    <>
    <div className="home-browse">
        <div className="home-browse-sub">
            <div className="container">
                {menuContent && 
                <div className="home-browse-title">
                <strong>{menuContent?.subTitle}</strong>
                    <h2>{menuContent?.title} </h2>
                </div>
                }
                <div className="home-browse-cards">
                    <div className="row">
                        {menuContent && menuContent?.menuCards?.map((menucards, i) => (
                            <div key={i} className="col-md-3">
                            <div className="home-browse-cards-sec">
                                <div className="home-browse-cards-sec-img">
                                    <img src={menucards?.image?.url} alt="" />
                                </div>
                                <div className="home-browse-cards-sec-text">
                                    <h3>{menucards?.cardtitle}</h3>
                                    <p>{menucards?.description}</p>
                                    <Link to={menucards?.link?.url}>{menucards?.link?.text}</Link>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default BrowseMenu