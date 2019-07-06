import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { FeatA } from './featA.jsx';
import { FeatB } from './header/featB.jsx';
class App extends Component {
  
  render() {
   
    return (
      <div >
        <FeatB/>
        ...asdf
        <FeatA/>
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('app'));
