(function(){"use strict";var e={2710:function(e,t,r){var n=r(9963),o=r(6252);const a={id:"nav"},s=(0,o.Uk)("Home"),i=(0,o.Uk)(" | "),u=(0,o.Uk)("About");function l(e,t){const r=(0,o.up)("router-link"),n=(0,o.up)("router-view"),l=(0,o.up)("n-loading-bar-provider");return(0,o.wg)(),(0,o.j4)(l,null,{default:(0,o.w5)((()=>[(0,o.Wm)("div",a,[(0,o.Wm)(r,{to:"/"},{default:(0,o.w5)((()=>[s])),_:1}),i,(0,o.Wm)(r,{to:"/about"},{default:(0,o.w5)((()=>[u])),_:1})]),(0,o.Wm)(n)])),_:1})}const c={};c.render=l;var d=c,p=r(5205);(0,p.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var f=r(2119),m=r(3577);const g={class:"container mx-auto"},h={class:"flex flex-col justify-center"},v={class:"mx-1 flex flex-row gap-1"},b=(0,o.Wm)("p",{class:"text-gray-500 text-sm"},[(0,o.Uk)(" Fill with your "),(0,o.Wm)("a",{class:"text-red-500",href:"https://github.com/settings/tokens",target:"_blank"}," Github Personal access tokens ")],-1),y={class:"mt-3 mx-1 flex flex-col justify-center"},k=(0,o.Uk)(" 取得資料 "),w={class:"flex justify-center"},x={class:"flex flex-col justify-center"};function W(e,t,r,n,a,s){const i=(0,o.up)("n-input"),u=(0,o.up)("n-button"),l=(0,o.up)("UserProfile"),c=(0,o.up)("RepoProfile");return(0,o.wg)(),(0,o.j4)("div",g,[(0,o.Wm)("div",h,[(0,o.Wm)("div",v,[(0,o.Wm)(i,{class:"py-1",size:"small",value:e.PAT,"onUpdate:value":t[1]||(t[1]=t=>e.PAT=t),type:"input",placeholder:"Github Personal access tokens",disabled:e.is_PAT_in_store()},null,8,["value","disabled"]),(0,o.Wm)(u,{class:"py-2 px-4",type:"primary",onClick:e.setPAT,disabled:e.is_PAT_in_store()},{default:(0,o.w5)((()=>[(0,o.Uk)((0,m.zw)(e.is_PAT_in_store()?"已存在":"新增"),1)])),_:1},8,["onClick","disabled"])]),b,(0,o.Wm)("div",y,[(0,o.Wm)(u,{class:"text-lg",size:"large",type:"primary",ghost:"",onClick:t[2]||(t[2]=t=>e.getData()),disabled:!e.is_PAT_in_store()},{default:(0,o.w5)((()=>[k])),_:1},8,["disabled"])]),(0,o.Wm)("div",w,[e.state.user?((0,o.wg)(),(0,o.j4)(l,{key:0,user:e.state.user},null,8,["user"])):(0,o.kq)("",!0)]),(0,o.Wm)("div",x,[(0,o.Wm)(c,{repos:e.state.staredRepos},null,8,["repos"])])])])}var P=r(2262),A=r(7760);const _=(e,t)=>{const r=e.storage||sessionStorage,n=e.key||t.$id;if(e.paths){const o=e.paths.reduce(((e,r)=>(e[r]=t.$state[r],e)),{});r.setItem(n,JSON.stringify(o))}else r.setItem(n,JSON.stringify(t.$state))};var C=({options:e,store:t})=>{e.persist?.enabled&&(e.persist?.strategies.forEach((e=>{const r=e.storage||sessionStorage,n=e.key||t.$id,o=r.getItem(n);o&&(t.$patch(JSON.parse(o)),r.setItem(n,JSON.stringify(t.$state)),_(e,t))})),(0,o.YP)((()=>t.$state),(()=>{e.persist?.strategies.forEach((e=>{_(e,t)}))}),{deep:!0}))};const O=(0,A.WB)();O.use(C);const j=(0,A.Q_)({id:"mainAppStore",state(){return{PAT:"",user:null,staredRepos:null}},persist:{enabled:!0,strategies:[{key:"pinia",storage:localStorage}]}});var S=r(6871);const U=async(e,t="")=>{const r=j().PAT,n=await(0,S.B)({query:"query ($userName: String!,$Cursor:String!) {\n      user(login: $userName) {\n        starredRepositories(after:$Cursor,first: 100, orderBy: {field: STARRED_AT, direction: ASC}) {\n          totalCount\n          pageInfo {\n            startCursor\n            hasNextPage\n            endCursor\n            hasPreviousPage\n          }\n          nodes {\n            id\n            name\n            nameWithOwner\n            description\n            url\n            createdAt\n            updatedAt\n            forkCount\n            diskUsage\n            homepageUrl\n            openGraphImageUrl\n            repositoryTopics(first: 20) {\n              nodes {\n                topic {\n                  id\n                  name\n                }\n              }\n            }\n            languages(first: 20) {\n              nodes {\n                id\n                name\n                color\n              }\n              totalCount\n            }\n            stargazerCount\n          }\n        }\n        id\n        bio\n        avatarUrl\n        company\n        email\n        name\n        url\n        createdAt\n      }\n    }",userName:e,Cursor:t,headers:{authorization:`token ${r}`}});return{user:{bio:n.user.bio,avatarUrl:n.user.avatarUrl,company:n.user.company,email:n.user.email,name:n.user.name,id:n.user.id},repos:n.user.starredRepositories.nodes,hasNextPage:n.user.starredRepositories.pageInfo.hasNextPage,endCursor:n.user.starredRepositories.pageInfo.endCursor}};var T=r(8725);const z={class:"flex flex-row m-3 max-w-md border-2 rounded-xl justify-between"},N={class:"flex flex-col justify-center w-full gap-2"},$={class:"text-3xl mb-3"};function R(e,t,r,n,a,s){return(0,o.wg)(),(0,o.j4)("div",z,[(0,o.Wm)("img",{class:"w-1/3",src:e.user.avatarUrl},null,8,["src"]),(0,o.Wm)("div",N,[(0,o.Wm)("h1",$,(0,m.zw)(e.user.name),1),(0,o.Wm)("p",null,(0,m.zw)(e.user.company),1),(0,o.Wm)("p",null,(0,m.zw)(e.user.email),1),(0,o.Wm)("p",null,(0,m.zw)(e.user.bio),1)])])}var E=(0,o.aZ)({name:"UserProfile",props:{user:Object}});E.render=R;var I=E;const q=()=>[{type:"expand",expandable:(e,t)=>1!==t,renderExpand:e=>(0,o.Wm)("p",null,[e.description])},{title:"Name",key:"name",render(e){return e.homepageUrl?(0,o.Wm)("a",{class:"hover:text-green-300 text-green-500 ",href:e.homepageUrl,target:"_blank"},[e.name]):(0,o.Wm)("h3",null,[e.name])}},{title:"nameWithOwner",key:"nameWithOwner",render(e){const[t,r]=e.nameWithOwner.split("/");return e.url?(0,o.Wm)("a",{class:"hover:text-green-300 text-green-500",href:e.url,target:"_blank"},[(0,o.Wm)("p",null,[t,(0,o.Uk)("/")]),(0,o.Wm)("p",null,[r])]):(0,o.Wm)("h3",null,[(0,o.Wm)("p",null,[t,(0,o.Uk)("/")]),(0,o.Wm)("p",null,[r])])}},{title:"createdAt",key:"createdAt",render(e){return(0,o.Wm)("p",null,[new Date(e.createdAt).toLocaleDateString()])},sortOrder:"ascend",sorter:"default"},{title:"updatedAt",key:"updatedAt",render(e){return(0,o.Wm)("p",null,[new Date(e.updatedAt).toLocaleDateString()])},sortOrder:"ascend",sorter:"default"},{title:"forkCount",key:"forkCount",sortOrder:"ascend",sorter:"default"},{title:"diskUsage",key:"diskUsage"},{title:"stargazerCount",key:"stargazerCount",sortOrder:"ascend",sorter:"default"},{title:"openGraphImageUrl",key:"openGraphImageUrl"}];var D=(0,o.aZ)({name:"RepoProfile",props:{repos:{type:Array,required:!0}},setup(e){const t=(0,P.qj)(q()),r=(0,P.qj)({page:1,pageSize:100,pageSizes:[10,50,100,500],showSizePicker:!0,onChange:e=>{r.page=e},onPageSizeChange(e){r.pageSize=e,r.page=1}});return{columns:t,tableData:e.repos.map(((e,t)=>({key:t,...e}))),pagination:r}},render(){return(0,o.Wm)((0,o.up)("n-data-table"),{columns:this.columns,data:this.tableData,pagination:this.pagination,"max-height":"500px","scroll-x":"1200","virtual-scroll":!0},null)}}),B=(0,o.aZ)({name:"Home",components:{UserProfile:I,RepoProfile:D},setup(){const e=j(),t=(0,T.K)(),r=(0,P.iH)("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"),n=()=>{e.$patch({PAT:r.value})},o=(0,P.qj)({}),a=async()=>{try{let r,n=[];do{t.start(),r?.endCursor?(r=await U("et84121",r.endCursor),r.repos&&(n=[...n,...r.repos])):r=await U("et84121"),t.finish()}while(r.hasNextPage);Object.assign(o,r.user),e.$patch({user:o,staredRepos:n})}catch(r){t.error()}},s=()=>""!==e.PAT;return{PAT:r,setPAT:n,is_PAT_in_store:s,getData:a,user:o,state:e.$state}}});B.render=W;var F=B;const G=[{path:"/",name:"Home",component:F},{path:"/about",name:"About",component:()=>r.e(443).then(r.bind(r,9211))}],J=(0,f.p7)({history:(0,f.PO)("/"),routes:G});var L=J,H=r(331);const Z=(0,n.ri)(d);Z.use(L),Z.use(H.Z),Z.use(O),Z.mount("#app")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.m=e,function(){var e=[];r.O=function(t,n,o,a){if(!n){var s=1/0;for(c=0;c<e.length;c++){n=e[c][0],o=e[c][1],a=e[c][2];for(var i=!0,u=0;u<n.length;u++)(!1&a||s>=a)&&Object.keys(r.O).every((function(e){return r.O[e](n[u])}))?n.splice(u--,1):(i=!1,a<s&&(s=a));if(i){e.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,o,a]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,n){return r.f[n](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/about.9477ddb5.js"}}(),function(){r.miniCssF=function(e){}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="github_star_repo:";r.l=function(n,o,a,s){if(e[n])e[n].push(o);else{var i,u;if(void 0!==a)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var d=l[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+a){i=d;break}}i||(u=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",t+a),i.src=n),e[n]=[o];var p=function(t,r){i.onerror=i.onload=null,clearTimeout(f);var o=e[n];if(delete e[n],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(r)})),t)return t(r)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),u&&document.head.appendChild(i)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.p="/"}(),function(){var e={143:0};r.f.j=function(t,n){var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise((function(r,n){o=e[t]=[r,n]}));n.push(o[2]=a);var s=r.p+r.u(t),i=new Error,u=function(n){if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+a+": "+s+")",i.name="ChunkLoadError",i.type=a,i.request=s,o[1](i)}};r.l(s,u,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,a,s=n[0],i=n[1],u=n[2],l=0;for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(u)var c=u(r);for(t&&t(n);l<s.length;l++)a=s[l],r.o(e,a)&&e[a]&&e[a][0](),e[s[l]]=0;return r.O(c)},n=self["webpackChunkgithub_star_repo"]=self["webpackChunkgithub_star_repo"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(2710)}));n=r.O(n)})();
//# sourceMappingURL=app.072bf755.js.map