import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Home from "./home";
import Layout from "./layout";
import Chat from "./pages/chat";
import reportWebVitals from './reportWebVitals';
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

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
