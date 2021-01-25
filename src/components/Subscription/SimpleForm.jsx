import React from "react";
import SMailchimp from "./SMailchimp.jsx"
import {MailchimpData} from "../../data/Mailchimp.jsx"

// a basic form
const SimpleForm = ({ status, message, className, style, onSubmitted, data }) => {
 
  return (
    <div className={className} style={style}>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <SMailchimp status={status}
      message={message}
      onSubmitted={onSubmitted}
      data={MailchimpData}
      />
    </div>
  );
};

export default SimpleForm;