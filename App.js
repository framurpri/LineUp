import  Main  from './Main';
import { NativeRouter, Routes, Route } from 'react-router-native';
import  { Login }  from './Login';
import  { Registro }  from './Registro';
import Escenas from './escenas';
import Teams from './Teams';
import Settings from './Settings';
import Team from './Team';
import  NewTeam  from './NewTeam';
import ChangePassword from './ChangePassword';
import Play from './Play';
import Profile from './Profile';
import Terms from './Terms';
import Community from './Community';
import Applications from './Applications';
import TermsNoAuth from './TermsNoAuth';
import { PaperProvider } from 'react-native-paper';
import CardsList from './Card';
import RealTimeChat from './RealTimeMessage';
import HomeScreen from './Home';



function App() {
  return ( 
    <>
    <PaperProvider>
      <NativeRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/authentication">
          <Route path="login" element={<Login />}/>
          <Route path="registro" element={<Registro />}/>
        </Route>
        <Route path="/home" element={<HomeScreen/>}/>
        <Route path="/escenas" element={<Escenas/>}/>
        <Route path="/community">
          <Route path="" element={<Community/>}/>
          <Route path="newTeam" element={<NewTeam/>}/>
        </Route>
        <Route path="/profile">
          <Route path="" element={<Profile/>}/>
          <Route path="plays">
            <Route path="" element={<CardsList/>}/>
            <Route path=":id" element={<Play/>}/>
          </Route>
          <Route path="teams">
            <Route path="" element={<Teams/>}/>
            <Route path=":id">
              <Route path=""  element={<Team/>}/>
              <Route path="chat" element={<RealTimeChat/>}/>
              <Route path="applications" element={<Applications/>}/>
            </Route>
        </Route>
        </Route>
        <Route path="/settings">
          <Route path='' element={<Settings/>}/>
          <Route path='changePassword' element={<ChangePassword/>}/>
          <Route path='terms' element={<Terms/>}/>
        </Route> 
        <Route path="/termsNoAuth" element={<TermsNoAuth/>}/>
      </Routes>
      </NativeRouter>
    </PaperProvider>
    </>
  )
}

export default App;

