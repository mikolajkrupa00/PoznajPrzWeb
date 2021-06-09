import { useForm } from 'react-hook-form';
import componentStyles from "../styles";
import Axios from "axios";
import { useEffect, useState } from "react";
import { localStorageService } from "../../../services/localStorageService";
import { useTranslation } from "react-i18next";

const EditDetailsForm = () => {
    const {t} = useTranslation();
    const tnm = "edit-profile."
    const { EditProfileForm, EditProfileTitle, EditProfileLabel, EditProfileInput,
        EditProfileInputError, EditProfileButton, EditProfileInfoText } = componentStyles;
    const { register, handleSubmit, setValue, setError, watch, formState: { errors } } = useForm();
    const [diableSubmitButton, setDisableSubmitButton] = useState(true)
    const [awaitingServerResponse, setAwaitingServerResponse] = useState(false)
    const [currentEmail, setCurrentEmail] = useState("")
    const [infoMessage, setInfoMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const watchFields = watch(["username", "email"])

    useEffect(() => {
        Axios.get("/user/"+localStorageService.userId).then(
            (res) => {
                if (res.status == 200) {
                    setCurrentEmail(res.data.email)
                    setValue("email", res.data.email)
                }
            }
        )
        setValue("username", localStorageService.username)
    }, [])

    useEffect(() => {
        if (watchFields[0] == localStorageService.username && watchFields[1] == currentEmail)
            setDisableSubmitButton(true)
        else {
            setDisableSubmitButton(false)
            if (!errorMessage) setInfoMessage("")
        }
    }, [watchFields])

    const UpdateUser = (data) => {
        setInfoMessage("")
        if (data.username != localStorageService.username || data.email != currentEmail) {
            setAwaitingServerResponse(true)
            Axios.put("/user/changeUserDetails", {
                userId: localStorageService.userId,
                username: data.username,
                email: data.email
            }).then((res) => {
                if (res.status == 204) {
                    localStorageService.username = data.username
                    setCurrentEmail(data.email)
                    setErrorMessage(false)
                    setInfoMessage(t(tnm+"common.update-success"))
                } else {
                    setErrorMessage(true)
                    setInfoMessage(t(tnm+"errors.other"))
                }
            }).catch((error) => {
                if (error.response && error.response.status == 400) {
                    switch (error.response.data) {
                        case "Username taken":
                            setError("username", {type: "username-taken", message: ""}, {shouldFocus: true})
                            break;
                        case "Email taken":
                            setError("email", {type: "email-taken", message: ""}, {shouldFocus: true})
                            break;
                        default:
                            setErrorMessage(true)
                            setInfoMessage(t(tnm+"errors.other"))
                            break;
                    }
                } else if (error.response && error.response.status == 401) {
                    setErrorMessage(true)
                    setInfoMessage(t(tnm+"errors.unauthorized"))
                } else {
                    setErrorMessage(true)
                    setInfoMessage(t(tnm+"errors.other"))
                }
            }).then(() => {
                setAwaitingServerResponse(false)
            })
        }
    }

    return (
        <EditProfileForm onSubmit={handleSubmit(UpdateUser)}>
            <EditProfileTitle>{t(tnm+"user-details.change-details")}</EditProfileTitle>

            <EditProfileLabel error={errors.username}>{t(tnm+"user-details.username")}</EditProfileLabel>
            <EditProfileInput error={errors.username} type="text" {...register('username', {required: true})}
                    placeholder={t(tnm+"user-details.username")}/>
            <EditProfileInputError>{errors.username ? t(tnm+"errors."+errors.username.type) : null}</EditProfileInputError>

            <EditProfileLabel error={errors.email}>{t(tnm+"user-details.email")}</EditProfileLabel>
            <EditProfileInput error={errors.email} type="email" {...register('email', {required: true})}
                    placeholder={t(tnm+"user-details.email")} />
            <EditProfileInputError>{errors.email ? t(tnm+"errors."+errors.email.type) : null}</EditProfileInputError>

            <EditProfileInfoText error={errorMessage}>{infoMessage}</EditProfileInfoText>
                
            <EditProfileButton disabled={diableSubmitButton || awaitingServerResponse} type="submit" color="#FFFFFF">
                {t(tnm+"common.save-changes")}
            </EditProfileButton>
        </EditProfileForm>
    )
}
export default EditDetailsForm