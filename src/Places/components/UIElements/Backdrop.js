import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = (props) => {
    const ref = useRef(null);

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKey = (e) => {
            if (e.key === 'Escape') {
                props.onClick && props.onClick();
            }
        };

        document.addEventListener('keydown', handleKey);

        // focus the backdrop so keyboard events are captured
        if (ref.current) {
            try {
                ref.current.focus();
            } catch (err) {
                // ignore
            }
        }

        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', handleKey);
        };
    }, [props]);

    const content = (
        <div
            className="backdrop"
            onClick={props.onClick}
            role="button"
            aria-label="Close overlay"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                    props.onClick && props.onClick();
                }
            }}
            ref={ref}
        ></div>
    );

    return ReactDOM.createPortal(content, document.getElementById('backdrop-hook'));
};

export default Backdrop;