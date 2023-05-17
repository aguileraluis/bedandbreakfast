import React, { useState } from 'react';
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  return (
    <div style={{paddingLeft: "40%", paddingRight: "50%"}}>
      <div style={{ marginTop: '200%', marginBottom: "10%" }}>
        <HashLoader color="#000" loading={true} size={80} />
      </div>
    </div>

  )
}

export default Loader