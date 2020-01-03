(this["webpackJsonpreact-publications"]=this["webpackJsonpreact-publications"]||[]).push([[0],{24:function(e,t,a){e.exports=a(37)},29:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(17),l=a.n(r),s=(a(29),a(3)),i=a.n(s),o=a(18),u=a(22),m=a(19),p=a(23),b=a(8),f=a(6),d=Object(f.g)((function(e){var t=e.label,a=e.publications,n=e.match;return c.a.createElement("section",{className:"container"},c.a.createElement("h2",null,t),c.a.createElement("ul",{className:"list-group"},a.map((function(e){var t=e.links.find((function(e){return"self"===e.rel})),a=e.links.find((function(e){return"delete"===e.rel}));return c.a.createElement("li",{key:e.id,className:"list-group-item d-inline-flex align-items-center"},c.a.createElement("span",{className:"flex-grow-1"},e.title),c.a.createElement("div",{className:"buttons"},t&&c.a.createElement(b.b,{to:"".concat(n.url,"/").concat(e.id)},c.a.createElement("button",{className:"btn btn-info mr-2",type:"button"},c.a.createElement("i",{className:"fas fa-info-circle"}),c.a.createElement("span",{className:"d-none d-sm-inline ml-1"},"Szczeg\xf3\u0142y"))),a&&c.a.createElement("a",{className:"btn btn-danger mr-2",href:a.href},c.a.createElement("i",{className:"fas fa-trash"}),c.a.createElement("span",{className:"d-none d-sm-inline ml-1"},"Usu\u0144"))))}))))})),E=a(10),g=a(14),h=Object(f.g)((function(e){var t=e.publication,a=(e.history,e.location,t),r=Object(n.useState)(!1),l=Object(g.a)(r,2),s=l[0],i=l[1],o=Object(n.useState)(a),u=Object(g.a)(o,2),m=u[0],p=u[1],b="form-control"+(s?"":" form-control-plaintext");return console.log(a),c.a.createElement("section",{className:"container mt-3"},c.a.createElement("form",null,c.a.createElement("div",{className:"form-group row"},c.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"title"},"Tytu\u0142"),c.a.createElement("div",{className:"col-sm-10"},c.a.createElement("input",{className:b,name:"title",type:"text",readOnly:!s,value:m.title,onChange:function(e){p(Object(E.a)({},m,{title:e.target.value}))}}))),c.a.createElement("div",{className:"form-group row"},c.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"pageCount"},"Liczba stron"),c.a.createElement("div",{className:"col-sm-10"},c.a.createElement("input",{className:b,readOnly:!s,name:"pageCount",type:"number",min:0,value:m.pageCount,onChange:function(e){p(Object(E.a)({},m,{pageCount:e.target.value}))}}))),c.a.createElement("div",{className:"form-group row"},c.a.createElement("label",{className:"col-sm-2 col-form-label",htmlFor:"publicationYear"},"Rok wydania"),c.a.createElement("div",{className:"col-sm-10"},c.a.createElement("input",{className:b,readOnly:!s,name:"publicationYer",type:"number",min:1200,max:2200,value:m.publicationYear,onChange:function(e){p(Object(E.a)({},m,{publicationYear:e.target.value}))}}))),c.a.createElement("hr",null),c.a.createElement("div",{className:"form-group d-flex justify-content-end"},s&&c.a.createElement(c.a.Fragment,null,c.a.createElement("button",{className:"btn btn-success",type:"button"},"Zapisz"),c.a.createElement("button",{className:"btn btn-danger ml-2",type:"button",onClick:function(){p(a),i(!1)}},"Anuluj zmiany")),!s&&c.a.createElement("button",{className:"btn btn-primary",type:"button",onClick:function(){return i(!0)}},"Edytuj"))))})),v=(a(36),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getCurrentUserLogin=function(){var e,t,n;return i.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return e=new URL("api/login",a.props.urls.clientBase),c.next=3,i.a.awrap(fetch(e));case 3:return t=c.sent,c.next=6,i.a.awrap(t.text());case 6:return n=c.sent,a.setState({login:n}),c.abrupt("return",n);case 9:case"end":return c.stop()}}))},a.getActionList=function(){var e,t;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.awrap(fetch(a.props.urls.publicationsApi));case 2:return e=n.sent,n.next=5,i.a.awrap(e.json());case 5:t=n.sent,a.setState({actions:t._links});case 7:case"end":return n.stop()}}))},a.getPublications=function(){var e,t,n,c;return i.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(a.state.actions["publications.list"]){r.next=2;break}return r.abrupt("return");case 2:return a.setState({loadingPublications:!0}),e=(e=a.state.actions["publications.list"].href).replace("{user}",a.state.login),t=new URL(e,a.props.urls.publicationsApi),r.next=8,i.a.awrap(fetch(t));case 8:return n=r.sent,r.next=11,i.a.awrap(n.json());case 11:c=r.sent,a.setState({publications:c,loadingPublications:!1});case 13:case"end":return r.stop()}}))},a.componentDidMount=function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.awrap(a.getCurrentUserLogin());case 2:return e.next=4,i.a.awrap(a.getActionList());case 4:a.getPublications();case 5:case"end":return e.stop()}}))},a.render=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(b.a,null,c.a.createElement(f.b,{path:"/publications",render:function(e){var t=e.match.isExact;return c.a.createElement("section",{className:"container intro d-flex"},!t&&c.a.createElement(b.b,{to:"/publications"},c.a.createElement("button",{className:"btn btn-warning h-100",style:{width:"6.5ch"}},c.a.createElement("i",{className:"fas fa-chevron-left"}))),c.a.createElement("h1",{className:"mt-2 text-center",style:{flexGrow:1}},"Publikacje"))}}),c.a.createElement(f.d,null,c.a.createElement(f.b,{exact:!0,path:"/publications"},c.a.createElement(d,{label:"Twoje publikacje",publications:a.state.publications})),c.a.createElement(f.b,{path:"/publications/:publicationId",render:function(e){var t=a.state.publications.find((function(t){return t.id==e.match.params.publicationId}));return t?c.a.createElement(h,{publication:t,globalState:a.state}):c.a.createElement(f.a,{to:"/publications"})}}))))},a.state={login:null,loadingPublications:!1,publications:[],actions:{},urls:e.urls},a}return Object(p.a)(t,e),t}(c.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N={clientBase:document.getElementById("app-url").innerText,filesApi:document.getElementById("file-api-url").innerText,publicationsApi:document.getElementById("publications-api-url").innerText};l.a.render(c.a.createElement(v,{urls:N}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[24,1,2]]]);
//# sourceMappingURL=main.d8713198.chunk.js.map