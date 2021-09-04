import React from 'react'
import SendMailForm from "./SendMailForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function SendMail() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Send Mail"
                subTitle="Test"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <SendMailForm />
            </Paper>
        </>
    )
}
