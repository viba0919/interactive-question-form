(function() {
    'use strict';


    var viewController = function(questionsFactory) {
        var viewCtrl = this;

        var templates = {
            intro: 'intro',
            form: 'questions',
            result: 'result'
        };


        var getTemplatePath = function(name) {
            return 'views/' + name + '.html';
        };


        viewCtrl.init = function() {
            viewCtrl.template = getTemplatePath(templates.intro);
        };


        viewCtrl.start = function() {
            viewCtrl.template = getTemplatePath(templates.form);
        };


        viewCtrl.showResult = function() {
            viewCtrl.template = getTemplatePath(templates.result);
            viewCtrl.questions = questionsFactory.getResult();
        };


        viewCtrl.restart = function() {
            questionsFactory.clearResult();
            viewCtrl.start();
        };
    };


    viewController.$inject = ['questionsFactory'];
    angular.module('app').controller('ViewController', viewController);
})();