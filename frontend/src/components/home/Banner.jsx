/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';

const Banner = ({bannerContent}) => {
    return (
        <>
            <div className="home-banner-sec" id='banner-sec'>
                <div className="home-banner-sec-sub" style={{ backgroundImage: `url(${bannerContent?.BannerBackgroundImage?.image?.url})` }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="banner-text">
                                    <div className="banner-title">
                                        {bannerContent && 
                                        <strong>{bannerContent?.title}</strong>
                                        }
                                        {bannerContent && 
                                        <h1>{bannerContent?.subTitle}<br />
                                            {/* <strong>Chicken</strong> Chopped Salad */}
                                            </h1>
                                        }
                                    </div>
                                    <div className="banner-description">
                                        {bannerContent && 
                                        <p>{bannerContent?.description}</p>
                                        }
                                    </div>
                                    {bannerContent && 
                                    <div className="banner-actions">
                                        <Link to={bannerContent?.buttonOneLink} className="banner-action-one">{bannerContent?.buttonOneText} </Link>
                                        <Link to={bannerContent?.buttonTwoLink} className="banner-action-two">{bannerContent?.buttonTwoText}</Link>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                {bannerContent && 
                                <div className="banner-img">
                                    <img src={bannerContent?.BannerMainImage?.image?.url} alt="" />
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner