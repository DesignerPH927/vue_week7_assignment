import{_ as o,r as l,o as i,c,b as t,a as n,w as d,t as a}from"./index-23ac5f93.js";const{VITE_URL:_,VITE_PATH:p}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"zack_p",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},u={data(){return{article:{},id:""}},methods:{getArticle(){this.$http.get(`${_}/api/${p}/article/${this.id}`).then(s=>{this.article=s.data.article}).catch(s=>{alert(s.response.data.message)})}},mounted(){this.id=this.$route.params.articleId,this.getArticle()}},h={class:"container"},m={class:"navbar navbar-expand bg-body-tertiary"},g={class:"container-fluid"},b=t("small",{class:"text-decoration-underline text-primary"},"部落格列表",-1),v=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),f={class:"row justify-content-center"},x={class:"col-md-8"},T={class:"text-muted"},E={class:"text-muted"},V=["src"];function y(s,A,k,I,e,U){const r=l("router-link");return i(),c("div",h,[t("nav",m,[t("div",g,[n(r,{class:"navbar-brand",to:"/user/articles"},{default:d(()=>[b,t("small",null," / "+a(e.article.title),1)]),_:1}),v])]),t("div",f,[t("div",x,[t("h2",null,a(e.article.title),1),t("p",null,[t("small",T,a(s.$filters.date(e.article.create_at))+"-",1),t("small",E,"作者："+a(e.article.author),1)]),t("img",{src:e.article.imageUrl,alt:""},null,8,V),t("p",null,a(e.article.description),1)])])])}const B=o(u,[["render",y]]);export{B as default};