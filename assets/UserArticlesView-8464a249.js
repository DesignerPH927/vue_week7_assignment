import{_ as h,m,r as n,o,c as a,a as g,b as s,F as i,h as f,t as l,i as k,w as v,d as V,g as d}from"./index-af92421e.js";import{s as _}from"./statusStore-d902806f.js";const r=_(),{VITE_URL:L,VITE_PATH:$}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"zack_p",BASE_URL:"/vue_week7_assignment/",MODE:"production",DEV:!1,PROD:!0},E={data(){return{color:"purple",loader:"dots",articles:[]}},computed:{...m(_,["isLoading"])},methods:{getArticles(){r.isLoading=!0,this.$http.get(`${L}/api/${$}/articles`).then(t=>{this.articles=t.data.articles,r.isLoading=!1}).catch(t=>{r.isLoading=!1,alert(t.response.data.message)})}},mounted(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)zack0313\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=t,this.getArticles()}},A={class:"container"},T={class:"row"},b={key:0,class:"col-md-6"},x={class:"card"},y=["src"],w={class:"card-body"},B={class:"card-title"},P={class:"card-text"},U={class:"card-footer"};function D(t,N,R,S,c,z){const u=n("VueLoading"),p=n("router-link");return o(),a(i,null,[g(u,{active:t.isLoading,color:c.color,loader:c.loader},null,8,["active","color","loader"]),s("div",A,[s("div",T,[(o(!0),a(i,null,f(c.articles,e=>(o(),a(i,{key:e.id},[e.isPublic?(o(),a("div",b,[s("div",x,[s("img",{src:e.imageUrl,class:"card-img-top",alt:"..."},null,8,y),s("div",w,[s("h5",B,l(e.title),1),s("p",P,l(e.description),1)]),s("div",U,[e.isPublic?(o(),k(p,{key:0,to:`/user/article/${e.id}`,class:"btn btn-outline-primary"},{default:v(()=>[V("文章頁面")]),_:2},1032,["to"])):d("",!0)])])])):d("",!0)],64))),128))])])],64)}const H=h(E,[["render",D]]);export{H as default};
