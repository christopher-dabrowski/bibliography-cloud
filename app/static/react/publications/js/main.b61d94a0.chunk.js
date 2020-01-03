(this["webpackJsonpreact-publications"]=this["webpackJsonpreact-publications"]||[]).push([[0],{24:function(e,t,a){e.exports=a(37)},29:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),l=a.n(c),s=(a(29),a(2)),i=a.n(s),o=a(16),u=a(22),m=a(17),p=a(23),b=a(9),f=a(6),d=Object(f.g)((function(e){var t=e.label,a=e.publications,n=e.match;return r.a.createElement("section",{className:"container"},r.a.createElement("h2",null,t),r.a.createElement("ul",{className:"list-group"},a.map((function(e){var t=e.links.find((function(e){return"self"===e.rel})),a=e.links.find((function(e){return"delete"===e.rel}));return r.a.createElement("li",{key:e.id,className:"list-group-item d-inline-flex align-items-center"},r.a.createElement("span",{className:"flex-grow-1"},e.title),r.a.createElement("div",{className:"buttons"},t&&r.a.createElement(b.b,{to:"".concat(n.url,"/").concat(e.id)},r.a.createElement("button",{className:"btn btn-info mr-2",type:"button"},r.a.createElement("i",{className:"fas fa-info-circle"}),r.a.createElement("span",{className:"d-none d-sm-inline ml-1"},"Szczeg\xf3\u0142y"))),a&&r.a.createElement("a",{className:"btn btn-danger mr-2",href:a.href},r.a.createElement("i",{className:"fas fa-trash"}),r.a.createElement("span",{className:"d-none d-sm-inline ml-1"},"Usu\u0144"))))}))))})),E=a(20),h=a(21),g=function(e){e.publication;var t=Object(n.useState)(!1),a=Object(h.a)(t,2),c=a[0],l=(a[1],"form-control"+(c?"":" form-control-plaintext"));return r.a.createElement("section",{className:"container mt-3"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group row"},r.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"title"},"Tytu\u0142"),r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("input",{className:l,name:"title",type:"text",readOnly:!c,value:"Zalety pracy z drzewami"}))),r.a.createElement("div",{className:"form-group row"},r.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"pageCount"},"Liczba stron"),r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("input",{className:l,readOnly:!c,name:"pageCount",type:"number",min:0}))),r.a.createElement("div",{className:"form-group row"},r.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"publicationYear"},"Rok wydania"),r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("input",Object(E.a)({className:l,readOnly:!c,name:"publicationYer",type:"number",min:1500,max:2200},"readOnly",!0)))),r.a.createElement("div",{className:"form-group row"})))},w=(a(36),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getCurrentUserLogin=function(){var e,t,n;return i.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e=new URL("api/login",a.props.urls.clientBase),r.next=3,i.a.awrap(fetch(e));case 3:return t=r.sent,r.next=6,i.a.awrap(t.text());case 6:return n=r.sent,a.setState({login:n}),r.abrupt("return",n);case 9:case"end":return r.stop()}}))},a.getActionList=function(){var e,t;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.awrap(fetch(a.props.urls.publicationsApi));case 2:return e=n.sent,n.next=5,i.a.awrap(e.json());case 5:t=n.sent,a.setState({actions:t._links});case 7:case"end":return n.stop()}}))},a.getPublications=function(){var e,t,n,r;return i.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(a.state.actions["publications.list"]){c.next=2;break}return c.abrupt("return");case 2:return a.setState({loadingPublications:!0}),e=(e=a.state.actions["publications.list"].href).replace("{user}",a.state.login),t=new URL(e,a.props.urls.publicationsApi),c.next=8,i.a.awrap(fetch(t));case 8:return n=c.sent,c.next=11,i.a.awrap(n.json());case 11:r=c.sent,a.setState({publications:r,loadingPublications:!1});case 13:case"end":return c.stop()}}))},a.componentDidMount=function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.awrap(a.getCurrentUserLogin());case 2:return e.next=4,i.a.awrap(a.getActionList());case 4:a.getPublications();case 5:case"end":return e.stop()}}))},a.componentDidUpdate=function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}))},a.render=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b.a,null,r.a.createElement(f.b,{path:"/publications",render:function(e){var t=e.match.isExact;return r.a.createElement("section",{className:"container intro d-flex"},!t&&r.a.createElement(b.b,{to:"/publications"},r.a.createElement("button",{className:"btn btn-warning h-100",style:{width:"6.5ch"}},r.a.createElement("i",{className:"fas fa-chevron-left"}))),r.a.createElement("h1",{className:"mt-2 text-center",style:{flexGrow:1}},"Publikacje"))}}),r.a.createElement(f.d,null,r.a.createElement(f.b,{exact:!0,path:"/publications"},r.a.createElement(d,{label:"Twoje publikacje",publications:a.state.publications})),r.a.createElement(f.b,{path:"/publications/:publicationId",render:function(e){var t=a.state.publications.find((function(t){return t.id==e.match.params.publicationId}));return t?r.a.createElement(g,{publication:t}):r.a.createElement(f.a,{to:"/publications"})}}))))},a.state={login:null,loadingPublications:!1,publications:[],actions:{}},a}return Object(p.a)(t,e),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var v={clientBase:document.getElementById("app-url").innerText,filesApi:document.getElementById("file-api-url").innerText,publicationsApi:document.getElementById("publications-api-url").innerText};l.a.render(r.a.createElement(w,{urls:v}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[24,1,2]]]);
//# sourceMappingURL=main.b61d94a0.chunk.js.map