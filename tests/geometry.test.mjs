import test from "node:test";
import assert from "node:assert/strict";
import { bilinear, signedArea, toPixelQuad, validateQuad } from "../src/core/geometry.mjs";

const rectangle = [{x:.1,y:.2},{x:.9,y:.2},{x:.9,y:.8},{x:.1,y:.8}];

test("accepts a convex clockwise facade", () => {
  assert.equal(validateQuad(rectangle),rectangle);
  assert.ok(Math.abs(signedArea(rectangle) - .48) < 1e-12);
});

test("rejects incomplete, minuscule, inverted and crossing polygons", () => {
  assert.throws(() => validateQuad(rectangle.slice(0,3)));
  assert.throws(() => validateQuad([{x:0,y:0},{x:0.01,y:0},{x:0.01,y:0.01},{x:0,y:0.01}]));
  assert.throws(() => validateQuad([rectangle[0],rectangle[3],rectangle[2],rectangle[1]]));
  assert.throws(() => validateQuad([rectangle[0],rectangle[2],rectangle[1],rectangle[3]]));
});

test("rejects coordinates outside image or nonfinite", () => {
  assert.throws(() => validateQuad([{x:-.01,y:0},...rectangle.slice(1)]));
  assert.throws(() => validateQuad([{x:NaN,y:0},...rectangle.slice(1)]));
});

test("bilinear coordinates and dimensions", () => {
  const center = bilinear(rectangle,.5,.5);
  assert.ok(Math.abs(center.x-.5)<1e-12);
  assert.ok(Math.abs(center.y-.5)<1e-12);
  const px=toPixelQuad(rectangle,1000,500);
  assert.deepEqual(px[0],{x:100,y:100});
  assert.throws(() => toPixelQuad(rectangle,0,500));
});
