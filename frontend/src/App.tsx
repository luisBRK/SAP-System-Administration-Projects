import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from './components/layouts';

import './styles/app.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          {/* <Route index element={<Login/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
