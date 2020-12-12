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

describe('Clock should be switch between break-time to work-time', () =>{
    it('should be able to switch from break-time to work-time', async () =>{
        act(() => {render(<App />)})
        act(() =>{
            fireEvent.click(screen.getByTestId(datatestid.start));
            clock.tick(1880000);
        })
        await waitFor(() =>{
            expect(alert).toBeCalledTimes(2);
            expect(screen.getByTestId(/work/i));
        })
    })
})