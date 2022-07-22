import '@testing-library/jest-dom'

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import AnimateChildren from '../../lib/animatechildren'

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
})

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

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
    </AnimateChildren>
  )

  testChilds.map((child) => {
    expect(screen.getByText(child.props.children)).toBeInTheDocument()
  })

  fakeTestChilds.map((child) => {
    expect(screen.queryByText(child.props.children)).toBeNull()
  })
})
