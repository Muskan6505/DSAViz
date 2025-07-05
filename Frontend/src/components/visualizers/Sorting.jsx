import React, { useState, useEffect, useCallback } from "react";
import {
    Button,
    Badge,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
    SelectValue,
    Slider,
    Navbar,
} from "../index.js";

import {
    ChevronLeft,
    Play,
    Pause,
    RotateCcw,
    Shuffle,
    SkipForward,
    SkipBack,
} from "lucide-react";

import { Link } from "react-router-dom";

const SortingVisualizer = ({ onBack }) => {
    const [array, setArray] = useState([]);
    const [algorithm, setAlgorithm] = useState("bubble");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState([500]);
    const [arraySize, setArraySize] = useState([20]);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const algorithms = {
        bubble: "Bubble Sort",
        quick: "Quick Sort",
        merge: "Merge Sort",
        insertion: "Insertion Sort",
        selection: "Selection Sort",
    };

    // Generate random array
    const generateArray = useCallback(() => {
        const newArray = Array.from(
        { length: arraySize[0] },
        () => Math.floor(Math.random() * 400) + 10,
        );
        setArray(newArray);
        setCurrentStep(0);
        setSteps([]);
        setComparisons(0);
        setSwaps(0);
        setIsCompleted(false);
        setIsPlaying(false);
        setIsPaused(false);
    }, [arraySize]);

    // Initialize array on mount
    useEffect(() => {
        generateArray();
    }, [generateArray]);

    // Bubble Sort Algorithm
    const bubbleSort = (arr) => {
        const steps = [];
        const workingArray = [...arr];
        let comparisons = 0;
        let swaps = 0;

        for (let i = 0; i < workingArray.length; i++) {
            for (let j = 0; j < workingArray.length - i - 1; j++) {
                comparisons++;
                steps.push({
                array: [...workingArray],
                comparing: [j, j + 1],
                type: "compare",
                comparisons,
                swaps,
                });

                if (workingArray[j] > workingArray[j + 1]) {
                    [workingArray[j], workingArray[j + 1]] = [
                        workingArray[j + 1],
                        workingArray[j],
                    ];
                    swaps++;
                    steps.push({
                        array: [...workingArray],
                        comparing: [j, j + 1],
                        type: "swap",
                        comparisons,
                        swaps,
                    });
                }
            }
            steps.push({
                array: [...workingArray],
                sorted: Array.from(
                { length: i + 1 },
                (_, k) => workingArray.length - 1 - k,
                ),
                type: "sorted",
                comparisons,
                swaps,
            });
        }

        steps.push({
            array: [...workingArray],
            sorted: Array.from({ length: workingArray.length }, (_, i) => i),
            type: "completed",
            comparisons,
            swaps,
        });

        return steps;
    };

    // Quick Sort Algorithm
    const quickSort = (arr) => {
        const steps = [];
        const workingArray = [...arr];
        let comparisons = 0;
        let swaps = 0;

        const partition = (low, high) => {
        const pivot = workingArray[high];
        let i = low - 1;

        steps.push({
            array: [...workingArray],
            pivot: high,
            type: "pivot",
            comparisons,
            swaps,
        });

        for (let j = low; j < high; j++) {
            comparisons++;
            steps.push({
            array: [...workingArray],
            comparing: [j, high],
            pivot: high,
            type: "compare",
            comparisons,
            swaps,
            });

            if (workingArray[j] < pivot) {
                i++;
                if (i !== j) {
                    [workingArray[i], workingArray[j]] = [
                    workingArray[j],
                    workingArray[i],
                    ];
                    swaps++;
                    steps.push({
                    array: [...workingArray],
                    comparing: [i, j],
                    pivot: high,
                    type: "swap",
                    comparisons,
                    swaps,
                    });
                }
            }
        }

        [workingArray[i + 1], workingArray[high]] = [
            workingArray[high],
            workingArray[i + 1],
        ];
        swaps++;
        steps.push({
            array: [...workingArray],
            comparing: [i + 1, high],
            type: "swap",
            comparisons,
            swaps,
        });

        return i + 1;
        };

        const quickSortHelper = (low, high) => {
            if (low < high) {
                const pivotIndex = partition(low, high);
                quickSortHelper(low, pivotIndex - 1);
                quickSortHelper(pivotIndex + 1, high);
            }
        };

        quickSortHelper(0, workingArray.length - 1);

        steps.push({
        array: [...workingArray],
        sorted: Array.from({ length: workingArray.length }, (_, i) => i),
        type: "completed",
        comparisons,
        swaps,
        });

        return steps;
    };

    // Merge Sort Algorithm
    const mergeSort = (arr) => {
        const steps = [];
        const workingArray = [...arr];
        let comparisons = 0;
        let swaps = 0;

        const merge = (left, mid, right) => {
            const leftArray = workingArray.slice(left, mid + 1);
            const rightArray = workingArray.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            while (i < leftArray.length && j < rightArray.length) {
                comparisons++;
                steps.push({
                array: [...workingArray],
                comparing: [left + i, mid + 1 + j],
                merging: [left, right],
                type: "compare",
                comparisons,
                swaps,
                });

                if (leftArray[i] <= rightArray[j]) {
                workingArray[k] = leftArray[i];
                i++;
                } else {
                workingArray[k] = rightArray[j];
                j++;
                }
                swaps++;
                k++;

                steps.push({
                array: [...workingArray],
                merging: [left, right],
                type: "merge",
                comparisons,
                swaps,
                });
            }

            while (i < leftArray.length) {
                workingArray[k] = leftArray[i];
                i++;
                k++;
                swaps++;
                steps.push({
                array: [...workingArray],
                merging: [left, right],
                type: "merge",
                comparisons,
                swaps,
                });
            }

            while (j < rightArray.length) {
                workingArray[k] = rightArray[j];
                j++;
                k++;
                swaps++;
                steps.push({
                array: [...workingArray],
                merging: [left, right],
                type: "merge",
                comparisons,
                swaps,
                });
            }
        };

        const mergeSortHelper = (left, right) => {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                mergeSortHelper(left, mid);
                mergeSortHelper(mid + 1, right);
                merge(left, mid, right);
            }
        };

        mergeSortHelper(0, workingArray.length - 1);

        steps.push({
        array: [...workingArray],
        sorted: Array.from({ length: workingArray.length }, (_, i) => i),
        type: "completed",
        comparisons,
        swaps,
        });

        return steps;
    };

    // Start sorting
    const startSorting = () => {
        let sortSteps = [];

        switch (algorithm) {
        case "bubble":
            sortSteps = bubbleSort(array);
            break;
        case "quick":
            sortSteps = quickSort(array);
            break;
        case "merge":
            sortSteps = mergeSort(array);
            break;
        default:
            sortSteps = bubbleSort(array);
        }

        setSteps(sortSteps);
        setCurrentStep(0);
        setIsPlaying(true);
        setIsPaused(false);
    };

    // Control playback
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
        setComparisons(0);
        setSwaps(0);
        setIsCompleted(false);
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
            setComparisons(step.comparisons || 0);
            setSwaps(step.swaps || 0);

            if (currentStep === steps.length - 1) {
            setIsPlaying(false);
            setIsCompleted(true);
            } else {
            setCurrentStep(currentStep + 1);
            }
        }, 1000 - speed[0]);

        return () => clearTimeout(timer);
        }
    }, [isPlaying, currentStep, steps, speed]);

    // Get current visualization state
    const getCurrentState = () => {
        if (steps.length === 0) {
            return { array, comparing: [], sorted: [] };
        }
        const step = steps[currentStep] || steps[0];
        return {
            array: step.array || array,
            comparing: step.comparing || [],
            sorted: step.sorted || [],
            pivot: step.pivot,
            merging: step.merging,
            type: step.type,
        };
    };

    const state = getCurrentState();
    const maxValue = Math.max(...state.array);

    // Get bar color
    const getBarColor = (index) => {
        if (state.sorted?.includes(index)) return "bg-green-500";
        if (state.comparing?.includes(index)) return "bg-red-500";
        if (state.pivot === index) return "bg-yellow-500";
        if (
        state.merging &&
        index >= state.merging[0] &&
        index <= state.merging[1]
        ) {
        return "bg-blue-500";
        }
        return "bg-indigo-800";
    };

    return (
        <>
        <Navbar />
        <div style={{overflow:scroll, scrollbarWidth:"none"}} className="space-y-10 min-h-screen bg-gradient-to-br from-black via-indigo-950 to-pink-900 text-white px-4 pt-32 pb-10">
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
                            Interactive sorting algorithm visualization
                            </p>
                        </div>
                    </div>
                
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline">{algorithms[algorithm]}</Badge>
                        {isCompleted && (
                            <Badge className="bg-green-500">Completed
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <Card className="bg-black/30 border border-white/10">
            <CardHeader>
                <CardTitle className="text-xl">Controls</CardTitle>
                <CardDescription className="text-white/70">Configure the visualization parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-8 gap-8 ">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Algorithm</label>
                    <Select value={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bubble">Bubble Sort</SelectItem>
                        <SelectItem value="quick">Quick Sort</SelectItem>
                        <SelectItem value="merge">Merge Sort</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Array Size: {arraySize[0]}</label>
                    <Slider
                    value={arraySize}
                    onValueChange={setArraySize}
                    min={5}
                    max={50}
                    step={1}
                    disabled={isPlaying}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Speed: {speed[0]}ms</label>
                    <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={50}
                    max={950}
                    step={50}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Stats</label>
                    <div className="text-sm text-muted-foreground">
                    <div>Comparisons: {comparisons}</div>
                    <div>Swaps: {swaps}</div>
                    </div>
                </div>
                </div>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={generateArray}
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
                    onClick={isPaused ? resume : startSorting}
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
            <Card className="bg-black/30 border border-white/10">
            <CardHeader>
                <CardTitle className="text-xl">Visualization</CardTitle>
                <CardDescription className="text-white/70">Watch the algorithm sort the array step by step</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-center space-x-1 h-80 bg-muted/30 rounded-lg p-4">
                {state.array.map((value, index) => (
                    <div
                    key={index}
                    className={`transition-all duration-300 ${getBarColor(index)} rounded-t`}
                    style={{
                        height: `${(value / maxValue) * 250}px`,
                        width: `${Math.max(800 / state.array.length - 2, 4)}px`,
                    }}
                    title={`Index: ${index}, Value: ${value}`}
                    />
                ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center flex-wrap space-x-6 mt-6 text-sm text-white">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-indigo-700 rounded"></div>
                    <span>Unsorted</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Comparing</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Pivot</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Merging</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Sorted</span>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
        </>
    );
};

export default SortingVisualizer;
