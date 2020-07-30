import $ from 'jquery';

export default class Foo {

    constructor() {
        $('body').css({ 'background-color': 'PowderBlue' });
    }

    log(msg) {
        console.log(msg);
    }

}