import * as Lib from "./littleLib.js";

export class Task
{
	static Name = "Task";
	static DefCount = 1;
	public count = 1;

	public getTask()
	{
		const el = Lib.Div();
		el.style.height = "300px";
		el.style.backgroundColor = "#aaa";
		return el;
	}

	public getAnswer()
	{
		const el = Lib.Div();
		el.style.height = "200px";
		el.style.backgroundColor = "#aaa";
		return el;
	}
}

export class TaskFormulas extends Task
{
	static Name = "Formulas";
	static DefCount = 13;
	private answerEl = Lib.Div();
	protected Cols = 3;

	protected genTask(): {
		task: HTMLDivElement;
		answer: HTMLDivElement | number;
	}
	{
		const task = Lib.Div([], "1 + 1 = ?");
		const answer = 2;
		return { task, answer };
	}

	public getTask()
	{
		const el = Lib.Div("taskFormulas");
		el.style.setProperty("--cols", `${this.Cols}`);
		this.answerEl = Lib.Div("taskFormulas");
		this.answerEl.style.setProperty("--cols", `${this.Cols}`);
		const k1 = Math.floor(this.count / this.Cols);
		const k2 = this.count % this.Cols;
		for (let i = 0; i < this.count; i++)
		{
			const { task, answer } = this.genTask();
			const answerEl = typeof answer == "number" ? Lib.Div([], `${answer}`) : answer;
			// const n = i % this.Cols + Math.floor(i / this.Cols);
			const n = i % this.Cols * k1 + 1 + Math.floor(i / this.Cols) + Math.min(i % this.Cols, k2);
			el.appendChild(Lib.Div([], [
				Lib.Div([], `${n})`),
				task,
			]));
			this.answerEl.appendChild(Lib.Div([], [
				Lib.Div([], `${n})`),
				answerEl,
			]));
		}
		return el;
	}

	public getAnswer()
	{
		return this.answerEl;
	}
}