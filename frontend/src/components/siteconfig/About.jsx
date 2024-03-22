/* eslint-disable no-unused-vars */
// Import necessary components and icons
import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar";
import Form from "react-bootstrap/Form";
import sidebar_menu from "../../constants/sidebar-menu";
import DashboardHeader from "../DashboardHeader";
import CardImages from "./ImageUpload/CardImages";
import { useSelector } from "react-redux";
import useHandleChange from "../../hooks/site-Config/UseHandleChange";
import useSaveLayoutContent from "../../hooks/site-Config/UseSaveLayoutContent";
import MainImage from "./ImageUpload/MainImage";

const SiteConfigAbout = () => {
  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );

  const [logoLoading, setLogoLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { handleChange } =
    useHandleChange();
  const { hanldeSubmit } = useSaveLayoutContent();

  useEffect(() => {
    setUploadedImages(siteConfigData?.aboutUsSectionOneImages);
  }, [siteConfigData]);

  const [aboutUsOneContent, setAboutUsOneContent] = useState({});
  console.log("aboutUsOneContent", aboutUsOneContent);

  useEffect(() => {
    setAboutUsOneContent(siteConfigData?.aboutUsOneContent);
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
          name={"aboutUsSectionOneImages"}
          logoLoading={logoLoading}
          setLogoLoading={setLogoLoading}
          uploadedImages={uploadedImages}
          key={1}
        />
        <MainImage title={"About Us Image"} aboutUsOneContent={aboutUsOneContent} logoLoading={logoLoading} setAboutUsOneContent={setAboutUsOneContent} uploadedImages={uploadedImages} key={1} name={"AboutUsSectionImage"} />
        <Form className="mt-5">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.title}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "title",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description One</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.descriptionOne}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "descriptionOne",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description Two</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.descriptionTwo}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "descriptionTwo",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Button Name</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.buttonName}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "buttonName",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Button Link</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.buttonLink}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "buttonLink",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Information Card Title</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.infoTitle}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "infoTitle",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.phoneNumber}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "phoneNumber",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.email}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "email",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={aboutUsOneContent?.address}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "address",
                  myState: aboutUsOneContent,
                  setMyState: setAboutUsOneContent,
                })
              }
            />
          </Form.Group>
        </Form>
        <button
          className="bg-blue-500 text-white rounded w-[200px] py-2 mt-3"
          type="submit"
          onClick={(e) =>
            hanldeSubmit(e, aboutUsOneContent, "aboutUsOneContent", setLogoLoading)
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SiteConfigAbout;
