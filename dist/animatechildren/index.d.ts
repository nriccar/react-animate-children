import React from 'react';
/**
 * * animatechildren receives children as a prop and animates them programatically
 * * @param {children} jsx elements to render
 * * @param {direction} direction of animation
 * * @param {behaviour} behaviour of mounting - scroll will mount when the element is in the viewport
 * * @param {speed} speed of mounting
 * * @param {offset} offset of mounting
 */
interface AnimateChildrenProps {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    behaviour?: 'scroll' | 'auto';
    speed?: number;
    offset?: number;
    className?: string;
    key?: string;
}
declare const AnimateChildren: React.FC<AnimateChildrenProps>;
export default AnimateChildren;
