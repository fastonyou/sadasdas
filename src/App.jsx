import {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Redirect, Switch} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import {UserContext} from './UserContext'

// functions
import {getUser} from './api/user'

import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unSubscribe = getUser().then((res) => {
      if(res.error) toast.error(res.error)
      else setUser(res.username)
    }).catch((err) => toast(err))

    return   () => unSubscribe

    }, [])

  return (
    <div >
      <UserContext.Provider value={{user, setUser}}>
      <Header/>
      <Redirect to={user ? '/' : '/login'} />
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
