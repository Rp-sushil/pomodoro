import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react'
import { act } from 'react-dom/test-utils';
import sinon from "sinon";
import App from '../App';
import { cleanup } from '@testing-library/react';


global.alert = jest.fn();

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
  clock.restore();
  cleanup();
})

test('Should be able to start->stop->reset', async () =>{
    act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1011);
    })
    await waitFor(() =>{
        expect(screen.getByText(/24/i)).toBeInTheDocument();
        expect(screen.getByText(/59/i)).toBeInTheDocument();
      })
    act(() =>{
        fireEvent.click(screen.getByTestId(datatestid.stop));
        clock.tick(1011);
    })
    await waitFor(() =>{
        expect(screen.getByText(/24/i)).toBeInTheDocument();
        expect(screen.getByText(/59/i)).toBeInTheDocument();
      })
    act(() =>{
        fireEvent.click(screen.getByTestId(datatestid.reset));
    })
    await waitFor(() =>{
        expect(screen.getByText(/work/i)).toBeInTheDocument();
        expect(screen.getByText(/time/i)).toBeInTheDocument();
        expect(screen.getByText(/25/i)).toBeInTheDocument();
        expect(screen.getByText(/00/i)).toBeInTheDocument();
    })
})







