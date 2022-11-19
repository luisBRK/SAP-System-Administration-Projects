import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from './components/layouts';
import { Login } from './routes/public';

import './styles/app.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
