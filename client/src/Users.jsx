import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// 03 / PUT : EDIT A USER BY ID ****************************************************************************

function Users() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => {
        setUsers(result.data.users);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
    
  }

  // 04 / DELETE : REMOVE A USER BY ID *******************************************************************


const handleDelete = (id) => {

  axios.delete('http://localhost:3001/deleteUser/' + id)


.then( res => {console.log(res) 
                window.location.reload()})

.catch ( err => console.log (err))
}

  return (
    <div className="Users">
      
      <div className="Usersctn">
        <Link to='/create' className="btn-button">Add +</Link>
        
        <table className="table">
          
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn-button">Update</Link>
                  <button className="btn-button delete-button"
                  onClick={(e) => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
