import React, { useRef, useEffect, useState } from 'react'

import styled from 'styled-components'

import useObservable from '../hooks/useObservable'
import useScroll from '../hooks/useScroll'
import useWindowSize from '../hooks/useWindowSize'

import uuid from '../utils/uuid'

/**
 * * animatechildren receives children as a prop and animates them programatically
 * * @param {children} jsx elements to render
 * * @param {direction} direction of animation
 * * @param {behaviour} behaviour of mounting - scroll will mount when the element is in the viewport
 * * @param {speed} speed of mounting
 */

interface AnimateChildrenProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  behaviour?: 'scroll' | 'auto'
  unmountObserve?: boolean
  speed?: number
  offset?: number
  className?: string
}

const AnimateChildren: React.FC<AnimateChildrenProps> = ({
  children,
  direction = 'down',
  behaviour = 'auto',
  unmountObserve = false,
  speed = 500,
  offset = 50,
  className = '',
}): JSX.Element => {
  const elements: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children, null]

  const elementsLength: number = elements.length

  const [childrensVisibility, setChildrensVisibility] = useState<boolean[]>(
    Array.from({ length: elementsLength }, () => false)
  )

  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    if (index < elementsLength) {
      const childrensVisibilityCopy = [...childrensVisibility]
      childrensVisibilityCopy[index] = true

      setTimeout(() => {
        setChildrensVisibility(childrensVisibilityCopy)
        setIndex(index + 1)
      }, speed)
    }
  }, [index])

  const [visible, setVisible] = useState<boolean>(false)

  const ref = useRef() as React.MutableRefObject<HTMLInputElement>
  const observer: boolean = useObservable(ref)

  const { isMobile }: { isMobile: boolean } = useWindowSize()
  const scroll: number = useScroll()

  const scrollBehaviour: boolean = behaviour === 'scroll'
  const autoBehaviour: boolean = behaviour === 'auto'

  const shouldUnmount: boolean = unmountObserve && !observer && scrollBehaviour
  const shouldMount: boolean =
    (scrollBehaviour && observer) || autoBehaviour || isMobile

  useEffect(() => {
    if (shouldUnmount) {
      setVisible(false)
    }

    if (shouldMount) {
      setVisible(true)
    }
  }, [scroll])

  const id = uuid()

  return (
    <div {...{ className }}>
      {elements.map((child, index) => {
        const childVisible: boolean = childrensVisibility[index] && visible

        return (
          <AnimatedContainer
            ref={ref}
            visible={childVisible}
            {...{ direction, offset }}
          >
            {child}
          </AnimatedContainer>
        )
      })}
    </div>
  )
}

interface AnimatedContainerProps {
  visible: boolean
  direction: 'left' | 'right' | 'up' | 'down'
  offset: number
}

const AnimatedContainer = styled.div<AnimatedContainerProps>`
  > * {
    transition: all 0.3s;
    opacity: ${({ visible }) => (visible ? 1 : 0)};

    top: ${({ visible, direction, offset }) =>
      visible ? 0 : direction === 'down' ? `-${offset}px` : 0};
    right: ${({ visible, direction, offset }) =>
      visible ? 0 : direction === 'left' ? `-${offset}px` : 0};
    bottom: ${({ visible, direction, offset }) =>
      visible ? 0 : direction === 'up' ? `-${offset}px` : 0};
    left: ${({ visible, direction, offset }) =>
      visible ? 0 : direction === 'right' ? `-${offset}px` : 0};
  }
`

export default AnimateChildren
