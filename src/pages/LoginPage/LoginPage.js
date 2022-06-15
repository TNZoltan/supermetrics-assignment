import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './LoginPage.scss';

const className = 'LoginPage';

const LoginPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const history = useHistory();

  const login = () => {
    localStorage.setItem('user', JSON.stringify({ name, email }))
    history.go(0)
  }

  return (
    <div className={`${className}`}>
      <div className={`${className}__loginBox`}>
        <h1 className={`${className}__title`}>Login</h1>

        Name
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />

        Email
        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />

        <button type="submit" onClick={login}>Go!</button>
      </div>
    </div>
  );
}

export default LoginPage;
