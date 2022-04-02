/* eslint-disable import/prefer-default-export */
// import {useEffect, useRef, useState} from 'react';

// const getLineHeight = (element: HTMLElement) => {
//   const clone = element.cloneNode();

//   clone.style.visibility = 'hidden';
//   clone.style.position = 'absolute';
//   clone.innerHTML = 'a<br>b';

//   document.body.append(clone);

//   const {height} = clone.getBoundingClientRect();

//   clone.remove();

//   return height / 2;
// };

// export const useNumberOfLines = () => {
//   const targetRef = useRef<HTMLElement>(null);
//   const [numberOfLines, setNumberOfLines] = useState<number>();

//   useEffect(() => {
//     const countLines = () => {
//       if (!targetRef.current) return;

//       const {height} = targetRef.current.getBoundingClientRect();
//       const lineHeight = getLineHeight(targetRef.current);

//       setNumberOfLines(Math.trunc(height / lineHeight));
//     };

//     countLines();

//     window.addEventListener('resize', countLines);

//     return () => {
//       window.removeEventListener('resize', countLines);
//     };
//   }, []);

//   return [numberOfLines, targetRef];
// };
export {};
