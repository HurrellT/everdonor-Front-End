import {
    Avatar,
    Container,
    CssBaseline,
    Grid,
    Paper,
    Typography,
    Tooltip,
    Button
} from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from "@material-ui/core/styles";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import MapWithSearch from "components/3rdParty/MapWithSearch"


const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: theme.spacing(3),
    },
    gridPaper: {
        padding: theme.spacing(1),
        textAlign: "center",
        // color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    profileCard: {
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    profileInformationCard: {
        padding: theme.spacing(1.2),
        textAlign: "left",
        // color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    largeAvatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
}));

export default function Profile({ user }) {
    const classes = useStyles();

    const openBrowser = () => {
        var win = window.open(`https://wa.me/549${user.phoneNumber}?text=Hola%20me%20interesa%20donar!`, '_blank', "", false);
        win.focus();
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography className={classes.title} component="h1" variant="h5">
                    Perfil
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.gridPaper}>
                            <Grid item container className={classes.profileCard}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={user.image}
                                    className={classes.largeAvatar}
                                />
                                <Typography variant="h5" className={classes.profileCard}>
                                    {user.name}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.profileInformationCard}>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Email:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom style={{ cursor: 'pointer' }}>
                                        {user.email}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Número de telefono:
                                        <Tooltip TransitionComponent={Zoom} title="Comunicarse por Whatsapp" arrow >
                                            <a style={{ cursor: "pointer" }} onClick={openBrowser}>
                                                <WhatsAppIcon style={{ color: "green", marginLeft: "10px" }} />
                                            </a>
                                        </Tooltip>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {user.phoneNumber}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Dirección:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {user.address}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Tipos de donación que acepta:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {user.donationTypes}
                                    </Typography>

                                    <MapWithSearch coordenates={{ latitude: user.latitude, longitude: user.longitude }} disableClick={true} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
