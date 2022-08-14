import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import About from './components/About.js';
import Contact from './components/Contact.js';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import FieldAgentList from './components/FieldAgentList.js';
import FieldAgentForm from './components/FieldAgentForm.js';
import NotFound from './components/NotFound.js';


function App() {
  return (
    <Router>
      <Navbar />
      <h1 className="my-4">Field Agent</h1>

      <Switch>

        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/fieldagents" exact>
          <FieldAgentList />
        </Route>

        {/* <Route path="/fieldagents/add" exact>
          <FieldAgentForm />
        </Route>

        <Route path="/fieldagents/edit/:id" exact>
          <FieldAgentForm />
        </Route> */}

        <Route path={['/fieldagents/add', '/fieldagents/edit/:id']}>
          <FieldAgentForm />
        </Route>

        <Route>
          <NotFound />
        </Route>


      </Switch>






    </Router>
  );
}

export default App;
