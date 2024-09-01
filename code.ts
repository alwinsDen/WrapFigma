// figma.showUI(__html__);

// import { SceneNodeWithWithId } from './types';

//NOTE OF ACTION.
//1. To not changes for each of the nodes.
//2. Assign a unique ID to each of the nodes,
//3. comapare each of the elements against the exsiting.

//currently defining the types in a seperate file will break the plugin.
// interface SceneNodeWithWithId extends SceneNodeMixin {
//   wrapElementId: string;
// }

interface SceneNodeWithWithId {
  node: SceneNode;
  wrapElementId: string;
}

const allNodesTracker: SceneNodeWithWithId[] = [];
const subChildren: SceneNode[] = [];
function FIMGA_TREE_GENERATOR() {
  for (const node of subChildren) {
    allNodesTracker.push({
      node,
      wrapElementId: guidGenerator(),
    });

    //something weird. TS isnt recognising the children property even though it exists.
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        subChildren.push(child);
      }
    }
  }
}

//function to generate a unique ID for each of the nodes.
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

async function figma_ui() {
  const currentPage = figma.currentPage; // Get the current page
  currentPage.loadAsync(); // Load the current page asynchronously

  //console.log('currentPage', figma.fileKey); // this works only for PRIVATE plugins

  // first loop through all the nodes in the page
  for (const node of currentPage.children) {
    // initialize each of the node in the page.
    subChildren.push(node);
  }

  //NOTE: This function will generate a unique ID for each of the nodes.
  FIMGA_TREE_GENERATOR();

  //NOTE: This will log all the nodes in the page.
  console.log('All Nodes in the page', allNodesTracker);

  //THIS WILL GIVE THE ERROR: "VM has been destroyed."
  figma.closePlugin(); // close the current plugin
}

figma_ui();

figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  // if (msg.type === 'create-rectangles') {
  //   const nodes: SceneNode[] = [];
  //   for (let i = 0; i < msg.count; i++) {
  //     const rect = figma.createRectangle();
  //     rect.x = i * 150;
  //     rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
  //     figma.currentPage.appendChild(rect);
  //     nodes.push(rect);
  //   }
  //   figma.currentPage.selection = nodes;
  //   figma.viewport.scrollAndZoomIntoView(nodes);
  // }
  figma.closePlugin();
};
