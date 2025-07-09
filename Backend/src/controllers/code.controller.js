import { asyncHandler } from "../utils/AsyncHandler.js";
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from "uuid";
import { exec } from "child_process";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CodeExecutor = asyncHandler(async (req, res) => {
    const { code, language } = req.body;
    const id = uuid();

    if (!code || !language) {
        return res.status(400).json({ status: "error", error: "Missing code or language" });
    }

    const start = Date.now();
    const tempDir = path.join(__dirname, '../../public/temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    let filePath, execFilePath;

    // ----------- PYTHON -------------
    if (language === "python") {
        filePath = path.join(tempDir, `${id}.py`);
        fs.writeFileSync(filePath, code);
        const command = `python "${filePath}"`;
        exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
            fs.unlinkSync(filePath);
            const execTime = Date.now() - start;
            if (err) return res.json({ status: "error", error: stderr || err.message, executionTime: execTime });
            res.json({ status: "success", output: stdout, executionTime: execTime });
        });
    }

    // ----------- C++ -------------
    else if (language === "cpp") {
        filePath = path.join(tempDir, `${id}.cpp`);
        execFilePath = path.join(tempDir, `${id}.exe`);
        fs.writeFileSync(filePath, code);
        const compile = `g++ "${filePath}" -o "${execFilePath}"`;
        exec(compile, { timeout: 5000 }, (err, _, compileStderr) => {
            if (err) {
                fs.unlinkSync(filePath);
                return res.json({ status: "error", error: compileStderr || err.message });
            }
            exec(`"${execFilePath}"`, { timeout: 5000 }, (runErr, stdout, stderr) => {
                fs.unlinkSync(filePath);
                if (fs.existsSync(execFilePath)) fs.unlinkSync(execFilePath);
                const execTime = Date.now() - start;
                if (runErr) return res.json({ status: "error", error: stderr || runErr.message, executionTime: execTime });
                res.json({ status: "success", output: stdout, executionTime: execTime });
            });
        });
    }

    // ----------- C -------------
    else if (language === "c") {
        filePath = path.join(tempDir, `${id}.c`);
        execFilePath = path.join(tempDir, `${id}.exe`);
        fs.writeFileSync(filePath, code);
        const compile = `gcc "${filePath}" -o "${execFilePath}"`;
        exec(compile, { timeout: 5000 }, (err, _, compileStderr) => {
            if (err) {
                fs.unlinkSync(filePath);
                return res.json({ status: "error", error: compileStderr || err.message });
            }
            exec(`"${execFilePath}"`, { timeout: 5000 }, (runErr, stdout, stderr) => {
                fs.unlinkSync(filePath);
                if (fs.existsSync(execFilePath)) fs.unlinkSync(execFilePath);
                const execTime = Date.now() - start;
                if (runErr) return res.json({ status: "error", error: stderr || runErr.message, executionTime: execTime });
                res.json({ status: "success", output: stdout, executionTime: execTime });
            });
        });
    }

    // ----------- Java -------------
    else if (language === "java") {
        const className = `Main_${id.replace(/-/g, '')}`;
        filePath = path.join(tempDir, `${className}.java`);
        fs.writeFileSync(filePath, code.replace(/public\s+class\s+\w+/, `public class ${className}`));
        const compile = `javac "${filePath}"`;
        const execRun = `java -cp "${tempDir}" ${className}`;
        exec(compile, { timeout: 5000 }, (err, _, compileStderr) => {
            if (err) {
                fs.unlinkSync(filePath);
                return res.json({ status: "error", error: compileStderr || err.message });
            }
            exec(execRun, { timeout: 5000 }, (runErr, stdout, stderr) => {
                fs.unlinkSync(filePath);
                const classFile = path.join(tempDir, `${className}.class`);
                if (fs.existsSync(classFile)) fs.unlinkSync(classFile);
                const execTime = Date.now() - start;
                if (runErr) return res.json({ status: "error", error: stderr || runErr.message, executionTime: execTime });
                res.json({ status: "success", output: stdout, executionTime: execTime });
            });
        });
    }

    else {
        return res.status(400).json({ status: "error", error: "Unsupported language" });
    }
});

export { CodeExecutor };