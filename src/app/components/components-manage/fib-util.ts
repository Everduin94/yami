export class FibUtil {

    public static getPredefinedAnswers(myInput): string[] {
        let match;
        let results = [];
        let re = new RegExp(/FIB(.*?)FIB/g); // TODO: Global static this regex
        while (match = re.exec(myInput)) {
            results.push(match[1]);
        }

        return results;
    }

    public static compareAnswers(contentFromClient: any, contentFromDb: any): string[] {
        if (!contentFromClient || !contentFromDb || !contentFromDb.fib) return [];
        return contentFromDb.fib.map((dbAnswer, i) => this.trimCompare(contentFromClient['fib-' + i], dbAnswer) ? "correct" : "incorrect");
    }

    private static trimCompare(client, db): boolean {
        if (!client || !db) return client === db;
        return client.trim() === db.trim();
    }
}