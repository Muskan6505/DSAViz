import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import { CodeEditor } from "../components";
import Login from "../components/Login"; // 👈 make sure this path is correct
import {
  Play,
  RotateCcw,
  FileCode,
  Terminal,
} from "lucide-react";
import { CodeExecutor } from "../utils/Coderunner";

const languages = ["C", "C++", "Java", "Python", "JavaScript"];

const defaultCodes = {
  "C++": `#include<iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,

  "C": `#include<stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,

  "Java": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,

  "Python": `print("Hello, Python!")`,

  "JavaScript": `console.log("Hello, JavaScript!");`,
};

export default function Playground() {
  const user = useSelector((state) => state.user.user);
  const [selectedLang, setSelectedLang] = useState("JavaScript");
  const [code, setCode] = useState(defaultCodes["JavaScript"]);
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("Editor");
  const [showLogin, setShowLogin] = useState(false); 

  const getLanguageId = () => {
    switch (selectedLang) {
      case "C++": return "cpp";
      case "C": return "c";
      case "Python": return "python";
      case "Java": return "java";
      default: return "javascript";
    }
  };

  const handleRun = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setOutput("⏳ Running...");
    setActiveTab("Output");

    if (selectedLang === "JavaScript") {
      const result = await CodeExecutor.executeJavaScript(code);
      setOutput(result.output || result.error);
    } else {
      const language = getLanguageId(selectedLang);
      try {
        const res = await axios.post(
          "/api/v1/code/execute",
          { code, language },
          { withCredentials: true }
        );
        const data = res.data;
        if (data.status === "success") {
          setOutput(`✅ Output:\n${data.output}\n⏱️ Time: ${data.executionTime}ms`);
        } else {
          setOutput(`❌ Error:\n${data.error}`);
        }
      } catch (err) {
        setOutput("🚨 Backend error: " + err.message);
      }
    }
  };

  const handleReset = () => {
    setCode(defaultCodes[selectedLang]);
    setOutput("");
    setActiveTab("Editor");
  };

  const handleLangChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    setCode(defaultCodes[lang]);
    setOutput("");
    setActiveTab("Editor");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white flex flex-col px-8 pt-30">
        <div>
          <h1 className="text-5xl font-bold text-left">
            Code{" "}
            <span className="bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Playground
            </span>
          </h1>
          <p className="text-left text-xl text-gray-400 pt-2">
            Write, run, and test your code with our interactive editor
          </p>
        </div>

        <div className="flex py-10 gap-8">
          {/* Left Panel */}
          <div className="w-1/4 p-6 bg-black/10 border border-gray-500 rounded-2xl flex flex-col gap-40 shadow-[0_0_5px] shadow-gray-400">
            <div>
              <h2 className="text-sm text-gray-400 mb-1">Language</h2>
              <select
                value={selectedLang}
                onChange={handleLangChange}
                className="w-full bg-black/90 text-white px-4 py-2 rounded-xl border border-[#636262] cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={handleRun}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition text-white py-2 rounded-xl cursor-pointer"
              >
                <Play size={18} />
                Run Code
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 border border-gray-600 hover:bg-[#1a1a1a] transition py-2 rounded-xl cursor-pointer"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-3/4 flex flex-col bg-[#0b0b0b] border border-gray-500 rounded-2xl shadow-[0_0_5px] shadow-gray-400">
            <div className="flex p-2 bg-black/90 rounded-t-2xl gap-4 border-b border-gray-800">
              <button
                onClick={() => setActiveTab("Editor")}
                className={`flex items-center justify-center gap-2 flex-1 py-2 text-sm rounded-xl transition font-medium cursor-pointer ${
                  activeTab === "Editor"
                    ? "bg-black border border-gray-600 text-white"
                    : "bg-[#1a1a1a] text-gray-400"
                }`}
              >
                <FileCode size={16} /> Editor
              </button>
              <button
                onClick={() => setActiveTab("Output")}
                className={`flex items-center justify-center gap-2 flex-1 py-2 text-sm rounded-xl transition font-medium cursor-pointer ${
                  activeTab === "Output"
                    ? "bg-black border border-gray-600 text-white"
                    : "bg-[#1a1a1a] text-gray-400"
                }`}
              >
                <Terminal size={16} /> Output
              </button>
            </div>

            {/* Editor / Output Panel */}
            <div className="h-[70vh] rounded-b-2xl overflow-hidden">
              {activeTab === "Editor" ? (
                <CodeEditor
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  language={getLanguageId()}
                  height="100%"
                />
              ) : (
                <div className="p-4 bg-black text-green-400 text-sm whitespace-pre-wrap h-full overflow-auto rounded-b-2xl">
                  {output ? (
                    <pre>{output}</pre>
                  ) : (
                    <span className="text-gray-500">Output will appear here...</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}
