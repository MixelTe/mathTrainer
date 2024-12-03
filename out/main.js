import { Block } from "./block.js";
import * as Lib from "./littleLib.js";
const tasksEl = Lib.Div("page", Lib.Div("taskAdd", [
    Lib.Div(),
    Lib.Button([], "+", addBlock),
    Lib.Button([], "Печать", () => print()),
]));
const answersEl = Lib.Div("page");
Lib.SetContent(document.body, [
    tasksEl,
    answersEl,
]);
addBlock();
function addBlock() {
    const block = new Block();
    tasksEl.insertBefore(block.getTask(), tasksEl.lastChild);
    answersEl.appendChild(block.getAnswer());
}
