import * as Lib from "./littleLib.js";
import type { Task } from "./task.js";
import { TASKS } from "./tasks.js";

let number = 1;

export class Block
{
	private taskEl;
	private taskInnerEl = Lib.Div();
	private answerEl;
	private TaskCls: typeof Task
	private count = 1;
	private countEl = Lib.Input("taskCount", "number");
	private number;

	constructor()
	{
		this.number = number++;
		this.countEl.valueAsNumber = this.count;
		this.countEl.addEventListener("change", () =>
		{
			this.count = this.countEl.valueAsNumber;
			this.recreateTask();
		});
		this.taskEl = Lib.Div(["block", "task"], [
			Lib.Div("taskControl", [
				this.createSelect(),
				Lib.Button([], "-", () => { this.count -= 1; this.recreateTask() }),
				this.countEl,
				Lib.Button([], "+", () => { this.count += 1; this.recreateTask() }),
				Lib.Button([], "Del", () => { this.delete() }),
			]),
			Lib.Div([], `№ ${this.number}`),
			this.taskInnerEl,
		]);
		this.answerEl = Lib.Div(["block", "answer"]);
		this.TaskCls = TASKS.TaskAdd2;
		// this.TaskCls = TASKS.TaskArifmetika3;
		this.recreateTask(true);
	}

	private createSelect()
	{
		const select = Lib.initEl("select");
		Object.keys(TASKS).forEach(v =>
		{
			const key = v as any as keyof typeof TASKS;
			const option = Lib.initEl("option");
			select.appendChild(option);
			option.value = key;
			option.innerText = TASKS[key].Name;
		});
		select.addEventListener("change", () =>
		{
			const key = select.value as any as keyof typeof TASKS;
			const Task = TASKS[key];
			if (!Task) return;
			this.TaskCls = Task;
			this.recreateTask(true);
		});
		return select;
	}

	private recreateTask(isNew = false)
	{
		const task = new this.TaskCls();
		if (isNew)
			this.count = this.TaskCls.DefCount;
		this.count = Math.max(this.count, 1);
		this.countEl.valueAsNumber = this.count;
		task.count = this.count;
		const cont = this.taskInnerEl.parentElement!;
		cont.removeChild(this.taskInnerEl);
		this.taskInnerEl = task.getTask();
		cont.appendChild(this.taskInnerEl);
		this.answerEl.innerHTML = "";
		this.answerEl.appendChild(Lib.Div([], `№ ${this.number}`));
		this.answerEl.appendChild(task.getAnswer());
	}

	private delete()
	{
		this.taskEl.parentElement?.removeChild(this.taskEl);
		this.answerEl.parentElement?.removeChild(this.answerEl);
	}

	public getTask()
	{
		return this.taskEl;
	}
	public getAnswer()
	{
		return this.answerEl;
	}

}
