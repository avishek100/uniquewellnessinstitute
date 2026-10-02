import assert from "node:assert/strict";
import test from "node:test";

import { chessCourses } from "../src/lib/chess-courses.ts";

test("chess course catalog includes all three levels and their fees", () => {
    assert.deepEqual(
        chessCourses.map(({ name }) => name),
        ["Beginner", "Intermediate", "Advanced"],
    );
    assert.deepEqual(
        chessCourses.map(({ fee }) => fee),
        ["₹9,000 / $90", "₹14,000 / $150", "₹16,000 / $210"],
    );
});
