import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SideBar from "../Sidebar";
import sidebar_menu from "../../constants/sidebar-menu";
import DashboardHeader from "../DashboardHeader";
import CardsImages from "../siteconfig/ImageUpload/CardImages";
import Form from "react-bootstrap/Form";
import useHandleChange from "../../hooks/site-Config/UseHandleChange";
import useSaveLayoutContent from "../../hooks/site-Config/UseSaveLayoutContent";
import { useSelector } from "react-redux";
import { SelectContentImgModal } from "./Modals/SiteContentImgModal";

const SiteConfigMenu = () => {
  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );

  const [logoLoading, setLogoLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { handleInputChange, handleChange, handleRemoveFromArray, handleMenuLinkInputChange } = useHandleChange();
  const { hanldeSubmit } = useSaveLayoutContent();
  const [selectedModalShow, setSelectedModalShow] = useState(false);
  const [modalLayoutName, setModalLaayoutName] = useState('');
  const [curindex, setCurIndex] = useState(0);

  useEffect(() => {
    setUploadedImages(siteConfigData?.cardsImages);
  }, [siteConfigData]);

  const [menuContent, setMenuContent] = useState({});
  console.log("menuContent", menuContent);

  useEffect(() => {
    setMenuContent(siteConfigData?.menuContent);
  }, [siteConfigData]);

  const handleAddMenuCard = () => {
    setMenuContent({
      ...menuContent,
      menuCards: [
        ...menuContent.menuCards,
        {
          image: { public_id: "", url: "" },
          cardtitle: "",
          description: "",
          link: { text: "", url: "" },
        },
      ],
    });
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
        <CardsImages
          name={"cardsImages"}
          logoLoading={logoLoading}
          setLogoLoading={setLogoLoading}
          uploadedImages={uploadedImages}
          key={1}
        />
        <Form className="mt-5">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={menuContent?.title}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "title",
                  myState: menuContent,
                  setMyState: setMenuContent,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sub Title</Form.Label>
            <Form.Control
              value={menuContent?.subTitle}
              onChange={(e) =>
                handleChange({
                  value: e.target.value,
                  key: "subTitle",
                  myState: menuContent,
                  setMyState: setMenuContent,
                })
              }
            />
          </Form.Group>
          {menuContent?.menuCards?.length > 0 && menuContent?.menuCards?.map((menucard, i) => (
            <div className="menu-cards mt-5" key={i}>
              <h5>Menu Card {i + 1}</h5>
              <div className="image-div flex row justify-between items-start h-[100px] w-[180px] relative group border-1 rounded">
                {logoLoading ? (
                  <>
                    <p className="absolute inset-0 flex justify-center items-center ">
                      Loading...
                    </p>
                    {menucard?.image?.url && (
                      <img
                        src={menucard?.image?.url}
                        width='100px'
                        alt="icon"
                        className="selected-image-index"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className="images-delete-btn hidden group-hover:flex absolute inset-0 space-x-3 z-50 group-hover:h-full justify-center items-center transition-transform transform-gpu filter-blur-[5px]">
                      <label
                        className="rounded bg-blue-400 p-2"
                        onClick={(e) => {
                          handleSelectImgModal(e, "menuCards", i);
                        }}
                      >
                        {/* <FontAwesomeIcon icon={faUpload} /> */} upload icon
                      </label>
                    </div>
                    {menucard?.image?.url && (
                      <img
                        style={{ width: '100px !important' }}
                        src={menucard?.image?.url}
                        alt="icon"
                        className="selected-image-index"
                      />
                    )}
                  </>
                )}
                <button
                  onClick={() =>
                    handleRemoveFromArray({
                      index: i,
                      state: menuContent,
                      setState: setMenuContent,
                      key: "menuCards",
                    })
                  }
                  className="btn btn-sm btn-primary delete-img-button bg-red-200 p-2 rounded-tr rounded-br absolute rounded-tl-none  mb-[2px] cursor-pointer z-50"
                >
                  {/* <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> */}delete icon
                </button>
              </div>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={menucard?.cardtitle}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'menuCards', myState: menuContent, setMyState: setMenuContent, index: i, arrObj: "cardtitle" })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={menucard?.description}
                  onChange={(e) => handleInputChange({ value: e.target.value, key: 'menuCards', myState: menuContent, setMyState: setMenuContent, index: i, arrObj: "description" })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control
                  value={menucard?.link.text}
                  onChange={(e) => handleMenuLinkInputChange({ value: e.target.value, key: 'link', myState: menuContent, setMyState: setMenuContent, index: i, arrObj: "text"})}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Text Link</Form.Label>
                <Form.Control
                  value={menucard?.link.url}
                  onChange={(e) => handleMenuLinkInputChange({ value: e.target.value, key: 'link', myState: menuContent, setMyState: setMenuContent, index: i, arrObj: "url"})}
                />
              </Form.Group>
            </div>
          ))}
          <button
            className="btn btn-primary btn-sm mt-4"
            type="button"
            onClick={handleAddMenuCard}
          >
            Add Menu Card
          </button>
        </Form>
        <button
          className="btn btn-primary btn-md mt-4"
          type="button"
          onClick={(e) =>
            hanldeSubmit(e, menuContent, "menuContent", setLogoLoading)
          }
        >
          Save Changes
        </button>
      </div>
      {selectedModalShow && 
      <SelectContentImgModal onHide={() => setSelectedModalShow(false)} show={selectedModalShow} setModalShow={setSelectedModalShow} setlayout={setMenuContent} layout={menuContent} uploadedImages={uploadedImages} name={modalLayoutName} multiple={false} curindex={curindex} />
    }
    </div>
  );
};

export default SiteConfigMenu;
