import '@testing-library/jest-dom'
import 'jest-styled-components'

import * as React from 'react'
import { act, render } from '@testing-library/react'

import AnimateChildren, {
  AnimateChildrenProps,
} from '../../lib/animatechildren'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
  jest.clearAllMocks()
})

const testChildsAmount = 100
const testChilds = Array.from(
  { length: testChildsAmount },
  (_, index) => `child ${index}`,
)

const renderAnimateChildren = ({
  speed = 500,
  behaviour = 'auto',
}: AnimateChildrenProps) => {
  const utils = render(
    <AnimateChildren {...{ speed, behaviour }}>
      {testChilds.map((child, index) => (
        <div key={`testchild-${index}`}>{child}</div>
      ))}
    </AnimateChildren>,
  )

  const childs = utils.getAllByText(/child/i)

  return {
    childs,
    ...utils,
  }
}

test('renders N child(s) successfully', () => {
  const { childs } = renderAnimateChildren({})
  expect(childs).toHaveLength(testChildsAmount)
})

test('renders child(s) according to speed prop', () => {
  const speedProp = 1000
  const { childs, getByTestId } = renderAnimateChildren({
    speed: speedProp,
  })

  let childsIndex = 0
  act(() => {
    jest.advanceTimersByTime(speedProp)
  })

  while (childsIndex < childs.length) {
    expect(
      getByTestId('react-animate-children-' + childsIndex),
    ).toHaveStyleRule('opacity', '1')

    act(() => {
      jest.advanceTimersByTime(speedProp)
    })

    childsIndex++
  }
})
