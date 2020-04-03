/**
 * @jest-environment node
 */
import { FibUtil } from "./fib-util";

describe('FibUtil', () => {

    it('should return X given Y', () => {
        expect(true).toEqual(true);
    });

    describe('getPredefinedAnswers(question)', () => {

        it('should return Hi and Yo given Hi and Yo are wrapped in fib token', () => {
            const given = 'FIBHiFIB\n What\n FIBYoFIB';
            const expected = ['Hi', 'Yo'];
            const actual = FibUtil.getPredefinedAnswers(given);
            expect(actual).toEqual(expected);
        });

        it('should return in correct order given same input in reverse', () => {
            const given = 'FIBYoFIB\n What\n FIBHiFIB'; 
            const expected = ['Yo', 'Hi'];
            const actual = FibUtil.getPredefinedAnswers(given);
            expect(actual).toEqual(expected);
        });

        it('should return empty array given fib tokens not found', () => {
            const given = 'Yo\n What\n Hi';
            const expected = [];
            const actual = FibUtil.getPredefinedAnswers(given);
            expect(actual).toEqual(expected);
        });

    });

    describe('compareAnswers(definedAnswers, givenAnswers)', () => {

        it('should return ["correct", "correct", "incorrect"] given the first two answers match', () => {
            const expected = ["correct", "correct", "incorrect"];
            const givenDefinedAnswer = ["one", "two", "three"];
            const givenAnswer = ["one", "two", "thr"];
            const actual = FibUtil.compareAnswers(givenDefinedAnswer, givenAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return ["incorrect", "correct", "correct"] given reverse order of the previous test', () => {
            const expected = ["incorrect", "correct", "correct"];
            const givenDefinedAnswer = ["three", "two", "one"];
            const givenAnswer = ["thr", "two", "one"];
            const actual = FibUtil.compareAnswers(givenDefinedAnswer, givenAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return [] given the sizes of answers do not match, this should never happen', () => {
            const expected = [];
            const givenDefinedAnswer = ["one", "two", "three"];
            const givenAnswer = ["one", "two", "thr", "what"];
            const actual = FibUtil.compareAnswers(givenDefinedAnswer, givenAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return [] given either array is null or undefined', () => {
            const expected = [];
            const givenDefinedAnswer = null;
            const givenAnswer = undefined;
            const actual = FibUtil.compareAnswers(givenDefinedAnswer, givenAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return [] given both arrays are empty', () => {
            const expected = [];
            const givenDefinedAnswer = [];
            const givenAnswer = [];
            const actual = FibUtil.compareAnswers(givenDefinedAnswer, givenAnswer);
            expect(actual).toEqual(expected);
        });

    });

});