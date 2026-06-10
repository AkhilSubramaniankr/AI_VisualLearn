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
- Binary Search Tree (BST)
- AVL Tree
- Heap
- Trie
- Decision Tree

Always generate:

1. nodes
2. edges
3. target
4. steps

The steps array is REQUIRED.

Example:

"visualizationType": "tree",

"visualizationData": {

  "nodes":[
    {"id":"10"},
    {"id":"5"},
    {"id":"15"},
    {"id":"3"},
    {"id":"7"}
  ],

  "edges":[
    {
      "parent":"10",
      "child":"5"
    },
    {
      "parent":"10",
      "child":"15"
    },
    {
      "parent":"5",
      "child":"3"
    },
    {
      "parent":"5",
      "child":"7"
    }
  ],

  "target":"7",

  "steps":[
    {
      "visited":"10",
      "action":"go left"
    },
    {
      "visited":"5",
      "action":"go right"
    },
    {
      "visited":"7",
      "action":"found"
    }
  ]
}

--------------------------------------------------
NETWORK VISUALIZATION
--------------------------------------------------

Use visualizationType = "network" for:

- TCP Handshake
- HTTP Request Flow
- OSI Model
- DNS Resolution

Example:

"visualizationType":"network",

"visualizationData":{

  "nodes":[
    {"id":"Client"},
    {"id":"DNS"},
    {"id":"Server"}
  ],

  "connections":[
    {
      "source":"Client",
      "target":"DNS"
    },
    {
      "source":"DNS",
      "target":"Server"
    }
  ],

  "steps":[
    {
      "active":"Client",
      "message":"Send Request"
    },
    {
      "active":"DNS",
      "message":"Resolve Domain"
    },
    {
      "active":"Server",
      "message":"Return Response"
    }
  ]
}

--------------------------------------------------
ARCHITECTURE VISUALIZATION
--------------------------------------------------

Use visualizationType = "architecture" for:

- Kubernetes
- Microservices
- System Design
- Cloud Architecture

Example:

"visualizationType":"architecture",

"visualizationData":{

  "components":[
    {
      "id":"Browser"
    },
    {
      "id":"API Gateway"
    },
    {
      "id":"Auth Service"
    },
    {
      "id":"User Service"
    },
    {
      "id":"Database"
    }
  ],

  "connections":[
    {
      "source":"Browser",
      "target":"API Gateway"
    },
    {
      "source":"API Gateway",
      "target":"Auth Service"
    },
    {
      "source":"API Gateway",
      "target":"User Service"
    },
    {
      "source":"User Service",
      "target":"Database"
    }
  ],

  "steps":[
    {
      "active":"Browser",
      "message":"User Request"
    },
    {
      "active":"API Gateway",
      "message":"Route Request"
    },
    {
      "active":"Auth Service",
      "message":"Authenticate"
    },
    {
      "active":"User Service",
      "message":"Fetch User"
    },
    {
      "active":"Database",
      "message":"Return Data"
    }
  ]
}

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
- Transformer Architecture
- Attention Mechanism
- BERT
- GPT
- Embeddings
- Encoders/Decoders
- Backpropagation
- Multimodal Models

Example:

"visualizationType":"neural",

"visualizationData":{

  "layers":[
    {
      "name":"Input",
      "nodes":3
    },
    {
      "name":"Hidden",
      "nodes":4
    },
    {
      "name":"Output",
      "nodes":2
    }
  ],

  "steps":[
    {
      "activeLayer":"Input",
      "message":"Input Features"
    },
    {
      "activeLayer":"Hidden",
      "message":"Feature Processing"
    },
    {
      "activeLayer":"Output",
      "message":"Prediction"
    }
  ]
}

--------------------------------------------------
TIMELINE VISUALIZATION
--------------------------------------------------
Use visualizationType = "timeline" for:

- History of AI
- History of NLP
- Evolution of Databases
- Programming Languages Timeline
- Computer Generations
- Internet Evolution
- Machine Learning Evolution

Example:

"visualizationType":"timeline",

"visualizationData":{

  "events":[
  {
    "year":"1950",
    "title":"Turing Test",
    "description":"Alan Turing proposed a test to evaluate whether a machine can exhibit intelligent behavior."
  },
  {
    "year":"1956",
    "title":"Dartmouth Workshop",
    "description":"The term Artificial Intelligence was formally introduced."
  },
  {
    "year":"2020",
    "title":"GPT-3",
    "description":"OpenAI released GPT-3 with 175 billion parameters."
  }
]
}

--------------------------------------------------
PIPELINE VISUALIZATION
----------------
PIPELINE VISUALIZATION

Use visualizationType = "pipeline" for:

- ETL
- Data Pipeline
- Machine Learning Pipeline
- RAG Pipeline
- CI/CD
- MLOps
- Feature Engineering Pipeline

Example:

{
  "visualizationType":"pipeline",

  "visualizationData":{
    "stages":[
      {
        "name":"Extract",
        "description":"Collect raw data"
      },
      {
        "name":"Transform",
        "description":"Clean and process data"
      },
      {
        "name":"Load",
        "description":"Store into warehouse"
      }
    ]
  }
}



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