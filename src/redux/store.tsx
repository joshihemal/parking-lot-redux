import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { parkingLotReducer } from './ParkingLot/parkingLotReducer';
const store = createStore(parkingLotReducer, composeWithDevTools());
export default store;
