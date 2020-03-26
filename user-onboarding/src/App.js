import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';

function App() {
  const [users, setUsers] = useState([]);
  console.log(users);
  return (
    <div className="App">
      <Form users={users} setUsers={setUsers}/>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );

}

export default App;
