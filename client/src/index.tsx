import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Routing from './components/pages/Routing';
import store from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Routing />
    </Provider>
);
