import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from './config';

ReactDOM.render(<App 
                    title={config.TITLE} 
                    auth={config.auth} 
                    sso={config.useSSO}/>, 
                document.getElementById('root'));

