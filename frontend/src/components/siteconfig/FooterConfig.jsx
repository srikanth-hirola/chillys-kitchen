import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import { useSelector } from 'react-redux';
import useHandleChange from '../../hooks/site-Config/UseHandleChange';
import useSaveLayoutContent from '../../hooks/site-Config/UseSaveLayoutContent';
import DashboardHeader from '../DashboardHeader';
import CardImages from './ImageUpload/CardImages';
import { SelectContentImgModal } from './Modals/SiteContentImgModal';
import toast from 'react-hot-toast';
import FooterMappingContent from './Footer/FooterMappingContent';
import FooterContent from './Footer/FooterContent';

const FooterConfig = () => {

    const { success, error, siteConfigData } = useSelector( 
        (state) => state.siteConfig
      );
    
      const [logoLoading, setLogoLoading] = useState(false);
      const [uploadedImages, setUploadedImages] = useState([]);

    
      useEffect(() => {
        setUploadedImages(siteConfigData?.footerImages);
      }, [siteConfigData]);
    
      

  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h3>Footer Configuration Settings</h3>
          <div className="add-btn">
            <DashboardHeader />
          </div>
        </div>
        <CardImages
          name={"footerImages"}
          logoLoading={logoLoading}
          setLogoLoading={setLogoLoading}
          uploadedImages={uploadedImages}
          key={1}
        />
        <hr />
        <FooterContent logoLoading={logoLoading} uploadedImages={uploadedImages} siteConfigData={siteConfigData} setLogoLoading={setLogoLoading} />
        <hr />
        <FooterMappingContent logoLoading={logoLoading} styles={siteConfigData} setLogoLoading={setLogoLoading} />
        </div> 
    </div>
  )
}

export default FooterConfig