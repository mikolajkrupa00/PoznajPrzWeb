import Layout from "./components/Layout/index"
import RegisterPage from "./components/register/index";
import LoginPage from "./components/login/index";
import AddPlacePage from "./components/AddPlace/index";
import PlacesPage from "./components/Places/index"
import StatsPage from "./components/Stats/index"
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { setupAxiosInterceptors } from './services/interceptor';


setupAxiosInterceptors();

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/home" component={Layout} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/Places" component={PlacesPage} />
      <Route path="/addPlace" component={AddPlacePage} />
      <Route path="/stats" component={StatsPage} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;