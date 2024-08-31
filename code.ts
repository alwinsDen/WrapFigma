// figma.showUI(__html__);

async function figma_ui() {
  const currentPage = figma.currentPage; // Get the current page
  currentPage.loadAsync(); // Load the current page asynchronously
  console.log('NUMBER OF CHILDREN', currentPage.children.length); //this gives the current number of children in the page
  //loop through each child and print the name
  for (let i = 0; i < currentPage.children.length; i++) {
    console.log(
      'CHILD NAME',
      currentPage.children[i].id,
      typeof currentPage.children[i].id
    );
  }

  //getting all node data recursively
  function getNodaData(node: BaseNode) {
    return {
      id: node.id,
      name: node.name,
      type: node.type,
    };
  }

  figma.closePlugin(); // close the current plugin
}

figma_ui();

figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
