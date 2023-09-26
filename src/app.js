import { Amplify, API, graphqlOperation } from 'aws-amplify';

import awsconfig from './aws-exports';
import { createTodo, createLabware, createWell, deleteLabware, deleteWell, updateWell } from './graphql/mutations';
import { listLabwares, getLabware, getWell } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";

Amplify.configure(awsconfig);

async function createNewLabware() {
  let labware_name = document.getElementById('labware-name');
  let well_shape = document.getElementById('well-shape');
  let rows = document.getElementById('rows');
  let cols = document.getElementById('cols');
  const labware = {
    id: labware_name.value,
    name: labware_name.value,
    well_shape: well_shape.value,
    well_dim: 9,
    row_count: parseInt(rows.value),
    col_count: parseInt(cols.value),
    well_vol: 1000,
    well_bottom: `round`,
    well_bottom_dim: 9,
    well_height: 50,
  };
  console.log('labware object is:', labware);
  return await API.graphql(graphqlOperation(createLabware, { input: labware }));
}
/**
 * Retrieves the defined labware that exist in the database
 */
async function getData() {
      let labware_name = document.getElementById('labware-name');
      API.graphql(graphqlOperation(listLabwares)).then((evt) => {
        evt.data.listLabwares.items.map((labware, i) => {
          ActivityLog.innerHTML = `<p>${labware.name}, ${labware.well_shape}, ${labware.well_dim}, ${labware.row_count}, ${labware.col_count}</p>`;
        });
      });
      API.graphql(graphqlOperation(getLabware, {id: labware_name.value})).then((evt) => {
        document.getElementById('well-shape').value = `${evt.data.getLabware.well_shape}`
        document.getElementById('rows').value = `${evt.data.getLabware.row_count}`;
        document.getElementById('cols').value = `${evt.data.getLabware.col_count}`;
      })
    }
/**
 * Deletes labware from the database
 */
async function deleteLabwareEntry() {
  let labware_name = document.getElementById('labware-name');
  const labware_to_del = {
    id: labware_name.value,
  };
  API.graphql(graphqlOperation(deleteLabware, {input: labware_to_del})); 
}
/**
 * Retrieves labware and returns a map of those values
 */
async function retrieveLabware(labwareId) {
  var labware = {}
  labware = await API.graphql(graphqlOperation(getLabware, {id: labwareId})).then((e) => {
    var labware = {
      labware_rows: e.data.getLabware.row_count,
      labware_cols: e.data.getLabware.col_count,
    }
    return labware;
  });
  return labware;
}
/**
 * Creates wells based on the given labware definition
 */
async function buildWells(labwareId) {
  var labware = {}
  labware = await retrieveLabware(labwareId)
  console.log(`source labware is:`, labware);
  for (let i = 0; i<labware[`labware_rows`]; i++) {
    for (let j=0; j<labware[`labware_cols`]; j++) {
      console.log("Building source table....")
      var new_well = {
        id: labwareId + `_` + i + `_` + j,
        name: labwareId + `_` + i + `_` + j,
        volume: 0,
        liquid_level: 0
      };
      console.log("new well data is:", new_well);
      await API.graphql(graphqlOperation(createWell, { input: new_well })).then((evt) => {
        console.log("Updating view log inner html....")
        SourceView.innerHTML += `<p>${evt.data.createWell.id},${evt.data.createWell.name},${evt.data.createWell.volume},${evt.data.createWell.liquid_level}</p>`;
      });
    }
  }
}
/**
 * Update well volumes with the specified dispense volume
 */
async function updateWellsVolumes(mode, volume, wells) {
  for (let i = 0; i<wells.length; i++) {
    var currentWell = await API.graphql(graphqlOperation(getWell, {id: wells[i]})).then((evt) => {
      return {id: evt.data.getWell.id, name: evt.data.getWell.name, volume: evt.data.getWell.volume, liquid_level: evt.data.getWell.liquid_level};
    });
    if (mode == "asp"){
      var new_volume = currentWell['volume']-parseInt(volume);
    } else if (mode == "disp") {
      var new_volume = currentWell['volume']+parseInt(volume);
    } else {
      var new_volume = currentWell['volume'];
      console.log("Incorrect well update mode. Check input!")
    }
    let well_update = {
      id: wells[i],
      name: wells[i],
      volume: new_volume,
      liquid_level: 0,
    }
    await API.graphql(graphqlOperation(updateWell, { input: well_update})).then((evt)=> {
      SourceView.innerHTML += `<p>${evt.data.updateWell.id},${evt.data.updateWell.name},${evt.data.updateWell.volume},${evt.data.updateWell.liquid_level}`
    });
  }
}
/**
 * Delete labware wells
 */
