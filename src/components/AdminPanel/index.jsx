import Layout from "../Layout/index";
import Navigation from './Navigation/index'
import Home from './Home/index'
import StatsPage from './Stats/index';
import BlockUser from './BlockUser/index';
import ConfirmPlace from './ConfirmPlace/index';
import React, { useState } from "react";
import { localStorageService } from "../../services/localStorageService"
import components from "./styles";

const AdminPanel = () => {

    const {AdminContainer, ForbiddenAccess} = components;
    const {role} = localStorageService

    const [openSection, setOpenSection] = useState("statistics");
   
    return(
        <Layout>
            
            {role === '0' ? 
            <AdminContainer>

                <Navigation changeSection={(arg) => setOpenSection(arg)}/>
                
                {openSection === "statistics" ? <StatsPage></StatsPage> : ""}
                {openSection === "usersManagement" ? <BlockUser></BlockUser> : ""}
                {openSection === "placeSuggestions" ? <ConfirmPlace></ConfirmPlace> : ""}
                
            </AdminContainer>

            :
            <ForbiddenAccess>{'Unauthorized access is prohibited!'}</ForbiddenAccess>
            }
            
        </Layout>
    )
}

export default AdminPanel