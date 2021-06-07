import Layout from "../Layout/index";
import Navigation from './Navigation/index'
import Home from './Home/index'
import StatsPage from './Stats/index';
import BlockUser from './BlockUser/index';
import ConfirmPlace from './ConfirmPlace/index';
import React, { useState } from "react";
import components from "./styles";

const AdminPanel = () => {

    const {AdminContainer} = components;

    const [openSection, setOpenSection] = useState("statistics");
   
    return(
        <Layout>
            
            <AdminContainer>

                <Navigation changeSection={(arg) => setOpenSection(arg)} activeSection={openSection}/>
                
                {openSection === "statistics" ? <StatsPage></StatsPage> : ""}
                {openSection === "usersManagement" ? <BlockUser></BlockUser> : ""}
                {openSection === "placesManagement" ? "" : ""}
                {openSection === "placeSuggestions" ? <ConfirmPlace></ConfirmPlace> : ""}
               
                

            </AdminContainer>
            
        </Layout>
    )
}

export default AdminPanel