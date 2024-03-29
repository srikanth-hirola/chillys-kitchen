/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar";
import sidebar_menu from "../../constants/sidebar-menu";
import DashboardHeader from "../DashboardHeader";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
import CardImages from "./ImageUpload/CardImages";
import { useSelector } from "react-redux";
import MainImage from "./ImageUpload/MainImage";
import { DeleteOutlined } from '@ant-design/icons'
import useHandleChange from "../../hooks/site-Config/UseHandleChange";
import useSaveLayoutContent from "../../hooks/site-Config/UseSaveLayoutContent";

const SiteConfigHeader = () => {

  const { success, error, siteConfigData } = useSelector( 
    (state) => state.siteConfig
  );

  const [logoLoading, setLogoLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { handleChange, handleInputChange, handleRemoveFromArray } = useHandleChange();
    const { hanldeSubmit } = useSaveLayoutContent();


  useEffect(() => {
    setUploadedImages(siteConfigData?.headerImages);
  }, [siteConfigData]);
  
  const [headerContent, setHeaderContent] = useState({});

  useEffect(() => {
    setHeaderContent(siteConfigData?.headerContent);
  }, [siteConfigData]);

  const handleAddNavItems = () => {
    const { navItems } = headerContent;
    if (navItems.length >= 8) {
      toast.error("Cannot add more than 8 Social Media!");
    } else {
      const newNavItems = [...navItems, { title: "", link: "" }];
      setHeaderContent({ ...headerContent, navItems: newNavItems });
    }
  };

  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h3>Header Configuration Settings</h3>
          <div className="add-btn">
            <DashboardHeader />
          </div>
        </div>
        <CardImages
          name={"headerImages"}
          logoLoading={logoLoading}
          setLogoLoading={setLogoLoading}
          uploadedImages={uploadedImages}
          key={1}
        />
        <MainImage title={"Header Logo"} aboutUsOneContent={headerContent} logoLoading={logoLoading} setAboutUsOneContent={setHeaderContent} uploadedImages={uploadedImages} key={2} name={"headerLogo"} />
        <hr />
        <Form className="mt-5">
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={headerContent?.phonenumber}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "phonenumber",
                  myState: headerContent,
                  setMyState: setHeaderContent,
                })
              }
            />
          </Form.Group>
          {headerContent?.navItems?.length > 0 && headerContent?.navItems?.map((navitems, i) => (
            <>
            <div className="menu-cards mt-5" key={i}>
              <h5>Nav Item {i + 1}</h5>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={navitems?.title}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'navItems', myState: headerContent, setMyState: setHeaderContent, index: i, arrObj: "title" })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  value={navitems?.link}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'navItems', myState: headerContent, setMyState: setHeaderContent, index: i, arrObj: "link" })}
                />
              </Form.Group>
            </div>
            <button
                  onClick={() =>
                    handleRemoveFromArray({
                      index: i,
                      state: headerContent,
                      setState: setHeaderContent,
                      key: "navItems",
                    })
                  }
                  type='button'
                  className="bg-red-200 p-2 rounded-tr rounded-br absolute rounded-tl-none mt-[5px]  mb-[2px] cursor-pointer z-50"
                >
                  {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}
                  <DeleteOutlined /> delete card
                </button>
            </>
            
          ))}
          <div>
          <button
            className="btn btn-primary btn-sm  mt-[55px]"
            type="button"
            onClick={handleAddNavItems}
          >
            Add Nav Item
          </button>
          </div>
        </Form>
        <button
          className="bg-blue-500 text-white rounded w-[200px] py-2 mt-3"
          type="submit"
          onClick={(e) =>
            hanldeSubmit(e, headerContent, "headerContent", setLogoLoading)
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SiteConfigHeader;
