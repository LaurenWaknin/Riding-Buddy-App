import axios from 'axios'
import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Checkbox, Box, Grid, Paper, Typography, TextField, Button, FormLabel, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import '../styles/RegistrationForm.css';
import Navbar from './Navbar';

const RegistrationForm = (props) => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [cityOfResidence, setCityOfResidence] = useState('')
    const [motorcycle, setMotorcycle] = useState('') 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const navigate= useNavigate()


    const handleClick = async () => {

        try{
            //********** removed http://localhost:3001 **********
            const response = await axios.post('/register',{
                firstname, lastname, gender, cityOfResidence, motorcycle, phonenumber, email, password
            },{
                headers:{
                    'Content-type': 'application/json'
                }
            })
                console.log(response.data);
                navigate('/login')
        }   catch(e){
                console.log(e.response.data);
                setMsg(e.response.data.msg)
        }
    } 
    return(
        <>
            <Navbar/>
            <Grid>
                <Paper className='paper' elevation={20} >
                    <Grid align='center'>
                        <h2 className='header'>Register</h2>
                        <Typography variant='caption'>Please fill in the whole form to create an account!</Typography>
                    </Grid>
                    <div>

                        <FormControl component="fieldset" className='form'>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup type='radio' aria-label="gender" name="gender" style={{ display: 'initial'}} required>
                                <FormControlLabel value="female" control={<Radio />} label="Female" onChange={(e) => setGender(e.target.value)} />
                                <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e) => setGender(e.target.value)} />
                                <FormControlLabel value="other" control={<Radio />} label="Other" onChange={(e) => setGender(e.target.value)} />
                            </RadioGroup>
                        </FormControl>
                        <TextField fullWidth label='First Name' type='text' placeholder="Enter your first name" onChange={(e) => setFirstname(e.target.value)} required/>
                        <TextField fullWidth label='Last Name' type='text' placeholder="Enter your last name" onChange={(e) => setLastname(e.target.value)} required/>
                        <TextField fullWidth label='Email' type='email' placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                        <TextField fullWidth label='Phone Number' type='tel' placeholder="Enter your phone number" onChange={(e) => setPhonenumber(e.target.value)} required/>
                        <TextField fullWidth label='City of Residence' type='text' placeholder="Enter your city of residence" onChange={(e) => setCityOfResidence(e.target.value)} required/>
                        <TextField fullWidth label='Motorcycle' type='text' placeholder="Enter your motorcycle make & model" onChange={(e) => setMotorcycle(e.target.value)} required/>
                        <TextField fullWidth label='Password' type='password' placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required/>
                         <FormControlLabel
                            control={<Checkbox name="checkedA" />}
                            label="Injuries and death at my risk"
                            required
                        />
                         <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                            <Button className='m-auto' id='btn' variant='contained' color='primary' onClick={handleClick}>Register</Button>
                        </Box>
                    </div>
                </Paper>
            </Grid>
            <div style={{color:'white', textAlign:'center'}}>{msg}</div> 
        </>   
    )  
}
export default RegistrationForm