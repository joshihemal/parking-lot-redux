import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateParkingLot from './Components/CreateParkingLot';
import VehicalAllotment from './Components/VehicalAllotment';
// import { ParkingLotContextProvider } from './Context/ParkingLotContext';
import ExitParkingLot from './Components/ExitParkingLot';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
      {/* <ParkingLotContextProvider> */}
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<CreateParkingLot />} />
          <Route path='/allotment' element={<VehicalAllotment />} />
          <Route path='/exit' element={<ExitParkingLot />} />
        </Routes>
      </Provider>
      {/* </ParkingLotContextProvider> */}
    </BrowserRouter>
  );
}

export default App;
