import React, { useState } from "react";

export default function Playground() {
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");

  const runCode = () => {
    // Mock execution (e.g., just echoes code for now)
    setOutput(`You entered:\n${code}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Playground</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Code Editor */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Editor</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-3 text-sm font-mono bg-gray-50 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={runCode}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Run Code
          </button>
        </div>

        {/* Output */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Output</h2>
          <pre className="w-full h-64 p-3 text-sm font-mono bg-gray-50 border border-gray-300 rounded-md overflow-auto">
            {output || "// Output will appear here..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
