"use strict";(self.webpackChunkecom=self.webpackChunkecom||[]).push([[2264],{82264:(e,t,l)=>{l.r(t),l.d(t,{default:()=>o});var n=l(11504),c=l.n(n),r=l(27768),a=l(53740),i=l(8616),d=l(93736);const o=()=>c().createElement("div",null,c().createElement(r.c,null),c().createElement("div",{className:"flex items-start justify-between w-full dasboard-user-width-mobile"},c().createElement("div",{className:"800px:w-[330px] dashboard-side-bar-res"},c().createElement(a.c,{active:11})),c().createElement(i.c,{active:4})),c().createElement(d.c,null))},8616:(e,t,l)=>{l.d(t,{c:()=>E});var n=l(11504),c=l.n(n),r=l(44484),a=l(96800),i=l(64768),d=l(66564),o=l(85976),u=l(16176),m=l(89340),s=l(85704),p=l(20192),h=l(60580),f=l(87636);const E=e=>{let{active:t}=e;const{products:l,isLoading:E}=(0,a.w1)((e=>e.products)),{seller:v}=(0,a.w1)((e=>e.seller)),b=(0,o.U)(),S=(0,a.OY)();(0,n.useEffect)((()=>{S((0,u._Q)(v._id))}),[S,v._id]);const g=e=>{S((0,u.WS)(e)).then((e=>{m.cp.success("Product Deleted Successfully"),setTimeout((()=>{window.location.reload()}),3e3)})).catch((e=>{m.cp.error("Error accored")}))},w=[{field:"name",headerName:"Name",minWidth:180,flex:1.4},{field:"price",headerName:"Price",minWidth:100,flex:.6},{field:"Stock",headerName:"Stock",type:"number",minWidth:80,flex:.5},{field:"sold",headerName:"Sold out",type:"number",minWidth:130,flex:.6},{field:"Preview",flex:.8,minWidth:100,headerName:"",type:"number",sortable:!1,renderCell:e=>{var t;return c().createElement(c().Fragment,null,c().createElement(i.cH,{to:"/product/".concat(null==e||null===(t=e.row)||void 0===t?void 0:t.slug)},c().createElement(p.c,null,c().createElement(r.opb,{size:20}))))}},{field:"Status",headerName:"Status",type:"number",minWidth:130,flex:.6},{field:"Edit",flex:1,minWidth:150,headerName:"Edit",type:"number",sortable:!1,renderCell:e=>c().createElement(c().Fragment,null,c().createElement(i.cH,{to:"/product/edit/".concat(e.id)},c().createElement(p.c,null,"Edit")))},{field:"Delete",flex:.8,minWidth:120,headerName:"",type:"number",sortable:!1,renderCell:e=>c().createElement(c().Fragment,null,c().createElement(p.c,{onClick:()=>g(e.id)},c().createElement(r.ekA,{size:20})))}],y=[{field:"name",headerName:"Name",minWidth:180,flex:1.4},{field:"price",headerName:"Price",minWidth:100,flex:.6},{field:"Stock",headerName:"Stock",type:"number",minWidth:80,flex:.5},{field:"Preview",flex:.8,minWidth:100,headerName:"",type:"number",sortable:!1,renderCell:e=>c().createElement(c().Fragment,null,c().createElement(i.cH,{to:"/product/".concat(null==e?void 0:e.slug)},c().createElement(p.c,null,c().createElement(r.opb,{size:20}))))},{field:"Status",headerName:"Status",type:"number",minWidth:130,flex:.6},{field:"Edit",flex:1,minWidth:150,headerName:"Edit",type:"number",sortable:!1,renderCell:e=>c().createElement(c().Fragment,null,c().createElement(i.cH,{to:"/product/edit/".concat(e.id)},c().createElement(p.c,null,"Edit")))},{field:"",flex:.8,minWidth:120,headerName:"",type:"number",sortable:!1,renderCell:e=>c().createElement(c().Fragment,null,c().createElement(p.c,{onClick:()=>(async e=>{await d.c.put("".concat(s.Yb,"/product/shop/resend/").concat(e)).then((async e=>{"Success"===e.data.Status&&(await m.cp.success("Request Sent Successfully"),setTimeout((()=>{window.location.reload()}),3e3))})).catch((e=>{m.cp.error(e.response.data.message)}))})(e.id)},"Resend"))},{field:"Delete",flex:.8,minWidth:120,headerName:"",type:"number",sortable:!1,renderCell:e=>c().createElement(c().Fragment,null,c().createElement(p.c,{onClick:()=>g(e.id)},c().createElement(r.ekA,{size:20})))}],k=[],x=[],N=[],W=[];return l&&l.forEach((e=>{var t;e.draft||k.push({id:e._id,name:e.name,slug:null==e?void 0:e.slug,price:"".concat(null==b||null===(t=b.currency)||void 0===t?void 0:t.Symbol)+"".concat(e.showInputs?e.colorInputs[0].discountPrice:e.discountPrice),Stock:e.stock,sold:null==e?void 0:e.sold_out,Status:e.approved?"Approved":e.rejected?"Rejected":"Pending"})})),l&&l.forEach((e=>{var t;e.approved&&x.push({id:e._id,name:e.name,slug:null==e?void 0:e.slug,price:"".concat(null==b||null===(t=b.currency)||void 0===t?void 0:t.Symbol," ")+"".concat(e.showInputs?e.colorInputs[0].discountPrice:e.discountPrice),Stock:e.stock,sold:null==e?void 0:e.sold_out,Status:"Approved"})})),l&&l.forEach((e=>{var t;e.rejected&&N.push({id:e._id,name:e.name,price:"".concat(null==b||null===(t=b.currency)||void 0===t?void 0:t.Symbol," ")+"".concat(e.showInputs?e.colorInputs[0].discountPrice:e.discountPrice),Stock:e.stock,Status:"Rejected"})})),l&&l.forEach((e=>{var t;!1===e.rejected&&!1===e.approved&&!1===e.draft&&W.push({id:e._id,name:e.name,price:"".concat(null==b||null===(t=b.currency)||void 0===t?void 0:t.Symbol," ")+"".concat(e.showInputs?e.colorInputs[0].discountPrice:e.discountPrice),Stock:e.stock,sold:null==e?void 0:e.sold_out,Status:"Pending"})})),c().createElement(c().Fragment,null,E?c().createElement(h.c,null):c().createElement("div",{className:"w-full mx-8 pt-1 mt-10 bg-white outer1-div"},c().createElement("div",{className:"flex w-full items-center justify-between"},c().createElement("div",{className:"w-full flex seller-req-flex-div"})),1===t&&c().createElement(c().Fragment,null,c().createElement(f.op,{rows:k,columns:w,pageSize:10,disableSelectionOnClick:!0,autoHeight:!0})),2===t&&c().createElement(c().Fragment,null," ",c().createElement(f.op,{rows:x,columns:w,pageSize:10,disableSelectionOnClick:!0,autoHeight:!0})),3===t&&c().createElement(c().Fragment,null,c().createElement(f.op,{rows:N,columns:y,pageSize:10,disableSelectionOnClick:!0,autoHeight:!0})),4===t&&c().createElement(c().Fragment,null,c().createElement(f.op,{rows:W,columns:w,pageSize:10,disableSelectionOnClick:!0,autoHeight:!0}))))}}}]);