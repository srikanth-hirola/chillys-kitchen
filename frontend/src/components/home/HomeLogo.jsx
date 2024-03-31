/* eslint-disable no-unused-vars */
// HomeLogo.js

import React from "react";

const HomeLogo = ({ clientImages }) => {
  return (
    <div className="marquee-container">
      {clientImages &&
        clientImages?.map((img, i) => (
          <div key={i} className="marquee">
            <img src={img?.url} alt="" />
          </div>
        ))}
    </div>
  );
};

export default HomeLogo;
