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

test('should be able to switch back-and-forth from break-time to work-time', async () =>{
    act(() =>{render(<App />)})
    let inputElements = document.getElementsByTagName('INPUT');
    act(() =>{
        fireEvent.change(inputElements[0], { target: { value: 0 } });
        fireEvent.change(inputElements[1], {target: {value: 1}});
    })
    await waitFor(() =>{
        expect(parseInt(inputElements[0].value) === 0).toBe(true);
        expect(parseInt(inputElements[1].value) === 1).toBe(true);
    })
    act(() =>{
        fireEvent.click(screen.getByTestId(datatestid.set));
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
    })
    await waitFor(() =>{
        expect(screen.getByText(/break/i));
        expect(alert).toBeCalledTimes(1);
    })
    act(() =>{
        clock.tick(60000);
    })
    await waitFor(() =>{
        expect(screen.getByText(/break/i));
        expect(alert).toBeCalledTimes(3);
    })
})