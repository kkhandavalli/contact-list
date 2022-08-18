import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
const data = require('./sample.json');

/* This component is used for both create and edit operations and it will run accordinly based on what mode it is received
 if mode is Create the this will work as create component and if mode is Edit then work as Edit component */
const CreateContactContainer = (props) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("Create");
  const [contactList, setContactList] = useState({ id: null, fname: '', lname: '', phone: '', email: '', role: '', company: '', address: ''});

  useEffect(() => {
    setMode(location.state.mode);
    if(location.state.mode === "Edit" && location.state.contactDetails) {
      setContactList(location.state.contactDetails)
    }
  }, []);

  const onCreateCancel = () => {
    navigate('/contacts');
  }

  const onContactChange = (event) => {
    setContactList(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  }

  /* This function helps to Add or update contact based om the mode */
  const onCreateOrEdit = () => {
    let allContacts = JSON.parse(localStorage.getItem("contactList"));
    if(mode === 'Create') {
      contactList.id = allContacts.length + 1;
      allContacts.push(contactList);
    }
    if(mode === 'Edit') {
      allContacts.forEach(function(item) {
        if(item.id === contactList.id) {
          for(let key in item) {
            item[key] = contactList[key];
          }
        }
      })
    }
    
    localStorage.setItem("contactList", JSON.stringify(allContacts));
    navigate('/contacts');
  }

  return (
      <div className="create-contact-holder">
        <div className="create-contact-text">
          {mode} Contact
        </div>
        <div className="create-contact-form">
          <form onChange={onContactChange}>
            <label for="fname">First name:</label> <br/>
            <input type="text" id="fname" name="fname" value={contactList.fname}/><br/>
            <label for="lname">Last name:</label> <br/>
            <input type="text" id="lname" name="lname" value={contactList.lname}/> <br/>
            <label for="phone">Phone:</label> <br/>
            <input type="phone" id="phone" name="phone" value={contactList.phone}/> <br/>
            <label for="email">Email:</label> <br/>
            <input type="text" id="email" name="email" value={contactList.email}/> <br/>
            <label for="role">Role:</label> <br/>
            <input type="text" id="role" name="role" value={contactList.role}/> <br/>
            <label for="company">Company:</label> <br/>
            <input type="text" id="company" name="company" value={contactList.company}/> <br/>
            <label for="address">Address:</label> <br/>
            <input type="text" id="address" name="address" value={contactList.address}/>
          </form>
        </div>
        <div className="create-btns">
          <button type="button" className="btn btn-primary" onClick={onCreateOrEdit}>{mode==='Create'? mode : 'Save'}</button>
          <button type="button" className="btn btn-secondary" onClick={onCreateCancel}>Cancel</button>
        </div>
      </div>
  );
};


export default CreateContactContainer;
