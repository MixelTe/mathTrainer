import * as Lib from "./littleLib.js";
import { TASKS } from "./tasks.js";
let number = 1;
export class Block {
    taskEl;
    taskInnerEl = Lib.Div();
    answerEl;
    TaskCls;
    count = 1;
    countEl = Lib.Input("taskCount", "number");
    number;
    constructor() {
        this.number = number++;
        this.countEl.valueAsNumber = this.count;
        this.countEl.addEventListener("change", () => {
            this.count = this.countEl.valueAsNumber;
            this.recreateTask();
        });
        this.taskEl = Lib.Div(["block", "task"], [
            Lib.Div("taskControl", [
                this.createSelect(),
                Lib.Button([], "-", () => { this.count -= 1; this.recreateTask(); }),
                this.countEl,
                Lib.Button([], "+", () => { this.count += 1; this.recreateTask(); }),
                Lib.Button([], "Del", () => { this.delete(); }),
            ]),
            Lib.Div([], `№ ${this.number}`),
            this.taskInnerEl,
        ]);
        this.answerEl = Lib.Div(["block", "answer"]);
        this.TaskCls = TASKS.TaskAdd2;
        // this.TaskCls = TASKS.TaskLinearGraph;
        this.recreateTask(true);
    }
    createSelect() {
        const select = Lib.initEl("select");
        Object.keys(TASKS).forEach(v => {
            const key = v;
            const option = Lib.initEl("option");
            select.appendChild(option);
            option.value = key;
            option.innerText = TASKS[key].Name;
        });
        select.addEventListener("change", () => {
            const key = select.value;
            const Task = TASKS[key];
            if (!Task)
                return;
            this.TaskCls = Task;
            this.recreateTask(true);
        });
        return select;
    }
    recreateTask(isNew = false) {
        const task = new this.TaskCls();
        if (isNew)
            this.count = this.TaskCls.DefCount;
        this.taskEl.classList.toggle("taskControl_disableCount", this.TaskCls.DefCount < 0);
        this.count = Math.max(this.count, 1);
        this.countEl.valueAsNumber = this.count;
        task.count = this.count;
        const cont = this.taskInnerEl.parentElement;
        cont.removeChild(this.taskInnerEl);
        this.taskInnerEl = task.getTask();
        cont.appendChild(this.taskInnerEl);
        this.answerEl.innerHTML = "";
        this.answerEl.appendChild(Lib.Div([], `№ ${this.number}`));
        this.answerEl.appendChild(task.getAnswer());
    }
    delete() {
        this.taskEl.parentElement?.removeChild(this.taskEl);
        this.answerEl.parentElement?.removeChild(this.answerEl);
    }
    getTask() {
        return this.taskEl;
    }
    getAnswer() {
        return this.answerEl;
    }
}
