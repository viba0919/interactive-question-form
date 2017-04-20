(function() {
    'use strict';

    var questionsFactory = function() {

        var questions = [
            {
                id: 0,
                title: 'Ar turite Swedbank banko sąskaitą?',
                answers: [
                    {
                        value: 'Taip',
                        goTo: 2
                    },
                    {
                        value: 'Ne, bet planuoju atidaryti'
                    },
                    {
                        value: 'Ne'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 1,
                title: 'Kokio banko paslaugomis naudojatės (pasirinkite pagrindinį banką)?',
                answers: [
                    {
                        value: 'SEB bankas',
                        goTo: -1
                    },
                    {
                        value: 'DNB bankas',
                        goTo: -1
                    },
                    {
                        value: 'Šiaulių bankas',
                        goTo: -1
                    },
                    {
                        value: 'Danske bankas',
                        goTo: -1
                    },
                    {
                        value: 'Citadelė bankas',
                        goTo: -1
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 2,
                title: 'Ar tai pagrindinė jūsų banko sąskaita, į kurią gaunate atlyginimą?',
                answers: [
                    {
                        value: 'Taip'
                    },
                    {
                        value: 'Ne'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 3,
                title: 'Ar naudojatės el. bankininkyste?',
                answers: [
                    {
                        value: 'Taip',
                        goTo: 5
                    },
                    {
                        value: 'Ne'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 4,
                title: 'Dėl kokių priežasčių nesinaudojate el. bankininkyste?',
                answers: [
                    {
                        value: 'Neturiu galimybės, nes neturiu kompiuterio'
                    },
                    {
                        value: 'Nemoku naudotis'
                    },
                    {
                        value: 'Nepatogi naudotis'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 5,
                title: 'Ar, jūsų nuomone, yra saugu naudotis Swedbank el. bankininkyste?',
                answers: [
                    {
                        value: 'Taip'
                    },
                    {
                        value: 'Ne'
                    },
                    {
                        value: 'Nežinau'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 6,
                title: 'Ar naudojatės Swedbank išmaniąja programėle?',
                answers: [
                    {
                        value: 'Taip',
                        goTo: 8
                    },
                    {
                        value: 'Ne'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 7,
                title: 'Dėl kokių priežasčių nesinaudojate Swedbank išmaniąja programėle?',
                answers: [
                    {
                        value: 'Neturiu išmanaus telefono',
                        goTo: 9
                    },
                    {
                        value: 'Programėlė turi saugumo spragų',
                        goTo: 9
                    },
                    {
                        value: 'Programėlė yra nepatogi naudotis',
                        goTo: 9
                    },
                    {
                        value: 'Nėra poreikio',
                        goTo: 9
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 8,
                title: 'Ar, jūsų nuomone, yra saugu naudotis Swedbank išmaniąja programėle?',
                answers: [
                    {
                        value: 'Taip, bet papildomai reikia apsaugoti įšmanųjį įrenginį'
                    },
                    {
                        value: 'Ne'
                    },
                    {
                        value: 'Nežinau'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 9,
                title: 'Ar naudojatės Swedbank funkcija "Mano biudžetas"?',
                answers: [
                    {
                        value: 'Taip'
                    },
                    {
                        value: 'Ne. Pirmą kartą girdžiu',
                        goTo: 11
                    },
                    {
                        value: 'Ne, nes nepatogu ir painu',
                        goTo: 11
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 10,
                title: 'Ar tai pagrindinis jūsų biudžeto valdymo įrankis?',
                answers: [
                    {
                        value: 'Taip'
                    },
                    {
                        value: 'Ne'
                    }
                ],
                triggered: false,
                result: null
            },
            {
                id: 11,
                title: 'Įvertinkite Swedbank teikiamas paslaugas',
                answers: [
                    {
                        value: '10 - Awesome'
                    },
                    {
                        value: '4 - yra kur tobulėti'
                    },
                    {
                        value: '1 - blogiau negali būti :)'
                    }
                ],
                triggered: false,
                result: null
            }
        ];


        var clearResult = function() {
            for (var i = 0, l = questions.length; i < l; i++) {
                questions[i].result = null;
                questions[i].triggered = false;
            }
        };


        var countQuestions = function() {
            return questions.length;
        };


        var getNextIndex = function(question, index) {
            if (question.result === null) {
                return index;
            }

            var answer = question.answers[question.result],
                nextIndex = typeof answer.goTo === 'undefined' ? index + 1 : answer.goTo;

            return nextIndex;
        };


        var getResult = function() {
            var data = [];

            for (var i = 0, l = questions.length; i < l; i++) {
                if (questions[i].triggered) {
                    data.push(questions[i]);
                }
            }

            return data;
        };


        var getQuestion = function(index) {
            return questions[index];
        };


        var isNextQuestionExist = function(question, index) {
            return getQuestion(getNextIndex(question, index)) ? true : false;
        };


        return {
            clearResult: clearResult,
            countQuestions: countQuestions,
            isNextQuestionExist: isNextQuestionExist,
            getNextIndex: getNextIndex,
            getResult: getResult,
            getQuestion: getQuestion
        };
    };


    questionsFactory.$inject = [];
    angular.module('app').factory('questionsFactory', questionsFactory);
})();