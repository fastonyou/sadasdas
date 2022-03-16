import React, { useState, useContext } from "react";
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {UserContext} from '../UserContext'



// design
import {
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// functions
import {login} from '../api/user'


const Login = () => {
    const history = useHistory()
    const {setUser} = useContext(UserContext)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword,setShowPassword] = useState(false)

    const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await login({ email, password });
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
				setUser(res.username);
				// redirect the user to home
				history.replace("/");
			}
		} catch (err) {
			toast.error(err);
		}
	};

    return (
        <div className='container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-6'>
            <div className='text-center mb-5 alert alert-dark shadow '>
                <label htmlFor="" className='h2 '>Login</label>
            </div>
            <div className="form-group ">
                <TextField
                    size='small'
                    variant='outlined'
                    className='form-control mb-3 '
                    label='Email'
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
               <FormControl
                   size='small'
                   variant='outlined'
                   className='form-control'

               >
                   <InputLabel>Password</InputLabel>
                   <OutlinedInput
                   label='password'
                   value={password}
                   type={showPassword ? 'text' : 'password'}
                   onChange={(e) => setPassword(e.target.value)}
                   endAdornment={
                       <InputAdornment>
                           <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                               {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                           </IconButton>
                       </InputAdornment>
                   }
                   />
               </FormControl>
            </div>
            <div className="text-center mt-4">
                <Button variant='outlined' className=' w-50' disabled={!email || !password}
                onClick={handleLogin}
                >
                    
                    Submit</Button>
                
            </div>
        </div>
    );
}

export default Login;