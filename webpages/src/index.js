import './index.css';
import App from './App.jsx';
import Home from "./Home.jsx";
import Layout from "./layout.jsx";
import Chat from "./pages/chat.jsx";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


const root = ReactDOM.createRoot(document.getElementById('root'));
// Path direct us to the right page
root.render(
  <WagmiConfig client={client}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="Mint" element={<App />} />
      <Route path="Chat" element={<Chat />} />
      <Route path="*" element={<Home />} />
      </Route>
    </Routes>
    </BrowserRouter> 
  </WagmiConfig>
);

reportWebVitals();
