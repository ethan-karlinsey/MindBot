(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{114:function(e,t,n){e.exports=n.p+"static/media/background.afe8d931.jpg"},155:function(e,t,n){e.exports=n.p+"static/media/logo.993f2c0b.png"},198:function(e,t,n){e.exports=n.p+"static/media/happy.27dd8248.png"},199:function(e,t,n){e.exports=n.p+"static/media/sad.926c6a25.png"},200:function(e,t,n){e.exports=n.p+"static/media/angry.d77d9f67.png"},201:function(e,t,n){e.exports=n.p+"static/media/crying.ed602d4f.png"},202:function(e,t,n){e.exports=n.p+"static/media/laugh.01b38b48.png"},203:function(e,t,n){e.exports=n.p+"static/media/nervous.7eafbb21.png"},204:function(e,t,n){e.exports=n.p+"static/media/surprised.69a1cc83.png"},205:function(e,t,n){e.exports=n.p+"static/media/confused.e3b541c3.png"},206:function(e,t,n){e.exports=n.p+"static/media/tired.a7af9aa7.png"},273:function(e,t,n){"use strict";n.d(t,"a",(function(){return ne}));var a=n(0),r=n.n(a),o=n(127),i=n(7),c=n(17),l=n.n(c),s=n(21),u=n.n(s),m=n(92),f=n(86);n(169),n(154);0===f.a.apps.length&&f.a.initializeApp({apiKey:"AIzaSyBLo3MIDiCutOt63VqJNkEMgLbI71gxBDE",authDomain:"chatapp-6a550.firebaseapp.com",databaseURL:"https://chatapp-6a550-default-rtdb.firebaseio.com",projectId:"chatapp-6a550",storageBucket:"chatapp-6a550.appspot.com",messagingSenderId:"432038414833",appId:"1:432038414833:web:6a8228bf2fd1f997219c50"});var g=Object(a.createContext)({}),d=function(e){var t=e.children,n=Object(a.useState)(null),o=l()(n,2),i=o[0],c=o[1];return r.a.createElement(g.Provider,{value:{user:i,setUser:c,login:function(e,t){return u.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,u.a.awrap(f.a.auth().signInWithEmailAndPassword(e,t));case 3:n.next=8;break;case 5:n.prev=5,n.t0=n.catch(0),m.a.alert("Error",n.t0+"");case 8:case"end":return n.stop()}}),null,null,[[0,5]],Promise)},register:function(e,t,n){var a;return u.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u.a.awrap(f.a.auth().createUserWithEmailAndPassword(e,t));case 3:a=f.a.auth().currentUser,f.a.firestore().collection("users").doc(a.uid).set({_id:a.uid,email:a.email,name:n}),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),m.a.alert("Error",r.t0+"");case 11:case"end":return r.stop()}}),null,null,[[0,8]],Promise)},logout:function(){return u.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.awrap(f.a.auth().signOut());case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),m.a.alert("Error",e.t0+"");case 8:case"end":return e.stop()}}),null,null,[[0,5]],Promise)}}},t)},p=n(208),h=n(377),b=n(23),y=n(53),E=n(2),x=n(5),v=n(13),C=n(18);function T(e){var t=e.navigation;return r.a.createElement(y.a,{style:w.background,source:n(114)},r.a.createElement(x.a,{style:w.logoContainer},r.a.createElement(b.a,{source:n(155),style:w.logo}),r.a.createElement(v.a,{style:w.logoText},"MIND BOT")),r.a.createElement(C.a,{style:w.loginButton,onPress:function(){return t.navigate("Login")}},r.a.createElement(v.a,{style:w.loginButtonText},"Sign In")),r.a.createElement(C.a,{style:w.registerButton,onPress:function(){return t.navigate("Registration")}},r.a.createElement(v.a,{style:w.registerButtonText},"Create Account")))}var w=E.a.create({background:{flex:1,height:"100%",justifyContent:"flex-end",alignItems:"center"},loginButton:{width:"80%",backgroundColor:"#788eec",marginLeft:30,marginRight:30,marginBottom:20,height:48,borderRadius:5,alignItems:"center",justifyContent:"center"},registerButton:{width:"80%",backgroundColor:"#ffffff",marginLeft:30,marginRight:30,marginBottom:50,height:48,borderRadius:5,alignItems:"center",justifyContent:"center"},logo:{width:100,height:100},logoContainer:{position:"absolute",top:90,alignItems:"center"},logoText:{fontWeight:"bold",color:"#ffffff"},loginButtonText:{fontSize:20,fontWeight:"bold",color:"white"},registerButtonText:{fontSize:20,fontWeight:"bold",color:"#788eec"}}),S=n(30),O=n(147);function j(e){var t=e.navigation,o=Object(a.useState)(""),i=l()(o,2),c=i[0],s=i[1],u=Object(a.useState)(""),m=l()(u,2),f=m[0],d=m[1],p=Object(a.useContext)(g).login;return r.a.createElement(y.a,{style:B.container,source:n(114),blurRadius:5},r.a.createElement(O.a,{style:{flex:1,width:"100%"},keyboardShouldPersistTaps:"always"},r.a.createElement(b.a,{style:B.logo,source:n(155)}),r.a.createElement(S.a,{style:B.input,placeholder:"E-mail",placeholderTextColor:"#aaaaaa",onChangeText:function(e){return s(e)},value:c,underlineColorAndroid:"transparent",autoCapitalize:"none"}),r.a.createElement(S.a,{style:B.input,placeholderTextColor:"#aaaaaa",secureTextEntry:!0,placeholder:"Password",onChangeText:function(e){return d(e)},value:f,underlineColorAndroid:"transparent",autoCapitalize:"none"}),r.a.createElement(C.a,{style:B.button,onPress:function(){c?f?(p(c,f),s(""),d("")):Alert.alert("Password field is required."):Alert.alert("Email field is required.")}},r.a.createElement(v.a,{style:B.buttonTitle},"Log in")),r.a.createElement(x.a,{style:B.footerView},r.a.createElement(v.a,{style:B.footerText},"Don't have an account? ",r.a.createElement(v.a,{onPress:function(){t.navigate("Registration")},style:B.footerLink},"Sign up")))))}var B=E.a.create({container:{flex:1,alignItems:"center"},title:{},logo:{flex:1,height:120,width:120,alignSelf:"center",margin:30},input:{height:48,borderRadius:5,overflow:"hidden",backgroundColor:"white",marginTop:10,marginBottom:10,marginLeft:30,marginRight:30,paddingLeft:16},button:{backgroundColor:"#788eec",marginLeft:30,marginRight:30,marginTop:20,height:48,borderRadius:5,alignItems:"center",justifyContent:"center"},buttonTitle:{color:"white",fontSize:16,fontWeight:"bold"},footerView:{flex:1,alignItems:"center",marginTop:20},footerText:{fontSize:16,color:"#ffffff"},footerLink:{color:"#788eec",fontWeight:"bold",fontSize:16}});function I(e){var t=e.navigation,o=Object(a.useState)(""),i=l()(o,2),c=i[0],s=i[1],u=Object(a.useState)(""),m=l()(u,2),f=m[0],d=m[1],p=Object(a.useState)(""),h=l()(p,2),E=h[0],T=h[1],w=Object(a.useState)(""),j=l()(w,2),B=j[0],I=j[1],k=Object(a.useContext)(g).register;return r.a.createElement(y.a,{style:P.container,source:n(114),blurRadius:5},r.a.createElement(O.a,{style:{flex:1,width:"100%"},keyboardShouldPersistTaps:"always"},r.a.createElement(b.a,{style:P.logo,source:n(155)}),r.a.createElement(S.a,{style:P.input,placeholder:"Name",placeholderTextColor:"#aaaaaa",onChangeText:function(e){return s(e)},value:c,underlineColorAndroid:"transparent",autoCapitalize:"none"}),r.a.createElement(S.a,{style:P.input,placeholder:"E-mail",placeholderTextColor:"#aaaaaa",onChangeText:function(e){return d(e)},value:f,underlineColorAndroid:"transparent",autoCapitalize:"none"}),r.a.createElement(S.a,{style:P.input,placeholderTextColor:"#aaaaaa",secureTextEntry:!0,placeholder:"Password",onChangeText:function(e){return T(e)},value:E,underlineColorAndroid:"transparent",autoCapitalize:"none"}),r.a.createElement(S.a,{style:P.input,placeholderTextColor:"#aaaaaa",secureTextEntry:!0,placeholder:"Confirm Password",onChangeText:function(e){return I(e)},value:B,underlineColorAndroid:"transparent",autoCapitalize:"none"}),r.a.createElement(C.a,{style:P.button,onPress:function(){return function(){if(c)if(f)if(E){if(E!==B)return void Alert.alert("Passwords don't match");k(f,E,c),s(""),d(""),T(""),I("")}else Alert.alert("Password is required.");else Alert.alert("Email is required.");else Alert.alert("Name is required.")}()}},r.a.createElement(v.a,{style:P.buttonTitle},"Create account")),r.a.createElement(x.a,{style:P.footerView},r.a.createElement(v.a,{style:P.footerText},"Already got an account? ",r.a.createElement(v.a,{onPress:function(){t.navigate("Login")},style:P.footerLink},"Log in")))))}var P=E.a.create({container:{flex:1,alignItems:"center"},title:{},logo:{flex:1,height:120,width:120,alignSelf:"center",margin:30},input:{height:48,borderRadius:5,overflow:"hidden",backgroundColor:"white",marginTop:10,marginBottom:10,marginLeft:30,marginRight:30,paddingLeft:16,borderColor:"black"},button:{backgroundColor:"#788eec",marginLeft:30,marginRight:30,marginTop:20,height:48,borderRadius:5,alignItems:"center",justifyContent:"center"},buttonTitle:{color:"white",fontSize:16,fontWeight:"bold"},footerView:{flex:1,alignItems:"center",marginTop:20},footerText:{fontSize:16,color:"#ffffff"},footerLink:{color:"#788eec",fontWeight:"bold",fontSize:16}}),k=Object(h.a)();function A(){return a.createElement(k.Navigator,{screenOptions:{headerShown:!0}},a.createElement(k.Screen,{name:"Welcome",component:T,options:{headerShown:!1}}),a.createElement(k.Screen,{name:"Login",component:j}),a.createElement(k.Screen,{name:"Registration",component:I}))}function L(e){var t=e.navigation,o=Object(a.useContext)(g),i=o.user,c=o.logout,s=Object(a.useState)(""),m=l()(s,2),d=m[0],p=m[1];return Object(a.useEffect)((function(){var e=!0;return function(){var t,n;u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,u.a.awrap(f.a.firestore().collection("users").doc(i.uid).get());case 3:(t=a.sent).exists?(n=t.data(),e&&p(n.name)):console.log("User data not found"),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),console.log(a.t0);case 10:case"end":return a.stop()}}),null,null,[[0,7]],Promise)}(),function(){e=!1}})),r.a.createElement(y.a,{source:n(114),blurRadius:1.25,style:z.container},r.a.createElement(v.a,{style:z.greeting},"Hello ",d),r.a.createElement(C.a,{style:z.button,onPress:function(){return t.navigate("Home")}},r.a.createElement(v.a,{style:z.buttonText},"Mindfulness")),r.a.createElement(C.a,{style:z.button,onPress:function(){return t.navigate("Chatbot")}},r.a.createElement(v.a,{style:z.buttonText},"Chat Bot")),r.a.createElement(C.a,{style:z.button,onPress:function(){return t.navigate("Home")}},r.a.createElement(v.a,{style:z.buttonText},"Instant")),r.a.createElement(C.a,{style:z.logOutButton,onPress:function(){c()}},r.a.createElement(v.a,{style:z.buttonText},"Log Out")))}var R,z=E.a.create({container:{flex:1,alignItems:"center",justifyContent:"center"},greeting:{fontSize:22,fontWeight:"bold",color:"#383838",marginTop:100,marginBottom:30},button:{width:"75%",height:75,backgroundColor:"#788eec",marginLeft:30,marginRight:30,marginTop:25,marginBottom:25,borderRadius:5,alignItems:"center",justifyContent:"center"},logOutButton:{width:"55%",height:50,backgroundColor:"#ff7269",marginLeft:30,marginRight:30,marginTop:100,borderRadius:5,alignItems:"center",justifyContent:"center"},buttonText:{fontSize:20,fontWeight:"bold",color:"white"}}),W=n(6),N=n.n(W),U=n(163),M=n(36),D=n(272),H=(n(355),n(269)),q=(n(67),n(270)),F=n.n(q),V=n(55),_=function(e){return"web"===i.a.OS?r.a.createElement(F.a,e,e.children):r.a.createElement(V.a,e,e.children)};R=(i.a.OS,[n(198),n(199),n(200),n(201),n(202),n(203),n(204),n(205),n(206)]);var J=["Happy","Sad","Angry","Crying","Laughing","Nervous","Surprised","Confused","Tired","None"];function K(e,t){e.navigation;var n=Object(a.useState)(null),o=l()(n,2),i=o[0],c=o[1],s=Object(a.useState)(!1),m=l()(s,2),d=m[0],p=m[1],h=Object(a.useContext)(g).user,y=f.a.firestore().collection(h.uid),E=y.orderBy("createdAt","desc"),T=Object(H.a)(E,{idField:"id"}),w=l()(T,1)[0],S=Object(a.useState)(""),O=l()(S,2),j=O[0],B=O[1],I=Object(a.useState)(""),P=l()(I,2),k=P[0],A=P[1];Object(a.useLayoutEffect)((function(){var e=!0;return function(){var t,n;u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,u.a.awrap(f.a.firestore().collection("users").doc(h.uid).get());case 3:(t=a.sent).exists?(n=t.data(),e&&(A(n.name),B(n._id))):console.log("User data not found"),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),console.log(a.t0);case 10:case"end":return a.stop()}}),null,null,[[0,7]],Promise)}(),function(){e=!1}}));var L=function(e){p(!1),function(e){y.add({_id:i[0]._id,text:i[0].text,createdAt:Date.parse(i[0].createdAt),emotionIndex:e,emotion:J[e],user:{_id:j,name:k}}),c(null)}(e)};return r.a.createElement(x.a,{style:G.chatBotContainer},r.a.createElement(U.b,{messages:w,user:{_id:j,name:k},onSend:function(e){M.a.dismiss(),c(e),p(!0)},renderAvatar:function(e){return function(e){if(e.currentMessage.emotionIndex==R.length)return null;var t=R[e.currentMessage.emotionIndex];return r.a.createElement(D.a,{rounded:!0,size:"medium",source:t})}(e)},showUserAvatar:!0,showAvatarForEveryMessage:!0,renderAllAvatars:!0,renderBubble:function(e){return function(e){return console.log(e.currentMessage.user),r.a.createElement(U.a,N()({},e,{textStyle:{right:{color:"black"},left:{color:"black"}},timeTextStyle:{left:{color:"black"},right:{color:"black"}},wrapperStyle:{left:{backgroundColor:"#F2AE6F"},right:{backgroundColor:"#99BBFF"}},user:e.currentMessage.user}))}(e)},alwaysShowSend:!0}),r.a.createElement(_,{transparent:!0,visible:d},r.a.createElement(x.a,{style:{backgroundColor:"#000000aa",flex:1}},r.a.createElement(x.a,{style:G.emotionPopUp},r.a.createElement(v.a,{style:{textAlign:"center"}},"Select an emotion for your message"),r.a.createElement(x.a,{style:G.emotionContainer},r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(0)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[0]}),r.a.createElement(v.a,{style:G.buttonText},"Happy")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(1)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[1]}),r.a.createElement(v.a,{style:G.buttonText},"Sad")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(2)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[2]}),r.a.createElement(v.a,{style:G.buttonText},"Angry")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(3)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[3]}),r.a.createElement(v.a,{style:G.buttonText},"Crying")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(4)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[4]}),r.a.createElement(v.a,{style:G.buttonText},"Laughing")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(5)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[5]}),r.a.createElement(v.a,{style:G.buttonText},"Nervous")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(6)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[6]}),r.a.createElement(v.a,{style:G.buttonText},"Surprised")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(7)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[7]}),r.a.createElement(v.a,{style:G.buttonText},"Confused")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(8)}},r.a.createElement(b.a,{style:G.buttonImage,source:R[8]}),r.a.createElement(v.a,{style:G.buttonText},"Tired")),r.a.createElement(C.a,{style:G.emotionButton,activeOpacity:.5,onPress:function(){return L(9)}},r.a.createElement(v.a,{style:G.buttonText},"None")))))))}var G=E.a.create({chatBotContainer:{flex:1,justifyContent:"center",backgroundColor:"#E5E5E5"},emotionPopUp:{backgroundColor:"#ffffff",flex:1,display:"flex",flexWrap:"wrap",alignContent:"center",justifyContent:"center"},emotionContainer:{marginTop:10,marginBottom:10,borderRadius:10,display:"flex",flexDirection:"row",flexWrap:"wrap",alignContent:"center",justifyContent:"center"},emotionButton:{marginVertical:10,marginHorizontal:10,borderRadius:10,padding:10,backgroundColor:"#f0f8ff",justifyContent:"center",alignItems:"center",minWidth:"35%",height:100},buttonText:{textAlign:"center",fontWeight:"bold",fontSize:14,margin:5},buttonImage:{width:50,height:50}}),Q=Object(h.a)();function X(){return a.createElement(Q.Navigator,{screenOptions:{headerShown:!1}},a.createElement(Q.Screen,{name:"Home",component:L}),a.createElement(Q.Screen,{name:"Chatbot",component:K,options:{headerShown:!0}}))}var Y=n(47);function Z(){return r.a.createElement(x.a,{style:$.container},r.a.createElement(Y.a,{size:"large",color:"#6646ee"}))}var $=E.a.create({container:{flex:1,alignItems:"center",justifyContent:"center"}});function ee(){var e=Object(a.useState)(!0),t=l()(e,2),n=t[0],o=t[1],i=Object(a.useState)(!0),c=l()(i,2),s=c[0],u=c[1],m=Object(a.useContext)(g),d=m.user,h=m.setUser;function b(e){h(e),n&&o(!1),u(!1)}return Object(a.useEffect)((function(){return f.a.auth().onAuthStateChanged(b)}),[]),s?r.a.createElement(Z,null):r.a.createElement(p.a,null,d?r.a.createElement(X,null):r.a.createElement(A,null))}function te(){return r.a.createElement(d,null,r.a.createElement(ee,null))}function ne(){return r.a.createElement(te,null)}"web"!==i.a.OS&&o.LogBox.ignoreLogs(["Setting a timer"])},285:function(e,t,n){e.exports=n(360)}},[[285,1,2]]]);
//# sourceMappingURL=app.c90a55ee.chunk.js.map