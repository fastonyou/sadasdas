import React, {useContext} from 'react';
import {NavLink } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {UserContext} from '../UserContext'

// functions
import {logout} from '../api/user'



const Header = () => {
    const history = useHistory();
	const {user, setUser} = useContext(UserContext)

	const handleLogout = (e) => {
		e.preventDefault();

		logout()
			.then((res) => {
				toast.success(res.message);
				// set user to null
				setUser(null)
				// redirect the user to login
				history.push("/login");
			})
			.catch((err) => console.error(err));
	};

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow">
            <div className="container-fluid box  ">
                <NavLink to='/' className="navbar-brand" href="#">You Suck At Coding</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav nav ">
                    {!user ?(
                     <>
                        <li className="nav-item">
                            <NavLink to='/register' className="nav-link " href="#">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/login' className="nav-link " aria-current="page" href="#">Login</NavLink>
                        </li>
                        </>
                        ) : (
                        <li className="nav-item">
                            <span className="nav-link" style={{cursor: "pointer"}}
                            onClick={handleLogout}
                            >Logout</span>
                            
                        </li>)}

                    </ul>
                </div>
            </div>
        </nav>
        
    );
}

export default Header;

