import React from "react";

const NetworkVisualization: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <h2>Network Visualization</h2>
      <p>Nodes:</p>
      <ul>
        {data.nodes?.map((node: any) => (
          <li key={node.id}>{node.id}</li>
        ))}
      </ul>
      <p>Connections:</p>
      <ul>
        {data.connections?.map((connection: any, index: number) => (
          <li key={index}>
            {connection.source} → {connection.target}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NetworkVisualization;