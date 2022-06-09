import { UPDATE_LOT } from './parkingLotsTypes';
export const updateParkingLots = (parkingLot: any[]) => {
  return {
    type: UPDATE_LOT,
    payload: parkingLot,
  };
};
