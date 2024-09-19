import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import EmployeeList from './components/EmployeeList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <EmployeeList />
      </div>
    </Provider>
  );
};

export default App;