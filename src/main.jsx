import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {DataContextProvider} from "./store/data-context-provider.jsx";
import {LoginContextProvider} from "./store/login-context-provider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginContextProvider>
      <DataContextProvider>
        <App/>
      </DataContextProvider>
  </LoginContextProvider>
)