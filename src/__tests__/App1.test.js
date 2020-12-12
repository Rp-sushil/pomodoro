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

test('Should be able to start clock by clicking start-button', async () =>{
    act(() => {render(<App />)});
    act(() =>{
      fireEvent.click(screen.getByTestId(datatestid.start));
      clock.tick(1000);
    })
    await waitFor(() =>{
      expect(screen.getByText(/24/i)).toBeInTheDocument();
      expect(screen.getByText(/59/i)).toBeInTheDocument();
    })
  })


test('Work duration and Break duration should be only non-negative number', async () =>{
    act(() => {render(<App />)});
    let inputElements = document.getElementsByTagName('INPUT');
    act(() =>{
        fireEvent.change(inputElements[0], {target: {value: '-5'}});
        fireEvent.change(inputElements[1], {target: {value: '-5' }});
        fireEvent.click(screen.getByTestId(datatestid.set));
    })
    await waitFor(() =>{
        expect(screen.getByText(/25/i));
    })
})

test('Both Work-duration and break-duration could not be set to zero at the same time', async () =>{
    act(() => {render(<App />)});
    let inputElements = document.getElementsByTagName('INPUT');
    act(() =>{
        fireEvent.change(inputElements[0], {target: {value: '0'}});
        fireEvent.change(inputElements[1], {target: {value: '0'}});
    })
    await waitFor(() =>{
      expect(parseInt(inputElements[0].value) === 0).toBe(true);
        expect(parseInt(inputElements[1].value) === 0).toBe(true);
    })
    act(() =>{
      fireEvent.click(screen.getByTestId(datatestid.set));
    })
    await waitFor(() =>{
        expect(screen.getByText(/25/i)).toBeInTheDocument();
        inputElements = document.getElementsByTagName('INPUT');
        expect(parseInt(inputElements[0].value) === 25).toBe(true);
        expect(parseInt(inputElements[1].value) === 5).toBe(true);
    })
})

test("Should not set if one of input fields is empty", async () =>{
    act(() => {render(<App />)});
    let inputElements = document.getElementsByTagName('INPUT');
    act(() =>{
        fireEvent.change(inputElements[0], {target: {value: ''}});
        fireEvent.click(screen.getByTestId(datatestid.set));
    })
    await waitFor(() =>{
        expect(screen.getByText(/25/i)).toBeInTheDocument();
        expect(screen.getByText(/00/i)).toBeInTheDocument();
    })
})

