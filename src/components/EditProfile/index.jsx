import Layout from "../Layout/index";
import componentStyles from "./styles";
import { useState } from "react";
import { localStorageService } from "../../services/localStorageService";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditDetailsForm from "./Forms/EditDetailsForm"
import ChangePasswordForm from "./Forms/ChangePasswordForm"

const EditProfile = () => {
    const history = useHistory();
    if (localStorageService.token == '' || localStorageService.token == null) {
        history.push("/login")
    }

    const {t} = useTranslation();
    const tnm = "edit-profile."
    const { EditProfileMain, EditProfileButton, EditProfileButtonsRow } = componentStyles;
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)

    return (
        <Layout>
            <EditProfileMain>
                {showChangePasswordForm ? <ChangePasswordForm /> : <EditDetailsForm /> }
                <EditProfileButtonsRow>
                    <EditProfileButton inrow onClick={() => history.push("/userpanel")}>{t(tnm+"common.exit")}</EditProfileButton>
                    {showChangePasswordForm ? 
                        <EditProfileButton inrow onClick={() => setShowChangePasswordForm(false)}>
                            {t(tnm+"user-details.change-details")}
                        </EditProfileButton>
                    : 
                        <EditProfileButton inrow onClick={() => setShowChangePasswordForm(true)}>
                            {t(tnm+"password.change-password")}
                        </EditProfileButton>
                    }
                </EditProfileButtonsRow>
            </EditProfileMain>
        </Layout>
    )
}

export default EditProfile;