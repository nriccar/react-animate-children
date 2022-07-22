import React from 'react';
/**
 * * animatechildren receives children as a prop and animates them programatically
 * * @param {children} jsx elements to render
 * * @param {direction} direction of animation
 * * @param {behaviour} behaviour of mounting - scroll will mount when the element is in the viewport
 * * @param {speed} speed of mounting
 */
interface AnimateChildrenProps {
    children: React.ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    behaviour?: 'scroll' | 'auto';
    speed?: number;
    id?: string;
    className?: string;
}
declare const AnimateChildren: React.FC<AnimateChildrenProps>;
export default AnimateChildren;
