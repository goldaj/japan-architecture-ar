import test from "node:test";
import assert from "node:assert/strict";
import {StageState} from "../stage-state.mjs";
import {buildOffer,icePatch} from "../scope-bridge.mjs";

test("reveal cuts to original immediately, even if AI is frozen",()=>{
  const s=new StageState({staleAfterMs:100});
  s.onGeneratedFrame(10);
  s.enable();
  assert.equal(s.source(50),"generated");
  s.reveal();
  assert.equal(s.source(50),"original");
  s.enable();
  assert.equal(s.source(111),"original");
  assert.equal(s.degraded(111),true);
  s.onGeneratedFrame(120);
  assert.equal(s.source(121),"generated");
  s.clearGenerated();
  assert.equal(s.source(121),"original");
});
test("Scope offer ensures video input, stable prompt and candidates",()=>{
  const p=buildOffer("v=0","offer","Japan scene");
  assert.equal(p.initialParameters.input_mode,"video");
  assert.deepEqual(p.initialParameters.prompts,[{text:"Japan scene",weight:1}]);
  assert.throws(()=>buildOffer("v=0","answer","ok"));
  assert.throws(()=>buildOffer("v=0","offer",""));
  assert.deepEqual(icePatch({candidate:"candidate:1",sdpMid:"0",sdpMLineIndex:0}),
    {candidates:[{candidate:"candidate:1",sdpMid:"0",sdpMLineIndex:0}]});
});
