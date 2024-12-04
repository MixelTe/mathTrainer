import * as Lib from "./littleLib.js";
import { CDOT, round } from "./functions.js";

export type Sign = "+" | "-" | "*" | "/";

interface NodeSingle
{
	v: number,
	left?: Node,
	right?: Node,
	sign?: Sign,
}
interface NodeDouble
{
	v: number,
	left: Node,
	right: Node,
	sign: Sign,
}
export type Node = NodeSingle | NodeDouble;

export function formulaTree(num: number, depth: number, int = true): Node
{
	if (depth <= 0) return { v: num };
	const sign = Lib.chooseRandom(["+", "-", "*", "/"]) as Sign;
	let a = 0, b = 0;
	switch (sign)
	{
		case "+":
			a = randomBig(int);
			b = num - a;
			break;
		case "-":
			a = randomBig(int);
			b = a - num;
			break;
		case "/":
			b = randomSmall(int);
			a = num * b;
			break;
		case "*":
			const ds = [];
			const d = Math.floor(num) != num;
			if (d) num *= 1000;
			for (let i = 2; i < Math.abs(num); i++)
				if (num % i == 0)
					ds.push(i);
			if (ds.length == 0) ds.push(1);
			if (d) num /= 1000;
			a = num / Lib.chooseRandom(ds);
			b = num / a;
			if (!int && !d)
			{
				a *= 10;
				b /= 10;
			}
			// console.log(num, ds, a, b);
			break;

		default:
			break;
	}
	depth--;
	const d = Math.floor(depth / 2);
	return {
		v: num,
		sign,
		left: formulaTree(round(a), d, int),
		right: formulaTree(round(b), depth - d, int),
	};
}

export function treeToString(tree: Node, _top = true): string
{
	if (!tree.sign) return `${tree.v}`;
	let sign = {
		"+": "+",
		"-": "-",
		"*": CDOT,
		"/": ":",
	}[tree.sign];
	let right = treeToString(tree.right!, false);
	let brackets = false;
	switch (tree.sign)
	{
		case "+":
		case "-":
			brackets = !_top;
			if (right[0] == "-")
			{
				sign = sign == "+" ? "-" : "+";
				right = right.slice(1);
			}
		case "/":
			if (tree.right!.sign == "*" || tree.right!.sign == "/")
				right = `(${right})`;
			break;
		case "*":
			break;
	}
	const r = `${treeToString(tree.left!, false)} ${sign} ${right}`;
	if (brackets) return `(${r})`;
	return r;
}

function randomSmall(int: boolean)
{
	let r = Lib.randomInt(11, 100);
	if (!int) r /= Math.pow(10, Lib.randomInt(3));
	return r;
}
function randomBig(int: boolean)
{
	let r = Lib.randomInt(100, 10000);
	if (!int) r /= Math.pow(10, Lib.randomInt(3));
	return r;
}