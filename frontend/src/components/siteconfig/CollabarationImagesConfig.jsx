import React, { useEffect, useState } from 'react'
import CardImages from './ImageUpload/CardImages'
import SideBar from '../Sidebar'
import sidebar_menu from '../../constants/sidebar-menu'
import DashboardHeader from '../DashboardHeader'
import { useSelector } from 'react-redux'

const CollabarationImagesConfig = () => {

    const { success, error, siteConfigData } = useSelector(
        (state) => state.siteConfig
      );
    
      const [logoLoading, setLogoLoading] = useState(false);
      const [uploadedImages, setUploadedImages] = useState([]);
    
      useEffect(() => {
        setUploadedImages(siteConfigData?.clientImages);
      }, [siteConfigData]);

  return (
    <div className="dashboard-container">
    <SideBar menu={sidebar_menu} />
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h3>About Configuration Settings</h3>
        <div className="add-btn">
          <DashboardHeader />
        </div>
      </div>
      <CardImages
        name={"clientImages"}
        logoLoading={logoLoading}
        setLogoLoading={setLogoLoading}
        uploadedImages={uploadedImages}
        key={1}
      />
    </div>
  </div>
  )
}

export default CollabarationImagesConfig