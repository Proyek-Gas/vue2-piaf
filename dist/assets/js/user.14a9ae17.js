(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{1348:function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("b-row",{staticClass:"h-100"},[e("b-colxx",{staticClass:"mx-auto my-auto",attrs:{xxs:"12",md:"10"}},[e("b-card",{staticClass:"auth-card",attrs:{"no-body":""}},[e("div",{staticClass:"position-relative image-side "},[e("p",{staticClass:" text-white h2"},[s._v(s._s(s.$t("dashboards.magic-is-in-the-details")))]),s._v(" "),e("p",{staticClass:"white mb-0"},[s._v("  Please use this form to register. "),e("br"),s._v("If you are a member, please\n              "),e("router-link",{staticClass:"white",attrs:{tag:"a",to:"/user/login"}},[s._v("login")]),s._v(".\n            ")],1)]),s._v(" "),e("div",{staticClass:"form-side"},[e("router-link",{attrs:{tag:"a",to:"/"}},[e("span",{staticClass:"logo-single"})]),s._v(" "),e("h6",{staticClass:"mb-4"},[s._v(s._s(s.$t("user.register")))]),s._v(" "),e("b-form",{on:{submit:function(t){return t.preventDefault(),s.formSubmit(t)}}},[e("label",{staticClass:"form-group has-float-label mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.fullname,expression:"fullname"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:s.fullname},on:{input:function(t){t.target.composing||(s.fullname=t.target.value)}}}),s._v(" "),e("span",[s._v(s._s(s.$t("user.fullname")))])]),s._v(" "),e("label",{staticClass:"form-group has-float-label mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email"},domProps:{value:s.email},on:{input:function(t){t.target.composing||(s.email=t.target.value)}}}),s._v(" "),e("span",[s._v(s._s(s.$t("user.email")))])]),s._v(" "),e("label",{staticClass:"form-group has-float-label mb-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:s.password},on:{input:function(t){t.target.composing||(s.password=t.target.value)}}}),s._v(" "),e("span",[s._v(s._s(s.$t("user.password")))])]),s._v(" "),e("div",{staticClass:"d-flex justify-content-end align-items-center"},[e("b-button",{staticClass:"btn-shadow",attrs:{type:"submit",variant:"primary",size:"lg"}},[s._v(s._s(s.$t("user.register-button")))])],1)])],1)])],1)],1)},r=[],o=e("2b47"),i={data:function(){return{fullname:"",email:"",password:""}},methods:{formSubmit:function(){console.log("register"),this.$router.push(o["a"])}}},n=i,l=e("2877"),c=Object(l["a"])(n,a,r,!1,null,null,null);t["default"]=c.exports},"37cb":function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("b-row",{staticClass:"h-100"},[e("b-colxx",{staticClass:"mx-auto my-auto",attrs:{xxs:"12",md:"10"}},[e("b-card",{staticClass:"auth-card",attrs:{"no-body":""}},[e("div",{staticClass:"position-relative image-side"},[e("p",{staticClass:"text-white h2"},[s._v(s._s(s.$t("dashboards.magic-is-in-the-details")))]),s._v(" "),e("p",{staticClass:"white mb-0"},[s._v("\r\n                    Please use your e-mail to reset your password.\r\n                    "),e("br"),s._v("If you are not a member, please\r\n                    "),e("router-link",{staticClass:"white",attrs:{tag:"a",to:"/user/register"}},[s._v("register")]),s._v(".\r\n                ")],1)]),s._v(" "),e("div",{staticClass:"form-side"},[e("router-link",{attrs:{tag:"a",to:"/"}},[e("span",{staticClass:"logo-single"})]),s._v(" "),e("h6",{staticClass:"mb-4"},[s._v(s._s(s.$t("user.forgot-password")))]),s._v(" "),e("b-form",{staticClass:"av-tooltip tooltip-label-bottom",on:{submit:function(t){return t.preventDefault(),s.formSubmit(t)}}},[e("b-form-group",{staticClass:"has-float-label mb-4",attrs:{label:s.$t("user.email")}},[e("b-form-input",{attrs:{type:"text",state:!s.$v.form.email.$error},model:{value:s.$v.form.email.$model,callback:function(t){s.$set(s.$v.form.email,"$model",t)},expression:"$v.form.email.$model"}}),s._v(" "),s.$v.form.email.required?s.$v.form.email.email?s.$v.form.email.minLength?s._e():e("b-form-invalid-feedback",[s._v("Your email must be minimum 4 characters")]):e("b-form-invalid-feedback",[s._v("Please enter a valid email address")]):e("b-form-invalid-feedback",[s._v("Please enter your email address")])],1),s._v(" "),e("div",{staticClass:"d-flex justify-content-between align-items-center"},[e("router-link",{attrs:{tag:"a",to:"/user/forgot-password"}},[s._v(s._s(s.$t("user.forgot-password-question")))]),s._v(" "),e("b-button",{class:{"btn-multiple-state btn-shadow":!0,"show-spinner":s.processing,"show-success":!s.processing&&!1===s.loginError,"show-fail":!s.processing&&s.loginError},attrs:{type:"submit",variant:"primary",size:"lg",disabled:s.processing}},[e("span",{staticClass:"spinner d-inline-block"},[e("span",{staticClass:"bounce1"}),s._v(" "),e("span",{staticClass:"bounce2"}),s._v(" "),e("span",{staticClass:"bounce3"})]),s._v(" "),e("span",{staticClass:"icon success"},[e("i",{staticClass:"simple-icon-check"})]),s._v(" "),e("span",{staticClass:"icon fail"},[e("i",{staticClass:"simple-icon-exclamation"})]),s._v(" "),e("span",{staticClass:"label"},[s._v(s._s(s.$t("user.reset-password-button")))])])],1)],1)],1)])],1)],1)},r=[],o=e("5530"),i=e("2f62"),n=e("1dce"),l=e("b5ae"),c=l.required,u=(l.maxLength,l.minLength),m=l.email,d={data:function(){return{form:{email:"test@coloredstrategies.com"}}},mixins:[n["validationMixin"]],validations:{form:{email:{required:c,email:m,minLength:u(4)}}},computed:Object(o["a"])({},Object(i["c"])(["processing","loginError","forgotMailSuccess"])),methods:Object(o["a"])(Object(o["a"])({},Object(i["b"])(["forgotPassword"])),{},{formSubmit:function(){this.$v.form.$touch(),this.$v.form.$anyError||this.forgotPassword({email:this.form.email})}}),watch:{loginError:function(s){null!=s&&this.$notify("error","Forgot Password Error",s,{duration:3e3,permanent:!1})},forgotMailSuccess:function(s){s&&this.$notify("success","Forgot Password Success","Please check your email.",{duration:3e3,permanent:!1})}}},p=d,v=e("2877"),f=Object(v["a"])(p,a,r,!1,null,null,null);t["default"]=f.exports},ac2a:function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("b-row",{staticClass:"h-100"},[e("b-colxx",{staticClass:"mx-auto my-auto",attrs:{xxs:"12",md:"10"}},[e("b-card",{staticClass:"auth-card",attrs:{"no-body":""}},[e("div",{staticClass:"position-relative image-side"},[e("p",{staticClass:"text-white h2"},[s._v("QUOTATION")]),s._v(" "),e("p",{staticClass:"white mb-0"},[s._v("\r\n                    Please use your credentials to login.\r\n                    "),e("br"),s._v("If you are not a member, please\r\n                    "),e("router-link",{staticClass:"white",attrs:{tag:"a",to:"/user/register"}},[s._v("register")]),s._v(".\r\n                ")],1)]),s._v(" "),e("div",{staticClass:"form-side"},[e("router-link",{attrs:{tag:"a",to:"/"}},[e("span",{staticClass:"logo-single"})]),s._v(" "),e("h6",{staticClass:"mb-4"},[s._v(s._s(s.$t("user.login-title")))]),s._v(" "),e("b-form",{staticClass:"av-tooltip tooltip-label-bottom",on:{submit:function(t){return t.preventDefault(),s.formSubmit(t)}}},[e("b-form-group",{staticClass:"has-float-label mb-4",attrs:{label:s.$t("user.phone")}},[e("b-form-input",{attrs:{type:"text",state:!s.$v.form.phone.$error},model:{value:s.$v.form.phone.$model,callback:function(t){s.$set(s.$v.form.phone,"$model",t)},expression:"$v.form.phone.$model"}}),s._v(" "),s.$v.form.phone.required?s._e():e("b-form-invalid-feedback",[s._v("Please enter your phone number")])],1),s._v(" "),e("b-form-group",{staticClass:"has-float-label mb-4",attrs:{label:s.$t("user.password")}},[e("b-form-input",{attrs:{type:"password",state:!s.$v.form.password.$error},model:{value:s.$v.form.password.$model,callback:function(t){s.$set(s.$v.form.password,"$model",t)},expression:"$v.form.password.$model"}}),s._v(" "),s.$v.form.password.required?s._e():e("b-form-invalid-feedback",[s._v("Please enter your password")])],1),s._v(" "),e("div",{staticClass:"d-flex justify-content-between align-items-center"},[e("b-button",{class:{"btn-multiple-state btn-shadow":!0,"show-spinner":s.processing,"show-success":!s.processing&&!1===s.loginError,"show-fail":!s.processing&&s.loginError},attrs:{type:"submit",variant:"primary",size:"lg",disabled:s.processing}},[e("span",{staticClass:"spinner d-inline-block"},[e("span",{staticClass:"bounce1"}),s._v(" "),e("span",{staticClass:"bounce2"}),s._v(" "),e("span",{staticClass:"bounce3"})]),s._v(" "),e("span",{staticClass:"icon success"},[e("i",{staticClass:"simple-icon-check"})]),s._v(" "),e("span",{staticClass:"icon fail"},[e("i",{staticClass:"simple-icon-exclamation"})]),s._v(" "),e("span",{staticClass:"label"},[s._v(s._s(s.$t("user.login-button")))])])],1)],1)],1)])],1)],1)},r=[],o=e("5530"),i=e("2f62"),n=e("1dce"),l=e("2b47"),c=(e("ed08"),e("b5ae")),u=c.required,m=c.maxLength,d=c.minLength,p=(c.email,{data:function(){return{form:{phone:"",password:""}}},mixins:[n["validationMixin"]],validations:{form:{password:{required:u,maxLength:m(16),minLength:d(4)},phone:{required:u}}},computed:Object(o["a"])({},Object(i["c"])(["currentUser","processing","loginError"])),mounted:function(){},methods:Object(o["a"])(Object(o["a"])({},Object(i["b"])(["login"])),{},{formSubmit:function(){this.$v.$touch(),this.$v.$touch(),this.$v.form.$touch(),this.$v.form.$touch(),this.$v.form.$anyError||this.login({email:this.form.phone,password:this.form.password})}}),watch:{currentUser:function(s){var t=this;console.log(s),s&&s.token&&s.token.length>0&&setTimeout((function(){t.$router.push(l["a"])}),200)},loginError:function(s){null!=s&&this.$notify("error","Login Error",s,{duration:3e3,permanent:!1})}}}),v=p,f=e("2877"),b=Object(f["a"])(v,a,r,!1,null,null,null);t["default"]=b.exports},c1bd:function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("b-row",{staticClass:"h-100"},[e("b-colxx",{staticClass:"mx-auto my-auto",attrs:{xxs:"12",md:"10"}},[e("b-card",{staticClass:"auth-card",attrs:{"no-body":""}},[e("div",{staticClass:"position-relative image-side"},[e("p",{staticClass:"text-white h2"},[s._v(s._s(s.$t("dashboards.magic-is-in-the-details")))]),s._v(" "),e("p",{staticClass:"white mb-0"},[s._v("\n          Please use your credentials to login.\n          "),e("br"),s._v("If you are not a member, please\n          "),e("router-link",{staticClass:"white",attrs:{tag:"a",to:"/user/register"}},[s._v("register")]),s._v(".\n        ")],1)]),s._v(" "),e("div",{staticClass:"form-side"},[e("router-link",{attrs:{tag:"a",to:"/"}},[e("span",{staticClass:"logo-single"})]),s._v(" "),e("h6",{staticClass:"mb-4"},[s._v(s._s(s.$t("user.login-title")))]),s._v(" "),e("b-form",{staticClass:"av-tooltip tooltip-label-bottom",on:{submit:function(t){return t.preventDefault(),s.formSubmit(t)}}},[e("b-form-group",{staticClass:"has-float-label mb-4",attrs:{label:s.$t("user.password")}},[e("b-form-input",{attrs:{type:"password",state:!s.$v.form.password.$error},model:{value:s.$v.form.password.$model,callback:function(t){s.$set(s.$v.form.password,"$model",t)},expression:"$v.form.password.$model"}}),s._v(" "),s.$v.form.password.required?s.$v.form.password.minLength&&s.$v.form.password.maxLength?s._e():e("b-form-invalid-feedback",[s._v("Your password must be between 4 and 16 characters")]):e("b-form-invalid-feedback",[s._v("Please enter your password")])],1),s._v(" "),e("b-form-group",{staticClass:"has-float-label mb-4",attrs:{label:s.$t("user.password-again")}},[e("b-form-input",{attrs:{type:"password",state:!s.$v.form.passwordAgain.$error},model:{value:s.$v.form.passwordAgain.$model,callback:function(t){s.$set(s.$v.form.passwordAgain,"$model",t)},expression:"$v.form.passwordAgain.$model"}}),s._v(" "),s.$v.form.passwordAgain.required?s.$v.form.passwordAgain.sameAsPassword?s._e():e("b-form-invalid-feedback",[s._v("Your inputs does not match")]):e("b-form-invalid-feedback",[s._v("Please enter your password again")])],1),s._v(" "),e("div",{staticClass:"d-flex justify-content-between align-items-center"},[e("router-link",{attrs:{tag:"a",to:"/user/forgot-password"}},[s._v(s._s(s.$t("user.forgot-password-question")))]),s._v(" "),e("b-button",{class:{"btn-multiple-state btn-shadow":!0,"show-spinner":s.processing,"show-success":!s.processing&&!1===s.loginError,"show-fail":!s.processing&&s.loginError},attrs:{type:"submit",variant:"primary",size:"lg",disabled:s.processing}},[e("span",{staticClass:"spinner d-inline-block"},[e("span",{staticClass:"bounce1"}),s._v(" "),e("span",{staticClass:"bounce2"}),s._v(" "),e("span",{staticClass:"bounce3"})]),s._v(" "),e("span",{staticClass:"icon success"},[e("i",{staticClass:"simple-icon-check"})]),s._v(" "),e("span",{staticClass:"icon fail"},[e("i",{staticClass:"simple-icon-exclamation"})]),s._v(" "),e("span",{staticClass:"label"},[s._v(s._s(s.$t("user.reset-password-button")))])])],1)],1)],1)])],1)],1)},r=[],o=e("5530"),i=e("2f62"),n=e("1dce"),l=e("b5ae"),c=l.required,u=l.maxLength,m=l.minLength,d=(l.email,l.sameAs),p={data:function(){return{form:{password:"",passwordAgain:""}}},mixins:[n["validationMixin"]],validations:{form:{password:{required:c,maxLength:u(16),minLength:m(4)},passwordAgain:{required:c,sameAsPassword:d("password")}}},computed:Object(o["a"])({},Object(i["c"])(["currentUser","processing","loginError","resetPasswordSuccess"])),methods:Object(o["a"])(Object(o["a"])({},Object(i["b"])(["resetPassword"])),{},{formSubmit:function(){this.$v.form.$touch(),this.$v.form.$anyError||this.resetPassword({newPassword:this.form.password,resetPasswordCode:this.$route.query.oobCode||""})}}),watch:{loginError:function(s){null!=s&&this.$notify("error","Reset Password Error",s,{duration:3e3,permanent:!1})},resetPasswordSuccess:function(s){s&&this.$notify("success","Reset Password Success","Reset password success",{duration:3e3,permanent:!1})}}},v=p,f=e("2877"),b=Object(f["a"])(v,a,r,!1,null,null,null);t["default"]=b.exports},e382:function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("user-layout",[e("router-view")],1)},r=[],o=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{attrs:{id:"root"}},[e("div",{staticClass:"fixed-background"}),s._v(" "),e("main",[e("div",{staticClass:"container"},[s._t("default")],2)])])},i=[],n={mounted:function(){document.body.classList.add("background")},beforeDestroy:function(){document.body.classList.remove("background")}},l=n,c=e("2877"),u=Object(c["a"])(l,o,i,!1,null,null,null),m=u.exports,d={components:{"user-layout":m}},p=d,v=Object(c["a"])(p,a,r,!1,null,null,null);t["default"]=v.exports}}]);