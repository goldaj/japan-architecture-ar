import test from "node:test";
import assert from "node:assert/strict";
import { renderOverlay, STYLES } from "../src/core/render.mjs";

const quad=[{x:.1,y:.1},{x:.9,y:.1},{x:.9,y:.9},{x:.1,y:.9}];
function fakeContext() {
  let saves=0,restores=0,fills=0,strokes=0,clips=0;
  return {
    canvas:{width:800,height:600},
    save(){saves++;}, restore(){restores++;},
    beginPath(){}, closePath(){}, moveTo(){}, lineTo(){},
    fill(){fills++;}, stroke(){strokes++;}, clip(){clips++;},
    count(){return {saves,restores,fills,strokes,clips};}
  };
}

test("exposes two deliberate styles", () => {
  assert.deepEqual(Object.keys(STYLES).sort(),["machiya","matsuri"]);
});

test("draws both style variants with balanced canvas state", () => {
  for(const style of Object.keys(STYLES)) {
    const ctx=fakeContext();
    assert.deepEqual(renderOverlay(ctx,quad,{style,opacity:0.65}),{style,opacity:.65,vertices:4});
    const c=ctx.count();
    assert.equal(c.saves,1);
    assert.equal(c.restores,1);
    assert.ok(c.fills>=4 && c.strokes>=15 && c.clips===1);
  }
});

test("validates inputs and avoids mutating canvas for invalid geometry", () => {
  const ctx=fakeContext();
  assert.throws(()=>renderOverlay(ctx,quad,{opacity:1.5}));
  assert.throws(()=>renderOverlay(ctx,quad,{style:"fictional"}));
  assert.throws(()=>renderOverlay(ctx,quad.slice(0,2)));
  assert.deepEqual(ctx.count(),{saves:0,restores:0,fills:0,strokes:0,clips:0});
});
