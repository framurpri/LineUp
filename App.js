import  Main  from './Main';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import  AuthMenu  from './AuthMenu';
import  { Login }  from './Login';
import  { Registro }  from './Registro';

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
    </Routes>
    </NativeRouter>
    </>
  )
}

export default App;

