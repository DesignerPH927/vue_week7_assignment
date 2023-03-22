import{_ as m,m as g,r as f,o as r,c as l,a as y,b as t,F as c,h as L,t as s,e as b,g as k}from"./index-af92421e.js";import{s as h}from"./statusStore-d902806f.js";const d=h(),{VITE_URL:u,VITE_PATH:_}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"zack_p",BASE_URL:"/vue_week7_assignment/",MODE:"production",DEV:!1,PROD:!0},v={data(){return{color:"purple",loader:"dots",order:{user:{}},id:""}},computed:{...g(h,["isLoading"])},methods:{getOrder(){d.isLoading=!0,this.$http.get(`${u}/api/${_}/order/${this.id}`).then(o=>{d.isLoading=!1,this.order=o.data.order}).catch(o=>{d.isLoading=!1,alert(o.response.data.message)})},confirmPay(){d.isLoading=!0,this.$http.post(`${u}/api/${_}/pay/${this.id}`).then(o=>{d.isLoading=!1,this.getOrder()}).catch(o=>{d.isLoading=!1,alert(o.response.data.message)})}},mounted(){this.id=this.$route.params.checkPaidId,this.getOrder()}},V={class:"mt-5"},x={class:"row justify-content-center"},E={class:"col-md-6"},P={class:"table align-middle mb-3"},w=t("thead",null,[t("tr",null,[t("th",null,"品名"),t("th",{width:"150"},"數量"),t("th",{width:"150"},"單價")])],-1),T={class:"text-end"},O=t("td",{colspan:"2",class:"text-end"},"總計",-1),B={colspan:"2",class:"text-end"},C={class:"table align-middle"},D=t("th",{width:"150"},"Email",-1),R=t("th",null,"姓名",-1),S=t("th",null,"收件人電話",-1),U=t("th",null,"收件人地址",-1),A=t("th",null,"付款狀態",-1),N={key:0,class:"text-success"},F={key:1,class:"text-danger"},H={key:0,class:"mb-3 text-end"};function M(o,i,j,q,e,a){const p=f("VueLoading");return r(),l(c,null,[y(p,{active:o.isLoading,color:e.color,loader:e.loader},null,8,["active","color","loader"]),t("div",V,[t("div",x,[t("div",E,[t("table",P,[w,t("tbody",null,[(r(!0),l(c,null,L(e.order.products,n=>(r(),l("tr",{key:n.id},[t("td",null,s(n.product.title),1),t("td",null,s(n.qty)+" / "+s(n.product.unit),1),t("td",T,s(n.total),1)]))),128)),t("tr",null,[O,t("td",B,s(e.order.total),1)])])]),t("table",C,[t("tbody",null,[t("tr",null,[D,t("td",null,s(e.order.user.email),1)]),t("tr",null,[R,t("td",null,s(e.order.user.name),1)]),t("tr",null,[S,t("td",null,s(e.order.user.tel),1)]),t("tr",null,[U,t("td",null,s(e.order.user.address),1)]),t("tr",null,[A,t("td",null,[e.order.is_paid?(r(),l("span",N,"已付款")):(r(),l("span",F,"未付款"))])])])]),e.order.is_paid?k("",!0):(r(),l("div",H,[t("button",{class:"btn btn-danger",type:"button",onClick:i[0]||(i[0]=b((...n)=>a.confirmPay&&a.confirmPay(...n),["prevent"]))},"確認付款去")]))])])])],64)}const $=m(v,[["render",M]]);export{$ as default};