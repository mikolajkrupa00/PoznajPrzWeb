import Layout from "../Layout/index";
import componentStyles from "./styles";
import i18n from "i18next";
import { useTranslation } from "react-i18next";




const ChangeLanguage = () =>{

    const {t} = useTranslation();
    const {Wrapper, Button} = componentStyles

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      }

    return(
        <Layout>
            <Wrapper>{t('change-language.title')}</Wrapper>
            <Button onClick={() => changeLanguage('pl')}>{t('change-language.polish')}</Button>
            <Button onClick={() => changeLanguage('en')}>{t('change-language.english')}</Button>
            <Button onClick={() => changeLanguage('de')}>{t('change-language.german')}</Button>
            <Button onClick={() => changeLanguage('fr')}>{t('change-language.french')}</Button>
            <Button onClick={() => changeLanguage('ru')}>{t('change-language.russian')}</Button>
        </Layout>
    )
}

export default ChangeLanguage