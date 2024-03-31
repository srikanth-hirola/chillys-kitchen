// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  PinterestOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Footer = () => {

  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );

  const footerContent = siteConfigData.footerContent;
  const OtherFooterContent = siteConfigData.OtherFooterContent;
  return (
    <>
      <div className="footer">
        <footer>
          <div className="footer-sub">
            <div className="container-lg container-xl container-xxl">
              <div className="row">
                <div className="col-md-3">
                  <div className="footer-logo-sec">
                    {footerContent && 
                    <div className="footer-logo-img">
                      <img src={footerContent?.footerlogo?.image?.url} alt="" />
                    </div>
                    } 
                    <div className="footer-logo-txt">
                      {footerContent && 
                      <p>{footerContent?.summary}</p>
                      }
                    </div>
                    <div className="footer-social">
                      <ul>
                        {footerContent && footerContent?.socialMedia?.map((socialmedia, i) => (
                          <li key={i}>
                          <span>
                            <Link to={socialmedia?.link}>
                              <img src={socialmedia?.image?.url} alt="" />
                            </Link>
                          </span>
                        </li>
                        ))}
                        {/* <li>
                          <span><InstagramOutlined /></span>
                        </li>
                        <li>
                          <span><FacebookOutlined /></span>
                        </li>
                        <li>
                          <span><TwitterOutlined /></span>
                        </li>
                        <li>
                          <span><PinterestOutlined /></span>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                  {OtherFooterContent && OtherFooterContent?.map((col) => (
                <div className="col-md-2 col-sm-6">
                    <div className="footer-logo-sec-one">
                    <h2>{col?.heading}</h2>
                    <ul>
                      {col?.items?.map((item, a) => (
                        <li key={a}>
                        <Link to={item?.url}>{item?.title}</Link>
                      </li>
                      ))}
                    </ul>
                  </div>
                </div>
                  ))}
                {/* <div className="col-md-3 col-sm-6">
                {OtherFooterContent && OtherFooterContent?.map((col, i) => (
                    <div key={i===1} className="footer-logo-sec-two">
                    <h2>{col?.heading}</h2>
                    <ul>
                      {col?.items?.map((item, a) => (
                        <li key={a}>
                        <Link to={item?.url}>{item?.text}</Link>
                      </li>
                      ))}
                    </ul>
                  </div>
                  ))}
                </div> */}
                <div className="col-md-4">
                  <div className="footer-logo-sec-insta">
                    <h2>Follow Us On Instagram</h2>
                    <div className="footer-logo-sec-image">
                      <div className="row">
                        <div className="col-md-6 col-sm-3 col-6 ">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-1.webp" alt="" />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-3 col-6">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-2.webp" alt="" />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-3 col-6">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-3.webp" alt="" />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-3 col-6">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-4.webp" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer