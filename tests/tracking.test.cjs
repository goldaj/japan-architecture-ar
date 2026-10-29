const test=require("node:test"),assert=require("node:assert/strict"),T=require("../web/tracking.js");
function grid(w,h){const a=new Uint8Array(w*h);for(let y=0;y<h;y++)for(let x=0;x<w;x++)a[y*w+x]=(x*x+3*y*y+11*x*y)%251;return a;}
test("grayscale converts input",()=>{assert.deepEqual([...T.gray(new Uint8ClampedArray([255,0,0,255,0,255,0,255]),2,1)],[76,150]);});
test("block tracker detects pure translation",()=>{const w=80,h=60,ref=grid(w,h),cur=new Uint8Array(w*h);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const nx=x+3,ny=y-2;if(nx>=0&&nx<w&&ny>=0&&ny<h)cur[ny*w+nx]=ref[y*w+x];}
 const r=T.estimate(ref,cur,w,h,40,30,6,6);assert.equal(r.dx,3);assert.equal(r.dy,-2);assert.equal(r.error,0);});
test("tracker rejects flat input",()=>{const a=new Uint8Array(80*60).fill(100);assert.equal(T.estimate(a,a,80,60,40,30),null);});
test("tracker rejects unmatchable noisy target",()=>{const a=grid(80,60),b=new Uint8Array(80*60).fill(0);assert.equal(T.estimate(a,b,80,60,40,30),null);});
test("tracking near boundaries safely returns null",()=>{const a=grid(80,60);assert.equal(T.estimate(a,a,80,60,2,2),null);});
test("summary computes p95 without modifying samples",()=>{const a=[10,1,3,2,100],before=a.slice();const s=T.summarize(a);assert.equal(s.average,23.2);assert.equal(s.p95,100);assert.deepEqual(a,before);});
test("summary allows empty list",()=>assert.deepEqual(T.summarize([]),{count:0,average:0,p95:0}));
