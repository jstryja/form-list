(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8146)}])},8146:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return C}});var r=n(5893),l=n(9163),s=n(442),i=n(1230),a=n(5746),o=n(6713),d=n(137),c=n(4749),m=n(4494),p=n(3671),x=n.n(p),u=n(7294);let f=e=>{let t=[],n=new Map;for(let r of e){let e=r.profession,l={title:r.title,street:r.street,city:r.city,person:r.person,phone:r.phone,email:r.email};if(n.has(e)){let t=n.get(e);t.firms.push(l)}else{let r={profession:e,firms:[l]};t.push(r),n.set(e,r)}}return t};var h=n(5733),j=n.n(h);let b=e=>{let{}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z.Item,{label:"Datum, kdy pos\xedl\xe1m dopis",name:"sendDate",children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)(s.Z.Item,{label:"N\xe1zev akce",name:"title",children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)(s.Z.Item,{label:"Předpokl\xe1dan\xfd term\xedn realizace",name:"estimateDate",children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)(s.Z.Item,{label:"M\xedsto plněn\xed",name:"place",children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)(s.Z.Item,{label:"Datum do kdy maj\xed poslat cenovou nab\xeddku",name:"deadlineDate",children:(0,r.jsx)(m.Z,{})})]})};var Z=n(3704),g=n(465);let{Dragger:y}=Z.Z,v=e=>{let{update:t}=e,[n,l]=(0,u.useState)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(y,{customRequest:e=>{let{onSuccess:t}=e;t&&t("ok")},beforeUpload:e=>{let t="text/csv"===e.type;return t||g.ZP.error("".concat(e.name," nen\xed csv soubor.")),t||Z.Z.LIST_IGNORE},maxCount:1,onChange:e=>{if("done"===e.file.status){let t=new FileReader;t.onload=e=>{var t;e.preventDefault(),"string"==typeof(null===(t=e.target)||void 0===t?void 0:t.result)&&l(e.target.result)},e.file.originFileObj&&t.readAsText(e.file.originFileObj)}},children:(0,r.jsx)("p",{className:"ant-upload-text",children:"Nahrej CSV"})}),(0,r.jsx)(c.ZP,{type:"primary",onClick:()=>{n?(localStorage.setItem("firm-list",n),console.log("file",n),g.ZP.success("Soubor nahr\xe1n.")):g.ZP.error("Pr\xe1zdn\xfd soubor"),t()},disabled:!n,children:"ULOŽIT CSV"})]})};var k=n(1876).Buffer;let{Dragger:w}=Z.Z,F=e=>{let{setFieldValue:t,isSubmitting:n}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z.Item,{name:"template",children:(0,r.jsx)(w,{customRequest:e=>{let{onSuccess:t}=e;t&&t("ok")},beforeUpload:e=>{let t="application/vnd.openxmlformats-officedocument.wordprocessingml.document"===e.type;return t||g.ZP.error("".concat(e.name," nen\xed docx soubor.")),t||Z.Z.LIST_IGNORE},maxCount:1,onChange:e=>{if("done"===e.file.status){let n=new FileReader;n.onload=async e=>{var n;e.preventDefault();let r=k.from(null===(n=e.target)||void 0===n?void 0:n.result);t("template",r)},e.file.originFileObj&&n.readAsArrayBuffer(e.file.originFileObj)}},children:(0,r.jsx)("p",{className:"ant-upload-text",children:"Nahrej šablonu .docx"})})}),(0,r.jsx)(c.ZP,{disabled:n,htmlType:"submit",children:"St\xe1hnout zip"})]})};var P=n(3162),S=n(3024),I=n.n(S);let{Panel:_}=l.Z;function C(){let[e,t]=(0,u.useState)(),[n,p]=(0,u.useState)([]),[h,Z]=(0,u.useState)(!1),g=()=>{let e=localStorage.getItem("firm-list");e&&x()().fromString(e).then(e=>{t(f(e)[0]),p(f(e))})};(0,u.useEffect)(()=>{g()},[]);let y=new(j()),[k]=s.Z.useForm(),w=async e=>{Z(!0);let t=n.map(async t=>{let{sendDate:n,title:r,estimateDate:l,place:s,deadlineDate:i,workType:a,template:o}=e,d=y.folder(t.profession),c=t.firms.map(async e=>new Promise(async c=>{let m=await I()({template:o,data:{sendDate:n,title:r,estimateDate:l,place:s,deadlineDate:i,workType:a[t.profession],firmTitle:e.title||"",firmStreet:e.street||"",firmCity:e.city||"",firmPerson:e.person||"",firmPhone:e.phone||"",firmEmail:e.email||""}});null==d||d.file("".concat(e.title,".docx"),m),c()}));return await Promise.all(c),c});await Promise.all(t),console.log("done"),y.generateAsync({type:"blob"}).then(function(e){(0,P.saveAs)(e,"dopisy.zip")}),Z(!1)};return(0,r.jsx)("div",{style:{height:"100vh",background:"white",padding:"1rem"},children:(0,r.jsxs)(s.Z,{form:k,onFinish:w,labelCol:{span:18},wrapperCol:{span:16},initialValues:{template:null},children:[(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(a.Z,{children:(0,r.jsxs)(o.Z,{children:[(0,r.jsx)(v,{update:g}),(0,r.jsx)(F,{setFieldValue:k.setFieldValue,isSubmitting:h}),(0,r.jsx)(b,{})]})}),(0,r.jsx)(d.Z,{})]}),(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(a.Z,{span:4,children:(0,r.jsx)(o.Z,{direction:"vertical",children:n.map((n,l)=>(0,r.jsxs)(c.ZP,{block:!0,type:n.profession===(null==e?void 0:e.profession)?"primary":"default",style:{display:"block",textAlign:"left"},onClick:()=>{t(n)},children:[l+1,". ",n.profession]},n.profession))})}),(0,r.jsx)(a.Z,{span:1,children:(0,r.jsx)(d.Z,{type:"vertical",style:{height:"100%"}})}),(0,r.jsx)(a.Z,{span:18,children:n.map(t=>{var n;return(0,r.jsxs)("div",{style:{display:t.profession===(null==e?void 0:e.profession)?"block":"none"},children:[(0,r.jsx)(s.Z.Item,{name:["workType",(null==t?void 0:t.profession)||""],children:(0,r.jsx)(m.Z,{style:{marginBottom:"0.5rem"},placeholder:"typ pr\xe1ce"})}),(0,r.jsx)(l.Z,{children:null==e?void 0:null===(n=e.firms)||void 0===n?void 0:n.map((e,t)=>(0,r.jsxs)(_,{header:e.title,children:[e.title&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("b",{children:e.title})," ",(0,r.jsx)("br",{})]}),e.street&&(0,r.jsxs)(r.Fragment,{children:[e.street,(0,r.jsx)("br",{})]}),e.city&&(0,r.jsxs)(r.Fragment,{children:[e.city,(0,r.jsx)("br",{})]}),(0,r.jsx)("br",{}),e.person&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("b",{children:e.person})," ",(0,r.jsx)("br",{})]}),e.phone&&(0,r.jsxs)(r.Fragment,{children:[e.phone,(0,r.jsx)("br",{})]}),e.email&&(0,r.jsxs)(r.Fragment,{children:[e.email,(0,r.jsx)("br",{})]})]},e.title||t))})]},t.profession)})})]})]})})}}},function(e){e.O(0,[808,198,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);