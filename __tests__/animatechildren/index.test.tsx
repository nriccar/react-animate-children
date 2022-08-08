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

  return {
    ...utils,
  }
}

test('renders N child(s) successfully', () => {
  const { getAllByText } = renderAnimateChildren({})
  const childs = getAllByText(/child/i)
  expect(childs).toHaveLength(testChildsAmount)
})

test('renders child(s) according to speed prop', () => {
  const speedProp = 1000
  const { getByTestId, getAllByText } = renderAnimateChildren({
    speed: speedProp,
  })

  const childs = getAllByText(/child/i)
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
