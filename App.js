import  Main  from './Main';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import  AuthMenu  from './AuthMenu';
import  { Login }  from './Login';
import  { Registro }  from './Registro';
import Basic from './BasicStructPage';
import Escenas from './escenas';
import Teams from './Teams';
import Settings from './Settings';
import Team from './Team';
import { NewTeam } from './NewTeam';
import ChangePassword from './ChangePassword';

function App() {
  return ( 
    <>
    <NativeRouter>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/authentication">
        <Route path="login" element={<Login />}/>
        <Route path="registro" element={<Registro />}/>
      </Route>
      <Route path="/home" element={<Basic/>}/>
      <Route path="/escenas" element={<Escenas/>}/>
      <Route path="/teams">
        <Route path="" element={<Teams/>}/>
        <Route path="new" element={<NewTeam/>}/>
        <Route path=":id" element={<Team/>}/>
      </Route>
      <Route path="/settings">
        <Route path='' element={<Settings/>}/>
        <Route path='changePassword' element={<ChangePassword/>}/>
      </Route> 

    </Routes>
    </NativeRouter>
    </>
  )
}

export default App;

