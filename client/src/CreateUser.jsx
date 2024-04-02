import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// POST :  ADD A NEW USER TO THE DATABASE // ***********************************************************

const CreateUser = () => {

  const [name,   setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [age,     setAge] = useState ('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
        e.preventDefault();

  axios.post("http://localhost:3001/createUser", { name,email,age })

      .then(result => {console.log(result)
                      navigate('/')
      })

      .catch(err => console.log(err));
  };

  return (

    <div className="Users">
      <div className="Usersctn">
        <form onSubmit={handleSubmit}>

          <h2>Add User</h2>

          <div className='mb-2'>
            <label htmlFor=''>Name</label>
            <input
              type='text'
              placeholder='Enter Name'
              className='from-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor=''>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='from-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor=''>Age</label>
            <input
              type='text'
              placeholder='Enter your Age'
              className='from-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
