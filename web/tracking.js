/* Minimal transparent local-motion tracker, not a semantic or AI scene reconstructor. */
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.JapanTracking=api;})(typeof globalThis!=="undefined"?globalThis:this,function(){
"use strict";
function gray(rgba,w,h){if(!rgba||rgba.length!==w*h*4)throw new RangeError("Invalid image dimensions");
 const out=new Uint8Array(w*h);for(let i=0;i<out.length;i++){const j=i*4;out[i]=Math.round(.299*rgba[j]+.587*rgba[j+1]+.114*rgba[j+2]);}return out;}
function estimate(prev,curr,w,h,x,y,patch=6,search=8){
 if(!Number.isInteger(w)||!Number.isInteger(h)||prev.length!==w*h||curr.length!==w*h||patch<2||search<0)throw new RangeError("Invalid tracker input");
 x=Math.round(x);y=Math.round(y);
 if(x-patch-search<0||x+patch+search>=w||y-patch-search<0||y+patch+search>=h)return null;
 const positions=[],stride=2;
 let sum=0,sumsq=0,n=0;
 for(let row=-patch;row<=patch;row+=stride)for(let col=-patch;col<=patch;col+=stride){
  const v=prev[(y+row)*w+x+col];sum+=v;sumsq+=v*v;n++;
 }
 const variance=sumsq/n-(sum/n)**2;if(variance<45)return null;
 for(let dy=-search;dy<=search;dy++)for(let dx=-search;dx<=search;dx++){
  let err=0;
  for(let row=-patch;row<=patch;row+=stride)for(let col=-patch;col<=patch;col+=stride){
   err+=Math.abs(prev[(y+row)*w+x+col]-curr[(y+row+dy)*w+x+col+dx]);
  }
  positions.push({dx,dy,error:err/n});
 }
 positions.sort((a,b)=>a.error-b.error||(a.dx*a.dx+a.dy*a.dy)-(b.dx*b.dx+b.dy*b.dy));
 const best=positions[0];if(best.error>35)return null;
 return Object.freeze({dx:best.dx,dy:best.dy,error:Math.round(best.error*100)/100,
  confidence:Math.max(0,Math.min(1,1-best.error/35))});
}
function summarize(values){
 if(!Array.isArray(values)||values.some(n=>!Number.isFinite(n)||n<0))throw new TypeError("Invalid samples");
 if(!values.length)return{count:0,average:0,p95:0};
 const ordered=[...values].sort((a,b)=>a-b);
 return{count:values.length,average:Math.round(values.reduce((a,b)=>a+b,0)/values.length*100)/100,
 p95:Math.round(ordered[Math.ceil(0.95*ordered.length)-1]*100)/100};
}
return Object.freeze({gray,estimate,summarize});
});