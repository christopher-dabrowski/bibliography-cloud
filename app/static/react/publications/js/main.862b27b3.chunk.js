(this["webpackJsonpreact-publications"]=this["webpackJsonpreact-publications"]||[]).push([[0],{24:function(e,t,a){e.exports=a(37)},29:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(17),l=a.n(c),s=(a(29),a(1)),i=a.n(s),o=a(18),u=a(22),m=a(19),p=a(23),b=a(8),f=a(6),d=Object(f.g)((function(e){var t=e.label,a=e.publications,n=e.match,c=e.refreshPublications;return r.a.createElement("section",{className:"container"},r.a.createElement("h2",null,t),r.a.createElement("ul",{className:"list-group"},a.map((function(e){var t=e.links.find((function(e){return"self"===e.rel})),a=e.links.find((function(e){return"delete"===e.rel}));return r.a.createElement("li",{key:e.id,className:"list-group-item d-inline-flex align-items-center"},r.a.createElement("span",{className:"flex-grow-1"},e.title),r.a.createElement("div",{className:"buttons"},t&&r.a.createElement(b.b,{to:"".concat(n.url,"/").concat(e.id)},r.a.createElement("button",{className:"btn btn-info mr-2",type:"button"},r.a.createElement("i",{className:"fas fa-info-circle"}),r.a.createElement("span",{className:"d-none d-sm-inline ml-1"},"Szczeg\xf3\u0142y"))),a&&r.a.createElement("button",{className:"btn btn-danger mr-2",onClick:function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.awrap(fetch(a.href,{method:"DELETE"}));case 2:c();case 3:case"end":return e.stop()}}))}},r.a.createElement("i",{className:"fas fa-trash"}),r.a.createElement("span",{className:"d-none d-sm-inline ml-1"},"Usu\u0144"))))}))))})),E=a(10),h=a(14),g=Object(f.g)((function(e){var t=e.publication,a=e.history,c=e.refreshPublications,l=t,s=Object(n.useState)(!1),o=Object(h.a)(s,2),u=o[0],m=o[1],p=Object(n.useState)(l),b=Object(h.a)(p,2),f=b[0],d=b[1],g="form-control"+(u?"":" form-control-plaintext");return r.a.createElement("section",{className:"container mt-3"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group row"},r.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"title"},"Tytu\u0142"),r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("input",{className:g,name:"title",type:"text",readOnly:!u,value:f.title,onChange:function(e){d(Object(E.a)({},f,{title:e.target.value}))}}))),r.a.createElement("div",{className:"form-group row"},r.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"pageCount"},"Liczba stron"),r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("input",{className:g,readOnly:!u,name:"pageCount",type:"number",min:0,value:f.pageCount,onChange:function(e){d(Object(E.a)({},f,{pageCount:e.target.value}))}}))),r.a.createElement("div",{className:"form-group row"},r.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"publicationYear"},"Rok wydania"),r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("input",{className:g,readOnly:!u,name:"publicationYer",type:"number",min:1200,max:2200,value:f.publicationYear,onChange:function(e){d(Object(E.a)({},f,{publicationYear:e.target.value}))}}))),r.a.createElement("hr",null),r.a.createElement("div",{className:"form-group d-flex justify-content-end"},u&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"btn btn-success",type:"button",onClick:function(){var e;return i.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=f.links.find((function(e){return"self"===e.rel})),t.next=3,i.a.awrap(fetch(e.href,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)}));case 3:c(),a.push("/publications");case 5:case"end":return t.stop()}}))}},"Zapisz"),r.a.createElement("button",{className:"btn btn-danger ml-2",type:"button",onClick:function(){d(l),m(!1)}},"Anuluj zmiany")),!u&&r.a.createElement("button",{className:"btn btn-primary",type:"button",onClick:function(){return m(!0)}},"Edytuj"))))})),v=(a(36),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getCurrentUserLogin=function(){var e,t,n;return i.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e=new URL("api/login",a.props.urls.clientBase),r.next=3,i.a.awrap(fetch(e));case 3:return t=r.sent,r.next=6,i.a.awrap(t.text());case 6:return n=r.sent,a.setState({login:n}),r.abrupt("return",n);case 9:case"end":return r.stop()}}))},a.getActionList=function(){var e,t;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.awrap(fetch(a.props.urls.publicationsApi));case 2:return e=n.sent,n.next=5,i.a.awrap(e.json());case 5:t=n.sent,a.setState({actions:t._links});case 7:case"end":return n.stop()}}))},a.getPublications=function(){var e,t,n,r;return i.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(a.state.actions["publications.list"]){c.next=2;break}return c.abrupt("return");case 2:return a.setState({loadingPublications:!0}),e=(e=a.state.actions["publications.list"].href).replace("{user}",a.state.login),t=new URL(e,a.props.urls.publicationsApi),c.next=8,i.a.awrap(fetch(t));case 8:return n=c.sent,c.next=11,i.a.awrap(n.json());case 11:r=c.sent,a.setState({publications:r,loadingPublications:!1});case 13:case"end":return c.stop()}}))},a.componentDidMount=function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.awrap(a.getCurrentUserLogin());case 2:return e.next=4,i.a.awrap(a.getActionList());case 4:a.getPublications();case 5:case"end":return e.stop()}}))},a.render=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b.a,null,r.a.createElement(f.b,{path:"/publications",render:function(e){var t=e.match.isExact;return r.a.createElement("section",{className:"container intro d-flex"},!t&&r.a.createElement(b.b,{to:"/publications"},r.a.createElement("button",{className:"btn btn-warning h-100",style:{width:"6.5ch"}},r.a.createElement("i",{className:"fas fa-chevron-left"}))),r.a.createElement("h1",{className:"mt-2 text-center",style:{flexGrow:1}},"Publikacje"))}}),r.a.createElement(f.d,null,r.a.createElement(f.b,{exact:!0,path:"/publications"},r.a.createElement(d,{label:"Twoje publikacje",publications:a.state.publications,refreshPublications:a.getPublications})),r.a.createElement(f.b,{path:"/publications/:publicationId",render:function(e){var t=a.state.publications.find((function(t){return t.id==e.match.params.publicationId}));return t?r.a.createElement(g,{publication:t,refreshPublications:a.getPublications,globalState:a.state}):r.a.createElement(f.a,{to:"/publications"})}}))))},a.state={login:null,loadingPublications:!1,publications:[],actions:{},urls:e.urls},a}return Object(p.a)(t,e),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w={clientBase:document.getElementById("app-url").innerText,filesApi:document.getElementById("file-api-url").innerText,publicationsApi:document.getElementById("publications-api-url").innerText};l.a.render(r.a.createElement(v,{urls:w}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[24,1,2]]]);
//# sourceMappingURL=main.862b27b3.chunk.js.map