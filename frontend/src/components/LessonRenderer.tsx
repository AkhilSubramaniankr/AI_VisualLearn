import ArrayVisualization
from "../visualizations/ArrayVisualization";

import GraphVisualization
from "../visualizations/GraphVisualization";

type Props = {
  type: string;
  data?: any;
};

function LessonRenderer({
  type,
  data
}: Props) {

  switch(type) {

  case "array":

    return (
      <ArrayVisualization
        data={data}
      />
    );

  case "graph":

    return (
      <GraphVisualization
        data={data}
      />
    );

  default:

    return (
      <div>
        No visualization available
      </div>
    );
}
}

export default LessonRenderer;