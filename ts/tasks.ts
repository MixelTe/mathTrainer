import { CDOT, round } from "./functions.js";
import * as Lib from "./littleLib.js";
import { TaskFormulas } from "./task.js";

export class TaskAdd2 extends TaskFormulas
{
	static Name = "Сложение двузначных";
	static DefCount = 12;
	protected Cols = 4;
	protected genTask()
	{
		const a = Lib.randomInt(1, 100);
		const b = Lib.randomInt(1, 100);
		const answer = a + b;
		const task = Lib.Div([], [`${a} + ${b} = `, Lib.Span("taskInput")]);
		return { task, answer };
	}
}

export class TaskArifmetika1 extends TaskFormulas
{
	static Name = "Арифметика 1";
	static DefCount = 9;
	protected Cols = 3;
	protected genTask()
	{
		const mode = Lib.randomInt(1, 4);
		const r = mode == 1 ? [100, 10000] : [10, 100];
		let a = Lib.randomInt(r[0], r[1]);
		let b = Lib.randomInt(r[0], r[1]);
		let answer = 0;
		let sign = "";
		if (mode == 1)
		{
			const mode = Lib.random_boolean();
			answer = mode ? a + b : a - b;
			sign = mode ? "+" : "-";
		}
		else if (mode == 2)
		{
			answer = a * b;
			sign = CDOT;
		}
		else
		{
			answer = a;
			a *= b
			sign = ":";
		}

		a = round(a);
		b = round(b);
		answer = round(answer);
		const task = Lib.Div([], [`${a} ${sign} ${b} = `, Lib.Span("taskInput")]);
		return { task, answer };
	}
}

export class TaskArifmetika2 extends TaskFormulas
{
	static Name = "Арифметика 2";
	static DefCount = 9;
	protected Cols = 3;
	protected genTask()
	{
		const mode = Lib.randomInt(1, 4);
		const r = mode == 1 ? [100, 10000] : [10, 100];
		let a = Lib.randomInt(r[0], r[1]) / (Math.pow(10, Lib.randomInt(3)));
		let b = Lib.randomInt(r[0], r[1]) / (Math.pow(10, Lib.randomInt(3)));
		let answer = 0;
		let sign = "";
		if (mode == 1)
		{
			const mode = Lib.random_boolean();
			answer = mode ? a + b : a - b;
			sign = mode ? "+" : "-";
		}
		else if (mode == 2)
		{
			answer = a * b;
			sign = CDOT;
		}
		else
		{
			answer = a;
			a *= b
			sign = ":";
		}

		a = round(a);
		b = round(b);
		answer = round(answer);
		const task = Lib.Div([], [`${a} ${sign} ${b} = `, Lib.Span("taskInput")]);
		return { task, answer };
	}
}

export class TaskArifmetika3 extends TaskFormulas
{
	static Name = "Арифметика 3";
	static DefCount = 6;
	protected Cols = 2;
	protected genTask()
	{
		if (Lib.random_boolean())
		{
			let a = Lib.randomInt(100, 10000) / (Math.pow(10, Lib.randomInt(2)));
			let b = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
			let c = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
			let answer = 0;
			const mode1 = Lib.random_boolean();
			const mode2 = Lib.random_boolean();
			const sign1 = mode1 ? "+" : "-";
			const sign2 = mode2 ? CDOT : ":";
			if (!mode2) b *= c;
			const v = mode2 ? b * c : b / c;
			answer = mode1 ? a + v : a - v;

			a = round(a);
			b = round(b);
			c = round(c);
			answer = round(answer);
			const task = Lib.Div([], [`${a} ${sign1} ${b} ${sign2} ${c} = `, Lib.Span("taskInput")]);
			return { task, answer };
		}
		else
		{
			let a = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
			let b = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
			let c = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
			let d = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
			let answer = 0;
			const mode1 = Lib.random_boolean();
			const mode2 = Lib.random_boolean();
			const mode3 = Lib.random_boolean();
			const sign1 = mode1 ? CDOT : ":";
			const sign2 = mode2 ? "+" : "-";
			const sign3 = mode3 ? CDOT : ":";
			answer = c;
			if (mode3) c *= d;
			c = mode3 ? c / d : c * d;
			b = mode2 ? b - answer : b + answer;
			answer = mode2 ? b + answer : b - answer;
			if (!mode1) a *= answer;
			answer = mode1 ? a * answer : a / answer;

			a = round(a);
			b = round(b);
			c = round(c);
			answer = round(answer);
			const task = Lib.Div([], [`${a} ${sign1} (${b} ${sign2} ${c} ${sign3} ${d}) = `, Lib.Span("taskInput")]);
			return { task, answer };
		}
	}
}

export const TASKS = {
	TaskAdd2,
	TaskArifmetika1,
	TaskArifmetika2,
	TaskArifmetika3,
}
