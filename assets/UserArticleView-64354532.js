import{_ as o,r as i,o as l,c,b as t,a as n,w as _,t as a}from"./index-af92421e.js";const{VITE_URL:d,VITE_PATH:u}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"zack_p",BASE_URL:"/vue_week7_assignment/",MODE:"production",DEV:!1,PROD:!0},p={data(){return{article:{},id:""}},methods:{getArticle(){this.$http.get(`${d}/api/${u}/article/${this.id}`).then(s=>{this.article=s.data.article}).catch(s=>{alert(s.response.data.message)})}},mounted(){this.id=this.$route.params.articleId,this.getArticle()}},h={class:"container"},m={class:"navbar navbar-expand bg-body-tertiary"},g={class:"container-fluid"},v=t("small",{class:"text-decoration-underline text-primary"},"部落格列表",-1),b=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),f={class:"row justify-content-center"},x={class:"col-md-8"},T={class:"text-muted"},E={class:"text-muted"},V=["src"];function k(s,y,A,w,e,I){const r=i("router-link");return l(),c("div",h,[t("nav",m,[t("div",g,[n(r,{class:"navbar-brand",to:"/user/articles"},{default:_(()=>[v,t("small",null," / "+a(e.article.title),1)]),_:1}),b])]),t("div",f,[t("div",x,[t("h2",null,a(e.article.title),1),t("p",null,[t("small",T,a(s.$filters.date(e.article.create_at))+"-",1),t("small",E,"作者："+a(e.article.author),1)]),t("img",{src:e.article.imageUrl,alt:""},null,8,V),t("p",null,a(e.article.description),1)])])])}const B=o(p,[["render",k]]);export{B as default};