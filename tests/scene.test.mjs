import test from "node:test";
import assert from "node:assert/strict";
import {
  SCENE_TYPE, createScene, validateScene, addFacade, moveCorner,
  removeFacade, updateFacade, serializeScene, deserializeScene,
  nearestCorner, facadeAtPoint, MAX_FACADES, MAX_SCENE_BYTES
} from "../src/core/scene.mjs";

const image = {
  name: "scene.jpg", size: 8421, width: 1920, height: 1080,
  sha256: "ab".repeat(32)
};
const quad = [
  { x: 0.1, y: 0.1 }, { x: 0.6, y: 0.1 },
  { x: 0.6, y: 0.8 }, { x: 0.1, y: 0.8 }
];
const quad2 = [
  { x: 0.62, y: 0.1 }, { x: 0.9, y: 0.2 },
  { x: 0.9, y: 0.7 }, { x: 0.62, y: 0.8 }
];

test("scene schema round-trips deterministically with SHA-256 binding", () => {
  const empty = createScene(image);
  assert.equal(empty.type, SCENE_TYPE);
  const { scene } = addFacade(empty, quad);
  const json = serializeScene(scene);
  const loaded = deserializeScene(json, image);
  assert.deepEqual(loaded, scene);
  assert.equal(empty.facades.length, 0); // immutable updates
  assert.throws(() => deserializeScene(json, { ...image, sha256: "ff".repeat(32) }));
  assert.throws(() => deserializeScene(json, { ...image, width: 800 }));
  assert.throws(() => deserializeScene("{", image), SyntaxError);
});

test("supports adding, editing, and removing independent facades", () => {
  let scene = createScene(image);
  const first = addFacade(scene, quad, "machiya", .7);
  scene = first.scene;
  const second = addFacade(scene, quad2, "matsuri", .5);
  scene = second.scene;
  assert.equal(scene.facades.length, 2);
  assert.notEqual(first.id, second.id);
  scene = updateFacade(scene, first.id, { style: "matsuri", opacity: .35 });
  assert.equal(scene.facades[0].opacity, .35);
  assert.equal(scene.facades[1].opacity, .5);
  scene = moveCorner(scene, first.id, 0, { x: .08, y: .08 });
  assert.deepEqual(scene.facades[0].quad[0], { x: .08, y: .08 });
  assert.deepEqual(scene.facades[1].quad, quad2);
  scene = removeFacade(scene, first.id);
  assert.equal(scene.facades.length, 1);
  assert.equal(scene.facades[0].id, second.id);
});

test("rejects broken geometry, invalid styles, duplicates and unsupported versions", () => {
  const { scene, id } = addFacade(createScene(image), quad);
  assert.throws(() => moveCorner(scene, id, 0, { x: .95, y: .95 }));
  assert.throws(() => moveCorner(scene, id, 4, { x: 0, y: 0 }));
  assert.throws(() => updateFacade(scene, id, { style: "unverified" }));
  assert.throws(() => updateFacade(scene, id, { opacity: -1 }));
  assert.throws(() => addFacade(scene, quad2, "not-a-style"));
  assert.throws(() => validateScene({ ...scene, version: 999 }));
  assert.throws(() => validateScene({ ...scene, facades: [scene.facades[0], scene.facades[0]] }));
  assert.throws(() => validateScene({ ...scene, facades: Array(MAX_FACADES + 1).fill(scene.facades[0]) }));
  assert.throws(() => deserializeScene(" ".repeat(MAX_SCENE_BYTES + 1), image));
  assert.throws(() => createScene({ ...image, sha256: "no" }));
});

test("hit tests corners at CSS pixel scales and checks overlaid quadrilaterals", () => {
  const a = addFacade(createScene(image), quad);
  const b = addFacade(a.scene, quad); // same quad covers first
  assert.deepEqual(nearestCorner(b.scene, { x: .101, y: .101 }, 1000, 600, a.id),
    { facadeId: a.id, index: 0 });
  assert.equal(facadeAtPoint(b.scene, { x: .3, y: .3 }), b.id);
  assert.equal(facadeAtPoint(b.scene, { x: .95, y: .95 }), null);
  assert.equal(nearestCorner(b.scene, { x: .3, y: .3 }, 1000, 600), null);
  assert.equal(nearestCorner(b.scene, { x: .1, y: .1 }, 0, 600), null);
});

test("caps facet count and avoids silent overflow", () => {
  let scene = createScene(image);
  for (let i = 0; i < MAX_FACADES; i++) {
    scene = addFacade(scene, quad).scene;
  }
  assert.equal(scene.facades.length, MAX_FACADES);
  assert.throws(() => addFacade(scene, quad));
});
