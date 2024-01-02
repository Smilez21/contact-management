// Import React and useState
import React, { useState } from 'react';
import './sorter.css'

interface ContactSorterProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const Sorter: React.FC<ContactSorterProps> = ({ contacts, setContacts }) => {
  const [sortField, setSortField] = useState<'name' | 'email' | 'phone'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'name' | 'email' | 'phone') => {
    const sortedContacts = [...contacts].sort((a, b) => {
      if (field === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (field === 'email') {
        return sortOrder === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
      } else if (field === 'phone') {
        return sortOrder === 'asc' ? a.phone.localeCompare(b.phone) : b.phone.localeCompare(a.phone);
      }
      return 0;
    });

    setContacts(sortedContacts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  return (
    <div className="sorter">
      <button onClick={() => handleSort('name')} className="sortButton">
        Sort by Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
      </button>
      <button onClick={() => handleSort('email')} className="sortButton">
        Sort by Email {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
      </button>
      <button onClick={() => handleSort('phone')} className="sortButton">
        Sort by Phone {sortField === 'phone' && (sortOrder === 'asc' ? '▲' : '▼')}
      </button>
    </div>
  );
};

export default Sorter;
