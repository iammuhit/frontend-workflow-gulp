import './app/bootstrap';
// import './vendors/analytics';

import Vue from 'vue';
import Foo from './components/Foo';
import Example from './components/Example.vue';

const foo = new Foo();
const example = new Vue({
    el: '#vue-example',
    render: h => h(Example)
});

foo.log('EcmaScript compiled.');