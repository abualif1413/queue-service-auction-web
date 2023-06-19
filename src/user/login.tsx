import { Button, Card, Checkbox, FormControlLabel, Link, TextField, Typography } from '@mui/material'

export const Login = () => {
  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Card variant='outlined' style={{width: '400px', padding: '20px'}}>
        <Typography variant='h5' textAlign='center' style={{marginBottom: '30px'}}>Welcome, Please Log In!</Typography>
        <TextField fullWidth id='outlined-basic' label='Email' variant='filled' margin='normal' />
        <TextField fullWidth id='outlined-basic' label='Password' variant='filled' type='password' margin='normal' />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Link underline='hover'>Register</Link>
          <Link underline='hover'>Forgot Password</Link>
        </div>
        <br />
        <Button fullWidth variant='contained'>Log in</Button>
        <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
      </Card>
    </div>
  )
}