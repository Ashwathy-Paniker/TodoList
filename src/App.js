import './App.css';

import Login from './component/Login';
import Registration from './component/Registration';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Home from './component/Home';

function App() {
  return (
    <div className="container-fluid" style={{backgroundColor:"#92a8d1"}}>
      <div className="row">
        <div className="col-10 mx-auto col-md-8 mt-5">
          {/*<ToDo item={this.state.item} desc={this.state.desc} srNo={this.state.srNo} handleChange1={this.handleChange1} handleChange={this.handleChange} handleSubmit={this.handleSubmit} editItem={this.state.editItem}/>
          <List items={this.state.items} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/> */}
          {/* <Registrationform/>
          <Loginform/> */}
    <Router>
     <Switch>
     <Route exact path="/" component={Registration}/>
     <Route exact path="/login" component={Login}/>
     <Route exact path="/home" component={Home}/>
     </Switch>
   </Router>
        </div>
      </div>
    </div>
    
  
  );
}

export default App;
