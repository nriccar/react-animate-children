import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

import useObservable from '../hooks/useObservable'
import useScroll from '../hooks/useScroll'

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
  speed?: number
  id?: string
  className?: string
}

const AnimateChildren: React.FC<AnimateChildrenProps> = ({
  children,
  direction = 'down',
  behaviour = 'auto',
  speed = 50,
  id = '',
  className = '',
}): JSX.Element => {
  const elements = Array.isArray(children) ? children : [children, null]
  const elementsLength = elements.length

  const [childrensVisibility, setChildrensVisibility] = useState(
    Array.from({ length: elementsLength }, () => false)
  )

  const [index, setIndex] = useState(0)

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

  const [isVisibleOnScreen, setIsVisibleOnScreen] = useState<boolean>(false)

  const ref = useRef()
  const observer = useObservable(ref)
  const scroll = useScroll()

  useEffect(() => {
    if (
      !isVisibleOnScreen &&
      ((behaviour === 'scroll' && observer) || behaviour === 'auto')
    ) {
      setIsVisibleOnScreen(true)
    }
  }, [scroll])

  return (
    <div className={className}>
      {elements.map((child, index) => {
        return (
          <AnimatedContainer
            visible={childrensVisibility[index] && isVisibleOnScreen}
            {...{ direction, id, ref }}
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
  id: string
  ref: any
}

const directionOffset = 50

const AnimatedContainer = styled.div<AnimatedContainerProps>`
  > * {
    transition: all 0.3s;
    opacity: ${({ visible }) => (visible ? 1 : 0)};

    top: ${({ visible, direction }) =>
      visible ? 0 : direction === 'down' ? `-${directionOffset}px` : 0};

    right: ${({ visible, direction }) =>
      visible ? 0 : direction === 'left' ? `-${directionOffset}px` : 0};

    bottom: ${({ visible, direction }) =>
      visible ? 0 : direction === 'up' ? `-${directionOffset}px` : 0};

    left: ${({ visible, direction }) =>
      visible ? 0 : direction === 'right' ? `-${directionOffset}px` : 0};
  }
`

export default AnimateChildren
