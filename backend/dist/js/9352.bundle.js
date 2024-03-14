"use strict";(self.webpackChunkecom=self.webpackChunkecom||[]).push([[9352],{29352:(e,t,a)=>{a.d(t,{c:()=>i});var l=a(11504),n=a.n(l),c=a(38120),r=a(64768),s=a(59480),m=a(42696),u=a(64464);const i=e=>{let{constantData:t,data:a,setFilteredData:i,styles:d,checkedItems:o,setCheckedItems:p,selectedBrands:E,selectedPriceRange:v,setSelectedBrands:h,setSelectedPriceRange:g,filteredAttr:b,setFilteredAttr:y,isVisibleData:f,toggleDataVisible:N}=e;const{handleCheckboxChange:k,handleBrandCheckBox:q,handleFilterCheckswithValues:C}=(0,m.c)(),{fetchCategory:I,fetchSubCategory:x}=(0,u.c)(),[S,B]=(0,l.useState)([]),[H,w]=(0,l.useState)([{name:"",subCategory:[]}]),[K,A]=(0,l.useState)(!1),[P,F]=(0,l.useState)([]),[R,_]=(0,l.useState)(),[D,M]=(0,l.useState)(),[V,Y]=(0,l.useState)([]);(0,l.useEffect)((()=>{const e=[...S],t=[...H],l=[...P];null==a||a.forEach((a=>{if(a.showInputs)a.colorInputs.forEach((e=>{const t=Number(e.discountPrice);l.includes(t)||l.push(t)}));else{const e=Number(a.discountPrice);l.includes(e)||l.push(e)}F(l),e.includes(a.brandName)||e.push(a.brandName);const n=t.findIndex((e=>e.name===a.category));-1===n?t.push({name:a.category,subCategory:[a.subCatgory]}):t[n].subCategory.find((e=>e===a.subCatgory))||t[n].subCategory.push(a.subCatgory)})),B(e),w(t)}),[a]),(0,l.useEffect)((()=>{const e=[];null==a||a.map((t=>{if(t.showInputs)t.colorInputs.forEach((t=>{if(t.haveAttributes){const{name:a,values:l}=t.attributes[0],n=e.findIndex((e=>e.name===a));if(-1===n)e.push({name:a,values:l.map((e=>e.valName))});else{const t=e[n].values;l.forEach((e=>{t.includes(e.valName)||t.push(e.valName)}))}}}));else if(null!=t&&t.haveAttributes){const{name:a,values:l}=null==t?void 0:t.attributes[0],n=e.findIndex((e=>e.name===a));if(-1===n)e.push({name:a,values:l.map((e=>e.valName))});else{const t=e[n].values;l.forEach((e=>{t.includes(e.valName)||t.push(e.valName)}))}}})),Y(e)}),[a]),(0,l.useEffect)((()=>{const e=new Set(P),t=Array.from(e);O(t)}),[P]),(0,l.useEffect)((()=>{let e;e=E.length>0?t.filter((e=>E.includes(e.brandName))):a,i(e)}),[E]),(0,l.useEffect)((()=>{let e;if(E.length>0&&(e=t.filter((e=>E.includes(e.brandName)))),v){const t=v.start,l=v.end,n=[],c=e||a,r=(null==c?void 0:c.length)>0&&c.reduce(((e,a)=>(n.includes(a._id)||(a.showInputs?a.colorInputs.some((e=>e.discountPrice>=t&&e.discountPrice<l))&&(e.push(a),n.push(a._id)):a.discountPrice>=t&&a.discountPrice<l&&(e.push(a),n.push(a._id))),e)),[]);r.length>0?i(r):i([])}else i(e)}),[E,v]),(0,l.useEffect)((()=>{const e=null==a?void 0:a.filter((e=>e.ratings>=D));i(e)}),[D]),(0,l.useEffect)((()=>{const e=[];null==a||a.map((t=>{t.showInputs?t.colorInputs.forEach((a=>{a.haveAttributes&&a.attributes[0].values.find((e=>e.valName===b))&&e.push(t)})):t.haveAttributes&&t.attributes[0].values.find((e=>e.valName===b))&&e.push(t)})),i(e)}),[b]);const O=e=>{const t=Math.max(...e),a=Math.min(...e),l=Math.ceil((t-a)/3),n=[];for(let e=0;e<3;e++){const t=a+e*l,c=a+(e+1)*l;n.push({start:t,end:c})}_(n)};return n().createElement("div",{className:"col-md-4 col-lg-3 col-xl-3 col-xxl-3 column3 col-12 col-sm-12"},n().createElement("div",{className:"desktop-filter"},n().createElement(c.c,{defaultActiveKey:"0"},n().createElement(c.c.Item,{eventKey:"0"},n().createElement(c.c.Header,null,"Category"),n().createElement(c.c.Body,null,H.length>1&&H.map(((e,t)=>{var a,l;return e.name&&n().createElement(n().Fragment,{key:t},n().createElement(r.cH,{to:"/products-by-category/search?category=".concat(null===(a=I(e.name))||void 0===a?void 0:a.name),className:"cat-link text-black font-semibold"},null===(l=I(e.name))||void 0===l?void 0:l.name),n().createElement("ul",null,e.subCategory.length>0&&e.subCategory.map(((t,a)=>{var l,c,s;return n().createElement("li",{key:a,className:"cat-link"},n().createElement(r.cH,{to:"/products-by-category/search?category=".concat(null===(l=I(e.name))||void 0===l?void 0:l.name,"&subcategory=").concat(null===(c=x(e.name,t))||void 0===c?void 0:c.name),className:"cat-link text-black"},null===(s=x(e.name,t))||void 0===s?void 0:s.name))}))))})))),n().createElement(c.c.Item,{eventKey:"1"},n().createElement(c.c.Header,null,"Brands"),n().createElement(c.c.Body,null,S.map(((e,t)=>n().createElement("li",{key:t,className:"filter-label"},n().createElement("input",{type:"checkbox",value:e,checked:E.includes(e),onChange:e=>{q({e,selectedBrands:E,setSelectedBrands:h}),k({e,checkedItems:o,setCheckedItems:p})}}),n().createElement("label",{className:"mb-0"},e)))))),n().createElement(c.c.Item,{eventKey:"3"},n().createElement(c.c.Header,null,"Price Range"),n().createElement(c.c.Body,null,(null==R?void 0:R.length)>0&&n().createElement("ul",{className:"filter-price-data"},R.map(((e,t)=>{var a,l;return n().createElement("li",{key:t,className:"d-flex  h-[30px] price-range-mq"},n().createElement("input",{className:"price-range-i-mq",type:"radio",value:e,onChange:t=>{g(e)},checked:(null==v?void 0:v.start)===e.start}),n().createElement("label",{className:"mt-0 price-range-p-mq"},n().createElement("span",null,e.start," ",null==d||null===(a=d.currency)||void 0===a?void 0:a.Symbol),n().createElement("span",null," - "),n().createElement("span",null,e.end," ",null==d||null===(l=d.currency)||void 0===l?void 0:l.Symbol)))}))))),n().createElement(c.c.Item,{eventKey:"5"},n().createElement(c.c.Header,null,"Rating"),n().createElement(c.c.Body,null,n().createElement("div",{className:"filrer-price-data"},n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq pr-2"},n().createElement(s.c,{rating:4})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:4,onChange:e=>{M(4),k({e,checkedItems:o,setCheckedItems:p})},checked:4===D})),n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq pr-2"},n().createElement(s.c,{rating:3})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:3,onChange:e=>{M(3)},checked:3===D})),n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq pr-2"},n().createElement(s.c,{rating:2})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:2,onChange:e=>{M(2)},checked:2===D})),n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq pr-2"},n().createElement(s.c,{rating:1})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:1,onChange:e=>{M(1)},checked:1===D}))))),n().createElement(c.c.Item,{eventKey:"4",className:"filter-acc-item d-none"},n().createElement(c.c.Header,null,"Attributes"),n().createElement(c.c.Body,null,n().createElement("div",{className:"cat-filter-div"},V.length>0&&V.map(((e,t)=>n().createElement("div",{className:"mb-4",key:t},n().createElement("p",null,n().createElement("b",null,e.name)),n().createElement("div",{className:"d-flex flex-wrap gap-2"},e.values.map(((e,t)=>n().createElement("button",{key:t,value:e,className:"att-btn",onClick:()=>{y(e),C({checkedItems:o,setCheckedItems:p,value:e})}},e)))))))))))),n().createElement("button",{className:"filter-button",onClick:()=>A(!K)},K?"Hide Filters":"Show Filters"),n().createElement("div",{className:"mobile-filters"},n().createElement("div",null,K&&n().createElement("div",null,n().createElement(c.c,null,n().createElement(c.c.Item,{eventKey:"0"},n().createElement(c.c.Header,null,"Category"),n().createElement(c.c.Body,null,H.length>1&&H.map(((e,t)=>{var a,l;return e.name&&n().createElement(n().Fragment,{key:t},n().createElement(r.cH,{to:"/products-by-category/search?category=".concat(null===(a=I(e.name))||void 0===a?void 0:a.name),className:"cat-link text-black"},null===(l=I(e.name))||void 0===l?void 0:l.name),n().createElement("ul",null,e.subCategory.length>0&&e.subCategory.map(((t,a)=>{var l,c,s;return n().createElement("li",{key:a,className:"cat-link"},n().createElement(r.cH,{to:"/products-by-category/search?category=".concat(null===(l=I(e.name))||void 0===l?void 0:l.name,"&subcategory=").concat(null===(c=x(e.name,t))||void 0===c?void 0:c.name),className:"cat-link text-black"},null===(s=x(e.name,t))||void 0===s?void 0:s.name))}))))})))),n().createElement("hr",null),n().createElement(c.c.Item,{eventKey:"1"},n().createElement(c.c.Header,null,"Brands"),n().createElement(c.c.Body,null,S.map(((e,t)=>n().createElement("li",{key:t,className:"filter-label"},n().createElement("input",{className:"mr-2",type:"checkbox",value:e,checked:E.includes(e),onChange:e=>{q({e,selectedBrands:E,setSelectedBrands:h}),k({e,checkedItems:o,setCheckedItems:p})}}),n().createElement("label",{className:"mb-0"},e)))))),n().createElement("hr",null),n().createElement(c.c.Item,{eventKey:"3"},n().createElement(c.c.Header,null,"Price Range"),n().createElement(c.c.Body,null,(null==R?void 0:R.length)>0&&n().createElement("ul",null,R.map(((e,t)=>{var a,l;return n().createElement("li",{key:t,className:"d-flex space-x-2 h-[30px] price-range-mq"},n().createElement("input",{className:"price-range-i-mq",type:"radio",value:e,onChange:t=>{g(e)},checked:(null==v?void 0:v.start)===e.start}),n().createElement("label",{className:"mb-0 price-range-p-mq"},n().createElement("span",null,e.start," ",null==d||null===(a=d.currency)||void 0===a?void 0:a.Symbol),n().createElement("span",null," - "),n().createElement("span",null,e.end," ",null==d||null===(l=d.currency)||void 0===l?void 0:l.Symbol)))}))))),n().createElement("hr",null),n().createElement(c.c.Item,{eventKey:"5"},n().createElement(c.c.Header,null,"Rating"),n().createElement(c.c.Body,null,n().createElement("div",{className:""},n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq pr-2"},n().createElement(s.c,{rating:4})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:4,onChange:e=>{M(4),k({e,checkedItems:o,setCheckedItems:p})},checked:4===D})),n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq"},n().createElement(s.c,{rating:3})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:3,onChange:e=>{M(3)},checked:3===D})),n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq"},n().createElement(s.c,{rating:2})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:2,onChange:e=>{M(2)},checked:2===D})),n().createElement("p",{className:"d-flex mb-0 align-items-center pb-1 full-star-mq ratings-mobile"},n().createElement("div",{className:"star-mq star1-mq"},n().createElement(s.c,{rating:1})),n().createElement("span",{className:"and-up-mq and-up1-mq"}," & up"),n().createElement("input",{className:"star-i",type:"radio",value:1,onChange:e=>{M(1)},checked:1===D}))))),n().createElement("hr",null),n().createElement(c.c.Item,{eventKey:"4",className:"d-none"},n().createElement(c.c.Header,null,"Attributes"),n().createElement(c.c.Body,null,n().createElement("div",{className:"cat-filter-div"},V.length>0&&V.map(((e,t)=>n().createElement("div",{className:"mb-4",key:t},n().createElement("p",null,n().createElement("b",null,e.name)),n().createElement("div",{className:"d-flex flex-wrap gap-2"},e.values.map(((e,t)=>n().createElement("button",{key:t,value:e,className:"att-btn",onClick:()=>{y(e),C({checkedItems:o,setCheckedItems:p,value:e})}},e)))))))))))))))}},64464:(e,t,a)=>{a.d(t,{c:()=>r});var l=a(11504),n=a(96800),c=a(77980);const r=()=>{const e=(0,n.OY)(),{category:t}=(0,n.w1)((e=>e.category));(0,l.useEffect)((()=>{e((0,c.Y)())}),[e]);const a=e=>{let a=t.find((t=>(null==t?void 0:t._id)===e));if(a)return a},r=(e,t)=>{let l=a(e);var n;if(l)return null==l||null===(n=l.subcategories)||void 0===n?void 0:n.find((e=>(null==e?void 0:e._id)===t))};return{fetchCategory:a,fetchSubCategory:r,fetchSubSubCategory:(e,t,a)=>{let l=r(e,t);var n;if(l)return null==l||null===(n=l.subSubcategories)||void 0===n?void 0:n.find((e=>(null==e?void 0:e._id)===a))}}}}}]);