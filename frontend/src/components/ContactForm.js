import React from "react";
import "./css/contact.css";
function ContactForm() {
  return (
    <div className={"contact-section"}>
      <div className={"contact-form-section"}>
        <form className={"contact-form"}>
          <div className={"form-group"}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={"form-control"}
              id="name"
              placeholder="Enter name"
            />
          </div>
          <div className={"form-group"}>
            <label htmlFor="name">Subject</label>
            <input
              type="text"
              className={"form-control"}
              id="name"
              placeholder="Enter subject"
            />
          </div>
          <div className={"form-group"}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={"form-control"}
              id="email"
              placeholder="Enter email"
            />
          </div>

          <div className={"form-group"}>
            <label htmlFor="message">Message</label>
            <textarea
              className={"form-control"}
              id="message"
              rows="3"
            ></textarea>
          </div>

          <div className="flex end">
            <button type="submit" className={"btn btn-primary"}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
