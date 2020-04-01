export class FibUtil {

    public static getPredefinedAnswers(myInput): string[] {
        let match;
        let results = [];
        let re = new RegExp(/FIB(.*?)FIB/g); // TODO: Global static this regex
        while(match = re.exec(myInput)) {
            results.push(match[1]);
        }

        return results;
    }

    public static compareAnswers(definedAnswers: any[], givenAnswers: any[]): string[] {
        if (!definedAnswers || !givenAnswers) return [];
        if (definedAnswers.length !== givenAnswers.length) return [];        
        return definedAnswers.map((da, i) => da === givenAnswers[i] ? "correct" : "incorrect");
    }



}