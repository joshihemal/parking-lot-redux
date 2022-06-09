/* eslint-disable testing-library/no-node-access */
import {
  cleanup,
  screen,
  render as RTL,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ParkingLotContext from './Context/ParkingLotContext';

import VehicalAllotment from './Components/VehicalAllotment';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  cleanup();
});

const parkingLots = [
  {
    charges: '',
    id: '9286',
    parkingTime: '',
    regNo: 'GJ 11 8756',
    totalTime: '',
  },
  {
    charges: '',
    id: '9287',
    parkingTime: '',
    regNo: '',
    totalTime: '',
  },
];
const updateParkingLots = jest.fn();

const render = (componant: JSX.Element) => {
  return RTL(
    <BrowserRouter>
      <ParkingLotContext.Provider value={{ parkingLots, updateParkingLots }}>
        {componant}
      </ParkingLotContext.Provider>
    </BrowserRouter>
  );
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
  };
});

describe('Vehical Allotment component testing', () => {
  it('Snapshot test', () => {
    render(<VehicalAllotment />);
    expect(screen).toMatchSnapshot();
  });
  it('Each empty parking space', () => {
    render(<VehicalAllotment />);
    const parkingLot = screen.getByTestId('parking-drawing-space-9287');
    expect(parkingLot).toHaveTextContent('Empty');
  });
  it('Registration Number input is in the document', () => {
    render(<VehicalAllotment />);
    const parking_drawing_registration_input: any = screen
      .getByTestId('parking-drawing-registration-input')
      .querySelector('input');
    expect(parking_drawing_registration_input).toBeDefined();
  });
  it('Registration Number Input', () => {
    render(<VehicalAllotment />);
    const parking_drawing_registration_input: any = screen
      .getByTestId('parking-drawing-registration-input')
      .querySelector('input');
    fireEvent.change(parking_drawing_registration_input, {
      target: { value: 'GJ 11 4581' },
    });
    expect(parking_drawing_registration_input.value).toBe('GJ 11 4581');
  });
  it('Car Registration Submit button', () => {
    render(<VehicalAllotment />);
    const parking_drawing_add_car_button: any = screen.getByTestId(
      'parking-drawing-add-car-button'
    );
    expect(parking_drawing_add_car_button).toBeDefined();
  });
  it('Check OnClick Exit', () => {
    render(<VehicalAllotment />);
    const parkingLot = screen.getByTestId('parking-drawing-space-9287');
    fireEvent.click(parkingLot);
    expect(parkingLot).toBeDefined();
  });
  it('Each parking space with car registered', () => {
    render(<VehicalAllotment />);
    const regNo: any = screen.getByTestId('parking-drawing-registered-9287');
    const parking_drawing_registration_input: any = screen
      .getByTestId('parking-drawing-registration-input')
      .querySelector('input');
    const parking_drawing_add_car_button: any = screen.getByTestId(
      'parking-drawing-add-car-button'
    );
    fireEvent.change(parking_drawing_registration_input, {
      target: { value: 'GJ 11 4581' },
    });
    fireEvent.click(parking_drawing_add_car_button);
    expect(regNo).toHaveTextContent('[9287] GJ 11 4581');
  });
});
