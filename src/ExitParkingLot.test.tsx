/* eslint-disable testing-library/no-node-access */
import {
  cleanup,
  screen,
  render as RTL,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ParkingLotContext from './Context/ParkingLotContext';
import ExitParkingLot from './Components/ExitParkingLot';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  cleanup();
});

const parkingLots = [
  {
    charges: '10',
    id: '9286',
    parkingTime: '13',
    regNo: 'GJ 11 8756',
    totalTime: '1',
  },
  {
    charges: '10',
    id: '9287',
    parkingTime: '12',
    regNo: 'GJ 11 8856',
    totalTime: '2',
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
    useLocation: () => ({ state: { currentParkingLot: '9286' } }),
  };
});

describe('Exit Parking Lot Allotment component testing', () => {
  it('Snapshot test', () => {
    render(<ExitParkingLot />);
    expect(screen).toMatchSnapshot();
  });
  it('Car DeRegistration Screen', () => {
    render(<ExitParkingLot />);
    expect(screen).toBeTruthy();
  });
  it('Time spent in parking lot', () => {
    render(<ExitParkingLot />);
    const time_duration = screen.getByTestId('deregister-time-spent');
    expect(time_duration).toHaveTextContent('1 hours');
  });
  it('Parking charge', () => {
    render(<ExitParkingLot />);
    const charges = screen.getByTestId('deregister-charge');
    expect(charges).toHaveTextContent('10$');
  });
  it('Payment taken button', () => {
    render(<ExitParkingLot />);
    const payment_taken_button = screen.getByTestId(
      'deregister-payment-button'
    );
    fireEvent.click(payment_taken_button);
    expect(payment_taken_button).toBeDefined();
  });
  it('Back button', () => {
    render(<ExitParkingLot />);
    const back_button = screen.getByTestId('deregister-back-button');
    fireEvent.click(back_button);
    expect(back_button).toBeDefined();
  });
});
