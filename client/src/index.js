import react from 'react';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import App from './App.js';
import redux from './redux';

const logger = createLogger();

const store = createStore(redux, compose(applyMiddleware(thunk,logger)));

reactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,document.getElementById('butter')
)