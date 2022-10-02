import { useState, useEffect } from 'react';
// import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from './Phonebook.module.css';

const { wrapper } = css;

function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
    return value ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('runing')
   },[contacts]);
  
  const addContact = (contact) => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts.`);
    };
    setContacts((prev) => {
      const newContact = { id: nanoid(), ...contact };
      return [newContact, ...prev];
    });
  };
  
  const removeContact = (id) => {
    setContacts((prev) => {
      const newContacts = prev.filter(item => item.id !== id);
      return newContacts;
    });
  };
  
  const handleChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const isDuplicate = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };
  
  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    };

    const normalisedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalisedName = name.toLocaleLowerCase();
      const result =
        normalisedName.includes(normalisedFilter) ||
        number.includes(normalisedFilter);
      return result;
    });
    return filteredContacts;
  };

  const filteredContacts = getFilteredContacts();

   return (
      <div className={wrapper}>
        <h1
          style={{
            marginBottom: 15,
          }}
        >
          Phonebook
        </h1>
        <ContactForm onSubmit={addContact} />
        <h2
          style={{
            marginBottom: 15,
          }}
        >
          Contacts
        </h2>
        <Filter
          title="Find contacts by name"
          value={filter}
          onChange={handleChange}
        />
        <ContactList items={filteredContacts} removeContact={removeContact} />
      </div>
    );
  
};

export default Phonebook;

// class oldPhonebook extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(contacts);
//     const parseContacts = JSON.parse(contacts);
//     if (parseContacts) {
//       this.setState({ contacts: parseContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = contact => {
//     if (this.isDuplicate(contact)) {
//       return alert(`${contact.name} is already in contacts.`);
//     }
//     this.setState(prevState => {
//       const newContact = { id: nanoid(), ...contact };
//       return { contacts: [newContact, ...prevState.contacts] };
//     });
//   };

//   isDuplicate({ name }) {
//     const { contacts } = this.state;
//     const result = contacts.find(item => item.name === name);
//     return result;
//   }

//   removeContact = id => {
//     this.setState(prevState => {
//       const newContacts = prevState.contacts.filter(item => item.id !== id);
//       return {
//         contacts: newContacts,
//       };
//     });
//   };

//   handleChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   getFilteredContacts() {
//     const { contacts, filter } = this.state;
//     if (!filter) {
//       return contacts;
//     }

//     const normalisedFilter = filter.toLocaleLowerCase();
//     const filteredContacts = contacts.filter(({ name, number }) => {
//       const normalisedName = name.toLocaleLowerCase();
//       const result =
//         normalisedName.includes(normalisedFilter) ||
//         number.includes(normalisedFilter);
//       return result;
//     });
//     return filteredContacts;
//   }

//   render() {
//     const { addContact, handleChange, removeContact } = this;
//     const { filter } = this.state;
//     const contacts = this.getFilteredContacts();
//     return (
//       <div className={wrapper}>
//         <h1
//           style={{
//             marginBottom: 15,
//           }}
//         >
//           Phonebook
//         </h1>
//         <ContactForm onSubmit={addContact} />
//         <h2
//           style={{
//             marginBottom: 15,
//           }}
//         >
//           Contacts
//         </h2>
//         <Filter
//           title="Find contacts by name"
//           value={filter}
//           onChange={handleChange}
//         />
//         <ContactList items={contacts} removeContact={removeContact} />
//       </div>
//     );
//   }
// }

// export default oldPhonebook;
