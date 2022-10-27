import React from "react";
import { TreevizReact } from "treeviz-react";
import { renderToString } from "react-dom/server";

const data_1 = [
  { id: 1, text_1: "Chaos", text_2: "Void", father: null, color: "#FF5722" },
  { id: 2, text_1: "Tartarus", text_2: "Abyss", father: 1, color: "#FFC107" },
  { id: 3, text_1: "Gaia", text_2: "Earth", father: 1, color: "#8BC34A" },
  { id: 4, text_1: "Eros", text_2: "Desire", father: 1, color: "#00BCD4" }
];

export const App = () => {
  const icon = renderToString('add');

  return (
    <div style={{ marginLeft: 10 }}>
      <div style={{ display: "flex" }}>
        <TreevizReact
          data={data_1}
          relationnalField={"father"}
          nodeWidth={120}
          nodeHeight={80}
          areaHeight={500}
          areaWidth={1000}
          mainAxisNodeSpacing={2}
          secondaryAxisNodeSpacing={2}
          linkShape={"quadraticBeziers"}
          renderNode={(data) => {
            const nodeData = data.data;
            const settings = data.settings;
            let result = "";
            if (data.depth !== 2) {
              result = `<div class="box" style='cursor:pointer;height:${settings.nodeHeight}px; width:${settings.nodeWidth}px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:${nodeData.color};border-radius:5px;'><div><strong>
          ${nodeData.text_1}
          </strong>
          ${icon}
          </div><div>is</div><div><i>
          ${nodeData.text_2}
          </i></div></div>`;
            } else {
              result = `<div class="box" style='cursor:pointer;height:${
                settings.nodeHeight
              }px; width:${
                settings.nodeHeight
              }px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:${
                nodeData.color
              };border-radius:${settings.nodeHeight / 2}px;'><div><strong>
          ${nodeData.text_1}
          </strong></div></div>`;
            }
            return result;
          }}
          duration={600}
          isHorizontal
          linkWidth={(node) => 10}
        />
      </div>
    </div>
  );
};
export default App;
