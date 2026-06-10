import ArrayVisualization
from "../visualizations/ArrayVisualization";

import GraphVisualization
from "../visualizations/GraphVisualization";

import TreeVisualization
from "../visualizations/TreeVisualization";

import NetworkVisualization
from "../visualizations/NetworkVisualization";

import ArchitectureVisualization
from "../visualizations/ArchitectureVisualization";

import NeuralVisualization
from "../visualizations/NeuralVisualization";

import TimelineVisualization
from "../visualizations/TimelineVisualization";

import PipelineVisualization
from "../visualizations/PipelineVisualization";

type Props = {
  type: string;
  data?: any;
};

const visualizationMap: Record<
  string,
  React.ComponentType<any>
> = {

  array:
    ArrayVisualization,

  graph:
    GraphVisualization,

  tree:
    TreeVisualization,

  network:
    NetworkVisualization,

  architecture:
  ArchitectureVisualization,

  neural:
    NeuralVisualization,

  timeline:
    TimelineVisualization,

  pipeline:
    PipelineVisualization

};

function LessonRenderer({
  type,
  data
}: Props) {

  const Component =
    visualizationMap[type];

  if (!Component) {

    return (

      <div>
        No visualization available
        for type:
        {" "}
        {type}
      </div>

    );
  }

  return (
    <Component
      data={data}
    />
  );
}

export default LessonRenderer;