async function deleteWellEntries() {
  let labware_name = document.getElementById('source-name');
  var labware = {}
  labware = await retrieveLabware(labware_name.value);
  console.log("retrieved labware is:", labware);
  for (let i = 0; i<labware[`labware_rows`]; i++) {
    for (let j=0; j<labware[`labware_cols`]; j++) {
      var well_id = {
        id: labware_name.value + `_` + i + `_` + j,
      }
      await API.graphql(graphqlOperation(deleteWell, { input: well_id }));
      SourceView.innerHTML += `<p>Deleting wells for ${well_id[`id`]}</p>`;
    }
  }
}

const DefineLabwareButton = document.getElementById('define-labware-button');
const LiquidTransfCalcButton = document.getElementById('liquid-transf-calc-button');
const ProtocolExecButton = document.getElementById('protocol-exec-button');
const ProtocolBuildButton = document.getElementById('protocol-build-button');
const MutationButton = document.getElementById('MutationEventButton');
const ActivityLog = document.getElementById('ActivityLog');
const GetDataButton = document.getElementById('GetDataButton');
const DeleteLabwareButton = document.getElementById('DeleteLabwareButton');
const InitializeButton = document.getElementById('InitializeButton');
const DispenseButton = document.getElementById('DispenseButton');
const TransferButton = document.getElementById('TransferButton');
const ClearButton = document.getElementById('ClearButton');
const SourceView = document.getElementById('SourceView');
const DestView = document.getElementById('DestView');
const DrawingBoard = document.getElementById('drawing-board');
const Toolbar = document.getElementById('toolbar');
const AddLabwareObjectButton = document.getElementById('AddLabwareObjectButton');
const AddObjectRowButton = document.getElementById('AddObjectRowButton');
const drawboardOffsetX = DrawingBoard.offsetLeft;
const drawboardOffsetY = DrawingBoard.offsetTop;
//DrawingBoard.width = window.innerWidth-drawboardOffsetX;
//DrawingBoard.height = window.innerHeight-drawboardOffsetY;

//var labware_area = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//var round_well = document.createElementNS('http://www.w3.org/2000/svg', 'circle');;
let startX;
let startY;
let labware_object;
let labwareCornerX = 5;
let labwareCornerY = 5;
let squareWellCornerX = 10;
let squareWellCornerY = 10;
let roundWellCX = 10;
let roundWellCY = 10;

MutationButton.addEventListener('click', (evt) => {
  createNewLabware().then((evt) => {
    console.log('create event is:', evt);
    ActivityLog.innerHTML += `<p>${evt.data.createLabware.name}</p>`;
  }).catch(() => {
    ActivityLog.innerHTML += `An error ocurred saving labware or the definition already exists!`
  });
});
GetDataButton.addEventListener('click', (evt) => {
  getData();
});
DeleteLabwareButton.addEventListener('click', (evt) => {
  deleteLabwareEntry();
});
DefineLabwareButton.addEventListener('click', (evt) => {
  document.getElementById('define-labware').style.display = "block";
  document.getElementById('LiquidTransfCalc').style.display = "none";
  document.getElementById('ProtocolExec').style.display = "none";
  document.getElementById('ProtocolBuild').style.display = "none";
});

LiquidTransfCalcButton.addEventListener('click', (evt) => {
  document.getElementById('define-labware').style.display = "none";
  document.getElementById('LiquidTransfCalc').style.display = "block";
  document.getElementById('ProtocolExec').style.display = "none";
  document.getElementById('ProtocolBuild').style.display = "none";
});

