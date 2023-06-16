import React, { createContext, useContext } from 'react';

const MyContext = createContext();

const App = () => {
  const myState = 'Hello, world!';

  return (
    <MyContext.Provider value={myState}>
      {/* Otros componentes renderizados aquí */}
    </MyContext.Provider>
  );
};

const MyComponent = () => {
  const state = useContext(MyContext);

  // Usa el estado aquí sin tener que pasarlo como prop

  return (
    <div>
      {/* Contenido del componente */}
    </div>
  );
};
