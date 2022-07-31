import '@testing-library/jest-dom'

import * as React from 'react'
import { act, render, screen } from '@testing-library/react'
import AnimateChildren from '../../lib/animatechildren'

beforeAll(() => {
  const intersectionObserverMock = () => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  })

  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock)
})

afterAll(() => {
  jest.clearAllMocks()
})

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('renders N child(s) successfully', () => {
  const testChilds = [
    <div>Child 1</div>,
    <div>Child 2</div>,
    <div>Child 3</div>,
  ]

  const fakeTestChilds = [<div>X</div>, <div>Y</div>, <div>Z</div>]

  render(
    <AnimateChildren>
      {testChilds.map((child, index) => (
        <div key={`testchild-${index}`}>{child}</div>
      ))}
    </AnimateChildren>,
  )

  testChilds.map(child => {
    expect(screen.getByText(child.props.children)).toBeInTheDocument()
  })

  fakeTestChilds.map(child => {
    expect(screen.queryByText(child.props.children)).toBeNull()
  })
})

test('renders child(s) according to speed prop', () => {
  jest.spyOn(global, 'setTimeout')

  const testChilds = [
    <div>Child 1</div>,
    <div>Child 2</div>,
    <div>Child 3</div>,
  ]

  const speedProp = 1000

  render(
    <AnimateChildren speed={speedProp}>
      {testChilds.map((child, index) => (
        <div key={`testchild-${index}`}>{child}</div>
      ))}
    </AnimateChildren>,
  )

  expect(screen.getByText(testChilds[0].props.children)).toBeInTheDocument()
  expect(setTimeout).toHaveBeenCalledTimes(1)

  act(() => {
    jest.advanceTimersByTime(speedProp)
  })
  expect(screen.getByText(testChilds[0].props.children)).toBeInTheDocument()
  expect(screen.getByText(testChilds[1].props.children)).toBeInTheDocument()
  expect(setTimeout).toHaveBeenCalledTimes(2)

  act(() => {
    jest.advanceTimersByTime(speedProp)
  })
  expect(screen.getByText(testChilds[0].props.children)).toBeInTheDocument()
  expect(screen.getByText(testChilds[1].props.children)).toBeInTheDocument()
  expect(screen.getByText(testChilds[2].props.children)).toBeInTheDocument()
  expect(setTimeout).toHaveBeenCalledTimes(3)
})
