(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{KYsU:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[id]",function(){return n("eH5e")}])},eH5e:function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return P}));var r=n("q1tI"),o=n.n(r),a=n("wFql"),c=n("Ol7k"),i=n("rePB"),u=n("1OyB"),l=n("vuIU"),s=n("Ji7U"),f=n("md7G"),p=n("foSv"),d=o.a.createElement;function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){Object(i.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function O(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(p.a)(t);if(e){var o=Object(p.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var m=n("192E"),v=function(t){Object(s.a)(n,t);var e=O(n);function n(t){var r;return Object(u.a)(this,n),(r=e.call(this,t)).markdownContainerId=r.props.markdownCotainerId||"markdown-container",r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this,e=setInterval((function(){window.pageLoaded&&(editormd.markdownToHTML(t.markdownContainerId,w(w({},m.markdownToHtml),t.props.options)),clearInterval(e))}),50)}},{key:"render",value:function(){return d("div",null,d("div",{id:this.markdownContainerId},d("textarea",{className:"invisible",defaultValue:this.props.markdown})))}}]),n}(o.a.Component),y=n("5Upx"),g=o.a.createElement,j=a.a.Title,h=c.a.Sider,k=c.a.Content,P=!0;e.default=function(t){return g(c.a,null,g(h,{breakpoint:"lg"},g(y.a,{groupedBlogs:t.groupedBlogs,timeline:t.timeline})),g(k,{className:"blog-body"},g(j,{level:2,className:"title"},t.blog.title),g(v,{markdown:t.blog.content})))}}},[["KYsU",0,1,2,3,4,5,6,8,11,12]]]);