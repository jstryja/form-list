(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,l,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(5970)}])},5970:function(e,l,r){"use strict";r.r(l),r.d(l,{default:function(){return f}});var o=r(5893),n=r(4371),s=r(6277),i=r(6226),t=r(6713),c=r(5636),u=r(7984),d=r(137),a=r(3671),x=r.n(a),j=r(7294);let{Dragger:h}=n.Z;function f(){let[e,l]=(0,j.useState)(),[r,a]=(0,j.useState)([]),[f,p]=(0,j.useState)(),v=()=>{let e=localStorage.getItem("firm-list");e&&x()().fromString(e).then(e=>{a(e),p(e[0])})};return(0,j.useEffect)(()=>{v()},[]),(0,o.jsxs)("div",{style:{height:"100vh",background:"white",padding:"1rem"},children:[(0,o.jsxs)(s.Z,{children:[(0,o.jsx)(i.Z,{children:(0,o.jsxs)(t.Z,{children:[(0,o.jsx)(h,{beforeUpload:e=>{let l="text/csv"===e.type;return l||c.ZP.error("".concat(e.name," nen\xed csv soubor.")),l||n.Z.LIST_IGNORE},maxCount:1,onChange:e=>{if("done"===e.file.status){let r=new FileReader;r.onload=e=>{var r;e.preventDefault(),"string"==typeof(null===(r=e.target)||void 0===r?void 0:r.result)&&l(e.target.result)},e.file.originFileObj&&r.readAsText(e.file.originFileObj)}},children:(0,o.jsx)("p",{className:"ant-upload-text",children:"Nahrej CSV"})}),(0,o.jsx)(u.ZP,{type:"primary",onClick:()=>{localStorage.setItem("firm-list",e||""),console.log("file",e),c.ZP.success("Soubor nahr\xe1n."),v()},children:"ODESLAT"})]})}),(0,o.jsx)(d.Z,{})]}),(0,o.jsxs)(s.Z,{children:[(0,o.jsx)(i.Z,{span:4,children:(0,o.jsx)(t.Z,{direction:"vertical",children:r.map((e,l)=>(0,o.jsxs)(u.ZP,{type:e.profession===(null==f?void 0:f.profession)?"primary":"default",style:{display:"block"},onClick:()=>{p(e)},children:[l+1,". ",e.profession]},l))})}),(0,o.jsxs)(i.Z,{span:10,children:[(0,o.jsx)(d.Z,{type:"vertical",style:{height:"100%"}}),null==f?void 0:f.col1row1," ",(0,o.jsx)("br",{}),null==f?void 0:f.col1row2," ",(0,o.jsx)("br",{}),null==f?void 0:f.col1row3," ",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),null==f?void 0:f.col1row4," ",(0,o.jsx)("br",{}),null==f?void 0:f.col1row5," ",(0,o.jsx)("br",{}),null==f?void 0:f.col1row6," ",(0,o.jsx)("br",{})]}),(0,o.jsxs)(i.Z,{span:10,children:[(0,o.jsx)(d.Z,{type:"vertical",style:{height:"100%"}}),null==f?void 0:f.col2row1," ",(0,o.jsx)("br",{}),null==f?void 0:f.col2row2," ",(0,o.jsx)("br",{}),null==f?void 0:f.col2row3," ",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),null==f?void 0:f.col2row4," ",(0,o.jsx)("br",{}),null==f?void 0:f.col2row5," ",(0,o.jsx)("br",{}),null==f?void 0:f.col2row6," ",(0,o.jsx)("br",{})]})]})]})}}},function(e){e.O(0,[808,180,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);