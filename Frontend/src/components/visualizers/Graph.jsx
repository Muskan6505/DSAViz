import React, { useState, useEffect, useCallback } from "react";
import {
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
    Button, 
    Slider,
    Badge,
    Navbar
} from '../index.js';
import {
    ChevronLeft,
    Play,
    Pause,
    RotateCcw,
    Shuffle,
    SkipForward,
    SkipBack,
    Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const GraphVisualizer = ({ onBack }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [algorithm, setAlgorithm] = useState("bfs");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState([300]);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [startNode, setStartNode] = useState(0);
    const [endNode, setEndNode] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [pathFound, setPathFound] = useState(false);

    const algorithms = {
        bfs: "Breadth-First Search",
        dfs: "Depth-First Search",
        dijkstra: "Dijkstra's Algorithm",
    };

    // Generate random graph
    const generateGraph = useCallback(() => {
        const nodeCount = 12;
        const newNodes = [];
        const newEdges = [];

        // Create nodes in a grid-like pattern
        const cols = 4;
        const rows = 3;
        for (let i = 0; i < nodeCount; i++) {
        const x = (i % cols) * 150 + 100;
        const y = Math.floor(i / cols) * 150 + 100;
        newNodes.push({
            id: i,
            x,
            y,
            visited: false,
            distance: Infinity,
            previous: null,
        });
        }

        // Create random edges
        const edgeCount = Math.floor(Math.random() * 8) + 12;
        const usedEdges = new Set();

        for (let i = 0; i < edgeCount; i++) {
        let from, to;
        do {
            from = Math.floor(Math.random() * nodeCount);
            to = Math.floor(Math.random() * nodeCount);
        } while (
            from === to ||
            usedEdges.has(`${from}-${to}`) ||
            usedEdges.has(`${to}-${from}`)
        );

        usedEdges.add(`${from}-${to}`);
        const weight = Math.floor(Math.random() * 10) + 1;
        newEdges.push({ from, to, weight, highlighted: false });
        }

        setNodes(newNodes);
        setEdges(newEdges);
        setCurrentStep(0);
        setSteps([]);
        setIsCompleted(false);
        setPathFound(false);
        setIsPlaying(false);
        setIsPaused(false);
        setEndNode(nodeCount - 1);
    }, []);

    // Initialize graph on mount
    useEffect(() => {
        generateGraph();
    }, [generateGraph]);

    // BFS Algorithm
    const bfsTraversal = () => {
        const steps = [];
        const visited = new Set();
        const queue = [startNode];
        const parent = {};

        steps.push({
        queue: [...queue],
        visited: new Set(),
        current: null,
        type: "start",
        message: "Starting BFS from node " + startNode,
        });

        while (queue.length > 0) {
        const current = queue.shift();

        if (visited.has(current)) continue;

        visited.add(current);
        steps.push({
            queue: [...queue],
            visited: new Set(visited),
            current,
            type: "visit",
            message: `Visiting node ${current}`,
        });

        if (current === endNode) {
            // Reconstruct path
            const path = [];
            let node = endNode;
            while (node !== undefined) {
            path.unshift(node);
            node = parent[node];
            }
            steps.push({
            queue: [...queue],
            visited: new Set(visited),
            current,
            path,
            type: "found",
            message: `Path found: ${path.join(" → ")}`,
            });
            break;
        }

        // Get neighbors
        const neighbors = edges
            .filter((edge) => edge.from === current || edge.to === current)
            .map((edge) => (edge.from === current ? edge.to : edge.from))
            .filter((neighbor) => !visited.has(neighbor));

        for (const neighbor of neighbors) {
            if (!queue.includes(neighbor)) {
            queue.push(neighbor);
            parent[neighbor] = current;
            steps.push({
                queue: [...queue],
                visited: new Set(visited),
                current,
                neighbor,
                type: "discover",
                message: `Discovered node ${neighbor} from node ${current}`,
            });
            }
        }
        }

        if (!visited.has(endNode)) {
        steps.push({
            queue: [],
            visited: new Set(visited),
            current: null,
            type: "not_found",
            message: "Path not found",
        });
        }

        return steps;
    };

    // DFS Algorithm
    const dfsTraversal = () => {
        const steps = [];
        const visited = new Set();
        const stack = [startNode];
        const parent = {};

        steps.push({
        stack: [...stack],
        visited: new Set(),
        current: null,
        type: "start",
        message: "Starting DFS from node " + startNode,
        });

        while (stack.length > 0) {
        const current = stack.pop();

        if (visited.has(current)) continue;

        visited.add(current);
        steps.push({
            stack: [...stack],
            visited: new Set(visited),
            current,
            type: "visit",
            message: `Visiting node ${current}`,
        });

        if (current === endNode) {
            // Reconstruct path
            const path = [];
            let node = endNode;
            while (node !== undefined) {
            path.unshift(node);
            node = parent[node];
            }
            steps.push({
            stack: [...stack],
            visited: new Set(visited),
            current,
            path,
            type: "found",
            message: `Path found: ${path.join(" → ")}`,
            });
            break;
        }

        // Get neighbors (reverse order for DFS)
        const neighbors = edges
            .filter((edge) => edge.from === current || edge.to === current)
            .map((edge) => (edge.from === current ? edge.to : edge.from))
            .filter((neighbor) => !visited.has(neighbor))
            .reverse();

        for (const neighbor of neighbors) {
            if (!stack.includes(neighbor)) {
            stack.push(neighbor);
            parent[neighbor] = current;
            steps.push({
                stack: [...stack],
                visited: new Set(visited),
                current,
                neighbor,
                type: "discover",
                message: `Discovered node ${neighbor} from node ${current}`,
            });
            }
        }
        }

        if (!visited.has(endNode)) {
        steps.push({
            stack: [],
            visited: new Set(visited),
            current: null,
            type: "not_found",
            message: "Path not found",
        });
        }

        return steps;
    };

    // Dijkstra's Algorithm
    const dijkstraTraversal = () => {
        const steps = [];
        const distances = {};
        const previous = {};
        const unvisited = new Set();

        // Initialize
        nodes.forEach((node) => {
        distances[node.id] = node.id === startNode ? 0 : Infinity;
        previous[node.id] = null;
        unvisited.add(node.id);
        });

        steps.push({
        distances: { ...distances },
        previous: { ...previous },
        unvisited: new Set(unvisited),
        current: null,
        type: "start",
        message: "Starting Dijkstra from node " + startNode,
        });

        while (unvisited.size > 0) {
        // Find unvisited node with minimum distance
        let current = null;
        let minDistance = Infinity;
        for (const node of unvisited) {
            if (distances[node] < minDistance) {
            minDistance = distances[node];
            current = node;
            }
        }

        if (current === null || minDistance === Infinity) break;

        unvisited.delete(current);
        steps.push({
            distances: { ...distances },
            previous: { ...previous },
            unvisited: new Set(unvisited),
            current,
            type: "visit",
            message: `Visiting node ${current} with distance ${distances[current]}`,
        });

        if (current === endNode) {
            // Reconstruct path
            const path = [];
            let node = endNode;
            while (node !== null) {
            path.unshift(node);
            node = previous[node];
            }
            steps.push({
            distances: { ...distances },
            previous: { ...previous },
            unvisited: new Set(unvisited),
            current,
            path,
            type: "found",
            message: `Shortest path found: ${path.join(" → ")} (distance: ${distances[endNode]})`,
            });
            break;
        }

        // Check neighbors
        const neighborEdges = edges.filter(
            (edge) => edge.from === current || edge.to === current,
        );

        for (const edge of neighborEdges) {
            const neighbor = edge.from === current ? edge.to : edge.from;
            if (!unvisited.has(neighbor)) continue;

            const alt = distances[current] + edge.weight;
            if (alt < distances[neighbor]) {
            distances[neighbor] = alt;
            previous[neighbor] = current;
            steps.push({
                distances: { ...distances },
                previous: { ...previous },
                unvisited: new Set(unvisited),
                current,
                neighbor,
                edge,
                type: "update",
                message: `Updated distance to node ${neighbor}: ${alt}`,
            });
            }
        }
        }

        if (distances[endNode] === Infinity) {
        steps.push({
            distances: { ...distances },
            previous: { ...previous },
            unvisited: new Set(unvisited),
            current: null,
            type: "not_found",
            message: "No path found",
        });
        }

        return steps;
    };

  // Start algorithm
    const startAlgorithm = () => {
        let algorithmSteps = [];

        switch (algorithm) {
            case "bfs":
                algorithmSteps = bfsTraversal();
                break;
            case "dfs":
                algorithmSteps = dfsTraversal();
                break;
            case "dijkstra":
                algorithmSteps = dijkstraTraversal();
                break;
            default:
                algorithmSteps = bfsTraversal();
        }

        setSteps(algorithmSteps);
        setCurrentStep(0);
        setIsPlaying(true);
        setIsPaused(false);
    };

  // Control functions
    const pause = () => {
        setIsPlaying(false);
        setIsPaused(true);
    };

    const resume = () => {
        setIsPlaying(true);
        setIsPaused(false);
    };

    const reset = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentStep(0);
        setIsCompleted(false);
        setPathFound(false);
        setSteps([]);
    };

    const stepForward = () => {
        if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        }
    };

    const stepBackward = () => {
        if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        }
    };

  // Animation loop
    useEffect(() => {
        if (isPlaying && steps.length > 0 && currentStep < steps.length) {
        const timer = setTimeout(() => {
            const step = steps[currentStep];

            if (step.type === "found") {
            setPathFound(true);
            }

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

  // Get current state
    const getCurrentState = () => {
        if (steps.length === 0) {
        return {
            visited: new Set(),
            current: null,
            queue: [],
            stack: [],
            distances: {},
            path: [],
            message: "Click start to begin visualization",
        };
        }
        return steps[currentStep] || steps[0];
    };

    const state = getCurrentState();

  // Get node color
    const getNodeColor = (nodeId) => {
        if (state.path?.includes(nodeId)) return "fill-green-500";
        if (state.current === nodeId) return "fill-yellow-500";
        if (state.visited?.has(nodeId)) return "fill-blue-500";
        if (state.queue?.includes(nodeId) || state.stack?.includes(nodeId)) {
        return "fill-orange-500";
        }
        if (nodeId === startNode) return "fill-primary";
        if (nodeId === endNode) return "fill-red-500";
        return "fill-gray-400";
    };

  // Get edge color
    const getEdgeColor = (edge) => {
        if (state.path && state.path.length > 1) {
            for (let i = 0; i < state.path.length - 1; i++) {
                if (
                (edge.from === state.path[i] && edge.to === state.path[i + 1]) ||
                (edge.from === state.path[i + 1] && edge.to === state.path[i])
                ) {
                return "stroke-green-500";
                }
            }
        }
        if (state.edge === edge) return "stroke-yellow-600";
        return "stroke-white";
    };

    return (
    <>
    <Navbar/>
    <div className="space-y-10 bg-gradient-to-br from-black via-indigo-950 to-pink-900 pt-30 px-8 text-white">
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
                        <h2 className="text-2xl font-bold">{algorithms[algorithm]}</h2>
                        <p className="text-muted-foreground">
                        Interactive graph algorithm visualization
                        </p>
                    </div>
                </div>
            
                <div className="flex items-center space-x-2">
                    <Badge variant="outline">{algorithms[algorithm]}</Badge>
                    {isCompleted && (
                        <Badge className={pathFound ? "bg-green-500" : "bg-red-500"}>
                        {pathFound ? "Path Found!" : "No Path"}
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
                Configure the visualization parameters
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4">
                <div className="space-y-2">
                <label className="text-sm font-medium">Algorithm</label>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="bfs">Breadth-First Search</SelectItem>
                    <SelectItem value="dfs">Depth-First Search</SelectItem>
                    <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium">Start Node</label>
                <Select
                    value={startNode.toString()}
                    onValueChange={(value) => setStartNode(parseInt(value))}
                >
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    {nodes.map((node) => (
                        <SelectItem key={node.id} value={node.id.toString()}>
                        Node {node.id}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium">Target Node</label>
                <Select
                    value={endNode?.toString() || ""}
                    onValueChange={(value) => setEndNode(parseInt(value))}
                >
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    {nodes.map((node) => (
                        <SelectItem key={node.id} value={node.id.toString()}>
                        Node {node.id}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
            

                <div className="space-y-4">
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
            <div className="flex items-center justify-center space-x-2">
                <Button
                variant="outline"
                size="icon"
                onClick={generateGraph}
                disabled={isPlaying}
                >
                <Shuffle className="w-4 h-4" />
                </Button>

                <Button
                variant="outline"
                size="icon"
                onClick={stepBackward}
                disabled={isPlaying || currentStep === 0}
                >
                <SkipBack className="w-4 h-4" />
                </Button>

                {!isPlaying ? (
                <Button
                    onClick={isPaused ? resume : startAlgorithm}
                    disabled={isCompleted && !isPaused}
                >
                    <Play className="w-4 h-4 mr-2" />
                    {isPaused ? "Resume" : "Start"}
                </Button>
                ) : (
                <Button onClick={pause}>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                </Button>
                )}

                <Button
                variant="outline"
                size="icon"
                onClick={stepForward}
                disabled={isPlaying || currentStep === steps.length - 1}
                >
                <SkipForward className="w-4 h-4" />
                </Button>

                <Button variant="outline" size="icon" onClick={reset}>
                <RotateCcw className="w-4 h-4" />
                </Button>
            </div>
            </CardContent>
        </Card>

        {/* Visualization */}
        <Card>
            <CardHeader>
            <CardTitle className="text-lg">Visualization</CardTitle>
            <CardDescription>
                Watch the algorithm explore the graph
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="relative w-full overflow-auto bg-muted/30 rounded-lg p-4">
                <svg
                width={Math.max(...nodes.map(n => n.x)) + 150}
                height={Math.max(...nodes.map(n => n.y)) + 150}
                className="mx-auto"
                >
                {/* Edges */}
                {edges.map((edge, index) => {
                    const fromNode = nodes[edge.from];
                    const toNode = nodes[edge.to];
                    return (
                    <g key={index}>
                        <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        className={`${getEdgeColor(edge)} stroke-2`}
                        />
                        {algorithm === "dijkstra" && (
                        <text
                            x={(fromNode.x + toNode.x) / 2}
                            y={(fromNode.y + toNode.y) / 2 - 10}
                            className="fill-red-200 text-s"
                            textAnchor="middle"
                        >
                            {edge.weight}
                        </text>
                        )}
                    </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g key={node.id}>
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r="20"
                        className={`${getNodeColor(node.id)} stroke-white stroke-2`}
                    />
                    <text
                        x={node.x}
                        y={node.y + 5}
                        className="fill-white text-sm font-bold"
                        textAnchor="middle"
                    >
                        {node.id}
                    </text>
                    {algorithm === "dijkstra" && state.distances && (
                        <text
                        x={node.x}
                        y={node.y - 25}
                        className="fill-white text-xs"
                        textAnchor="middle"
                        >
                        {state.distances[node.id] === Infinity
                            ? "∞"
                            : state.distances[node.id]}
                        </text>
                    )}
                    </g>
                ))}

                {/* Labels */}
                <text
                    x={nodes[startNode]?.x}
                    y={nodes[startNode]?.y + 35}
                    className="fill-primary text-xs font-semibold"
                    textAnchor="middle"
                >
                    START
                </text>
                {endNode !== null && (
                    <text
                    x={nodes[endNode]?.x}
                    y={nodes[endNode]?.y + 35}
                    className="fill-red-500 text-xs font-semibold"
                    textAnchor="middle"
                    >
                    END
                    </text>
                )}
                </svg>
            </div>

            {/* Status */}
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                <p className="font-medium">{state.message}</p>
                {algorithm !== "dijkstra" && (
                <div className="mt-2 text-muted-foreground">
                    {state.queue && <div>Queue: [{state.queue.join(", ")}]</div>}
                    {state.stack && <div>Stack: [{state.stack.join(", ")}]</div>}
                </div>
                )}
            </div>

            {/* Legend */}
            <div className="w-full overflow-x-auto">
            <div className="flex justify-start md:justify-center gap-4 mt-4 text-sm px-4 md:px-0 min-w-max md:min-w-0">
                {[
                ["gray-400", "Start"],
                ["red-500", "Target"],
                ["yellow-500", "Current"],
                ["orange-500", "Queue/Stack"],
                ["blue-500", "Visited"],
                ["green-500", "Path"],
                ].map(([color, label]) => (
                <div key={label} className="flex items-center gap-2 whitespace-nowrap">
                    <div className={`w-4 h-4 rounded-full bg-${color}`}></div>
                    <span>{label}</span>
                </div>
                ))}
            </div>
            </div>

            </CardContent>
        </Card>
        </div>
        </>
    );
};

export default GraphVisualizer;
