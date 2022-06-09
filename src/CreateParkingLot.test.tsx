/* eslint-disable testing-library/no-node-access */
import {
  cleanup,
  screen,
  render as RTL,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateParkingLot from './Components/CreateParkingLot';
import { ParkingLotContextProvider } from './Context/ParkingLotContext';

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  cleanup();
});

const render = (componant: JSX.Element) => {
  return RTL(
    <ParkingLotContextProvider>{componant}</ParkingLotContextProvider>
  );
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
  };
});

describe('Parking component testing', () => {
  it('Snapshot test', () => {
    render(<CreateParkingLot />);
    expect(screen).toMatchSnapshot();
  });

  it('input is in the document', () => {
    render(<CreateParkingLot />);
    const parking_create_text_input: any = screen
      .getByTestId('parking-create-text-input')
      .querySelector('input');
    expect(parking_create_text_input).toBeDefined();
  });

  it('Number of spaces Text Input', () => {
    render(<CreateParkingLot />);
    const parking_create_text_input: any = screen
      .getByTestId('parking-create-text-input')
      .querySelector('input');
    fireEvent.change(parking_create_text_input, { target: { value: '3' } });
    expect(parking_create_text_input.value).toBe('3');
  });

  it('Submit button', () => {
    render(<CreateParkingLot />);
    const parking_create_submit_button = screen.getByTestId(
      'parking-create-submit-button'
    );
    fireEvent.click(parking_create_submit_button);
    expect(parking_create_submit_button).toBeDefined();
  });
});
