import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Details from './Components/Details';
import EditProfile from './Components/EditProfile';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  const [user, setUser] = useState({})
  const [error, setError] = useState()
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/users/me")
        setUser(data.user)
      } catch (error) {
        setError(error.response.data)
      }

    }
    fetchData()
  }, [user])
  return (
    <Routes>
      <Route path='/' element={user?._id ? <Details user={user} /> : <Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={user?._id ? <Details user={user} /> : <Login />} />
      <Route path='/edit/profile' element={user?._id ? <EditProfile user={user} /> : <Login />} />
    </Routes>

  );
}

export default App;
