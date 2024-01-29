'use client';

import React from 'react';
import styles from './page.module.css'

export default function Home() {
  const [nickname, setNickname] = React.useState('');
  const [message, setMessage] = React.useState({ type: '', text: '' });

  const isMessageAvailable = () => {
    return message.text.length > 0;
  };

  const handleChange = (evt: React.BaseSyntheticEvent) => {
    setNickname(evt.target.value);
  };

  const handleReset = (evt: React.BaseSyntheticEvent) => {
    evt.preventDefault();

    setNickname('');
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (evt: React.BaseSyntheticEvent) => {
    evt.preventDefault();

    const regex = new RegExp('^[A-Z]{3}$');
    if (regex.test(nickname)) {
      await fetch(
        "http://localhost:3030/register/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname }),
        }
      ).then(
        res => res.json()
      ).then(
        data => setMessage(data)
      );
    } else {
      setMessage({
        type: 'error',
        text: 'Input should consist of 3 CAPITAL LETTERS!'
      });
    }
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.mb}>
        Nickname registration:
      </h2>

      <form
        onSubmit={ handleSubmit }
        className="flex justify-center"
      >
        <input
          placeholder="3 CAPITAL LETTERS ONLY..."
          disabled={ isMessageAvailable() }
          value={ nickname }
          onChange={ handleChange }
        ></input>

        { isMessageAvailable() ? 
          <button type="reset" onClick={ handleReset }>Clear</button> : 
          <button type="submit">Submit</button> }
      </form>

      { isMessageAvailable() && 
        <p className={styles[message.type]}>
          {message.text}
        </p>
      }
    </main>
  )
}
