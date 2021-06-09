import { useForm } from 'react-hook-form';
import componentStyles from "../styles";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { localStorageService } from '../../../services/localStorageService';

const ChangePasswordForm = () => {
    const {t} = useTranslation();
    const tnm = "edit-profile."
    const { EditProfileForm, EditProfileTitle, EditProfileLabel, EditProfileInput,
        EditProfileInputError, EditProfileButton, EditProfileInfoText } = componentStyles;
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
    const [infoMessage, setInfoMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const [awaitingServerResponse, setAwaitingServerResponse] = useState(false)

    const ChangePassword = (data) => {
        setInfoMessage("")
        if (data.newPassword == data.newPasswordRepeat) {
            setAwaitingServerResponse(true)
            Axios.put("/user/changePassword", {
                userId: localStorageService.userId,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                newPasswordRepeat: data.newPasswordRepeat
            }).then((res) => {
                if (res.status == 204) {
                    setErrorMessage(false)
                    setInfoMessage(t(tnm+"common.update-success"))
                    reset()
                } else {
                    setErrorMessage(true)
                    setInfoMessage(t(tnm+"errors.other"))
                }
            }).catch((error) => {
                if (error.response && error.response.status == 400) {
                    console.log(error.response)
                    if (error.response.data == "New passwords mismatch") {
                        setError("newPasswordRepeat", {type: "passwords-mismatch", message: ""}, {shouldFocus: true})
                    } else {
                        setErrorMessage(true)
                        setInfoMessage(t(tnm+"errors.other"))
                    }
                } else if (error.response && error.response.status == 401) {
                    if (error.response.data == "Wrong password") {
                        setError("currentPassword", {type: "wrong-password", message: ""}, {shouldFocus: true})
                    } else {
                        setErrorMessage(true)
                        setInfoMessage(t(tnm+"errors.unauthorized"))
                    }
                } else {
                    setErrorMessage(true)
                    setInfoMessage(t(tnm+"errors.other"))
                }
            }).then(() => {
                setAwaitingServerResponse(false)
            })
        } else {
            setError("newPasswordRepeat", {type: "passwords-mismatch", message: ""}, {shouldFocus: true})
        }
    }

    return (
        <EditProfileForm onSubmit={handleSubmit(ChangePassword)}>
            <EditProfileTitle>{t(tnm+"password.change-password")}</EditProfileTitle>

            <EditProfileLabel error={errors.currentPassword}>{t(tnm+"password.current-password")}</EditProfileLabel>
            <EditProfileInput error={errors.currentPassword} type="password" {...register("currentPassword", {required: true})}
                placeholder={t(tnm+"password.current-password")} />
            <EditProfileInputError>{errors.currentPassword ? t(tnm+"errors."+errors.currentPassword.type) : null}</EditProfileInputError>

            <EditProfileLabel error={errors.newPassword}>{t(tnm+"password.new-password")}</EditProfileLabel>
            <EditProfileInput error={errors.newPassword} type="password" {...register("newPassword", {required: true,
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 },)} placeholder={t(tnm+"password.new-password")} />
            <EditProfileInputError>{errors.newPassword ? t(tnm+"errors."+errors.newPassword.type) : null}</EditProfileInputError>

            <EditProfileLabel error={errors.newPasswordRepeat}>{t(tnm+"password.repeat-new-password")}</EditProfileLabel>
            <EditProfileInput error={errors.newPasswordRepeat} type="password" {...register("newPasswordRepeat", {required: true})}
                placeholder={t(tnm+"password.repeat-new-password")} />
            <EditProfileInputError>{errors.newPasswordRepeat ? t(tnm+"errors."+errors.newPasswordRepeat.type) : null}</EditProfileInputError>
            
            <EditProfileInfoText error={errorMessage}>{infoMessage}</EditProfileInfoText>

            <EditProfileButton disabled={awaitingServerResponse} type="submit" color="#FFFFFF">
                {t(tnm+"common.save-changes")}
            </EditProfileButton>
        </EditProfileForm>
    )
}
export default ChangePasswordForm