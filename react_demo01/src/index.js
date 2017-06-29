import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Bind from './Bind';
import NativeEventDemo from './NativeEventDemo';
import QrCode from './QrCode';
import From from './From';
import Radio from './Radio';
import CheckBox from './CheckBox';
import Select from './Select';
import MulitSelect from './MulitSelect';
import UnCtrl from './UnCtrl';
import List from './List';
import Lists from './Lists';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Lists />, document.getElementById('root'));
registerServiceWorker();
