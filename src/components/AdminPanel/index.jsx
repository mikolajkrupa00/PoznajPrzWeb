import Layout from "../Layout/index";
import Navigation from './Navigation/index'
import Home from './Home/index'
import StatsPage from './Stats/index';
import BlockUser from './BlockUser/index';
import ConfirmPlace from './ConfirmPlace/index';
//import { Switch, Route, BrowserRouter } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import components from "./styles";

const AdminPanel = () => {

    const {AdminContainer} = components;

    const [openSection, setOpenSection] = useState("statistics");
   
    return(
        <Layout>
            
            <AdminContainer>

                {/* <BrowserRouter>
                <Navigation/>
                    <Switch>
                        <Route path="/adminPanel/" exact component={Home} />
                        <Route path="/adminPanel/statistics" component={StatsPage} />
                        <Route path="/adminPanel/blockedUsers" component={BlockUser} />
                        <Route path="/adminPanel/confirmPlace" component={ConfirmPlace} />
                    </Switch>
                </BrowserRouter> */}


                <Navigation changeSection={(arg) => setOpenSection(arg)}/>
                
                {openSection === "statistics" ? <StatsPage></StatsPage> : ""}
                {openSection === "usersManagement" ? <BlockUser></BlockUser> : ""}
                {openSection === "placesManagement" ? "" : ""}
                {openSection === "placeSuggestions" ? <ConfirmPlace></ConfirmPlace> : ""}
               
                

            </AdminContainer>
            
        </Layout>
    )
}

export default AdminPanel