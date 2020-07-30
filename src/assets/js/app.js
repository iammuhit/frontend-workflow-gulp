const $ = window.$ = window.jQuery = window.jQuery.noConflict();
const App = function() {
    let htmlBody = () => {
        $('body').css({ 'position': 'relative' });
    };

    let logMessage = (msg) => {
        console.log(msg);
    };

    return {
        init: () => {
            htmlBody();
        },
        log: logMessage
    };
}();

class Person {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log('Hello, your name is ' + this.name + '!');
    }
}

$(document).ready(() => {
    const person = new Person('Muhit');

    App.init();
    App.log('Welcome to the Dark World!');

    person.sayName();
});