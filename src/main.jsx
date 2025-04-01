import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {SifrarniciContextProvider} from "./store/sifrarnici-context-provider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <SifrarniciContextProvider>
    <App />
  </SifrarniciContextProvider>,
)