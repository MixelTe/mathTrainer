import { round } from "./functions.js";
import * as Lib from "./littleLib.js";
export class Task {
    static Name = "Task";
    static DefCount = 1;
    count = 1;
    task = Lib.Div();
    answer = Lib.Div();
    genTask() {
        const task = Lib.Div([], "1 + 1 = ?");
        const answer = Lib.Div([], "2");
        return { task, answer };
    }
    getTask() {
        const { task, answer } = this.genTask();
        this.task = task;
        this.answer = typeof answer == "number" ? Lib.Div([], `${answer}`) : answer;
        return this.task;
    }
    getAnswer() {
        return this.answer;
    }
}
export class TaskFormulas extends Task {
    static Name = "Formulas";
    static DefCount = 13;
    Title = "";
    Cols = 3;
    genFormula() {
        const task = Lib.Div([], "1 + 1 = ?");
        const answer = 2;
        return { task, answer };
    }
    genTask() {
        const el = Lib.Div("taskFormulas");
        el.style.setProperty("--cols", `${this.Cols}`);
        const answerEl = Lib.Div("taskFormulas");
        answerEl.style.setProperty("--cols", `${this.Cols}`);
        const k1 = Math.floor(this.count / this.Cols);
        const k2 = this.count % this.Cols;
        for (let i = 0; i < this.count; i++) {
            const { task, answer } = this.genFormula();
            const ansEl = typeof answer == "number" ? Lib.Div([], `${answer}`) : answer;
            // const n = i % this.Cols + Math.floor(i / this.Cols);
            const n = i % this.Cols * k1 + 1 + Math.floor(i / this.Cols) + Math.min(i % this.Cols, k2);
            el.appendChild(Lib.Div([], [
                Lib.Div([], `${n})`),
                task,
            ]));
            answerEl.appendChild(Lib.Div([], [
                Lib.Div([], `${n})`),
                ansEl,
            ]));
        }
        return {
            task: Lib.Div([], [
                Lib.Div([], this.Title),
                el,
            ]),
            answer: answerEl,
        };
    }
}
export function frac(a, b, one = true, plus = false) {
    if (a == 0)
        return Lib.Span([], (plus ? "+ " : "") + "0");
    const minus = a * b < 0;
    a = Math.abs(a);
    b = Math.abs(b);
    if (round(a / b) == 1)
        return one ? Lib.Span([], (minus ? "-" : "") + (plus ? (minus ? " " : "+ ") : "") + "1") : Lib.Span([], minus ? "-" : "");
    for (let i = 2; i <= Math.min(a, b); i++) {
        if (a % i == 0 && b % i == 0) {
            a /= i;
            b /= i;
            i--;
        }
    }
    if (b == 1)
        return Lib.Span([], (minus ? "-" : "") + (plus ? (minus ? " " : "+ ") : "") + a);
    return Lib.Span([], [
        Lib.Span([], (minus ? "- " : "") + (plus ? (minus ? "" : "+ ") : "")),
        Lib.Div("frac", [
            Lib.Span([], `${a}`),
            Lib.Span("frac__line"),
            Lib.Span([], `${b}`),
        ]),
    ]);
}
