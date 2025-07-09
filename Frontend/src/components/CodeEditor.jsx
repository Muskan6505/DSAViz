import { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const CodeEditor = ({
    value,
    language,
    onChange,
    theme = "dsa-dark",
    height = "400px",
}) => {
    const [loading, setLoading] = useState(true);
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
        monaco.editor.defineTheme("dsa-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [
            { token: "comment", foreground: "6A7681", fontStyle: "italic" },
            { token: "keyword", foreground: "3B82F6" },
            { token: "string", foreground: "21C55D" },
            { token: "number", foreground: "F59E0B" },
            { token: "type", foreground: "A855F7" },
            { token: "function", foreground: "06B6D4" },
            ],
            colors: {
            "editor.background": "#09090B",
            "editor.foreground": "#FAFAFA",
            "editor.lineHighlightBackground": "#1C1C1E",
            "editor.selectionBackground": "#3B82F630",
            "editorCursor.foreground": "#3B82F6",
            "editorLineNumber.foreground": "#6B7280",
            "editorLineNumber.activeForeground": "#FAFAFA",
            },
        });
        setLoading(false);
        }
    }, [monaco]);

    if (loading) {
        return (
        <div
            style={{ height }}
            className="border border-border rounded-lg flex items-center justify-center text-gray-400"
        >
            Loading Editor...
        </div>
        );
    }
    return (
        <div style={{ height }} className="rounded-lg overflow-hidden">
        <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            theme={theme}
            value={value}
            onChange={(val) => onChange(val || "")}
            options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            folding: true,
            lineNumbersMinChars: 3,
            scrollbar: {
                vertical: "auto",
                horizontal: "auto",
            },
            wordWrap: "on",
            }}
        />
        </div>
    );
};

export default CodeEditor;
