import{j as o}from"./index-23ac5f93.js";const r=o("statusStore",{state:()=>({isLoading:!1,messages:[]}),actions:{pushMessage(s){const{title:t,content:e,style:a="success"}=s;this.messages.push({style:a,title:t,content:e})}}});export{r as s};