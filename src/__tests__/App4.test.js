import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react'
import { act } from 'react-dom/test-utils';
import sinon from "sinon";
import App from '../App';


const datatestid = {
  start: 'start-btn',
  stop: 'stop-btn',
  reset: 'reset-btn',
  workDuration: 'work-duration',
  breakDuration: 'break-duration',
  set: 'set-btn'
}

var clock;
beforeEach(() =>{
  clock = sinon.useFakeTimers();
})

afterEach(() =>{
  cleanup();
  clock.restore();
})

global.alert = jest.fn();

describe('Clock should switch between work-time to break-time', () =>{
    it('should be able to change from work-time to break-time', async () =>{
    
        act(() =>{ render(<App />)})
        act(() => {
            fireEvent.click(screen.getByTestId(datatestid.start));
            clock.tick(1511000);
        })
        await waitFor(() =>{
            expect(alert).toBeCalledTimes(1);
            expect(screen.getByText(/break/i));
        })
    })
})

