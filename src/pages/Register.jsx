import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'



// design
import {
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput,
    FormControl,
    InputLabel,
    Button,
    FormHelperText
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from '@mui/icons-material/Cancel'

// functions
import {register} from '../api/user'

const Register = () => {
    const history = useHistory()

    // form states
    const [username, setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] =useState('')
    const [showPassword,setShowPassword] = useState(false)

    //password validation

    let hasSixChar = password.length >= 6
    let hasLowerChar = /(.*[a-z].*)/.test(password)
    let hasUpperChar = /(.*[A-Z].*)/.test(password)
    let hasNumber = /(.*[0-9].*)/.test(password)
    let hasSpicialChar = /(.*[^a-zA-Z0-9].*)/.test(password)

    const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const res = await register({ username, email, password });
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
				// redirect the user to login
				history.replace("/login");
			}
		} catch (err) {
			toast.error(err);
		}
	};

    return (
        <div className='container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-6'>
            <div className='text-center mb-5 alert alert-dark shadow'>
                <label htmlFor="" className='h2'>Registration</label>
            </div>
            <div className="form-group ">
                <TextField
                    size='small'
                    variant='outlined'
                    className='form-control mb-3 '
                    label='Username'
                    value={username}
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                {password && (
                    <div className="m-1" style={{columns: 2}}>
                    <div>
                        {hasSixChar ? (
                        <span className="text-success">
                        <small className= 'text-success' >
                            <CheckCircleIcon
                            className="m-1"
                            fontSize="small"
                            />
                        at least 6 characters
                        </small>
                        </span>
                        ) : (
                        <span className="text-danger">
                        <small className='text-danger'>
                            <CancelIcon
                            className="m-1"
                            fontSize="small"
                            />
                        at least 6 characters
                        </small>
                        </span>
                        )}
                    </div>

                    <div>
                        {hasLowerChar ? (
                        <span className="text-success">
                        <small className= 'text-success' >
                            <CheckCircleIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One lowercase
                        </small>
                        </span>
                        ) : (
                        <span className="text-danger">
                        <small className='text-danger'>
                            <CancelIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One lowercase
                        </small>
                        </span>
                        )}
                    </div>

                    <div>
                        {hasUpperChar ? (
                        <span className="text-success">
                        <small className= 'text-success' >
                            <CheckCircleIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One uppercase
                        </small>
                        </span>
                        ) : (
                        <span className="text-danger">
                        <small className='text-danger'>
                            <CancelIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One uppercase
                        </small>
                        </span>
                        )}
                    </div>

                    <div>
                        {hasNumber ? (
                        <span className="text-success">
                        <small className= 'text-success' >
                            <CheckCircleIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One number
                        </small>
                        </span>
                        ) : (
                        <span className="text-danger">
                        <small className='text-danger'>
                            <CancelIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One number
                        </small>
                        </span>
                        )}
                    </div>

                    <div>
                        {hasSpicialChar ? (
                        <span className="text-success">
                        <small className= 'text-success' >
                            <CheckCircleIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One special symbol
                        </small>
                        </span>
                        ) : (
                        <span className="text-danger">
                        <small className='text-danger'>
                            <CancelIcon
                            className="m-1"
                            fontSize="small"
                            />
                        One special symbol
                        </small>
                        </span>
                        )}
                    </div>
                </div>)}
                
            </div>
            <div className="form-group">
                <TextField
                    size='small'
                    variant='outlined'
                    className='form-control mt-3 '
                    label='Confirm Password'
                    value={confirmPassword}
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {password && confirmPassword &&(
                    <FormHelperText className="mt-1 m-1">
                    {password === confirmPassword ?
                        <span className='text-success'>Password does match</span> :
                        <span className='text-danger'>Password does not match</span>
                    }


                </FormHelperText>)}
            </div>
            <div className="text-center mt-4">
                <Button variant='outlined' className=' w-50' disabled={
                    !username || 
                    !email || 
                    !password || 
                    !confirmPassword || 
                    password !== confirmPassword ||
                    !hasSixChar ||
                    !hasLowerChar ||
                    !hasUpperChar ||
                    !hasNumber ||
                    !hasSpicialChar
                    }
                    onClick={handleRegister}
                    
                    >
                    Submit
                    </Button>


            </div>
        </div>
    );
}

export default Register;
