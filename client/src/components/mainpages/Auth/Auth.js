import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockoutlinesIcom from '@material-ui/icons/LockOutlined';
import { Icon } from '@material-ui/core';
import useStyles from './styles';
import Input from './input';
import axios from 'axios';

const initialState = { name: '', email: '', password: ''}

const Auth = () => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [user, setUser] = useState({
        email:'',password:''
    });

    const onChangeInput = e =>{
        if(isSignup){
            setFormData({ ...formData, [e.target.name]:e.target.value})
        }else{
            const {name,value} = e.target;
            setUser({...user,[name]:value})
        }
    }

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async e => {
        e.preventDefault()
        if(isSignup){
            try{
                const register = await axios.post('user/register',{...formData})
                localStorage.setItem('firstLogin',true)
                switchMode()
                window.location.reload(false)
            }catch(err){
                alert(err.response.data.msg)
            }
        }
        else{
            try{
                const login = await axios.post('user/login',{...user})
                localStorage.setItem('firstLogin',true)
                window.location.href = "/";
            }catch(err){
                alert(err.response.data.msg)
            }
        }
    }

    const handleChange = () => {

    }
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };

      const googleSuccess = async (res) => {
        console.log(res);
      };
    
      const googleError = (error) => {
          console.log(error);
          console.log('Google sign in bad..')
      };

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockoutlinesIcom/>
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In' }</Typography><br/>
            <form className="classes.form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                    <>
                        <Input name="name" label="First Name" handleChange={onChangeInput} autoFocus half />
                        <Input name="mobile" label="Mobile Number" handleChange={onChangeInput} half />
                    </>
                    )}
                        <Input name="email" label="Email Address" type="email" value={user.email} handleChange={onChangeInput} />
                        <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} value={user.password} handleChange={onChangeInput} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
            clientId="788428329760-23sm7bhuil2afvga6kimfkcv3b0oo5fk.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth