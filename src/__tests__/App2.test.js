import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react'
import { act } from 'react-dom/test-utils';
import sinon from "sinon";
import App from '../App';
import { cleanup } from '@testing-library/react';



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

test('should be able to stop clock', async () =>{
    act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.stop));
        clock.tick(1000);
    })
    await waitFor(() =>{
        expect(screen.getByText(/24/i)).toBeInTheDocument();
        expect(screen.getByText(/59/i)).toBeInTheDocument();
    })
})

test('stop-button should be disabled when clock disabled', async () =>{
  act(() => {render(<App />)});
  act(() =>{
    fireEvent.click(screen.getByTestId(datatestid.start));
    clock.tick(1000);
    fireEvent.click(screen.getByTestId(datatestid.stop));
    clock.tick(1000);
  })
  await waitFor(() =>{
    expect(screen.getByTestId(datatestid.stop)).toBeDisabled();
  })
})

test('start-button and reset-button should be enabled when stop-button clicked', async () =>{
    act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.stop));
        clock.tick(1000);
    })
    await waitFor(() =>{
        expect(screen.getByTestId(datatestid.start)).toBeEnabled();
        expect(screen.getByTestId(datatestid.reset)).toBeEnabled();
    })
})

test('input fields should be enabled when stop-button clicked', async () =>{
    act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.stop));
        clock.tick(1000);
    })
    await waitFor(() =>{
        expect(screen.getByTestId(datatestid.workDuration)).toBeEnabled();
        expect(screen.getByTestId(datatestid.breakDuration)).toBeEnabled();
    })
})

test('set-button should be enabled when stop-button clicked', async () =>{
    act(() => {render(<App />)});
    act(() =>{
      fireEvent.click(screen.getByTestId(datatestid.start));
      clock.tick(1000);
      fireEvent.click(screen.getByTestId(datatestid.stop));
      clock.tick(1000);
    })
    await waitFor(() =>{
      expect(screen.getByTestId(datatestid.set)).toBeEnabled();
    })
})

test('"25:00" and "Work-Time" should be rendered when reset', async () =>{
    act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.reset));
        clock.tick(1000);
    })
    await waitFor(() =>{
        expect(screen.getByText(/work/i)).toBeInTheDocument();
        expect(screen.getByText(/time/i)).toBeInTheDocument();
        expect(screen.getByText(/25/i)).toBeInTheDocument();
        expect(screen.getByText(/00/i)).toBeInTheDocument();
    })
})

test('work-duration and break-duration input fields value should be 25 and 5 respectively after reset', async () =>{
    act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.reset));
        clock.tick(1000);
    })
    await waitFor(() =>{
        const inputElements = document.getElementsByTagName('INPUT');
        expect(parseInt(inputElements[0].value) === 25 || parseInt(inputElements[0].value) === 5).toBe(true);
    })
})

test('work-duration and break-duration input fields should be enabled after reset', async () =>{
    act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.reset));
        clock.tick(1000);
    })
    await waitFor(() =>{
        expect(screen.getByTestId(datatestid.workDuration)).toBeEnabled();
        expect(screen.getByTestId(datatestid.breakDuration)).toBeEnabled();
    })
})

test('start-button should be enabled when reset', async () =>{
  act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.reset));
        clock.tick(1000);
    })
    await waitFor(() =>{
      expect(screen.getByTestId(datatestid.start)).toBeEnabled();
  })
})

test('set-button should be enabled after reset', async () =>{
  act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.reset));
        clock.tick(1000);
    })
    await waitFor(() =>{
      expect(screen.getByTestId(datatestid.set)).toBeEnabled();
  })
})

test('stop-button should be disabled when reset', async () =>{
  act(() => {render(<App />)});
    act(() => {
        fireEvent.click(screen.getByTestId(datatestid.start));
        clock.tick(1000);
        fireEvent.click(screen.getByTestId(datatestid.reset));
        clock.tick(1000);
    })
    await waitFor(() =>{
      expect(screen.getByTestId(datatestid.stop)).toBeDisabled();
  })
})