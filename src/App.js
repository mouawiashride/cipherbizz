
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout';
import Home from './pages/home/Home';

import RequireAuth from './components/RequireAuth/RequireAuth';
import Login from './pages/Login/Login';
 import Register from './pages/Register/Register';
 import 'react-toastify/dist/ReactToastify.css';
import EmplyeeCard from './components/UserCard/EmplyeeCard';
 export const  queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='show/:id' element={<EmplyeeCard />} />
            {/* Auth for guest pages */}
            <Route element={<RequireAuth allowedRoles={["guest"]} />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>


        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
