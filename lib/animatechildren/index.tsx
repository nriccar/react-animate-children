import React, { useRef, useEffect, useState } from 'react'

import styled from 'styled-components'

import useObservable from '../hooks/useObservable'
import useScroll from '../hooks/useScroll'
import useWindowSize from '../hooks/useWindowSize'

/**
 * * animatechildren receives children as a prop and animates them programatically
 * * @param {children} jsx elements to render
 * * @param {direction} direction of animation
 * * @param {behaviour} behaviour of mounting - scroll will mount when the element is in the viewport
 * * @param {speed} speed of mounting
 * * @param {offset} offset of mounting
 */

interface AnimateChildrenProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  behaviour?: 'scroll' | 'auto'
  speed?: number
  offset?: number
  className?: string
  key?: string
}

const AnimateChildren: React.FC<AnimateChildrenProps> = ({
  children,
  direction = 'down',
  behaviour = 'auto',
  speed = 500,
  offset = 50,
  className = '',
  key = '',
}): JSX.Element => {
  const elements: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children, null]

  const elementsLength: number = elements.length

  const [childrensVisibility, setChildrensVisibility] = useState<boolean[]>(
    Array.from({ length: elementsLength }, () => false),
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

  return (
    <div {...{ className, key }}>
      {elements.map((child, index) => {
        return (
          <AnimateChildrenItem
            key={`react-animate-children-${index}-${key}-children-item`}
            {...{
              childrensVisibility,
              index,
              child,
              direction,
              behaviour,
              offset,
            }}
          />
        )
      })}
    </div>
  )
}

interface AnimateChildrenItemProps {
  childrensVisibility: boolean[]
  index: number
  child: React.ReactNode
  direction: 'left' | 'right' | 'up' | 'down'
  behaviour: 'scroll' | 'auto'
  offset: number
}

const AnimateChildrenItem: React.FC<AnimateChildrenItemProps> = ({
  childrensVisibility,
  index,
  child,
  direction,
  behaviour,
  offset,
}): JSX.Element => {
  const [childrenVisibility, setChildrenVisibility] = useState<boolean>(false)

  const ref = useRef() as React.MutableRefObject<HTMLInputElement>
  const observer: boolean = useObservable(ref)

  const { isMobile }: { isMobile: boolean } = useWindowSize()
  const scroll: number = useScroll()

  const scrollBehaviour: boolean = behaviour === 'scroll'

  useEffect(() => {
    if (scrollBehaviour) {
      setChildrenVisibility(observer)
    }

    if (!scrollBehaviour || isMobile) {
      setChildrenVisibility(true)
    }
  }, [scroll, observer])

  const childVisible: boolean = childrensVisibility[index] && childrenVisibility

  return (
    <AnimateContainer
      ref={ref}
      {...{ direction, offset }}
      visible={childVisible}
    >
      {child}
    </AnimateContainer>
  )
}

interface AnimateContainerProps {
  visible: boolean
  direction: 'left' | 'right' | 'up' | 'down'
  offset: number
}

const AnimateContainer = styled.div<AnimateContainerProps>`
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
