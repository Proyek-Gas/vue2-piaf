(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},1798:function(e,t,s){"use strict";var n=s("7e41"),i=s.n(n);i.a},"5c47":function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("label",{class:e.classObject},[e.shouldShowLabel?s("span",{staticClass:"vue-switcher__label"},[e.label?s("span",{domProps:{textContent:e._s(e.label)}}):e._e(),e._v(" "),!e.label&&e.value?s("span",{domProps:{textContent:e._s(e.textEnabled)}}):e._e(),e._v(" "),e.label||e.value?e._e():s("span",{domProps:{textContent:e._s(e.textDisabled)}})]):e._e(),e._v(" "),s("input",{attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:e.value},on:{change:e.trigger}}),e._v(" "),s("div")])},i=[],a=s("ade3"),l={name:"switches",props:{typeBold:{default:!1},value:{default:!1},disabled:{default:!1},label:{default:""},textEnabled:{default:""},textDisabled:{default:""},color:{default:"default"},theme:{default:"default"},emitOnMount:{default:!0}},mounted:function(){this.emitOnMount&&this.$emit("input",this.value)},methods:{trigger:function(e){this.$emit("input",e.target.checked)}},computed:{classObject:function(){var e,t=this.color,s=this.value,n=this.theme,i=this.typeBold,l=this.disabled;return e={"vue-switcher":!0},Object(a["a"])(e,"vue-switcher--unchecked",!s),Object(a["a"])(e,"vue-switcher--disabled",l),Object(a["a"])(e,"vue-switcher--bold",i),Object(a["a"])(e,"vue-switcher--bold--unchecked",i&&!s),Object(a["a"])(e,"vue-switcher-theme--".concat(n),t),Object(a["a"])(e,"vue-switcher-color--".concat(t),t),e},shouldShowLabel:function(){return""!==this.label||""!==this.textEnabled||""!==this.textDisabled}}},c=l,u=(s("1798"),s("2877")),r=Object(u["a"])(c,n,i,!1,null,null,null);t["a"]=r.exports},"7db0":function(e,t,s){"use strict";var n=s("23e7"),i=s("b727").find,a=s("44d2"),l=s("ae40"),c="find",u=!0,r=l(c);c in[]&&Array(1)[c]((function(){u=!1})),n({target:"Array",proto:!0,forced:u||!r},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),a(c)},"7e41":function(e,t,s){},"841c":function(e,t,s){"use strict";var n=s("d784"),i=s("825a"),a=s("1d80"),l=s("129f"),c=s("14c3");n("search",1,(function(e,t,s){return[function(t){var s=a(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,s):new RegExp(t)[e](String(s))},function(e){var n=s(t,e,this);if(n.done)return n.value;var a=i(e),u=String(this),r=a.lastIndex;l(r,0)||(a.lastIndex=0);var o=c(a,u);return l(a.lastIndex,r)||(a.lastIndex=r),null===o?-1:o.index}]}))},f82c:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("app-layout",[s("router-view")],1)},i=[],a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:e.getMenuType,attrs:{id:"app-container"}},[s("topnav"),e._v(" "),s("sidebar"),e._v(" "),s("main",[s("div",{staticClass:"container-fluid"},[e._t("default")],2)]),e._v(" "),s("footer-component")],1)},l=[],c=s("5530"),u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sidebar",on:{click:function(e){e.stopPropagation()}}},[s("div",{staticClass:"main-menu"},[s("vue-perfect-scrollbar",{staticClass:"scroll",attrs:{settings:{suppressScrollX:!0,wheelPropagation:!1}}},[s("ul",{staticClass:"list-unstyled"},e._l(e.filteredMenuItems(e.menuItems),(function(t,n){return s("li",{key:"parent_"+n,class:{active:e.selectedParentMenu===t.id&&""===e.viewingParentMenu||e.viewingParentMenu===t.id},attrs:{"data-flag":t.id}},[t.newWindow?s("a",{attrs:{href:t.to,rel:"noopener noreferrer",target:"_blank"}},[s("i",{class:t.icon}),e._v("\n            "+e._s(e.$t(t.label))+"\n          ")]):t.subs&&t.subs.length>0?s("a",{attrs:{href:"#"+t.to},on:{click:function(s){return s.preventDefault(),e.openSubMenu(s,t)}}},[s("i",{class:t.icon}),e._v("\n            "+e._s(e.$t(t.label))+"\n          ")]):s("router-link",{attrs:{to:t.to},nativeOn:{click:function(s){return e.changeSelectedParentHasNoSubmenu(t.id)}}},[s("i",{class:t.icon}),e._v("\n            "+e._s(e.$t(t.label))+"\n          ")])],1)})),0)])],1),e._v(" "),s("div",{staticClass:"sub-menu"},[s("vue-perfect-scrollbar",{staticClass:"scroll",attrs:{settings:{suppressScrollX:!0,wheelPropagation:!1}}},e._l(e.filteredMenuItems(e.menuItems),(function(t,n){return s("ul",{key:"sub_"+t.id,class:{"list-unstyled":!0,"d-block":e.selectedParentMenu===t.id&&""===e.viewingParentMenu||e.viewingParentMenu===t.id},attrs:{"data-parent":t.id}},e._l(e.filteredMenuItems(t.subs),(function(t,i){return s("li",{key:"sub_"+i,class:{"has-sub-item":t.subs&&t.subs.length>0,active:e.$route.path.indexOf(t.to)>-1}},[t.newWindow?s("a",{attrs:{href:t.to,rel:"noopener noreferrer",target:"_blank"}},[s("i",{class:t.icon}),e._v(" "),s("span",[e._v(e._s(e.$t(t.label)))])]):t.subs&&t.subs.length>0?[s("b-link",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:"menu_"+n+"_"+i,expression:"`menu_${itemIndex}_${subIndex}`"}],staticClass:"rotate-arrow-icon opacity-50",attrs:{variant:"link"}},[s("i",{staticClass:"simple-icon-arrow-down"}),e._v(" "),s("span",{staticClass:"d-inline-block"},[e._v(e._s(e.$t(t.label)))])]),e._v(" "),s("b-collapse",{attrs:{visible:"",id:"menu_"+n+"_"+i}},[s("ul",{staticClass:"list-unstyled third-level-menu"},e._l(e.filteredMenuItems(t.subs),(function(t,a){return s("li",{key:"third_"+n+"_"+i+"_"+a,class:{"third-level-menu":!0,active:e.$route.path===t.to}},[t.newWindow?s("a",{attrs:{href:t.to,rel:"noopener noreferrer",target:"_blank"}},[s("i",{class:t.icon}),e._v(" "),s("span",[e._v(e._s(e.$t(t.label)))])]):s("router-link",{attrs:{to:t.to}},[s("i",{class:t.icon}),e._v(" "),s("span",[e._v(e._s(e.$t(t.label)))])])],1)})),0)])]:s("router-link",{attrs:{to:t.to}},[s("i",{class:t.icon}),e._v(" "),s("span",[e._v(e._s(e.$t(t.label)))])])],2)})),0)})),0)],1)])},r=[],o=(s("4de4"),s("7db0"),s("caad"),s("a15b"),s("ac1f"),s("2532"),s("1276"),s("2f62")),d=s("2b47"),m=(s("d70f"),[{id:"datatable",icon:"iconsminds-shop",label:"menu.datatable",to:"".concat(d["a"],"/datatable"),subs:[{icon:"simple-icon-paper-plane",label:"menu.customerTable",to:"".concat(d["a"],"/datatable/customerTable")},{icon:"simple-icon-paper-plane",label:"menu.projectTable",to:"".concat(d["a"],"/datatable/projectTable")},{icon:"simple-icon-paper-plane",label:"menu.schemeTable",to:"".concat(d["a"],"/datatable/schemeTable")},{icon:"simple-icon-paper-plane",label:"menu.itemTable",to:"".concat(d["a"],"/datatable/itemTable")},{icon:"simple-icon-paper-plane",label:"menu.quoteTable",to:"".concat(d["a"],"/datatable/quoteTable")}]}]),h=m,v={data:function(){return{selectedParentMenu:"",menuItems:h,viewingParentMenu:""}},mounted:function(){this.selectMenu(),window.addEventListener("resize",this.handleWindowResize),document.addEventListener("click",this.handleDocumentClick),this.handleWindowResize()},beforeDestroy:function(){document.removeEventListener("click",this.handleDocumentClick),window.removeEventListener("resize",this.handleWindowResize)},methods:Object(c["a"])(Object(c["a"])({},Object(o["d"])(["changeSideMenuStatus","addMenuClassname","changeSelectedMenuHasSubItems"])),{},{selectMenu:function(){var e=this.$route.path.split("/").filter((function(e){return""!==e}))[1];this.selectedParentMenu=void 0!==e||null!==e?e.toLowerCase():"dashboards",this.isCurrentMenuHasSubItem()},isCurrentMenuHasSubItem:function(){var e=this,t=this.menuItems.find((function(t){return t.id===e.selectedParentMenu})),s=!!(t&&t.subs&&t.subs.length>0);return s!=this.selectedMenuHasSubItems&&(s?this.changeSideMenuStatus({step:0,classNames:this.menuType,selectedMenuHasSubItems:!0}):this.changeSideMenuStatus({step:0,classNames:this.menuType,selectedMenuHasSubItems:!1})),s},changeSelectedParentHasNoSubmenu:function(e){this.selectedParentMenu=e,this.viewingParentMenu=e,this.changeSelectedMenuHasSubItems(!1),this.changeSideMenuStatus({step:0,classNames:this.menuType,selectedMenuHasSubItems:!1})},openSubMenu:function(e,t){var s=t.id,n=t.subs&&t.subs.length>0;if(this.changeSelectedMenuHasSubItems(n),n){var i=this.menuType?this.menuType.split(" ").filter((function(e){return""!==e})):"";i.includes("menu-mobile")?this.addMenuClassname({classname:"sub-show-temporary",currentClasses:this.menuType}):!i.includes("menu-sub-hidden")||2!==this.menuClickCount&&0!==this.menuClickCount?!i.includes("menu-hidden")||1!==this.menuClickCount&&3!==this.menuClickCount?!i.includes("menu-default")||i.includes("menu-sub-hidden")||1!==this.menuClickCount&&3!==this.menuClickCount||this.changeSideMenuStatus({step:0,classNames:this.menuType,selectedMenuHasSubItems:n}):this.changeSideMenuStatus({step:2,classNames:this.menuType,selectedMenuHasSubItems:n}):this.changeSideMenuStatus({step:3,classNames:this.menuType,selectedMenuHasSubItems:n}),this.viewingParentMenu=s}else this.viewingParentMenu=s,this.selectedParentMenu=s,this.toggle()},handleDocumentClick:function(e){this.viewingParentMenu="",this.selectMenu(),this.toggle()},toggle:function(){var e=this.menuType.split(" ").filter((function(e){return""!==e}));e.includes("menu-sub-hidden")&&3===this.menuClickCount?this.changeSideMenuStatus({step:2,classNames:this.menuType,selectedMenuHasSubItems:this.selectedMenuHasSubItems}):(e.includes("menu-hidden")||e.includes("menu-mobile"))&&(1!==this.menuClickCount||this.selectedMenuHasSubItems)&&this.changeSideMenuStatus({step:0,classNames:this.menuType,selectedMenuHasSubItems:this.selectedMenuHasSubItems})},handleWindowResize:function(e){if(!e||e.isTrusted){var t=this.getMenuClassesForResize(this.menuType);this.changeSideMenuStatus({step:0,classNames:t.join(" "),selectedMenuHasSubItems:this.selectedMenuHasSubItems})}},getMenuClassesForResize:function(e){var t=e.split(" ").filter((function(e){return""!==e})),s=window.innerWidth;return s<d["l"]?t.push("menu-mobile"):s<d["n"]?(t=t.filter((function(e){return"menu-mobile"!==e})),t.includes("menu-default")&&!t.includes("menu-sub-hidden")&&t.push("menu-sub-hidden")):(t=t.filter((function(e){return"menu-mobile"!==e})),t.includes("menu-default")&&t.includes("menu-sub-hidden")&&(t=t.filter((function(e){return"menu-sub-hidden"!==e})))),t},filteredMenuItems:function(e){var t=this;return e?e.filter((function(e){return!e.roles||e.roles&&e.roles.includes(t.currentUser.role)})):[]}}),computed:Object(c["a"])({},Object(o["c"])({currentUser:"currentUser",menuType:"getMenuType",menuClickCount:"getMenuClickCount",selectedMenuHasSubItems:"getSelectedMenuHasSubItems"})),watch:{$route:function(e,t){if(e.path!==t.path){var s=e.path.split("/").filter((function(e){return""!==e}))[1];this.selectedParentMenu=void 0!==s||null!==s?s.toLowerCase():"dashboards",this.selectMenu(),this.toggle(),this.changeSideMenuStatus({step:0,classNames:this.menuType,selectedMenuHasSubItems:this.selectedMenuHasSubItems}),window.scrollTo(0,top)}}}},b=v,p=s("2877"),f=Object(p["a"])(b,u,r,!1,null,null,null),g=f.exports,w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("nav",{staticClass:"navbar fixed-top"},[s("div",{staticClass:"d-flex align-items-center navbar-left"},[s("a",{staticClass:"menu-button d-none d-md-block",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.changeSideMenuStatus({step:e.menuClickCount+1,classNames:e.menuType,selectedMenuHasSubItems:e.selectedMenuHasSubItems})}}},[s("menu-icon")],1),e._v(" "),s("a",{staticClass:"menu-button-mobile d-xs-block d-sm-block d-md-none",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.changeSideMenuForMobile(e.menuType)}}},[s("mobile-menu-icon")],1),e._v(" "),s("div",{staticClass:"d-inline-block"},[s("b-dropdown",{staticClass:"ml-2",attrs:{id:"langddm",variant:"light",size:"sm","toggle-class":"language-button"}},[s("template",{slot:"button-content"},[s("span",{staticClass:"name"},[e._v(e._s(e.$i18n.locale.toUpperCase()))])]),e._v(" "),e._l(e.localeOptions,(function(t,n){return s("b-dropdown-item",{key:n,on:{click:function(s){return e.changeLocale(t.id,t.direction)}}},[e._v(e._s(t.name))])}))],2)],1)]),e._v(" "),s("router-link",{staticClass:"navbar-logo",attrs:{tag:"a",to:e.adminRoot}},[s("h2",[e._v("QUOTATION")])]),e._v(" "),s("div",{staticClass:"navbar-right"},[s("div",{staticClass:"d-none d-md-inline-block align-middle mr-3"},[s("switches",{staticClass:"vue-switcher-small",attrs:{id:"tool-mode-switch",theme:"custom",color:"primary"},model:{value:e.isDarkActive,callback:function(t){e.isDarkActive=t},expression:"isDarkActive"}}),e._v(" "),s("b-tooltip",{attrs:{target:"tool-mode-switch",placement:"left",title:"Dark Mode"}})],1),e._v(" "),s("div",{staticClass:"header-icons d-inline-block align-middle"},[s("div",{staticClass:"position-relative d-inline-block"},[s("b-dropdown",{attrs:{variant:"empty",size:"sm",right:"","toggle-class":"header-icon notificationButton","menu-class":"position-absolute mt-3 notificationDropdown","no-caret":""}},[s("template",{slot:"button-content"},[s("i",{staticClass:"simple-icon-bell"}),e._v(" "),s("span",{staticClass:"count"},[e._v("3")])]),e._v(" "),s("vue-perfect-scrollbar",{attrs:{settings:{suppressScrollX:!0,wheelPropagation:!1}}},e._l(e.notifications,(function(t,n){return s("div",{key:n,staticClass:"d-flex flex-row mb-3 pb-3 border-bottom"},[s("router-link",{attrs:{tag:"a",to:"#"}},[s("img",{staticClass:"img-thumbnail list-thumbnail xsmall border-0 rounded-circle",attrs:{src:t.img,alt:t.title}})]),e._v(" "),s("div",{staticClass:"pl-3 pr-2"},[s("router-link",{attrs:{tag:"a",to:"#"}},[s("p",{staticClass:"font-weight-medium mb-1"},[e._v(e._s(t.title))]),e._v(" "),s("p",{staticClass:"text-muted mb-0 text-small"},[e._v(e._s(t.date))])])],1)],1)})),0)],2)],1),e._v(" "),s("div",{staticClass:"position-relative d-none d-sm-inline-block"},[s("div",{staticClass:"btn-group"},[s("b-button",{staticClass:"header-icon btn-sm",attrs:{variant:"empty"},on:{click:e.toggleFullScreen}},[s("i",{class:{"d-inline-block":!0,"simple-icon-size-actual":e.fullScreen,"simple-icon-size-fullscreen":!e.fullScreen}})])],1)])]),e._v(" "),s("div",{staticClass:"user d-inline-block"},[s("b-dropdown",{staticClass:"dropdown-menu-right",attrs:{right:"",variant:"empty","toggle-class":"p-0","menu-class":"mt-3","no-caret":""}},[s("template",{slot:"button-content"},[s("span",{staticClass:"name mr-1 strong"},[e._v(e._s(e.currentUser.title))]),e._v(" "),s("span",[s("img",{attrs:{alt:e.currentUser.title,src:e.currentUser.img}})])]),e._v(" "),s("b-dropdown-item",[e._v("Profile")]),e._v(" "),s("b-dropdown-item",[e._v("Task ")]),e._v(" "),s("b-dropdown-divider"),e._v(" "),s("b-dropdown-item",{attrs:{to:"../user/setting"}},[e._v("Setting")]),e._v(" "),s("b-dropdown-item",{on:{click:e.logout}},[e._v("Log out")])],2)],1)])],1)},_=[],M=(s("99af"),s("c975"),s("5319"),s("841c"),s("5c47")),C=[{img:"/assets/img/profiles/l-2.jpg",title:"Joisse Kaycee just sent a new comment!",date:"09.04.2018 - 12:45",id:1},{img:"/assets/img/notifications/thumb-1.jpg",title:"1 item is out of stock!",date:"09.04.2018 - 12:45",id:2},{img:"/assets/img/notifications/thumb-2.jpg",title:"New order received! It is total $147,20.",date:"09.04.2018 - 12:45",id:3},{img:"/assets/img/notifications/thumb-3.jpg",title:"3 items just added to wish list by a user!",date:"09.04.2018 - 12:45",id:4}],S=C,k=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19 19"}},[s("path",{staticClass:"view-icon-svg",attrs:{d:"M17.5,3H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M17.5,10H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M17.5,17H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z"}})])},x=[],y={},H=Object(p["a"])(y,k,x,!1,null,null,null),O=(H.exports,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19 19"}},[s("path",{staticClass:"view-icon-svg",attrs:{d:"M17.5,3H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M3,2V3H1V2H3m.12-1H.88A.87.87,0,0,0,0,1.88V3.12A.87.87,0,0,0,.88,4H3.12A.87.87,0,0,0,4,3.12V1.88A.87.87,0,0,0,3.12,1Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M3,9v1H1V9H3m.12-1H.88A.87.87,0,0,0,0,8.88v1.24A.87.87,0,0,0,.88,11H3.12A.87.87,0,0,0,4,10.12V8.88A.87.87,0,0,0,3.12,8Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M3,16v1H1V16H3m.12-1H.88a.87.87,0,0,0-.88.88v1.24A.87.87,0,0,0,.88,18H3.12A.87.87,0,0,0,4,17.12V15.88A.87.87,0,0,0,3.12,15Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M17.5,10H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M17.5,17H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z"}})])}),j=[],I={},T=Object(p["a"])(I,O,j,!1,null,null,null),E=(T.exports,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19 19"}},[s("path",{staticClass:"view-icon-svg",attrs:{d:"M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z"}}),e._v(" "),s("path",{staticClass:"view-icon-svg",attrs:{d:"M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z"}})])}),$=[],P={},F=Object(p["a"])(P,E,$,!1,null,null,null),A=(F.exports,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text-center"},[s("svg",{staticClass:"main",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 9 17"}},[s("rect",{attrs:{x:"0.48",y:"0.5",width:"7",height:"1"}}),e._v(" "),s("rect",{attrs:{x:"0.48",y:"7.5",width:"7",height:"1"}}),e._v(" "),s("rect",{attrs:{x:"0.48",y:"15.5",width:"7",height:"1"}})]),e._v(" "),s("svg",{staticClass:"sub",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 17"}},[s("rect",{attrs:{x:"1.56",y:"0.5",width:"16",height:"1"}}),e._v(" "),s("rect",{attrs:{x:"1.56",y:"7.5",width:"16",height:"1"}}),e._v(" "),s("rect",{attrs:{x:"1.56",y:"15.5",width:"16",height:"1"}})])])}),D=[],V={},z=Object(p["a"])(V,A,D,!1,null,null,null),L=z.exports,N=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 26 17"}},[s("rect",{attrs:{x:"0.5",y:"0.5",width:"25",height:"1"}}),e._v(" "),s("rect",{attrs:{x:"0.5",y:"7.5",width:"25",height:"1"}}),e._v(" "),s("rect",{attrs:{x:"0.5",y:"15.5",width:"25",height:"1"}})])},R=[],Z={},B=Object(p["a"])(Z,N,R,!1,null,null,null),U=B.exports,q=s("ed08"),W={components:{"menu-icon":L,"mobile-menu-icon":U,switches:M["a"]},data:function(){return{searchKeyword:"",isMobileSearch:!1,isSearchOver:!1,fullScreen:!1,menuHiddenBreakpoint:d["l"],searchPath:d["m"],localeOptions:d["k"],buyUrl:d["b"],notifications:S,isDarkActive:!1,adminRoot:d["a"]}},methods:Object(c["a"])(Object(c["a"])(Object(c["a"])({},Object(o["d"])(["changeSideMenuStatus","changeSideMenuForMobile"])),Object(o["b"])(["setLang","signOut"])),{},{search:function(){this.$router.push("".concat(this.searchPath,"?search=").concat(this.searchKeyword)),this.searchKeyword=""},searchClick:function(){window.innerWidth<this.menuHiddenBreakpoint?this.isMobileSearch?(this.search(),this.isMobileSearch=!1):this.isMobileSearch=!0:this.search()},handleDocumentforMobileSearch:function(){this.isSearchOver||(this.isMobileSearch=!1,this.searchKeyword="")},changeLocale:function(e,t){var s=Object(q["d"])().direction;t!==s&&Object(q["i"])(t),this.setLang(e)},logout:function(){var e=this;this.signOut().then((function(){e.$router.push("/user/login")}))},toggleFullScreen:function(){var e=this.isInFullScreen(),t=document.documentElement;e?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.fullScreen=!e},isInFullScreen:function(){return document.fullscreenElement&&null!==document.fullscreenElement||document.webkitFullscreenElement&&null!==document.webkitFullscreenElement||document.mozFullScreenElement&&null!==document.mozFullScreenElement||document.msFullscreenElement&&null!==document.msFullscreenElement}}),computed:Object(c["a"])({},Object(o["c"])({currentUser:"currentUser",menuType:"getMenuType",menuClickCount:"getMenuClickCount",selectedMenuHasSubItems:"getSelectedMenuHasSubItems"})),beforeDestroy:function(){document.removeEventListener("click",this.handleDocumentforMobileSearch)},created:function(){var e=Object(q["e"])();this.isDarkActive=e.indexOf("dark")>-1},watch:{"$i18n.locale":function(e,t){t!==e&&this.$router.go(this.$route.path)},isDarkActive:function(e){var t=Object(q["e"])(),s=!1;e&&t.indexOf("light")>-1?(s=!0,t=t.replace("light","dark")):!e&&t.indexOf("dark")>-1&&(s=!0,t=t.replace("dark","light")),s&&(Object(q["j"])(t),setTimeout((function(){window.location.reload()}),500))},isMobileSearch:function(e){e?document.addEventListener("click",this.handleDocumentforMobileSearch):document.removeEventListener("click",this.handleDocumentforMobileSearch)}}},K=W,J=Object(p["a"])(K,w,_,!1,null,null,null),X=J.exports,Q=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},G=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("footer",{staticClass:"page-footer"},[s("div",{staticClass:"footer-content"},[s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-sm-6"},[s("p",{staticClass:"mb-0 text-muted"},[e._v("Quotation 2021 ")])]),e._v(" "),s("div",{staticClass:"col-sm-6 d-none d-sm-block"})])])])])}],Y={},ee=Y,te=Object(p["a"])(ee,Q,G,!1,null,null,null),se=te.exports,ne={components:{topnav:X,sidebar:g,"footer-component":se},data:function(){return{show:!1}},computed:Object(c["a"])({},Object(o["c"])(["getMenuType"])),mounted:function(){setTimeout((function(){document.body.classList.add("default-transition")}),100)}},ie=ne,ae=Object(p["a"])(ie,a,l,!1,null,null,null),le=ae.exports,ce={components:{"app-layout":le}},ue=ce,re=Object(p["a"])(ue,n,i,!1,null,null,null);t["default"]=re.exports}}]);