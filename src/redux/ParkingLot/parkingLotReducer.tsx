import { UPDATE_LOT } from './parkingLotsTypes';
const initialState = {
  parkingLots: [] as any[],
};
export const parkingLotReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_LOT:
      return {
        ...state,
        parkingLots: action.payload,
      };
    default:
      return state;
  }
};
