import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
const data = require('./sample.json');

const Home = () => {
  let navigate = useNavigate();
  const [contactList, setContactList] = useState(!localStorage.getItem("contactList") ? 
        data.contacts : 
        JSON.parse(localStorage.getItem("contactList")));
  const [show, setShow] = useState(false);
  const [showFullContact, setShowFullContact] = useState(false);
  const [fullContact, setFullContact] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    !localStorage.getItem("contactList") ? 
        localStorage.setItem("contactList", JSON.stringify(data.contacts)) : 
        localStorage.setItem("contactList", localStorage.getItem("contactList"));
  }, []);

  const onPageSearch = (event) => {
      let contacts = [...data.contacts];
      setContactList(filterContacts(contacts, event.target.value));
  };

  const handleClose = () => {
    setShow(false);
    setShowFullContact(false);
  } 
  const handleShow = () => setShow(true);

/** This function helps to filter contacts from the list of contacts that has a match with serched text **/
  const filterContacts = (arr, searchKey) => {
    if(searchKey.trim() !== '') {
      return arr.filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          if(key !== 'id') {
            return (obj[key]).toLowerCase().includes(searchKey.toLowerCase())
          } 
        })
      });
    } else {
      return arr;
    }
  }

 /* This Function helps to vaigate to create page with mode 'Create' to let the createContactContainer to know whick mode it should run on
 either create or edit, since the same component is used for both operations */
  const onAddContact = () => {
    navigate('/create', {state: {mode: "Create"}});
  }

  const onContactClick = (contact) => {
    setFullContact(contact);
    setShowFullContact(true);
  }

 /* This function helps to toggle respective dropdown of a contact upon clicking vertical ellipsis */
  const toggleOpen = (e, name) => {
    e.stopPropagation();
    document.getElementById('dropdown-'+name.fname+name.lname).style.display === 'block' ? 
      document.getElementById('dropdown-'+name.fname+name.lname).style.display = 'none' :
      document.getElementById('dropdown-'+name.fname+name.lname).style.display = 'block';
  }

  const onContactEdit = (contactDetails) => {
    navigate('/create', {state: {mode: "Edit", contactDetails: contactDetails}});
  }

  const onContactDelete = (e, id) => {
    e.stopPropagation();
    handleShow();
    setUserId(id);
  }

  const onDeleteOk = () => {
    let allContacts = JSON.parse(localStorage.getItem("contactList"));
    let filteredContacts = allContacts.filter(function(item) {
      return !(item.id === userId);
    });
    localStorage.setItem("contactList", JSON.stringify(filteredContacts));
    window.location.reload(false);
  }

  const refObjName = {
    fname: 'First Name',
    lname: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    role: 'Role',
    company: 'Company',
    address: 'Address'
  }

  return (
      <div>
        <div className="body-container">
            <div className="search-box">
                <i className="fa fa-search search-icon"/>
                <input type="text" onChange={onPageSearch.bind(this)}/>
                <button type="button" className="btn btn-outline-primary add-contact-btn" onClick={onAddContact}> 
                  <i className="fa fa-plus"/>  Add Contact
                </button>
            </div>
            
            <div>
              <div className="contact-list-container">
                {contactList.map(function(item) {
                  return (
                    <div onClick={() => onContactClick(item)}>
                      <div className="contact-tiles">
                        <div className="contact-title">
                          <div className="contact-circle">
                            <div className="contact-initials">{item.fname[0]}{item.lname[0]}</div>
                          </div>
                          <div className="contact-details">
                            <div className="contact-name">{item.fname}  {item.lname}</div>
                            <div className="contact-role">
                              {item.role} 
                              &#8729;
                              {item.company}
                            </div>
                          </div>

                          <div className="dropdown contact-action-dropdown" onClick={(e) => toggleOpen(e, item)}>
                            <div className="dropdown-ellipsis"><i className="fa fa-ellipsis-v fa-lg"/></div>
                            <div className="dropdown-menu dropdown-item-list" id={"dropdown-"+item.fname+item.lname} aria-labelledby={item.lname}>
                              <div className="dropdown-item" onClick={() => onContactEdit(item)}>
                                <i className="fa fa-edit dropdown-icons"/>Edit
                              </div>
                              <div className="dropdown-item" onClick={(e) => onContactDelete(e, item.id)}>
                                <i className="fa fa-trash dropdown-icons"/>Delete
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <span className="phone-icon">
                            <i className="fa fa-phone"/>
                          </span>
                          <span className="phone-number">
                            {item.phone}
                          </span>
                        </div>
                      </div>
                    </div>  
                  )
                })}
              </div>
            </div>
          </div>
          <Modal show={show} 
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              Are you sure, you want to delete this contact?
            </Modal.Body>
            <Modal.Footer className="modal-footer-block">
              <button type="button" className="btn btn-danger" onClick={onDeleteOk}>Delete</button>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            </Modal.Footer>
          </Modal>

          <Modal show={showFullContact} 
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              Contact Details
            </Modal.Header>
            <Modal.Body>
              <table>
              {Object.keys(fullContact).map(function(key) {
                if(key !== 'id'){
                  return (<tr>
                    <td>
                      {refObjName[key] || key}:
                    </td>
                    <td>
                      &nbsp;&nbsp;{fullContact[key]}
                    </td>
                  </tr>)
                }
              })}
              </table>
            </Modal.Body>
            <Modal.Footer className="modal-footer-block">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </Modal.Footer>
          </Modal>

      </div>
  );
};


export default Home;
