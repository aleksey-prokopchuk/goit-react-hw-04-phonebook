import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

const { form, form_lable, btn_submit, input } = css;

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();
  const numberId = nanoid();

  const addContact = event => {
    event.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('')
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name': setName(value);        
        break;
      case 'number': setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <form className={form} onSubmit={addContact}>
      <label className={form_lable} htmlFor={nameId}>
        Name
      </label>

      <input
        className={input}
        id={nameId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />

      <label className={form_lable} htmlFor={numberId}>
        Number
      </label>

      <input
        className={input}
        id={numberId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />

      <button className={btn_submit} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
