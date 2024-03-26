/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar";
import sidebar_menu from "../../constants/sidebar-menu";
import { useDispatch, useSelector } from "react-redux";
import HomePageImage from "./ImageUpload/HomePageImage";
import toast from "react-hot-toast";
import { getAllSiteConfig } from "../../redux/actions/siteConfig";
import BannerTextContent from "./Banner/BannerTextContent";
import useHandleChange from "../../hooks/site-Config/UseHandleChange";
import { Button } from "antd";
import { StyleConfig } from "../../utils/StyleConfig";
import useSaveLayoutContent from "../../hooks/site-Config/UseSaveLayoutContent";

import DashboardHeader from "../DashboardHeader";

const SiteConfigBanner = () => {
  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );
  const { handleChange } = useHandleChange();
  const { hanldeSubmit } = useSaveLayoutContent();
  const styles = StyleConfig();
  console.log("siteConfigData", siteConfigData);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [logoLoading, setLogoLoading] = useState(false);

  useEffect(() => {
    setUploadedImages(siteConfigData?.bannerImages);
  }, [siteConfigData]);

  const [bannerContent, setBannerContent] = useState({});

  console.log("bannerContent", bannerContent);

  const handleUpdateContent = async (
    e,
    layoutContent,
    layoutName,
    setLogoLoading
  ) => {
    e.preventDefault();
    if (layoutContent) {
      await hanldeSubmit(e, layoutContent, layoutName, setLogoLoading);
    }
  };

  useEffect(() => {
    setBannerContent(styles?.bannerContent);
  }, [styles?.bannerContent]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success("Site Configuration Updated Successfully");
    }
    if (error) {
      toast.error(error.response.data.message);
    }
    dispatch(getAllSiteConfig());
  }, [success, error, dispatch]);

  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h3>Banner Configuraion Settings</h3>
          <div className="add-btn">
            <DashboardHeader />
          </div>
        </div>
        <HomePageImage
          name={"bannerImages"}
          logoLoading={logoLoading}
          setLogoLoading={setLogoLoading}
          uploadedImages={uploadedImages}
          key={1}
        />
        <BannerTextContent
          bannerContent={bannerContent}
          setBannerContent={setBannerContent}
          handleChange={handleChange}
          key={2}
        />
        {logoLoading ? (
          <Button type="primary" htmlType="submit">
            {logoLoading ? "Loading..." : "Update"}
          </Button>
        ) : (
          <Button
            onClick={(e) =>
              handleUpdateContent(
                e,
                bannerContent,
                "bannerContent",
                setLogoLoading
              )
            }
            type="primary"
            htmlType="submit"
          >
            {logoLoading ? "Loading..." : "Update"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SiteConfigBanner;
