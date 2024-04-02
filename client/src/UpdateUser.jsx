import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


// PUT: METTRE À JOUR UN UTILISATEUR PAR SON ID***************************************************

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then(response => {
        const { name, email, age } = response.data;
        setUserData({ name, email, age });
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:3001/updateUser/${id}`, userData)
      .then(() => {
        console.log('User updated successfully');
        navigate('/');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="Users">
      <div className="Usersctn">
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value={userData.name} onChange={handleChange} placeholder='Enter Name' className='form-control' />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={userData.email} onChange={handleChange} placeholder='Enter Email' className='form-control' />
          </div>
          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input type='text' id='age' name='age' value={userData.age} onChange={handleChange} placeholder='Enter your Age' className='form-control' />
          </div>
          <button type="submit" className="btn-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
