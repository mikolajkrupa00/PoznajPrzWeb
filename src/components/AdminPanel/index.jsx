import Layout from "../Layout/index";
import Navigation from './Navigation/index'
import Home from './Home/index'
import StatsPage from './Stats/index';
import BlockUser from './BlockUser/index';
import ConfirmPlace from './ConfirmPlace/index';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import components from "./styles";

const AdminPanel = () => {

    const {AdminContainer} = components;
    
    return(
        <Layout>
            
            <AdminContainer>
                <BrowserRouter>
                <Navigation/>
                    <Switch>
                        <Route path="/adminPanel/" exact component={Home} />
                        <Route path="/adminPanel/statistics" component={StatsPage} />
                        <Route path="/adminPanel/blockedUsers" component={BlockUser} />
                        <Route path="/adminPanel/confirmPlace" component={ConfirmPlace} />
                    </Switch>
                </BrowserRouter>

            </AdminContainer>
            
        </Layout>
    )
}

export default AdminPanel