import { useState, useMemo } from "react";
import AssessmentSubmissionHeatmap from "@/_components/AssessmentHeatmap ";
import Filter from "@/_components/Filter";
import { sampleScores } from "@/data/data";

type FilterData = {
  [subject: string]: {
    [chapter: string]: string[];
  };
};

export const filterData: FilterData = {
  "Programming Fundamentals": {
    "Variables & Data Types": [
      "Primitive Types",
      "Type Conversion",
      "Constants",
    ],
    "Control Structures": ["if-else", "switch-case", "loops"],
    "Functions & Recursion": [
      "Function declaration",
      "Parameters",
      "Recursion",
    ],
    "Arrays and Strings": [
      "One-dimensional",
      "Two-dimensional",
      "String manipulation",
    ],
    "Object-Oriented Concepts": [
      "Classes",
      "Objects",
      "Inheritance",
      "Polymorphism",
      "Encapsulation",
    ],
  },
  "Data Structures": {
    "Linear Structures": ["Arrays", "Linked Lists", "Stacks", "Queues"],
    "Non-Linear Structures": ["Trees", "Heaps", "Graphs"],
    Hashing: ["Hash Tables", "Collision Resolution Techniques"],
    "Algorithms on DS": [
      "Traversals",
      "Sorting with DS",
      "Searching techniques",
    ],
  },
  Algorithms: {
    "Sorting & Searching": [
      "Bubble Sort",
      "Merge Sort",
      "Quick Sort",
      "Binary Search",
    ],
    "Greedy Algorithms": [
      "Activity Selection",
      "Huffman Coding",
      "Kruskal’s Algorithm",
    ],
    "Divide and Conquer": [
      "Merge Sort",
      "Binary Search",
      "Closest Pair Problem",
    ],
    "Dynamic Programming": [
      "Fibonacci",
      "Knapsack",
      "Matrix Chain Multiplication",
    ],
    Backtracking: ["N-Queens", "Sudoku Solver", "Subset Sum"],
  },
  "Computer Organization & Architecture": {
    "Number Systems & Boolean Algebra": [
      "Binary",
      "Octal",
      "Hex",
      "Logic Gates",
    ],
    "CPU Architecture": ["ALU", "Registers", "Instruction Cycle"],
    "Memory Hierarchy": ["RAM", "Cache", "Virtual Memory"],
    "Input/Output Organization": ["Interrupts", "DMA", "I/O mapping"],
    "Pipelining & Parallelism": [
      "Instruction Pipelining",
      "Hazards",
      "Superscalar Architecture",
    ],
  },
  "Operating Systems": {
    "Introduction & Structures": ["Kernel", "System Calls", "OS Services"],
    "Process Management": ["Threads", "Scheduling", "Synchronization"],
    "Memory Management": ["Paging", "Segmentation", "Virtual Memory"],
    "File Systems": ["File Allocation", "Directory Structure"],
    Deadlocks: ["Detection", "Prevention", "Avoidance"],
  },
};

function App() {
  const [filter, setFilter] = useState({
    subject: "",
    chapter: "",
    topic: "",
  });

  const filteredScores = useMemo(() => {
    return sampleScores.filter((score) => {
      if (filter.subject && score.subject !== filter.subject) return false;
      if (filter.chapter && score.chapter !== filter.chapter) return false;
      if (filter.topic && score.topic !== filter.topic) return false;
      return true;
    });
  }, [filter.subject, filter.chapter, filter.topic]);

  return (
    <div className="p-6 bg-white flex flex-col gap-5 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Assessment Submissions
        </h2>
        <p className="text-gray-600">
          Daily assessment completion tracking for 2024
        </p>
      </div>
      <Filter filterData={filterData} filter={filter} setFilter={setFilter} />
      <AssessmentSubmissionHeatmap scores={filteredScores} />
    </div>
  );
}

export default App;
