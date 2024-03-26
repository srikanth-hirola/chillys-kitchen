/* eslint-disable no-unused-vars */
// Import necessary components and icons
import React, { useEffect, useState } from 'react';
import SideBar from '../Sidebar';
import Form from "react-bootstrap/Form";
import sidebar_menu from '../../constants/sidebar-menu';
import DashboardHeader from '../DashboardHeader';
import { SelectContentImgModal } from './Modals/SiteContentImgModal';
import useHandleChange from '../../hooks/site-Config/UseHandleChange';
import useSaveLayoutContent from '../../hooks/site-Config/UseSaveLayoutContent';
import { useSelector } from 'react-redux';
import CardImages from '../siteconfig/ImageUpload/CardImages';
import toast from 'react-hot-toast';

const SiteConfigServices = () => {
  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );

  const [logoLoading, setLogoLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { handleInputChange, handleChange, handleRemoveFromArray } = useHandleChange();
  const { hanldeSubmit } = useSaveLayoutContent();
  const [selectedModalShow, setSelectedModalShow] = useState(false);
  const [modalLayoutName, setModalLaayoutName] = useState('');
  const [curindex, setCurIndex] = useState(0);

  useEffect(() => {
    setUploadedImages(siteConfigData?.serviceImages);
  }, [siteConfigData]);

  const [serviceContent, setServiceContent] = useState({});
  console.log("serviceContent", serviceContent);

  useEffect(() => {
    setServiceContent(siteConfigData?.serviceContent);
  }, [siteConfigData]);

  const handleAddServiceCard = () => {
    const { serviceCards } = serviceContent;
    if (serviceCards.length >= 3) {
      toast.error('Cannot add more than 3 service cards!');
    } else {
      const newServiceCards = [...serviceCards, { image: { public_id: "", url: "" }, cardtitle: "", description: "",}];
      setServiceContent({ ...serviceContent, serviceCards: newServiceCards });
    }
  };

const handleSelectImgModal = (e, name, index) => {
    e.preventDefault();
    setSelectedModalShow(true);
    setModalLaayoutName(name);
    setCurIndex(index)
};

  return (
    <div className="dashboard-container">
    <SideBar menu={sidebar_menu} />
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h3>Service Configuration Settings</h3>
        <div className="add-btn">
          <DashboardHeader />
        </div>
      </div>
      <CardImages
        name={"serviceImages"}
        logoLoading={logoLoading}
        setLogoLoading={setLogoLoading}
        uploadedImages={uploadedImages}
        key={1} 
      />
      <Form className="mt-5">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={serviceContent?.title}
            onChange={(e) =>
              handleChange({
                value: e.target.value,
                key: "title",
                myState: serviceContent,
                setMyState: setServiceContent,
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sub Title</Form.Label>
          <Form.Control
            value={serviceContent?.subTitle}
            onChange={(e) =>
              handleChange({
                value: e.target.value,
                key: "subTitle",
                myState: serviceContent,
                setMyState: setServiceContent,
              })
            }
          />
        </Form.Group>
        {serviceContent?.serviceCards?.length > 0 && serviceContent?.serviceCards?.map((servicecard, i) => (
          <div className="menu-cards mt-5" key={i}>
            <h5>Service Card {i + 1}</h5>
            <div className="flex justify-between items-start h-[100px] w-[180px] relative group border-1 rounded">
              {logoLoading ? (
                <>
                  <p className="absolute inset-0 flex justify-center items-center ">
                    Loading...
                  </p>
                  {servicecard?.image?.url && (
                    <img
                      src={servicecard?.image?.url}
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
                        handleSelectImgModal(e, "serviceCards", i);
                      }}
                    >
                      {/* <FontAwesomeIcon icon={faUpload} /> */} upload icon
                    </label>
                  </div>
                  {servicecard?.image?.url && (
                    <img
                      src={servicecard?.image?.url}
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
                    state: serviceContent,
                    setState: setServiceContent,
                    key: "serviceCards",
                  })
                }
                className="delete-img-button bg-red-200 p-2 rounded-tr rounded-br absolute rounded-tl-none  mb-[2px] cursor-pointer z-50"
              >
                {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}delete Card
              </button>
            </div>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={servicecard?.serviceTitle}
                onChange={(e) => handleInputChange({ value: e.target.value, key: 'serviceCards', myState: serviceContent, setMyState: setServiceContent, index: i, arrObj: "serviceTitle" })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={servicecard?.description}
                onChange={(e) => handleInputChange({ value: e.target.value, key: 'serviceCards', myState: serviceContent, setMyState: setServiceContent, index: i, arrObj: "description" })}
              />
            </Form.Group>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white rounded w-[200px] py-2 mt-3"
          type='button'
          onClick={handleAddServiceCard}
        >
          Add Service Card
        </button>
      </Form>
      <button
        className="bg-blue-500 text-white rounded w-[200px] py-2 mt-3"
        type="submit"
        onClick={(e) =>
          hanldeSubmit(e, serviceContent, "serviceContent", setLogoLoading)
        }
      >
        Save Changes
      </button>
    </div>
    {selectedModalShow && 
    <SelectContentImgModal onHide={() => setSelectedModalShow(false)} show={selectedModalShow} setModalShow={setSelectedModalShow} setlayout={setServiceContent} layout={serviceContent} uploadedImages={uploadedImages} name={modalLayoutName} multiple={false} curindex={curindex} />
  }
  </div>

  );
};

export default SiteConfigServices;
