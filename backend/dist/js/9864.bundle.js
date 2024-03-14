"use strict";(self.webpackChunkecom=self.webpackChunkecom||[]).push([[9864],{99864:(e,t,l)=>{l.r(t),l.d(t,{default:()=>I});var a=l(11504),n=l.n(a),r=l(15896),o=l(76542),c=l(89340),s=l(96800),i=l(16176),d=l(79328),u=l(64768),m=l(38467);const v=e=>{var t,l,r,o,v,y,C,N;let{data1:b,quantityChangeHandler:g,removeFromCartHandler:f,styles:h}=e;const P=(0,s.OY)(),{ConvertCurrency:S}=(0,m.c)(),{allProducts:D}=(0,s.w1)((e=>e.products)),{allEvents:I}=(0,s.w1)((e=>e.events));(0,a.useEffect)((()=>{P((0,i.IT)()),P((0,d._G)())}),[P]),(0,a.useEffect)((()=>{(null==D?void 0:D.length)>0&&b&&(k(b),H(b.qty))}),[b,D,I]);const[w,x]=(0,a.useState)(),[O,H]=(0,a.useState)(),k=async e=>{const t=null==I?void 0:I.find((t=>t.productArray.some((t=>t._id===e._id)))),l=null==D?void 0:D.find((t=>t._id===e._id));if(t){const l=null==t?void 0:t.productArray.find((t=>t._id===e._id));A(l,e)}else l?_(l,e):f(e)},A=async(e,t)=>{null!=t&&t.showInputs?F(e,t,!0):q(e,t,!0)},_=async(e,t)=>{null!=t&&t.showInputs?F(e,t,!1):q(e,t,!1)},q=(e,t,l)=>{const a=null==t?void 0:t.attrId,n=null==t?void 0:t.selectedColor,r=l?null==e?void 0:e.eventPrice:null==e?void 0:e.discountPrice;if(n&&n.haveAttributes){var o;const n=null==e||null===(o=e.attributes[0])||void 0===o?void 0:o.values.find((e=>e._id===a));if(n){var c;let a={name:null==e||null===(c=e.attributes[0])||void 0===c?void 0:c.name,value:n},o={...t,selectedColor:e,finalPrice:r*(null==t?void 0:t.qty),maxOrderQuantity:null==e?void 0:e.maxOrderQuantity,colorAttribute:a,active:l};x(o),g(o)}else f(t)}else{let a={...t,selectedColor:e,finalPrice:r*(null==t?void 0:t.qty),maxOrderQuantity:null==e?void 0:e.maxOrderQuantity,active:l};x(a),g(a)}},F=(e,t,l)=>{const a=null==t?void 0:t.attrId,n=null==t?void 0:t.selectedColor,r=null==e?void 0:e.colorInputs.find((e=>e._id===n._id));if(r){const n=l?null==r?void 0:r.eventPrice:null==r?void 0:r.discountPrice;if(null!=r&&r.haveAttributes){var o;const s=null==r||null===(o=r.attributes[0])||void 0===o?void 0:o.values.find((e=>e._id===a));if(s){var c;let a={name:null==r||null===(c=r.attributes[0])||void 0===c?void 0:c.name,value:s},o={...t,selectedColor:r,finalPrice:n*(null==t?void 0:t.qty),maxOrderQuantity:null==e?void 0:e.maxOrderQuantity,colorAttribute:a,active:l};x(o),g(o)}else f(t)}else{let a={...t,selectedColor:r,finalPrice:n*(null==t?void 0:t.qty),maxOrderQuantity:null==e?void 0:e.maxOrderQuantity,active:l};x(a),g(a)}}else f(t)};let Q=null!=w&&w.active?(null==w?void 0:w.selectedColor.eventPrice)*O:+(null==w?void 0:w.selectedColor.discountPrice)*O;return n().createElement(n().Fragment,null,w&&n().createElement("div",{className:"row align-items-center"},n().createElement("hr",null),n().createElement("div",{className:"col-md-7"},n().createElement(u.cH,{to:"".concat("/product/".concat(null==b?void 0:b.slug))},n().createElement("div",{className:"Dronescrat-product"},n().createElement("div",{className:"Dronescrat-product-sub"},n().createElement("div",{className:"row align-items-center"},n().createElement("div",{className:"col-md-3"},n().createElement("div",{className:"Drones-Product-image"},n().createElement("img",{src:"".concat(null!=w&&null!==(t=w.selectedColor)&&void 0!==t&&null!==(t=t.mainImage)&&void 0!==t&&t.url?null==w||null===(l=w.selectedColor)||void 0===l||null===(l=l.mainImage)||void 0===l?void 0:l.url:null==w||null===(r=w.selectedColor)||void 0===r||null===(r=r.image)||void 0===r?void 0:r.url),alt:"product"}))),n().createElement("div",{className:"col-md-8"},n().createElement("div",{className:"Drones-Product-desc"},n().createElement("p",null,null==w?void 0:w.name),n().createElement("p",null,null==w||null===(o=w.selectedColor)||void 0===o?void 0:o.SKU),(null==w||null===(v=w.selectedColor)||void 0===v?void 0:v.haveAttributes)&&n().createElement("h4",{className:"font-[400] text-[15px] text-[#00000082]"},null==w||null===(y=w.colorAttribute)||void 0===y?void 0:y.name," : ",null==w||null===(C=w.colorAttribute)||void 0===C?void 0:C.value.valName)))))))),n().createElement("div",{className:"col-md-5"},n().createElement("div",{className:"Drones-product-details-sub"},n().createElement("div",{className:"row"},n().createElement("div",{className:"col-3 col-sm-3 col-md-3"},n().createElement("div",{className:"Drones-Product-price"},n().createElement("p",null,null==h||null===(N=h.currency)||void 0===N?void 0:N.Symbol," ",w.active?S(w.selectedColor.eventPrice):S(w.selectedColor.discountPrice)," "))),n().createElement("div",{className:"col-3 col-sm-3 col-md-3"},n().createElement("div",{className:"Drones-Product-quantity"},n().createElement("div",{className:"Drones-addtocart-buttons"},n().createElement("button",{className:"increment-button",onClick:e=>((e,t)=>{const l=O-1;if(H(l),0===l)f(t);else{const e={...t,qty:l};g(e),x(e)}})(0,w)},"-"),n().createElement("p",{className:"m-0"},w.qty),n().createElement("button",{className:"increment-button",onClick:e=>((e,t)=>{e.preventDefault();const l=t.maxOrderQuantity;let a=null;var n,r,o,s;if(a=t.selectedColor.haveAttributes&&t.selectedColor.attributeStock?t.active?null===(n=t.colorAttribute)||void 0===n?void 0:n.value.eventStock:null===(r=t.colorAttribute)||void 0===r?void 0:r.value.stock:t.active?null===(o=t.selectedColor)||void 0===o?void 0:o.eventStock:null===(s=t.selectedColor)||void 0===s?void 0:s.stock,l&&O>=l)c.cp.error("Reached Max Order Quantity!");else if(O>=a)c.cp.error("Reached Stock Limit!");else{H(O+1);const e={...t,qty:O+1};g(e),x(e)}})(e,w)},"+")))),n().createElement("div",{className:"col-6 col-sm-6 col-md-6 Drones-Product-subtotal-parent"},null!=w&&w.showInputs?n().createElement(E,{data:w,value:O,totalPrice:Q,styles:h,removeFromCartHandler:f,ConvertCurrency:S}):n().createElement(p,{data:w,value:O,totalPrice:Q,styles:h,removeFromCartHandler:f,ConvertCurrency:S})))))))},E=e=>{var t;let{data:l,value:a,totalPrice:c,styles:s,removeFromCartHandler:i,ConvertCurrency:d}=e;return n().createElement("div",{className:"row Drones-Product-subtotal"},n().createElement("div",{className:"col-6 Drones-Product-subtotal-content "},n().createElement("p",null,null==s||null===(t=s.currency)||void 0===t?void 0:t.Symbol," ",d(c))),n().createElement("div",{className:"col-6 images-section"},n().createElement("div",{className:"Drones-Product-subtotal-sub2"},n().createElement("div",{className:"Drones-Product-subtotal-sub2-image1"},n().createElement(o.u,{icon:r._eL,style:{color:"#d5d7e0",fontSize:"20px"},onClick:()=>i(l)})))))},p=e=>{var t;let{data:l,value:a,totalPrice:c,styles:s,removeFromCartHandler:i,ConvertCurrency:d}=e;return n().createElement("div",{className:"row Drones-Product-subtotal"},n().createElement("div",{className:"col-6 Drones-Product-subtotal-content "},n().createElement("p",null,null==s||null===(t=s.currency)||void 0===t?void 0:t.Symbol," ",d(c))),n().createElement("div",{className:"col-6 images-section"},n().createElement("div",{className:"Drones-Product-subtotal-sub2"},n().createElement("div",{className:"Drones-Product-subtotal-sub2-image1"},n().createElement(o.u,{icon:r._eL,style:{color:"#d5d7e0",fontSize:"20px"},onClick:()=>i(l)})))))};var y=l(86060);const C=()=>n().createElement("div",{className:"row Drones-cart-Headings"},n().createElement("div",{className:"col-md-7 Drones-cart-Headings-item"},n().createElement("p",null,"Item")),n().createElement("div",{className:"col-md-5"},n().createElement("div",{className:"row"},n().createElement("div",{className:"col-3 Drones-cart-Headings-price"},n().createElement("p",null,"price")),n().createElement("div",{className:"col-4 Drones-cart-Headings-qty"},n().createElement("p",null,"Qty")),n().createElement("div",{className:"col-5 Drones-cart-Headings-subtotal"},n().createElement("p",null,"Subtotal")))));var N=l(7456),b=l(85976),g=l(18092),f=l(86944),h=l(93736),P=l(17554),S=l(33280),D=l(17652);const I=()=>{var e;const{cart:t}=(0,s.w1)((e=>e.cart)),{ConvertCurrency:l}=(0,m.c)(),r=(0,b.U)(),[o,c]=(0,a.useState)(t),[i,d]=(0,a.useState)();(0,S.c)({pageName:"cartSEO",setState:d});const E=(0,s.OY)(),p=e=>{E((0,g.Qd)(e));const l=t.filter((t=>t.attrId!==e.attrId));c(l)},I=null==t?void 0:t.reduce(((e,t)=>t.active?e+t.qty*t.selectedColor.eventPrice:e+t.qty*t.selectedColor.discountPrice),0),w=e=>{var t,l;let a=null!=e&&e.active?Number(null==e||null===(t=e.selectedColor)||void 0===t?void 0:t.eventPrice)*(null==e?void 0:e.qty):Number(null==e||null===(l=e.selectedColor)||void 0===l?void 0:l.discountPrice)*(null==e?void 0:e.qty);const n={...e,finalPrice:a};E((0,g.A$)(n))};return(0,a.useEffect)((()=>{c(t)}),[o,t]),n().createElement(n().Fragment,null,n().createElement(D.c,{seoDetails:i}),n().createElement(f.c,null),n().createElement(P.c,null),n().createElement("div",{className:"DronesCart-parent"},n().createElement("div",{className:"container"},n().createElement(N.c,null),n().createElement("h2",null,"Shopping Cart"),n().createElement("div",{className:"col-md-12 col-lg-12"},n().createElement(C,null)),(null==o?void 0:o.length)>0?n().createElement("div",{className:"DronesCart-subparent"},n().createElement("div",{className:"row"},n().createElement("div",{className:"col-lg-12"},null==o?void 0:o.map(((e,t)=>n().createElement(n().Fragment,{key:t},n().createElement(v,{data1:e,quantityChangeHandler:w,removeFromCartHandler:p,styles:r}),n().createElement("hr",null)))),n().createElement("div",{className:"px-5 mb-3 bg-[#fa8232] rounded"},n().createElement(u.cH,{to:"/checkout"},n().createElement("div",{className:"h-[45px] flex items-center justify-center w-[100%] rounded-[5px]",style:{backgroundColor:null==r?void 0:r.mainColor}},n().createElement("h1",{className:" text-[18px] mb-0 font-[600] text-white",style:{color:null==r?void 0:r.fontColor}},"Checkout Now (",null==r||null===(e=r.currency)||void 0===e?void 0:e.Symbol," ",l(I),")")))),n().createElement(y.c,{removeFun:(0,g.oV)(),title:"Clear Shopping Cart"})))):n().createElement("div",null,n().createElement("p",null,"No Products Added to Cart"),n().createElement("div",{className:" continueshopping-buttons "},n().createElement(u.cH,{to:"/products?search=all%20products"},"Continue Shopping"))))),n().createElement(h.c,null))}},7456:(e,t,l)=>{l.d(t,{c:()=>c});var a=l(11504),n=l.n(a),r=l(83284),o=l(64768);const c=()=>{const e=(0,r.IT)();return n().createElement("div",{className:"DronesCart-parent-home-text"},n().createElement("span",null,n().createElement(o.cH,{to:"/"},"Home /")),n().createElement("span",null,e.pathname.charAt(1).toUpperCase()+e.pathname.slice(2,e.pathname.length)))}},86060:(e,t,l)=>{l.d(t,{c:()=>c});var a=l(11504),n=l.n(a),r=l(64768),o=l(96800);const c=e=>{let{removeFun:t,title:l}=e;const a=(0,o.OY)();return n().createElement("div",{className:"row"},n().createElement("div",{className:"col-md-8"},n().createElement("div",{className:"row"},n().createElement("div",{className:"col-md-5 continueshopping-button"},n().createElement(r.cH,{to:"/products?search=all%20products"},"Continue Shopping")),n().createElement("div",{className:"col-md-5 ClearShoppingCart-button"},n().createElement("button",{onClick:()=>{a(t)}},l)))))}},38467:(e,t,l)=>{l.d(t,{c:()=>n});var a=l(85976);const n=()=>{const e=(0,a.U)(),t=null==e?void 0:e.currency;return{ConvertCurrency:e=>"INR"!==(null==t?void 0:t.code)?(e*(null==t?void 0:t.exchangeRate)).toFixed(2):e}}},33280:(e,t,l)=>{l.d(t,{c:()=>r});var a=l(11504),n=l(85976);const r=e=>{let{pageName:t,setState:l,setLoading:r}=e;const o=(0,n.U)();(0,a.useEffect)((()=>{var e,a;r&&r(!1),null!=o&&o.allPagesSEODetails?l({metaTitle:null==o||null===(e=o.allPagesSEODetails)||void 0===e||null===(e=e[t])||void 0===e?void 0:e.metaTitle,metaDescription:null==o||null===(a=o.allPagesSEODetails)||void 0===a||null===(a=a[t])||void 0===a?void 0:a.metaDescription}):l({metaTitle:"Airbee Technologies",metaDescription:"Hirola Infotech Solutions provide your business with a variety of digital solutions to promote your product/service online for your growth."})}),[t,r,l,null==o?void 0:o.allPagesSEODetails])}},18092:(e,t,l)=>{l.d(t,{A$:()=>a,IH:()=>n,Qd:()=>o,o9:()=>r,oV:()=>c});const a=e=>async(t,l)=>{const a=l().cart.cart,n=e;let r=null;return r=(await a.filter((e=>e._id===n._id&&e.selectedColor._id===n.selectedColor._id))).find((e=>e.attrId===n.attrId)),t(r?{type:"updateCartItem",payload:e}:{type:"addToCart",payload:e}),localStorage.setItem("cartItems",JSON.stringify(l().cart.cart)),e},n=e=>async(t,l)=>(t({type:"buyNow",payload:e}),localStorage.setItem("buyNow",JSON.stringify(l().cart.buyNow)),e),r=e=>async(t,l)=>(t({type:"updateCart",payload:e}),localStorage.setItem("cartItems",JSON.stringify(l().cart.cart)),e),o=e=>async(t,l)=>(t({type:"removeFromCart",payload:e.attrId}),localStorage.setItem("cartItems",JSON.stringify(l().cart.cart)),e),c=()=>async(e,t)=>(e({type:"removeAllFromCart"}),localStorage.setItem("cartItems",JSON.stringify(t().cart.cart)),[])}}]);