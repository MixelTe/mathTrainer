import * as Lib from "./littleLib.js";
import { Task } from "./task.js";

export class TaskTest1 extends Task
{
	static Name = "Test 1";
	static DefCount = 1 * 2;

	public getTask()
	{
		const el = super.getTask();
		el.style.backgroundColor = "#aaa";
		return el;
	}

	public getAnswer()
	{
		const el = super.getAnswer();
		el.style.backgroundColor = "#aaa";
		return el;
	}
}

export class TaskTest2 extends Task
{
	static Name = "Test 2";
	static DefCount = 2 * 2;

	public getTask()
	{
		const el = super.getTask();
		el.style.height = "200px";
		el.style.backgroundColor = "#4af";
		return el;
	}

	public getAnswer()
	{
		const el = super.getAnswer();
		el.style.height = "100px";
		el.style.backgroundColor = "#4af";
		return el;
	}
}

export const TASKS = {
	"test1": TaskTest1,
	"test2": TaskTest2,
}
