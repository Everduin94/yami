
import { FibUtil } from "./fib-util";

function updateStub(init, updates) {
    return {
        ...init,
        ...updates
    }
}

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
            const givenClientAnswer = {
                "fib-0": "one",
                "fib-1": "two",
                "fib-2": "three"
            };
            const givenDbAnswer = {
                fib: ["one", "two", "thr"]
            };
            const actual = FibUtil.compareAnswers(givenClientAnswer, givenDbAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return ["incorrect", "correct", "correct"] given reverse order', () => {
            const expected = ["incorrect", "correct", "correct"];
            const givenClientAnswer = {
                "fib-0": "three",
                "fib-1": "two",
                "fib-2": "one"
            };
            const givenDbAnswer = {
                fib: ["one", "two", "thr"].reverse()
            };
            const actual = FibUtil.compareAnswers(givenClientAnswer, givenDbAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return incorrect for missing answers', () => {
            const expected = ["correct","correct","incorrect","incorrect",];
            const givenClientAnswer = {
                "fib-0": "one",
                "fib-1": "two",
                "fib-2": "three"
            };
            const givenDbAnswer = {
                fib: ["one", "two", "thr", "what"]
            };
            const actual = FibUtil.compareAnswers(givenClientAnswer, givenDbAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return [] given either array is null or undefined', () => {
            const expected = [];
            const givenClientAnswer = null;
            const givenDbAnswer = undefined;
            const actual = FibUtil.compareAnswers(givenClientAnswer, givenDbAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return [] given both arrays are empty', () => {
            const expected = [];
            const givenClientAnswer = {};
            const givenDbAnswer = [];
            const actual = FibUtil.compareAnswers(givenClientAnswer, givenDbAnswer);
            expect(actual).toEqual(expected);
        });

        it('should return all correct given db [" one ", " two "] and client ["one", "two"]', () => {
            const expected = ["correct", "correct"];
            const givenClientAnswer = {
                "fib-0": "one",
                "fib-1": "two",
            };
            const givenDbAnswer = {
                fib: [" one ", " two "]
            };
            const actual = FibUtil.compareAnswers(givenClientAnswer, givenDbAnswer);
            expect(actual).toEqual(expected);
        });

    });

});