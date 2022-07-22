import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useObservable from '../hooks/useObservable';
const AnimateChildren = ({ children, direction = 'down', behaviour = 'auto', speed = 50, id = '', className = '', }) => {
    const elements = Array.isArray(children)
        ? children
        : [children, null];
    const elementsLength = elements.length;
    const [childrensVisibility, setChildrensVisibility] = useState(Array.from({ length: elementsLength }, () => false));
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (index < elementsLength) {
            const childrensVisibilityCopy = [...childrensVisibility];
            childrensVisibilityCopy[index] = true;
            setTimeout(() => {
                setChildrensVisibility(childrensVisibilityCopy);
                setIndex(index + 1);
            }, speed);
        }
    }, [index]);
    const [isVisibleOnScreen, setIsVisibleOnScreen] = useState(false);
    const ref = useRef();
    const observer = useObservable(ref);
    useEffect(() => {
        if (!isVisibleOnScreen &&
            ((behaviour === 'scroll' && observer) || behaviour === 'auto')) {
            setIsVisibleOnScreen(true);
        }
    }, [observer]);
    return (React.createElement("div", { className: className }, elements.map((child, index) => {
        return (React.createElement(AnimatedContainer, Object.assign({ key: `animated-child-${id}-${index}`, visible: childrensVisibility[index] && isVisibleOnScreen }, { direction, id, ref }), child));
    })));
};
const directionOffset = 50;
const AnimatedContainer = styled.div `
  > * {
    transition: all 0.3s;
    opacity: ${({ visible }) => (visible ? 1 : 0)};

    top: ${({ visible, direction }) => visible ? 0 : direction === 'down' ? `-${directionOffset}px` : 0};
    right: ${({ visible, direction }) => visible ? 0 : direction === 'left' ? `-${directionOffset}px` : 0};
    bottom: ${({ visible, direction }) => visible ? 0 : direction === 'up' ? `-${directionOffset}px` : 0};
    left: ${({ visible, direction }) => visible ? 0 : direction === 'right' ? `-${directionOffset}px` : 0};
  }
`;
export default AnimateChildren;
