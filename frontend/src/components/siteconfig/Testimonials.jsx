import React, { useEffect, useState } from 'react'
import SideBar from '../Sidebar';
import Form from "react-bootstrap/Form";
import sidebar_menu from '../../constants/sidebar-menu';
import DashboardHeader from '../DashboardHeader';
import CardImages from './ImageUpload/CardImages';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { SelectContentImgModal } from './Modals/SiteContentImgModal';
import { useSelector } from 'react-redux';
import useHandleChange from '../../hooks/site-Config/UseHandleChange';
import useSaveLayoutContent from '../../hooks/site-Config/UseSaveLayoutContent';
import toast from 'react-hot-toast';

const Testimonials = () => {

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
        setUploadedImages(siteConfigData?.testimonialsImages);
      }, [siteConfigData]);
    
      const [testimonialsContent, setTestimonialsContent] = useState({});
      console.log("testimonialsContent", testimonialsContent);
    
      useEffect(() => {
        setTestimonialsContent(siteConfigData?.testimonialsContent);
      }, [siteConfigData]);
    
      const handleAddTestimonialCard = () => {
        const { testimonialCard } = testimonialsContent;
        if (testimonialCard.length >= 10) {
          toast.error('Cannot add more than 10 Testimonial cards!');
        } else {
          const newTestimonilasCards = [...testimonialCard, { image: { public_id: "", url: "" }, name: "", placeAndDesignation: "", title: "", review: "" }];
          setTestimonialsContent({ ...testimonialsContent, testimonialCard: newTestimonilasCards });
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
          <h3>Menu Section Configuration Settings</h3>
          <div className="add-btn">
            <DashboardHeader />
          </div>
        </div>
        <CardImages
          name={"testimonialsImages"}
          logoLoading={logoLoading}
          setLogoLoading={setLogoLoading}
          uploadedImages={uploadedImages}
          key={1}
        />
        <Form className="mt-5">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={testimonialsContent?.title}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "title",
                  myState: testimonialsContent,
                  setMyState: setTestimonialsContent,
                })
              }
            />
          </Form.Group>
          {testimonialsContent?.testimonialCard?.length > 0 && testimonialsContent?.testimonialCard?.map((testimonialcard, i) => (
            <div className="menu-cards mt-5" key={i}>
              <h5>Testimonial Card {i + 1}</h5>
              <div className="flex justify-between items-start h-[100px] w-[180px] relative group border-1 rounded">
                {logoLoading ? (
                  <>
                    <p className="absolute inset-0 flex justify-center items-center ">
                      Loading...
                    </p>
                    {testimonialcard?.image?.url && (
                      <img
                        src={testimonialcard?.image?.url}
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
                          handleSelectImgModal(e, "testimonialCard", i);
                        }}
                      >
                        {/* <FontAwesomeIcon icon={faUpload} /> */}
                        <UploadOutlined style={{ fontSize: '20px' }} />
                      </label>
                    </div>
                    {testimonialcard?.image?.url && (
                      <img
                        src={testimonialcard?.image?.url}
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
                      state: testimonialsContent,
                      setState: setTestimonialsContent,
                      key: "testimonialCard",
                    })
                  }
                  className="bg-red-200 p-2 rounded-tr rounded-br absolute rounded-tl-none  mb-[2px] cursor-pointer z-50"
                >
                  {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}
                  <DeleteOutlined /> delete card
                </button>
              </div>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={testimonialcard?.name}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'testimonialCard', myState: testimonialsContent, setMyState: setTestimonialsContent, index: i, arrObj: "name" })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Place & Designation</Form.Label>
                <Form.Control
                  value={testimonialcard?.placeAndDesignation}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'testimonialCard', myState: testimonialsContent, setMyState: setTestimonialsContent, index: i, arrObj: "placeAndDesignation" })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={testimonialcard?.title}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'testimonialCard', myState: testimonialsContent, setMyState: setTestimonialsContent, index: i, arrObj: "title" })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={testimonialcard?.review}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'testimonialCard', myState: testimonialsContent, setMyState: setTestimonialsContent, index: i, arrObj: "review" })}
                />
              </Form.Group>
            </div>
          ))}
          <button
            className="btn btn-primary btn-sm mt-4"
            type="button"
            onClick={handleAddTestimonialCard}
          >
            Add Testimonial Card
          </button>
        </Form>
        <button
          className="btn btn-primary btn-md mt-4"
          type="submit"
          onClick={(e) =>
            hanldeSubmit(e, testimonialsContent, "testimonialsContent", setLogoLoading)
          }
        >
          Save Changes
        </button>
      </div>
      {selectedModalShow && 
      <SelectContentImgModal onHide={() => setSelectedModalShow(false)} show={selectedModalShow} setModalShow={setSelectedModalShow} setlayout={setTestimonialsContent} layout={testimonialsContent} uploadedImages={uploadedImages} name={modalLayoutName} multiple={false} curindex={curindex} />
    }
    </div>
  )
}

export default Testimonials