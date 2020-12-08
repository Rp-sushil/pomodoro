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


test('renders pomodoro clock', () => {
  act(() => {render(<App />)});
});

test('Initially start-button should be enabled', () =>{
  act(() => {render(<App />)});
  expect(screen.getByTestId(datatestid.start)).toBeEnabled();
})

test('Initially input-fields should be enabled', () =>{
  act(() => {render(<App />)});
  expect(screen.getByTestId(datatestid.workDuration)).toBeEnabled();
  expect(screen.getByTestId(datatestid.breakDuration)).toBeEnabled();
})

test('Initially reset button should be enabled', () =>{
  act(() => {render(<App />)});
  expect(screen.getByTestId(datatestid.set)).toBeEnabled();
})

test('Initially stop-button should be disbaled',() =>{
  act(() => {render(<App />)});
  expect(screen.getByTestId(datatestid.stop)).toBeDisabled();
})

test('Initially reset-button should be disabled', () =>{
  act(() => {render(<App />)});
  expect(screen.getByTestId(datatestid.reset)).toBeDisabled();
})

test('Initially input-field work duration value should be 25', () =>{
  act(() =>  {render(<App />)});
  const inputElements = document.getElementsByTagName('INPUT');
  expect(parseInt(inputElements[0].value) === 25 || parseInt(inputElements[0].value) === 5).toBe(true);
})

test('Initially input-field break duration value should be 5', () =>{
  act(() =>  {render(<App />)});
  const inputElements = document.getElementsByTagName('INPUT');
  expect(parseInt(inputElements[1].value) === 25 || parseInt(inputElements[1].value) === 5).toBe(true);
})

test('Initially "Work-Time" rendered on the screen', () =>{
  act(() => {render(<App />)});
  expect(screen.getByText(/Work-Time/i)).toBeInTheDocument();
})

test('Initllially "25:00" rendered on the screen', () =>{
  act(() => {render(<App />)});
  expect(screen.getByText(/25:00/i)).toBeInTheDocument();
})

test('Initially should be able to change input fields values', async () =>{
  act(() => {render(<App />)});
  let inputElements = document.getElementsByTagName('INPUT');
  act(() =>{
    fireEvent.change(inputElements[0], { target: { value: '12' } });
  })
  await waitFor(() =>{
    expect(parseInt(inputElements[0].value) === 12).toBe(true);
  })
  act(() =>{
    fireEvent.change(inputElements[1], { target: { value: '2' } });
  })
  await waitFor(() =>{
    expect(parseInt(inputElements[1].value) === 2).toBe(true);
  })
})

test('Start button should be disabled when clock started', async () =>{
  act(() => {render(<App />)});
  act(() => {
    fireEvent.click(screen.getByTestId(datatestid.start));
    clock.tick(1000);
  })
  await waitFor(() =>{
    expect(screen.getByTestId(datatestid.start)).toBeDisabled();
  })
})
test('Set button should be disabled when clock started', async () =>{
  act(() => {render(<App />)});
  act(() =>{
    fireEvent.click(screen.getByTestId(datatestid.start));
    clock.tick(1000);
  })
  await waitFor(() =>{
    expect(screen.getByTestId(datatestid.set)).toBeDisabled();
  })
})
test('Input-fields should be disabled when clok started', async () =>{
  act(() => {render(<App />)});
  act(() =>{
    fireEvent.click(screen.getByTestId(datatestid.start));
    clock.tick(1000);
  })
  await waitFor(() =>{
    expect(screen.getByTestId(datatestid.workDuration)).toBeDisabled();
    expect(screen.getByTestId(datatestid.breakDuration)).toBeDisabled();
  })
})

test('Reset and stop should be enabled when clock started', async () =>{
  act(() => {render(<App />)});
  act(() =>{
    fireEvent.click(screen.getByTestId(datatestid.start));
    clock.tick(1000);
  })
  await waitFor(() =>{
    expect(screen.getByTestId(datatestid.stop)).toBeEnabled();
    expect(screen.getByTestId(datatestid.reset)).toBeEnabled();
  })
})


