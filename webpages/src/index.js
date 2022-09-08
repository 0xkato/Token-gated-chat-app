import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Layout from "./layout";
import Chat from "./pages/chat";
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
// Path direct us to the right page
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="Mint" element={<App />} />
    <Route path="Chat" element={<Chat />} />
    <Route path="*" element={<App />} />
    </Route>
  </Routes>
</BrowserRouter> 
);

reportWebVitals();
