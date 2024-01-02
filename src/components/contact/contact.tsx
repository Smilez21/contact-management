// Import React and useState
import React, { useState } from 'react';
import Sorter from '../sorter/sorter';

// Import the styles
import './contact.css';

interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface ContactFormProps {
  addContact: (newContact: Contact) => void;
  darkMode: boolean; // Add darkMode prop
}

interface ContactListProps {
  contacts: Contact[];
  editContact: (index: number) => void;
  deleteContact: (index: number) => void;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  darkMode: boolean; // Add darkMode prop
  toggleDarkMode: () => void; // Add toggleDarkMode prop
}

const ContactForm: React.FC<ContactFormProps> = ({ addContact, darkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!name || !emailRegex.test(email) || !phoneRegex.test(phone)) {
      alert('Please enter valid details');
      return;
    }

    addContact({ name, email, phone });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="form">
        <h2>Add New Contact</h2>
        <label className="label">Name:</label>
        <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label className="label">Email:</label>
        <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="label">Phone:</label>
        <input className="input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button className="button" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
};

const ContactList: React.FC<ContactListProps> = ({ contacts, editContact, deleteContact, setContacts, darkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="contactList">
        <h2>Contact List</h2>
        <input
          className={`input-search ${darkMode ? 'dark-mode' : ''}`}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Sorter contacts={filteredContacts} setContacts={setContacts} />
        <ul>
          {filteredContacts.map((contact, index) => (
            <li key={index} className="contactItem">
              {contact.name} - {contact.email} - {contact.phone}{' '}
              <button className="editButton" onClick={() => editContact(index)}>
                Edit
              </button>{' '}
              <button className="deleteButton" onClick={() => deleteContact(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const addContact = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
  };

  const editContact = (index: number) => {
    const updatedContacts = [...contacts];
    const updatedContact = prompt('Enter updated contact details (name, email, phone):');
    if (updatedContact) {
      const [name, email, phone] = updatedContact.split(',');
      updatedContacts[index] = { name, email, phone };
      setContacts(updatedContacts);
    }
  };

  const deleteContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
      <ContactForm addContact={addContact} darkMode={darkMode} />
      <ContactList
        contacts={contacts}
        editContact={editContact}
        deleteContact={deleteContact}
        setContacts={setContacts}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};

export default Contact;
