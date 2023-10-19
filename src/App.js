import { PartyItemProvider } from "./contexts/Party.jsx";
import Router from "./router/Router.jsx";
import "./scss/import.scss";

function App() {
  return <>
    <PartyItemProvider>
      <Router />
    </PartyItemProvider>
  </>
}

export default App;
