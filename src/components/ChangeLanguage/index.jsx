import Layout from "../Layout/index";
import componentStyles from "./styles";
import i18n from "i18next";
import { useTranslation } from "react-i18next";




const ChangeLanguage = () =>{

    const {t} = useTranslation();
    const {Wrapper, Button, CountryName, Flag} = componentStyles

    const flagStyles = {
        width: "32px",
        height: "32px",
        marginLeft: "20px",
        disply: "block"
    }


    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      }

    return(
        <Layout>
            <Wrapper>
                {t('change-language.title')}

                <Button onClick={() => changeLanguage('pl')}>
                    <CountryName>{t('change-language.polish')}</CountryName>
                    <Flag><img alt='' src='img/flags_icons/pl.png' style={flagStyles}></img></Flag>
                </Button>

                <Button onClick={() => changeLanguage('en')}>
                    <CountryName>{t('change-language.english')}</CountryName>
                    <Flag><img alt='' src='img/flags_icons/en.png' style={flagStyles}></img></Flag>
                </Button>

                <Button onClick={() => changeLanguage('de')}>
                    <CountryName>{t('change-language.german')}</CountryName>
                    <Flag><img alt='' src='img/flags_icons/de.png' style={flagStyles}></img></Flag>
                </Button>

                <Button onClick={() => changeLanguage('fr')}>
                    <CountryName> {t('change-language.french')}</CountryName>
                    <Flag><img alt='' src='img/flags_icons/fr.png' style={flagStyles}></img></Flag>
                </Button>

                <Button onClick={() => changeLanguage('ru')}>
                    <CountryName>{t('change-language.russian')}</CountryName>
                    <Flag><img alt='' src='img/flags_icons/ru.png' style={flagStyles}></img></Flag>
                </Button>

            </Wrapper>
        </Layout>
    )
}

export default ChangeLanguage