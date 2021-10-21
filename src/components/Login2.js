import React from 'react';
import {Grid,Paper,Avatar, TextField, Button, Typography,Link} from '@material-ui/core'
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup';

// var userData = require('../server/user1.json');
// userData = userData.users;

async function getPass(email){
    var userData = [];

    await fetch("http://localhost:3001/users")
    .then(res => res.json())
    .then(data => userData = data);

    console.log(userData);
    for (let i = 0; i < userData.length; i++) {
        if(userData[i].email === email){
            return userData[i].password;
        }
    }
}

const Login2=()=>{
    const paperStyle={padding:20,height:'70vh',width:280,margin:"20px auto"}
    const avatarStyle={backgroundColor:'#d300ff'}
    const btnstyle={magin:'8px 0'}
    const initialValues={
        email:'',
        password:'',
        remember:false
    }
    const validationSchema=Yup.object().shape({
        email:Yup.string().email("pls Enter valid email").required("Required"),
        password:Yup.string().required("Required")
    })
    const onSubmit=async function(values,props){
        console.log(values)
        // console.log(props)
        // console.log(getPass(values.email));
        // console.log(values.password);
        var pass = await getPass(values.email);

        if(values.password === pass){
            alert("Login Successfull");
            localStorage.setItem("email", values.email);
            document.location.replace("/todo1");
        }
        else{
            alert("Unable to login")
        }

        setTimeout(()=>{
            props.resetForm()
            props.setSubmitting(false)
        },2000)
    }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon/></Avatar>
                    Sign In
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props)=>(
                        <Form>
                            {/* {console.log(props)} */}
                            <Field as={TextField} label='Email' name="email" placeholder='Enter email' fullWidth required
                            helperText={<ErrorMessage name="email"/>}></Field>
                            <Field as={TextField} label='Password' name="password" placeholder='Enter password' type='password' fullWidth required
                            helperText={<ErrorMessage name="password"/>}></Field>
                            
                            <Field as={FormControlLabel} control={<Checkbox />} label="Remember Me" name="remember" />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting} fullWidth style={btnstyle} >{props.isSubmitting?"Loading":"Sign in"}</Button>
                        </Form>
                    )}
                </Formik>
                <Typography><Link href="#">
                   Forget password?
                    </Link>
                </Typography>
                <Typography>Do you have an account?
                    <Link href="#">
                  Sign up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
export default Login2;