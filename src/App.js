import HomePage from "./components/HomePage/index"
import Map from "./components/Map/index"
import RegisterPage from "./components/Register/index";
import LoginPage from "./components/Login/index";
import AddPlacePage from "./components/AddPlace/index";
import PlacesPage from "./components/Places/index"
import PlacePage from "./components/Place/index"
import ChangeLanguage from "./components/ChangeLanguage/index"
import AdminPanel from "./components/AdminPanel/index"
import UserPanel from "./components/UserPanel/index"
import EditProfile from "./components/EditProfile/index"
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { setupAxiosInterceptors } from './services/interceptor';


setupAxiosInterceptors();

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/map" component={Map} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/places" component={PlacesPage} />
      <Route path="/addPlace" component={AddPlacePage} />
      <Route path="/place" component={PlacePage} />
      <Route path="/changeLanguage" component={ChangeLanguage} />
      <Route path="/adminPanel" component={AdminPanel} />
      <Route path="/userPanel" component={UserPanel} />
      <Route path="/editprofile" component={EditProfile} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;