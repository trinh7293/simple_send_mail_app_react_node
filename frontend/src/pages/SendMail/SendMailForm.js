import React from 'react';
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as sendMailService from "../../services/sendMailService";

const initialFValues = {
    id: 0,
    senderName: '',
    senderEmail: '',
    recipientEmail: '',
    subject: '',
    message: '',
    isPermanent: false,
}

export default function SendMailForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('senderName' in fieldValues)
            temp.senderName = fieldValues.senderName ? "" : "This field is required."
        if ('senderEmail' in fieldValues) {
            if (!fieldValues.senderEmail) {
                temp.senderEmail = "This field is required."
            } else {
                temp.senderEmail = (/$^|.+@.+..+/).test(fieldValues.senderEmail) ? "" : "SenderEmail is not valid."
            }
        }
        if ('recipientEmail' in fieldValues) {
            if (!fieldValues.recipientEmail) {
                temp.recipientEmail = "This field is required."
            } else {
                temp.recipientEmail = (/$^|.+@.+..+/).test(fieldValues.senderEmail) ? "" : "RecipientEmail is not valid."
            }
        }
        if ('subject' in fieldValues)
            temp.subject = fieldValues.subject ? "" : "This field is required."
        if ('message' in fieldValues)
            temp.message = fieldValues.message ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            sendMailService.sendMailApi(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        name="senderName"
                        label="Full Name"
                        value={values.senderName}
                        onChange={handleInputChange}
                        error={errors.senderName}
                    />
                    <Controls.Input
                        label="SenderEmail"
                        name="senderEmail"
                        value={values.senderEmail}
                        onChange={handleInputChange}
                        error={errors.senderEmail}
                    />
                    <Controls.Input
                        label="RecipientEmail"
                        name="recipientEmail"
                        value={values.recipientEmail}
                        onChange={handleInputChange}
                        error={errors.recipientEmail}
                    />
                    <Controls.Input
                        label="Subject"
                        name="subject"
                        value={values.subject}
                        onChange={handleInputChange}
                        error={errors.subject}
                    />
                    <Controls.Input
                        label="Message"
                        name="message"
                        value={values.message}
                        onChange={handleInputChange}
                        error={errors.message}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>

                </Grid>
            </Grid>
        </Form>
    )
}
