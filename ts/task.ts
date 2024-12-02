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