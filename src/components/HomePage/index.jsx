import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import Layout from "../Layout/index"
import componentStyles from "./styles";
import { localStorageService } from "../../services/localStorageService"

const HomePage = () => {

    const {Wrapper} = componentStyles

    return(

        <Layout>
            <Wrapper>TU BEDZIE STRONA GLOWNA</Wrapper>
        </Layout>

    )

}

export default HomePage