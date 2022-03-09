import React, { Component } from 'react';
import Student from './components/Student';

// export class App extends Component {
//    render() {
//      return <div className='App'>
//      </div>;
//    }
// }

// Functional component

const App = () => {
   return (
      <div className='App'>
         <Student />
      </div>
   );
};

export default App;
