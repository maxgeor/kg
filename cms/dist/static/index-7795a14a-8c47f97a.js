import{s as _,aS as j,h as B,Y as S,cu as g,j as a,aC as w,ct as L,f as O,b2 as T,aD as D,Z as A,S as C,B as W}from"./sanity-de9f1b88.js";import{P as z}from"./PaneItem-9d0095a8-8d417db6.js";import{useDeskTool as G}from"./index-56aa5cc3-cbfd0de9.js";import"./json-inspector-46cc6fbb.js";var r;function H(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}const Y=_.hr(r||(r=H([`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`])));function U(n){const{childItemId:t,index:l,isActive:d,isSelected:u,pane:p,paneKey:f}=n,{features:h}=G(),{collapsed:m}=j(),{defaultLayout:y,displayOptions:c,items:i,menuItems:v,menuItemGroups:I,title:b}=p,P=c==null?void 0:c.showIcons,k=e=>{var o;const s=(o=e.displayOptions)==null?void 0:o.showIcon;return typeof s<"u"?s!==!1:P!==!1};return B(S,{currentMaxWidth:350,"data-testid":"desk-tool-list-pane",id:f,maxWidth:640,minWidth:320,selected:u,children:[g,a(w,{actions:a(L,{menuItems:v,menuItemGroups:I}),backButton:h.backButton&&l>0&&a(O,{as:T,"data-as":"a",icon:D,mode:"bleed"}),title:b}),a(A,{overflow:m?void 0:"auto",children:a(C,{padding:2,space:1,children:i&&i.map((e,o)=>{if(e.type==="divider")return a(W,{paddingY:1,children:a(Y,{})},"divider-".concat(o));const s=!d&&t===e.id,x=d&&t===e.id;return a(z,{icon:k(e)?e.icon:!1,id:e.id,layout:y,pressed:s,schemaType:e.schemaType,selected:x,title:e.title,value:e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0},e.id)})})})]})}export{U as default};
