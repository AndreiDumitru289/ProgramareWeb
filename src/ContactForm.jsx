import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleSubmit() {
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      setFeedback('Completeaza toate campurile!');
      return;
    }

    setFeedback('Multumim, ' + name + '!');
  }

  return (
    <div className="projects-section">
      <h3>Formular de contact</h3>

      <div className="edit-form">
        <input
          type="text"
          placeholder="Nume"
          value={name}
          onChange={function (event) {
            setName(event.target.value);
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={function (event) {
            setEmail(event.target.value);
          }}
        />

        <textarea
          className="contact-textarea"
          placeholder="Mesaj"
          value={message}
          onChange={function (event) {
            setMessage(event.target.value);
          }}
        ></textarea>

        <button type="button" className="button button-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <p className="message">{feedback}</p>
    </div>
  );
}

export default ContactForm;
