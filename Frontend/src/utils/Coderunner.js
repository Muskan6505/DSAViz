export class CodeExecutor {
    // Mock JavaScript execution (client-side)
    static async executeJavaScript(code) {
        try {
        const startTime = performance.now();

        // Capture console output
        const output = [];
        const originalLog = console.log;
        const originalError = console.error;

        console.log = (...args) => {
            output.push(args.map((arg) => String(arg)).join(" "));
        };

        console.error = (...args) => {
            output.push("Error: " + args.map((arg) => String(arg)).join(" "));
        };

        try {
            // Execute code inside an isolated function
            const func = new Function(code);
            const result = func();

            if (result !== undefined) {
            output.push(String(result));
            }
        } catch (error) {
            console.error = originalError;
            console.log = originalLog;

            return {
            output: output.join("\n"),
            error: error.message,
            executionTime: performance.now() - startTime,
            status: "error",
            };
        }

        console.error = originalError;
        console.log = originalLog;

        return {
            output: output.join("\n") || "(no output)",
            executionTime: performance.now() - startTime,
            status: "success",
        };
        } catch (error) {
        return {
            output: "",
            error: error.message,
            status: "error",
        };
        }
    }
}
