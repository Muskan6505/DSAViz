import React, { useState, useEffect, useCallback } from "react";
import {
    Badge,
    Slider, 
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../index.js";
import {
    ChevronLeft,
    Play,
    Pause,
    RotateCcw,
    Plus,
    Search,
    Trash2,
    Shuffle,
} from "lucide-react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const TreeVisualizer = ({onBack}) => {
    const [tree, setTree] = useState(null);
    const [operation, setOperation] = useState("insert");
    const [inputValue, setInputValue] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState([500]);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [foundNode, setFoundNode] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const operations = {
        insert: "Insert",
        search: "Search",
        delete: "Delete",
    };

    // Tree Node class
    class TreeNode {
        constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
        }
    }

    // Insert node into BST
    const insertNode = (root, value, steps = [], path = []) => {
        if (!root) {
        const newNode = new TreeNode(value);
        steps.push({
            tree: cloneTree(root),
            newNode: newNode,
            path: [...path],
            type: "insert",
            message: `Inserting ${value} at new position`,
        });
        return newNode;
        }

        steps.push({
        tree: cloneTree(root),
        current: root,
        path: [...path, root],
        type: "compare",
        message: `Comparing ${value} with ${root.value}`,
        });

        if (value < root.value) {
        steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "go_left",
            message: `${value} < ${root.value}, going left`,
        });
        root.left = insertNode(root.left, value, steps, [...path, root]);
        } else if (value > root.value) {
        steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "go_right",
            message: `${value} > ${root.value}, going right`,
        });
        root.right = insertNode(root.right, value, steps, [...path, root]);
        } else {
        steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "duplicate",
            message: `${value} already exists in the tree`,
        });
        }

        return root;
    };

    // Search for a value in BST
    const searchNode = (root, value, steps = [], path = []) => {
        if (!root) {
        steps.push({
            tree: cloneTree(tree),
            current: null,
            path: [...path],
            type: "not_found",
            message: `${value} not found in the tree`,
        });
        return null;
        }

        steps.push({
        tree: cloneTree(tree),
        current: root,
        path: [...path, root],
        type: "compare",
        message: `Comparing ${value} with ${root.value}`,
        });

        if (value === root.value) {
        steps.push({
            tree: cloneTree(tree),
            current: root,
            path: [...path, root],
            type: "found",
            message: `Found ${value}!`,
        });
        return root;
        } else if (value < root.value) {
        steps.push({
            tree: cloneTree(tree),
            current: root,
            path: [...path, root],
            type: "go_left",
            message: `${value} < ${root.value}, searching left`,
        });
        return searchNode(root.left, value, steps, [...path, root]);
        } else {
        steps.push({
            tree: cloneTree(tree),
            current: root,
            path: [...path, root],
            type: "go_right",
            message: `${value} > ${root.value}, searching right`,
        });
        return searchNode(root.right, value, steps, [...path, root]);
        }
    };

    // Delete node from BST
    const deleteNode = (root, value, steps = [], path = []) => {
        if (!root) {
        steps.push({
            tree: cloneTree(tree),
            current: null,
            path: [...path],
            type: "not_found",
            message: `${value} not found, cannot delete`,
        });
        return null;
        }

        steps.push({
        tree: cloneTree(root),
        current: root,
        path: [...path, root],
        type: "compare",
        message: `Comparing ${value} with ${root.value}`,
        });

        if (value < root.value) {
        steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "go_left",
            message: `${value} < ${root.value}, searching left`,
        });
        root.left = deleteNode(root.left, value, steps, [...path, root]);
        } else if (value > root.value) {
        steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "go_right",
            message: `${value} > ${root.value}, searching right`,
        });
        root.right = deleteNode(root.right, value, steps, [...path, root]);
        } else {
        steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "delete_found",
            message: `Found ${value}, preparing to delete`,
        });

        // Node to be deleted found
        if (!root.left && !root.right) {
            // Leaf node
            steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "delete_leaf",
            message: `Deleting leaf node ${value}`,
            });
            return null;
        } else if (!root.left) {
            // Only right child
            steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "delete_right_only",
            message: `Replacing ${value} with right child`,
            });
            return root.right;
        } else if (!root.right) {
            // Only left child
            steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "delete_left_only",
            message: `Replacing ${value} with left child`,
            });
            return root.left;
        } else {
            // Two children - find inorder successor
            const successor = findMin(root.right);
            steps.push({
            tree: cloneTree(root),
            current: root,
            successor: successor,
            path: [...path, root],
            type: "find_successor",
            message: `Finding inorder successor: ${successor.value}`,
            });

            root.value = successor.value;
            steps.push({
            tree: cloneTree(root),
            current: root,
            path: [...path, root],
            type: "replace_value",
            message: `Replacing ${value} with successor ${successor.value}`,
            });

            root.right = deleteNode(root.right, successor.value, steps, [
            ...path,
            root,
            ]);
        }
        }

        return root;
    };

    // Find minimum value node
    const findMin = (node) => {
        while (node.left) {
        node = node.left;
        }
        return node;
    };

    // Clone tree for visualization
    const cloneTree = (node) => {
        if (!node) return null;
        const cloned = new TreeNode(node.value);
        cloned.left = cloneTree(node.left);
        cloned.right = cloneTree(node.right);
        return cloned;
    };

    // Calculate node positions
    const calculatePositions = (node, x = 300, y = 50, level = 0) => {
        if (!node) return;

        node.x = x;
        node.y = y;

        const spacing = 150 / (level + 1);
        if (node.left) {
        calculatePositions(node.left, x - spacing, y + 80, level + 1);
        }
        if (node.right) {
        calculatePositions(node.right, x + spacing, y + 80, level + 1);
        }
    };

    // Generate sample tree
    const generateSampleTree = () => {
        const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
        let newTree = null;

        values.forEach((value) => {
        if (!newTree) {
            newTree = new TreeNode(value);
        } else {
            insertNodeSync(newTree, value);
        }
        });

        setTree(newTree);
        setSteps([]);
        setCurrentStep(0);
        setIsCompleted(false);
        setFoundNode(null);
        setIsPlaying(false);
    };

    // Synchronous insert for sample generation
    const insertNodeSync = (root, value) => {
        if (value < root.value) {
        if (!root.left) {
            root.left = new TreeNode(value);
        } else {
            insertNodeSync(root.left, value);
        }
        } else if (value > root.value) {
        if (!root.right) {
            root.right = new TreeNode(value);
        } else {
            insertNodeSync(root.right, value);
        }
        }
    };

    // Execute operation
    const executeOperation = () => {
        if (!inputValue.trim()) return;

        const value = parseInt(inputValue);
        if (isNaN(value)) return;

        let operationSteps = [];
        let newTree = cloneTree(tree);

        switch (operation) {
        case "insert":
            if (!newTree) {
            newTree = new TreeNode(value);
            operationSteps = [
                {
                tree: cloneTree(newTree),
                newNode: newTree,
                type: "insert_root",
                message: `Inserted ${value} as root`,
                },
            ];
            } else {
            newTree = insertNode(newTree, value, operationSteps);
            }
            setTree(newTree);
            break;
        case "search":
            if (newTree) {
            setSearchValue(value);
            const found = searchNode(newTree, value, operationSteps);
            setFoundNode(found);
            }
            break;
        case "delete":
            if (newTree) {
            newTree = deleteNode(newTree, value, operationSteps);
            setTree(newTree);
            }
            break;
        }

        setSteps(operationSteps);
        setCurrentStep(0);
        setIsPlaying(true);
        setIsCompleted(false);
        setInputValue("");
    };

    // Control functions
    const pause = () => setIsPlaying(false);
    const resume = () => setIsPlaying(true);
    const reset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setIsCompleted(false);
        setFoundNode(null);
        setSearchValue(null);
    };

    // Animation loop
    useEffect(() => {
        if (isPlaying && steps.length > 0 && currentStep < steps.length) {
        const timer = setTimeout(() => {
            if (currentStep === steps.length - 1) {
            setIsPlaying(false);
            setIsCompleted(true);
            } else {
            setCurrentStep(currentStep + 1);
            }
        }, 1100 - speed[0]);

        return () => clearTimeout(timer);
        }
    }, [isPlaying, currentStep, steps, speed]);

    // Update positions when tree changes
    useEffect(() => {
        if (tree) {
        calculatePositions(tree);
        }
    }, [tree]);

    // Get current state
    const getCurrentState = () => {
        if (steps.length === 0) {
        return {
            tree,
            current: null,
            path: [],
            message: "Ready for operations",
        };
        }
        const step = steps[currentStep] || steps[0];
        return {
        ...step,
        tree: step.tree || tree,
        };
    };

    const state = getCurrentState();

    // Get node color
    const getNodeColor = (node) => {
        if (state.newNode && node.value === state.newNode.value && state.type === "insert") {
            return "fill-lime-400";
        }
        if (state.current && node.value === state.current.value) {
            return "fill-yellow-400";
        }
        if (state.path?.some((pathNode) => pathNode.value === node.value)) {
            return "fill-sky-400";
        }
        if (foundNode && node.value === foundNode.value) {
            return "fill-emerald-400";
        }
        return "fill-white";
    };


  // Render tree nodes recursively

    const renderTree = (node) => {
        if (!node) return null;

        return (
            <g key={`${node.value}-${node.x}-${node.y}`}>
                {/* Edges to children */}
                {node.left && (
                    <line
                        x1={node.x}
                        y1={node.y}
                        x2={node.left.x}
                        y2={node.left.y}
                        className="stroke-muted-foreground stroke-2"
                    />
                )}
                {node.right && (
                    <line
                        x1={node.x}
                        y1={node.y}
                        x2={node.right.x}
                        y2={node.right.y}
                        className="stroke-muted-foreground stroke-2"
                    />
                )}

                {/* Node circle */}
                <circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    className={`${getNodeColor(node)} stroke-foreground stroke-2`}
                />

                {/* Node value */}
                <text
                    x={node.x}
                    y={node.y}
                    className="fill-foreground text-sm font-bold"
                    textAnchor="middle"
                    dy="4"
                >
                    {node.value}
                </text>

                {/* Recursively render children */}
                {node.left && renderTree(node.left)}
                {node.right && renderTree(node.right)}
            </g>
        );
    };

    return (
        <>
        <Navbar/>
        <div className="space-y-6 bg-gradient-to-br from-black via-indigo-950 to-pink-900 pt-30 px-8 text-white">
        {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col md:flex-row items-center md:justify-between w-full gap-3">
                    
                    <div className="flex items-center space-x-4">
                        <Link to='/visualizers'>
                        <Button variant="ghost" size="icon" onClick={onBack}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold">{operations[operation]}</h2>
                            <p className="text-muted-foreground">
                            Interactive Binary Search operation visualization
                            </p>
                        </div>
                    </div>
                
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline">{operations[operation]}</Badge>
                        {isCompleted && (
                            <Badge className="bg-green-500">Operation Completed!
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

        {/* Controls */}
        <Card>
            <CardHeader>
            <CardTitle className="text-lg">Controls</CardTitle>
            <CardDescription>
                Perform BST operations and control the visualization
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="space-y-2">
                <label className="text-sm font-medium">Operation</label>
                <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="insert">Insert</SelectItem>
                    <SelectItem value="search">Search</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium">Value</label>
                <div className="flex space-x-2">
                    <input
                        type="number"
                        placeholder="Enter value"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && executeOperation()}
                        className="w-full bg-black border border-gray-600 text-white rounded p-2 py-1.5 mt-2"
                    />
                    <Button
                    size="icon"
                    onClick={executeOperation}
                    disabled={!inputValue.trim() || isPlaying}
                    >
                    {operation === "insert" && <Plus className="w-4 h-4" />}
                    {operation === "search" && <Search className="w-4 h-4" />}
                    {operation === "delete" && <Trash2 className="w-4 h-4" />}
                    </Button>
                </div>
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium">Speed: {speed[0]}ms</label>
                <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={100}
                    max={1000}
                    step={50}
                />
                </div>
            </div>

            <div className="flex items-center flex-col md:flex-row justify-center space-x-2 gap-2">
                <Button
                variant="outline"
                onClick={generateSampleTree}
                disabled={isPlaying}
                >
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Sample Tree
                </Button>

                {!isPlaying ? (
                <Button onClick={resume} disabled={steps.length === 0}>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                </Button>
                ) : (
                <Button onClick={pause}>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                </Button>
                )}

                <Button variant="outline" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
                </Button>

                <Button
                variant="outline"
                onClick={() => {
                    setTree(null);
                    setSteps([]);
                    setCurrentStep(0);
                    setFoundNode(null);
                    setSearchValue(null);
                }}
                disabled={isPlaying}
                >
                Clear Tree
                </Button>
            </div>
            </CardContent>
        </Card>

        {/* Visualization */}
        <Card>
            <CardHeader>
            <CardTitle className="text-lg">Binary Search Tree</CardTitle>
            <CardDescription>
                Visual representation of the BST structure
            </CardDescription>
            </CardHeader>
            <CardContent>
            {state.tree ? (
                <div className="bg-muted/30 rounded-lg p-4 h-96 overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 600 350">
                    {renderTree(state.tree)}
                </svg>
                </div>
            ) : (
                <div className="bg-muted/30 rounded-lg p-4 h-96 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Tree is empty</p>
                    <Button onClick={generateSampleTree}>
                    Generate Sample Tree
                    </Button>
                </div>
                </div>
            )}

            {/* Status */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{state.message}</p>
            </div>

            {/* Legend */}
            <div className="flex items-center flex-wrap justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white rounded-full border border-gray-400"></div>
                    <span>Normal</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <span>Current</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-sky-400 rounded-full"></div>
                    <span>Path</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-lime-400 rounded-full"></div>
                    <span>Inserted</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                    <span>Search Result</span>
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
        </>
    );
};

export default TreeVisualizer;
