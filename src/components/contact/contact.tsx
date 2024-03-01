import React, { useState, useEffect } from 'react';
import Sorter from '../sorter/sorter';
import { WiMoonAltWaningCrescent3 } from 'react-icons/wi';
import './contact.css';
import ContactModal from '../editModal/editModal';

interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface ContactFormProps {
  addContact: (newContact: Contact) => void;
  darkMode: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  editContact: (index: number) => void;
  deleteContact: (index: number) => void;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Pagination component
interface PaginationProps {
  contactsPerPage: number;
  totalContacts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ contactsPerPage, totalContacts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <a href="#" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ContactForm: React.FC<ContactFormProps> = ({ addContact, darkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;

    if (!name) {
      setNameError('Name is required');
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid phone number (10 to 15 digits)');
      isValid = false;
    }

    return isValid;
  };

  const handleAddContact = () => {
    if (validateForm()) {
      addContact({ name, email, phone });
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="form">
        <h2>Add New Contact</h2>
        <label className="label">Name:</label>
        <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <div style={{ color: 'red' }}>{nameError}</div>

        <label className="label">Email:</label>
        <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div style={{ color: 'red' }}>{emailError}</div>

        <label className="label">Phone:</label>
        <input className="input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div style={{ color: 'red' }}>{phoneError}</div>

        <button className="button" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
};

const ContactList: React.FC<ContactListProps> = ({ contacts, editContact, deleteContact, setContacts, darkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber); 
  };

  const filteredContacts = currentContacts.filter(
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
        <Pagination
          contactsPerPage={contactsPerPage}
          totalContacts={contacts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const saveContactsToLocalStorage = (updatedContacts: Contact[]) => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const addContact = (newContact: Contact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
  };

  const closeEditModal = () => {
    setEditingIndex(null);
  };

  const saveEditedContact = (updatedContact: Contact) => {
    if (editingIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editingIndex] = updatedContact;
      setContacts(updatedContacts);
      saveContactsToLocalStorage(updatedContacts);
      closeEditModal();
    }
  };

  const editContact = (index: number) => {
    openEditModal(index);
  };

  const deleteContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <WiMoonAltWaningCrescent3 className='text-blue-400 text-xl' onClick={toggleDarkMode} />
      <ContactForm addContact={addContact} darkMode={darkMode} />
      <ContactList
        contacts={contacts}
        editContact={editContact}
        deleteContact={deleteContact}
        setContacts={setContacts}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      {editingIndex !== null && (
        <ContactModal
          isOpen={editingIndex !== null}
          onClose={closeEditModal}
          onSave={saveEditedContact}
          contact={contacts[editingIndex]}
        />
      )}
    </div>
  );
};

export default Contact;
