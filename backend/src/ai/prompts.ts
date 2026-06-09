export const lessonPrompt = (
  topic: string
) => `
You are an expert technical educator.

Create a beginner-friendly lesson for:

${topic}

Return ONLY valid JSON.

Schema:

{
  "overview": "",
  "visualizationType": "",
  "visualizationData": {},
  "objectives": [],
  "cards": [
    {
      "title": "",
      "content": ""
    }
  ],
  "quiz": [
    {
      "question": "",
      "options": [],
      "answer": ""
    }
  ]
}

Visualization Types:

array
graph
tree
network
architecture
neural
timeline
pipeline

--------------------------------------------------
ARRAY VISUALIZATION
--------------------------------------------------

Use visualizationType = "array" for:

- Binary Search
- Linear Search
- Merge Sort
- Quick Sort
- Bubble Sort
- Insertion Sort
- Selection Sort

Example:

"visualizationType": "array",

"visualizationData": {
  "array": [1,3,5,7,9,11,13],
  "target": 9,

  "steps": [
    {
      "mid": 3,
      "value": 7,
      "action": "search right"
    },
    {
      "mid": 5,
      "value": 11,
      "action": "search left"
    },
    {
      "mid": 4,
      "value": 9,
      "action": "found"
    }
  ]
}

--------------------------------------------------
GRAPH VISUALIZATION
--------------------------------------------------

Use visualizationType = "graph" for:

- BFS
- DFS
- Dijkstra
- A*
- Graph Traversal
- Social Networks

Example:

"visualizationType": "graph",

"visualizationData": {
  "nodes": [
    { "id": "A" },
    { "id": "B" },
    { "id": "C" },
    { "id": "D" }
  ],

  "edges": [
    {
      "source": "A",
      "target": "B"
    },
    {
      "source": "A",
      "target": "D"
    },
    {
      "source": "B",
      "target": "C"
    },
    {
      "source": "D",
      "target": "C"
    }
  ],

  "steps": [
    {
      "visited": "A"
    },
    {
      "visited": "B"
    },
    {
      "visited": "D"
    },
    {
      "visited": "C"
    }
  ]
}

--------------------------------------------------
TREE VISUALIZATION
--------------------------------------------------

Use visualizationType = "tree" for:

- Binary Tree
- BST
- AVL Tree
- Heap
- Trie

Example:

{
  "visualizationType": "tree",

  "visualizationData": {
    "nodes": [
      {"id":"10"},
      {"id":"5"},
      {"id":"15"}
    ],

    "edges":[
      {"parent":"10","child":"5"},
      {"parent":"10","child":"15"}
    ]
  }
}

--------------------------------------------------
NETWORK VISUALIZATION
--------------------------------------------------

Use visualizationType = "network" for:

- TCP Handshake
- HTTP Request Flow
- OSI Model
- DNS Resolution

--------------------------------------------------
ARCHITECTURE VISUALIZATION
--------------------------------------------------

Use visualizationType = "architecture" for:

- Kubernetes
- Microservices
- System Design
- Cloud Architecture

--------------------------------------------------
NEURAL VISUALIZATION
--------------------------------------------------

Use visualizationType = "neural" for:

- Neural Networks
- Deep Learning
- Transformers
- CNN
- RNN
- LSTM

--------------------------------------------------

Rules:

1. Always return valid JSON.
2. Always include visualizationType.
3. Always include visualizationData.
4. Always generate realistic visualization data.
5. Always generate at least 3 lesson cards.
6. Always generate at least 2 quiz questions.
7. No markdown.
8. No explanations outside JSON.
`;