import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useObservable from '../hooks/useObservable';
import useScroll from '../hooks/useScroll';
import useWindowSize from '../hooks/useWindowSize';
const AnimateChildren = ({ children, direction = 'down', behaviour = 'auto', speed = 500, offset = 50, className = '', key = '', }) => {
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
    return (React.createElement("div", Object.assign({}, { className, key }), elements.map((child, index) => {
        return (React.createElement(AnimateChildrenItem, Object.assign({ key: `react-animate-children-${index}-${key}-children-item` }, {
            childrensVisibility,
            index,
            child,
            direction,
            behaviour,
            offset,
        })));
    })));
};
const AnimateChildrenItem = ({ childrensVisibility, index, child, direction, behaviour, offset, }) => {
    const [childrenVisibility, setChildrenVisibility] = useState(false);
    const ref = useRef();
    const observer = useObservable(ref);
    const { isMobile } = useWindowSize();
    const scroll = useScroll();
    const scrollBehaviour = behaviour === 'scroll';
    useEffect(() => {
        if (scrollBehaviour) {
            setChildrenVisibility(observer);
        }
        if (!scrollBehaviour || isMobile) {
            setChildrenVisibility(true);
        }
    }, [scroll, observer]);
    const childVisible = childrensVisibility[index] && childrenVisibility;
    return (React.createElement(AnimateContainer, Object.assign({ ref: ref }, { direction, offset }, { visible: childVisible }), child));
};
const AnimateContainer = styled.div `
  > * {
    transition: all 0.3s;
    opacity: ${({ visible }) => (visible ? 1 : 0)};

    top: ${({ visible, direction, offset }) => visible ? 0 : direction === 'down' ? `-${offset}px` : 0};
    right: ${({ visible, direction, offset }) => visible ? 0 : direction === 'left' ? `-${offset}px` : 0};
    bottom: ${({ visible, direction, offset }) => visible ? 0 : direction === 'up' ? `-${offset}px` : 0};
    left: ${({ visible, direction, offset }) => visible ? 0 : direction === 'right' ? `-${offset}px` : 0};
  }
`;
export default AnimateChildren;
