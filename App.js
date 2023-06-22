import  Main  from './Main';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import  AuthMenu  from './AuthMenu';
import  { Login }  from './Login';
import  { Registro }  from './Registro';
import Basic from './BasicStructPage';

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
      <Route path="/home" Component={<Basic/>}/>  
    </Routes>
    </NativeRouter>
    </>
  )
}

export default App;

