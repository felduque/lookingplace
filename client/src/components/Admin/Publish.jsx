import React from "react";
import FormHostCreate from "../FormProperty/FormProperty";

export const Publish = () => {
  return (
    <>
      <div className="container-title-section-panel">
        <h2 className="title-profile-container">CREA UNA PROPIEDAD</h2>
      </div>
      <div className="content-form-property">
        <FormHostCreate />
      </div>
    </>
  );
};
