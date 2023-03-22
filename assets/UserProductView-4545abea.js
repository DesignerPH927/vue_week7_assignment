import{_,m as p,r as a,o as r,c,a as n,b as t,w as m,t as o,F as g}from"./index-23ac5f93.js";import{s as l}from"./statusStore-19b35a70.js";const i=l(),{VITE_URL:h,VITE_PATH:v}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"zack_p",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},b={data(){return{color:"purple",loader:"dots",tempProduct:{},qty:1}},computed:{...p(l,["isLoading"])},methods:{getProduct(){i.isLoading=!0,this.id=this.$route.params.productId,this.$http.get(`${h}/api/${v}/product/${this.id}`).then(s=>{i.isLoading=!1,this.tempProduct=s.data.product}).catch(s=>{alert(s.response.data.message)})}},mounted(){this.getProduct()}},P={class:"container"},f={class:"navbar navbar-expand bg-body-tertiary"},x={class:"container-fluid"},y=t("small",{class:"text-decoration-underline text-primary"},"購物車",-1),V=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),L={class:"row gx-5"},T={class:"col-md-6"},E=["src"],k={class:"col-md-6 d-flex justify-content-center"},w={key:0,class:"h5 fw-bold"},U={key:1},I={class:"h6 text-muted"},B={class:"h5 text-danger fw-bold"};function D(s,R,S,A,e,C){const d=a("VueLoading"),u=a("router-link");return r(),c(g,null,[n(d,{active:s.isLoading,color:e.color,loader:e.loader},null,8,["active","color","loader"]),t("div",P,[t("nav",f,[t("div",x,[n(u,{class:"navbar-brand",to:"/user/cart"},{default:m(()=>[y,t("small",null," / "+o(e.tempProduct.title),1)]),_:1}),V])]),t("div",L,[t("div",T,[t("h2",null,o(e.tempProduct.title),1),t("p",null,[t("small",null,o(e.tempProduct.description),1)]),t("img",{src:e.tempProduct.imageUrl,alt:"",class:"img-fluid"},null,8,E)]),t("div",k,[e.tempProduct.origin_price===e.tempProduct.price?(r(),c("div",w,"原價"+o(e.tempProduct.origin_price)+"元",1)):(r(),c("div",U,[t("del",I," 原價"+o(e.tempProduct.origin_price)+"元 ",1),t("div",B," 現在只要"+o(e.tempProduct.price)+"元 ",1)]))])])])],64)}const N=_(b,[["render",D]]);export{N as default};
