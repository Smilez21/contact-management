import React, { useState } from 'react';
import "./editModal.css"

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedContact: Contact) => void;
  contact: Contact;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSave, contact }) => {
  const [updatedName, setUpdatedName] = useState(contact.name);
  const [updatedEmail, setUpdatedEmail] = useState(contact.email);
  const [updatedPhone, setUpdatedPhone] = useState(contact.phone);

  const handleSave = () => {
    const updatedContact: Contact = {
      name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
    };
    onSave(updatedContact);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Contact</h2>
            <label>Name:</label>
            <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />

            <label>Email:</label>
            <input type="text" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />

            <label>Phone:</label>
            <input type="text" value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)} />

            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;
