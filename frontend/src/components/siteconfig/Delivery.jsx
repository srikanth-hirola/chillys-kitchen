/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar";
import Form from "react-bootstrap/Form";
import sidebar_menu from "../../constants/sidebar-menu";
import DashboardHeader from "../DashboardHeader";
import CardImages from "./ImageUpload/CardImages";
import { useSelector } from "react-redux";
import useHandleChange from "../../hooks/site-Config/UseHandleChange";
import useSaveLayoutContent from "../../hooks/site-Config/UseSaveLayoutContent";
import MainImageOne from "./ImageUpload/MainImageOne";
import { SelectContentImgModal } from "./Modals/SiteContentImgModal";
import toast from "react-hot-toast";

const SiteConfigDelivery = () => {
  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );

  const [logoLoading, setLogoLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { handleInputChange, handleChange, handleRemoveFromArray } =
    useHandleChange();
  const { hanldeSubmit } = useSaveLayoutContent();
  const [selectedModalShow, setSelectedModalShow] = useState(false);
  const [modalLayoutName, setModalLaayoutName] = useState('');
  const [curindex, setCurIndex] = useState(0);

  useEffect(() => {
    setUploadedImages(siteConfigData?.deliverySectionImages);
  }, [siteConfigData]);

  const [deliverySectionContent, setDeliverySectionContent] = useState({});
  console.log("deliverySectionContent", deliverySectionContent);

  const handleAddLists = () => {
    const { deliveryLists } = deliverySectionContent;
    if (deliveryLists.length >= 4) {
      toast.error('Cannot add more than 4 Lists!');
    } else {
      const newLists = [...deliveryLists, { image: { public_id: "", url: "" }, text: "",}];
      setDeliverySectionContent({ ...deliverySectionContent, deliveryLists: newLists });
    }
  };

const handleSelectImgModal = (e, name, index) => {
    e.preventDefault();
    setSelectedModalShow(true);
    setModalLaayoutName(name);
    setCurIndex(index)
};

  useEffect(() => {
    setDeliverySectionContent(siteConfigData?.deliverySectionContent);
  }, [siteConfigData]);

  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h3>Delivery Configuration Settings</h3>
          <div className="add-btn">
            <DashboardHeader />
          </div>
        </div>
        <CardImages
          name={"deliverySectionImages"}
          logoLoading={logoLoading}
          setLogoLoading={setLogoLoading}
          uploadedImages={uploadedImages}
          key={4}
        />
        <MainImageOne title={"Delivery Section Main Image"} deliverySectionContent={deliverySectionContent} logoLoading={logoLoading} setDeliverySectionContent={setDeliverySectionContent} uploadedImages={uploadedImages} key={1} name={"MainImage"} />
        <MainImageOne title={"Side Image One"} deliverySectionContent={deliverySectionContent} logoLoading={logoLoading} setDeliverySectionContent={setDeliverySectionContent} uploadedImages={uploadedImages} key={2} name={"SideImageOne"} />
        <MainImageOne title={"Side Image Two"} deliverySectionContent={deliverySectionContent} logoLoading={logoLoading} setDeliverySectionContent={setDeliverySectionContent} uploadedImages={uploadedImages} key={3} name={"SideImageTwo"} />
        <Form className="mt-5">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={deliverySectionContent?.title}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "title",
                  myState: deliverySectionContent,
                  setMyState: setDeliverySectionContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={deliverySectionContent?.description}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "description",
                  myState: deliverySectionContent,
                  setMyState: setDeliverySectionContent,
                })
              }
            />
          </Form.Group>
          {deliverySectionContent?.deliveryLists?.length > 0 && deliverySectionContent?.deliveryLists?.map((deliverylist, i) => (
          <div className="menu-cards mt-5" key={i}>
            <h5>Delivery list {i + 1}</h5>
            <div className="flex justify-between items-start h-[100px] w-[180px] relative group border-1 rounded">
              {logoLoading ? (
                <>
                  <p className="absolute inset-0 flex justify-center items-center ">
                    Loading...
                  </p>
                  {deliverylist?.image?.url && (
                    <img
                      src={deliverylist?.image?.url}
                      alt="icon"
                      className="w-full h-full opacity-10"
                    />
                  )}
                </>
              ) : (
                <>
                  <div className="images-delete-btn hidden group-hover:flex absolute inset-0 space-x-3 z-50 group-hover:h-full justify-center items-center transition-transform transform-gpu filter-blur-[5px]">
                    <label
                      className="rounded bg-blue-400 p-2"
                      onClick={(e) => {
                        handleSelectImgModal(e, "deliveryLists", i);
                      }}
                    >
                      {/* <FontAwesomeIcon icon={faUpload} /> */} upload icon
                    </label>
                  </div>
                  {deliverylist?.image?.url && (
                    <img
                      src={deliverylist?.image?.url}
                      alt="icon"
                      className="w-full h-full opacity-10"
                    />
                  )}
                </>
              )}
              <button
                onClick={() =>
                  handleRemoveFromArray({
                    index: i,
                    state: deliverySectionContent,
                    setState: setDeliverySectionContent,
                    key: "deliveryLists",
                  })
                }
                className="delete-img-button bg-red-200 p-2 rounded-tr rounded-br absolute rounded-tl-none  mb-[2px] cursor-pointer z-50"
              >
                {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}delete Card
              </button>
            </div>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                value={deliverylist?.text}
                onChange={(e) => handleInputChange({ value: e.target.value, key: 'deliveryLists', myState: deliverySectionContent, setMyState: setDeliverySectionContent, index: i, arrObj: "text" })}
              />
            </Form.Group>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white rounded w-[200px] py-2 mt-3"
          type='button'
          onClick={handleAddLists}
        >
          Add Delivery List
        </button>
        </Form>
        <button
          className="bg-blue-500 text-white rounded w-[200px] py-2 mt-3"
          type="submit"
          onClick={(e) =>
            hanldeSubmit(e, deliverySectionContent, "deliverySectionContent", setLogoLoading)
          }
        >
          Save Changes
        </button>
      </div>
      {selectedModalShow && 
    <SelectContentImgModal onHide={() => setSelectedModalShow(false)} show={selectedModalShow} setModalShow={setSelectedModalShow} setlayout={setDeliverySectionContent} layout={deliverySectionContent} uploadedImages={uploadedImages} name={modalLayoutName} multiple={false} curindex={curindex} />
  }
    </div>
  );
};

export default SiteConfigDelivery;
