import { formulaTree, treeToString } from "./formulaTree.js";
import { CDOT, round } from "./functions.js";
import * as Lib from "./littleLib.js";
import { frac, TaskFormulas } from "./task.js";
export class TaskAdd2 extends TaskFormulas {
    static Name = "Сложение двузначных";
    static DefCount = 12;
    Cols = 4;
    genFormula() {
        const a = Lib.randomInt(1, 100);
        const b = Lib.randomInt(1, 100);
        const answer = a + b;
        const task = Lib.Div([], [`${a} + ${b} = `, Lib.Span("taskInput")]);
        return { task, answer };
    }
}
export class TaskArifmetika1 extends TaskFormulas {
    static Name = "Арифметика 1";
    static DefCount = 9;
    Cols = 3;
    genFormula() {
        const mode = Lib.randomInt(1, 4);
        const r = mode == 1 ? [100, 10000] : [10, 100];
        let a = Lib.randomInt(r[0], r[1]);
        let b = Lib.randomInt(r[0], r[1]);
        let answer = 0;
        let sign = "";
        if (mode == 1) {
            const mode = Lib.random_boolean();
            answer = mode ? a + b : a - b;
            sign = mode ? "+" : "-";
        }
        else if (mode == 2) {
            answer = a * b;
            sign = CDOT;
        }
        else {
            answer = a;
            a *= b;
            sign = ":";
        }
        a = round(a);
        b = round(b);
        answer = round(answer);
        const task = Lib.Div([], [`${a} ${sign} ${b} = `, Lib.Span("taskInput")]);
        return { task, answer };
    }
}
export class TaskArifmetika2 extends TaskFormulas {
    static Name = "Арифметика 2";
    static DefCount = 9;
    Cols = 3;
    genFormula() {
        const mode = Lib.randomInt(1, 4);
        const r = mode == 1 ? [100, 10000] : [10, 100];
        let a = Lib.randomInt(r[0], r[1]) / (Math.pow(10, Lib.randomInt(3)));
        let b = Lib.randomInt(r[0], r[1]) / (Math.pow(10, Lib.randomInt(3)));
        let answer = 0;
        let sign = "";
        if (mode == 1) {
            const mode = Lib.random_boolean();
            answer = mode ? a + b : a - b;
            sign = mode ? "+" : "-";
        }
        else if (mode == 2) {
            answer = a * b;
            sign = CDOT;
        }
        else {
            answer = a;
            a *= b;
            sign = ":";
        }
        a = round(a);
        b = round(b);
        answer = round(answer);
        const task = Lib.Div([], [`${a} ${sign} ${b} = `, Lib.Span("taskInput")]);
        return { task, answer };
    }
}
export class TaskArifmetika3 extends TaskFormulas {
    static Name = "Арифметика 3";
    static DefCount = 6;
    Cols = 2;
    genFormula() {
        if (Lib.random_boolean()) {
            let a = Lib.randomInt(100, 10000) / (Math.pow(10, Lib.randomInt(2)));
            let b = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
            let c = Lib.randomInt(2, 100) / (Math.pow(10, Lib.randomInt(2)));
            let answer = 0;
            const mode1 = Lib.random_boolean();
            const mode2 = Lib.random_boolean();
            const sign1 = mode1 ? "+" : "-";
            const sign2 = mode2 ? CDOT : ":";
            if (!mode2)
                b *= c;
            const v = mode2 ? b * c : b / c;
            answer = mode1 ? a + v : a - v;
            a = round(a);
            b = round(b);
            c = round(c);
            answer = round(answer);
            const task = Lib.Div([], [`${a} ${sign1} ${b} ${sign2} ${c} = `, Lib.Span("taskInput")]);
            return { task, answer };
        }
        else {
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
            if (mode3)
                c *= d;
            c = mode3 ? c / d : c * d;
            b = mode2 ? b - answer : b + answer;
            answer = mode2 ? b + answer : b - answer;
            if (!mode1)
                a *= answer;
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
export class TaskArifmetika4 extends TaskFormulas {
    static Name = "Арифметика 4";
    static DefCount = 4;
    Cols = 1;
    genFormula() {
        const tree = formulaTree(Lib.randomInt(-1000, 1000), 8, false);
        const answer = round(tree.v);
        const task = Lib.Div([], [treeToString(tree), " = ", Lib.Span("taskInput")]);
        return { task, answer };
    }
}
export class TaskLinearSystem extends TaskFormulas {
    static Name = "Пересечение линейных графиков";
    static DefCount = 4;
    Title = "Найдите координаты точки пересечения графиков функций";
    Cols = 2;
    genFormula() {
        const k1 = Lib.randomInt(11, 100) / 10;
        const k2 = (() => { let k = k1; while (k == k1)
            k = Lib.randomInt(11, 100) / 10; return k; })();
        const xk = (k1 - k2) * Lib.randomInt(-10, 10);
        const b1 = Lib.randomInt(11, 100) / 10;
        const b2 = xk + b1;
        // y = k1*x + b1
        // y = k2*x + b2
        const x = (b2 - b1) / (k1 - k2);
        const y = k1 * x + b1;
        const renderV = (v) => v > 0 ? `+ ${v}` : `- ${-v}`;
        const answer = Lib.Div([], `x = ${round(x)}, y = ${round(y)}`);
        const task = Lib.Div([], [
            Lib.Span("mgr", `y = ${round(k1)}x ${renderV(round(b1))};`),
            Lib.Span([], `y = ${round(k2)}x ${renderV(round(b2))}`),
        ]);
        return { task, answer };
    }
}
export class TaskLinearGraph extends TaskFormulas {
    static Name = "Построение лин. графика по точкам";
    static DefCount = 3;
    Title = "Задайте линейную функцию проходящую через данные точки";
    Cols = 3;
    genFormula() {
        const x1 = Lib.randomInt(-10, 11);
        const y1 = Lib.randomInt(-10, 11);
        const genV = (ne) => { let v = ne; while (v == ne)
            v = Lib.randomInt(-10, 11); return v; };
        const x2 = genV(x1);
        const y2 = genV(y1);
        const kt = (y2 - y1);
        const kb = (x2 - x1);
        const bt = y1 * kb - x1 * kt;
        const bb = kb;
        const answer = Lib.Div([], [
            Lib.Span([], `y = `),
            frac(kt, kb, false),
            Lib.Span([], `x `),
            frac(bt, bb, true, true),
        ]);
        const task = Lib.Div([], [
            Lib.Span("mgr", `A(${round(x1)}; ${round(y1)}),`),
            Lib.Span([], `B(${round(x2)}; ${round(y2)})`),
        ]);
        return { task, answer };
    }
}
export const TASKS = {
    TaskAdd2,
    TaskArifmetika1,
    TaskArifmetika2,
    TaskArifmetika3,
    TaskArifmetika4,
    TaskLinearSystem,
    TaskLinearGraph,
};
