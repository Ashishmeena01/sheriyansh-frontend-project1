import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
    <SmoothScroll>
        <App />
    </SmoothScroll>
);



import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

function SmoothScroll({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}