import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

const Root = ({ store }) => (
    <Provider store={store}>
        <Hashrouter>
            <App />
        </Hashrouter>
    </Provider>
)

export default Root