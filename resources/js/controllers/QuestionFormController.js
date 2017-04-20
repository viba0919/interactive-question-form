(function() {
    'use strict';


    var questionFormController = function(questionsFactory) {
        var formCtrl = this;

        formCtrl.config = {
            number: 1,
            step: 0,
            filled: 0,
            isNextQuestion: true,
            maxStep: questionsFactory.countQuestions(),
            path: []
        };


        var getPrevStep = function() {
            formCtrl.config.path.pop();

            return formCtrl.config.path[formCtrl.config.path.length - 1];
        };


        var saveStep = function() {
            formCtrl.config.path.push(formCtrl.config.step);
        };


        var updateNextQuestionExistence = function() {
            formCtrl.config.isNextQuestion = questionsFactory.isNextQuestionExist(formCtrl.currentQuestion, formCtrl.config.step);
        };


        var updateProgress = function() {
            formCtrl.config.step = !formCtrl.config.isNextQuestion ? formCtrl.config.maxStep - 1 : formCtrl.config.step;
            formCtrl.config.filled = (formCtrl.config.step + 1) * 100 / formCtrl.config.maxStep;
        };


        formCtrl.init = function() {
            formCtrl.setQuestion();
            saveStep();
        };


        formCtrl.isErrorMessageVisible = function() {
            return formCtrl.qForm.$invalid && formCtrl.qForm.$dirty;
        };


        formCtrl.isNextButtonVisible = function() {
            return formCtrl.config.isNextQuestion;
        };


        formCtrl.isPrevButtonVisible = function() {
            return formCtrl.config.step > 0;
        };


        formCtrl.isShowOverviewButtonVisible = function() {
            return !formCtrl.config.isNextQuestion;
        };


        formCtrl.next = function() {
            if (formCtrl.qForm.$valid) {
                formCtrl.config.step = questionsFactory.getNextIndex(formCtrl.currentQuestion, formCtrl.config.step);
                formCtrl.setQuestion();
                formCtrl.qForm.$setPristine();
                formCtrl.config.number++;
                saveStep();

                if (formCtrl.currentQuestion.result !== null) {
                    updateProgress();
                }
            } else {
                formCtrl.qForm.$setDirty();
            }
        };


        formCtrl.prev = function() {
            formCtrl.currentQuestion.triggered = false;
            formCtrl.config.number--;
            formCtrl.config.step = getPrevStep();
            formCtrl.setQuestion();
        };


        formCtrl.selectAnswer = function() {
            formCtrl.currentQuestion.triggered = true;
            updateNextQuestionExistence();
            updateProgress();
        };


        formCtrl.setQuestion = function() {
            var question = questionsFactory.getQuestion(formCtrl.config.step);

            if (question) {
                formCtrl.currentQuestion = question;
                updateNextQuestionExistence();
            }
        };
    };


    questionFormController.$inject = ['questionsFactory'];
    angular.module('app').controller('QuestionFormController', questionFormController);
})();