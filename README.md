# [React Animate Children](https://github.com/nriccar/react-animate-children) &middot; [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react-animate-children) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

React Animate Children allows to add microinteractions to the mounting phase of components.

This library features `IntersectionObserver` so that the animation can start once the children are visible on the screen!

## Features

- Compatible with `styled-components`
- Use of `IntersectionObserver` api
- Highly customziable - check props table

## Installation

```
npm i react-animate-children
```

## Usage

```jsx
import AnimateChildren from 'react-animate-children'

const Test() {
  return (
    <AnimateChildren>
      <div>Hello</div>
    </AnimateChildren>
  )
}
```

## Props

| Property       | Type                          | Default | Required | Description                                                                                                                             |
| -------------- | ----------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| children       | React Node(s)                 | null    | Yes      | Children components wrapped inside AnimateChildren                                                                                      |
| direction      | 'left', 'right', 'up', 'down' | down    | No       | Specifies the direction in which the component will get mounted                                                                         |
| behaviour      | 'scroll', 'auto'              | auto    | No       | Auto will mount the children components once the page loads, scroll will load them when the children is visible on the screen           |
| unmountObserve | boolean                       | false   | No       | If true, the component will unmount when its no longer on the visible DOM, and it will toggle the animation once again when its visible |
| speed          | number                        | 500     | No       | Specifies the time it will take to start the animation                                                                                  |
| offset         | number                        | 50      | No       | Specifies how many pixels it will have as offset when the animation start                                                               |

## Credits

PRs are welcome!
