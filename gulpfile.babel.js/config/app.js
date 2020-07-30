import app from '../bootstrap/app';

const env = app.load.helper('general').env;

module.exports = {
    name: env('APP_NAME', 'Frontend Development Workflow Automation - Gulp'),
    description: env('APP_DESCRIPTION', 'A Complete Workflow Automation for Frontend Development using Gulp'),
    version: env('APP_VERSION', '1.0.0'),
    url: env('APP_URL', 'https://www.primitivesolution.com/'),
    
    author: {
        name: env('AUTHOR_NAME', 'Nurul Amin Muhit'),
        website: env('AUTHOR_WEBSITE', 'https://muhit.me/')
    },
    company: {
        name: env('COMPANY_NAME', 'Primitive Solution'),
        email: env('COMPANY_EMAIL', 'sales@primitivesolution.com'),
        website: env('COMPANY_WEBSITE', 'https://www.primitivesolution.com/')
    },
    
    script: { bundler: env('SCRIPT_BUNDLER', 'none') }, // browserify | webpack | none
    template: { engine: env('TEMPLATE_ENGINE', 'twig'), ext: '.twig' } // twig | pub
};