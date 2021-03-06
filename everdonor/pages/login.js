import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useRouter } from "next/router";
import API from "api-client/EverdonorAPI"
import useForm from "utils/useForm"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [form, addOrUpdateValue] = useForm();
    const router = useRouter()
    const [error, setError] = useState()


    const login = (e) => {
        e.preventDefault()
        API.loginUser(form)
            .then(resp => localStorage.setItem('token', resp.authorization.slice(7)))
            .then(() => router.push("/map"))
            .then(() => window.location.reload(true))
            .catch((err) => {
                setError(err)
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Ingresa a tu cuenta!
                </Typography>
                <form className={classes.form} onSubmit={login}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={addOrUpdateValue("email")}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        onChange={addOrUpdateValue("password")}
                        autoComplete="current-password"
                    />
                    {error &&
                        <Typography variant="h6" style={{ color: "red" }} gutterBottom>
                            Contraseña o mail incorrecto
                        </Typography>
                    }

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recordame"
                    />
                    <Button
                        type="submit"
                        id="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Entrar
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/user/register" variant="body2">
                                {"No tenes una cuenta? Registrate!"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}