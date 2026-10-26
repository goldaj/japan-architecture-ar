import test from "node:test";
import assert from "node:assert/strict";
import { PRESETS, buildEditPrompt, parseOptions } from "../src/ai/prompt.mjs";
test("prompts transform entire outdoor scene while retaining geometry",() => {
  for(const p of Object.keys(PRESETS)){
    const x=buildEditPrompt({preset:p,extra:"Keep the foreground table."});
    assert.match(x,/buildings, streets, trees/i);
    assert.match(x,/photorealistic/i);
    assert.match(x,/Keep the foreground table/);
  }
});
test("foreground policy and provider options",() => {
  assert.match(buildEditPrompt({preserveForeground:true}),/glass doors/i);
  assert.match(buildEditPrompt({preserveForeground:false}),/restyle foreground/i);
  assert.equal(parseOptions({model:"gpt-image-2.5-sunburst",quality:"high"}).model,"gpt-image-2.5-sunburst");
  assert.throws(()=>parseOptions({model:"gpt-image-1"}));
  assert.throws(()=>parseOptions({preset:"unknown"}));
  assert.throws(()=>parseOptions({quality:"unlimited"}));
  assert.throws(()=>buildEditPrompt({extra:"x".repeat(1501)}));
});
