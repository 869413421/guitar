import './assets/main.css'
import 'vant/lib/index.css';

import {Button} from 'vant';
import {Col, Row} from 'vant';
import {Dialog} from 'vant';

import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(Button)
app.use(Col);
app.use(Row);
app.use(Dialog)
app.mount('#app')
