import logo from './logo.svg';
import './App.css';
import { browserHistory, Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { Container } from "@mui/material";
import  ViewTask from "./components/ViewTask";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (

    <Provider store={store}>
      <ToastProvider autoDismiss={true}>

        <Container maxWidth="lg">
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view-task" element={<ViewTask />} />
      </Routes>
      </BrowserRouter>
        </Container>
      </ToastProvider>
        </Provider>
        
  );
}

export default App;