ProtocolExecButton.addEventListener('click', (evt) => {
  document.getElementById('define-labware').style.display = "none";
  document.getElementById('LiquidTransfCalc').style.display = "none";
  document.getElementById('ProtocolExec').style.display = "block";
  document.getElementById('ProtocolBuild').style.display = "none";
});

ProtocolBuildButton.addEventListener('click', (evt) => {
  document.getElementById('define-labware').style.display = "none";
  document.getElementById('LiquidTransfCalc').style.display = "none";
  document.getElementById('ProtocolExec').style.display = "none";
  document.getElementById('ProtocolBuild').style.display = "block";
});

InitializeButton.addEventListener('click', (evt) => {
  let source_name = document.getElementById('source-name');
  let dest_name = document.getElementById('dest-name');
  buildWells(source_name.value);
  buildWells(dest_name.value);
});

DispenseButton.addEventListener('click', (evt) => {
  let dispenseVolume = document.getElementById('dispense-volume').value;
  let wells = document.getElementById('dispense-targets').value.split(`,`);
  updateWellsVolumes("disp", dispenseVolume, wells);
});

TransferButton.addEventListener('click', (evt) => {
  let transferVolume = document.getElementById('transfer-volume').value;
  let transferSource = document.getElementById('transfer-source').value.split(`,`);
  let transferDest = document.getElementById('transfer-dest').value.split(`,`);
  updateWellsVolumes("asp", transferVolume, transferSource);
  updateWellsVolumes("disp", transferVolume, transferDest);
});

ClearButton.addEventListener('click', (evt) => {
  deleteWellEntries();
});

/*DrawingBoard.addEventListener('mousedown', (evt) => {
  startX = evt.clientX;
  startY = evt.clientY;
  labware_object = document.getElementById('labware-object').value;
  console.log("mousedown", labware_object);
});
*/
AddObjectRowButton.addEventListener('click', (evt) => {
  squareWellCornerX = 10;
  squareWellCornerY += 30;
  roundWellCX = 10;
  roundWellCY += 30;
})

AddLabwareObjectButton.addEventListener('click', (evt) => {
  labware_object = document.getElementById('labware-object').value;
  if (labware_object == "labware-area") {
    let labwareObjectCount = document.getElementById('object-count').value;
    console.log('labware object count is:', labwareObjectCount);
    for (let i = 0; i < labwareObjectCount; i++) {
      let labware_area = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      labware_area.setAttributeNS(null, 'x', labwareCornerX);
      labware_area.setAttributeNS(null, 'y', labwareCornerY);
      labware_area.setAttributeNS(null, 'width', 160);
      labware_area.setAttributeNS(null, 'height', 240);
      labware_area.setAttributeNS(null, 'style', "fill:gray");
      if (labwareCornerX >= 500) {
        labwareCornerX = 5;
        labwareCornerY += 245;
      }
      DrawingBoard.appendChild(labware_area);
      labwareCornerX += 170;
    }
  }
  if (labware_object == "round-well") {
    let round_well = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    round_well.setAttributeNS(null, 'cx', roundWellCX);
    round_well.setAttributeNS(null, 'cy', roundWellCY);
    round_well.setAttributeNS(null, 'r', 10);
    round_well.setAttributeNS(null, 'style', "fill:blue");
    DrawingBoard.appendChild(round_well);
    roundWellCX += 15;
    round_well.addEventListener('click', (evt) => {
      console.log(round_well.getAttributeNS(null, 'cx'));
      console.log(round_well.getAttributeNS(null, 'cy'));
    });
  }
  if (labware_object == "square-well") {
    var square_well = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    square_well.setAttributeNS(null, 'x', squareWellCornerX);
    square_well.setAttributeNS(null, 'y', squareWellCornerY);
    square_well.setAttributeNS(null, 'width', 20);
    square_well.setAttributeNS(null, 'height', 20);
    square_well.setAttributeNS(null, 'style', "fill:red;");
    DrawingBoard.appendChild(square_well);
    squareWellCornerX += 25;
  }
});

API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (evt) => {
        const todo = evt.value.data.onCreateTodo;
        ActivityLog.innerHTML += `<p>${todo.name} - ${todo.description}<p>`;
      },
    });

//getData();