import "./styles/main.scss"
import { render } from '@wordpress/element';
import TestComponent from './TestComponent'

// Load React Admin Template
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('rc-app');
    ReactDOM.render(<TestComponent />, container);
});


console.log("Test")