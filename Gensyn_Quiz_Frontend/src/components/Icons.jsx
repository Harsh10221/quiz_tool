import React from 'react';

export const TrophyIcon = ({ className = "h-10 w-10 text-amber-300" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.25 2.25a.75.75 0 00-1.5 0v1.163a2.25 2.25 0 01-1.04 1.954 2.25 2.25 0 00-2.41 3.514l.13.259a4.5 4.5 0 008.032 0l.13-.259a2.25 2.25 0 00-2.41-3.514 2.25 2.25 0 01-1.04-1.954V2.25zM8.5 9.5a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5zM11.5 9.5a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" clipRule="evenodd" />
        <path d="M5.5 9.25a.75.75 0 000 1.5h.022a2.25 2.25 0 012.228 2.067 4.501 4.501 0 008.5 0 2.25 2.25 0 012.228-2.067H14.5a.75.75 0 000-1.5h-.022a2.25 2.25 0 01-2.228-2.067 4.501 4.501 0 00-8.5 0A2.25 2.25 0 015.522 9.25H5.5z" />
    </svg>
);

export const CrownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278C12 6.25278 10.6667 5 8.5 5C6.33333 5 5 6.25278 5 6.25278V10L3 12L5 14V18.5H19V14L21 12L19 10V6.25278C19 6.25278 17.6667 5 15.5 5C13.3333 5 12 6.25278 12 6.25278Z" /></svg>;

export const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

export const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export const RestartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 15M20 20l-1.5-1.5A9 9 0 003.5 9" /></svg>;

export const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/></svg>;

export const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
