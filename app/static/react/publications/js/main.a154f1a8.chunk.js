(this["webpackJsonpreact-publications"]=this["webpackJsonpreact-publications"]||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(3),o=n.n(c),s=(n(14),n(1)),r=n.n(s),l=n(4),u=n(5),p=n(7),h=n(6),m=n(8),d=(n(16),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(h.a)(t).call(this,e))).state={login:null,publications:[]},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e,t,n,a;return r.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return e=new URL("api/login",this.props.urls.clientBase),i.next=3,r.a.awrap(fetch(e));case 3:return t=i.sent,i.next=6,r.a.awrap(t.text());case 6:return n=i.sent,this.setState({login:n}),e="http://localhost:8090/users/".concat(n,"/publications"),i.next=11,r.a.awrap(fetch(e));case 11:return t=i.sent,i.next=14,r.a.awrap(t.json());case 14:a=i.sent,this.setState({publications:a});case 16:case"end":return i.stop()}}),null,this)}},{key:"render",value:function(){return console.log(this.state),i.a.createElement("div",{className:"App"},i.a.createElement("section",{class:"container text-center px-5 intro"},i.a.createElement("h1",{class:"mt-5"},"Lista publikacji"),i.a.createElement("p",null,"Publications"),i.a.createElement("p",null,"Login: ",this.state.login)))}}]),t}(i.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var b={clientBase:document.getElementById("app-url").innerText,filesApi:document.getElementById("file-api-url").innerText,publicationsApi:document.getElementById("publications-api-url").innerText};o.a.render(i.a.createElement(d,{urls:b}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports=n(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.a154f1a8.chunk.js.map