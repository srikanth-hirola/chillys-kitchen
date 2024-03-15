/* eslint-disable no-unused-vars */
import React from "react";

const AddtionalInfoTab = () => {
    const data = [
        { title: 'Title 1', value: 'Value 1' },
        { title: 'Title 2', value: 'Value 2' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 3', value: 'Value 3' },
    ];
  return (
    <>
      <div className="product-information">
        <div className="product-addtional-sub">
        <div className="list-container">
            <div className="header">
                <div className="title">Title</div>
                <div className="value">Value</div>
            </div>
            <div className="list">
                {data.map((item, index) => (
                    <div key={index} className="list-item">
                        <div className="title">{item.title}</div>
                        <div className="value">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AddtionalInfoTab;
