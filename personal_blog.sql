/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : personal_blog

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 28/02/2022 22:57:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `star` bigint(40) NOT NULL DEFAULT 0,
  `isTop` int(40) NOT NULL DEFAULT 0,
  `isHide` int(40) NOT NULL DEFAULT 0,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `mdValue` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `link` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('553ccf7a-af42-4bb0-a03e-066dd3e552b7', 'Vue2.x源码学习笔记（二）——vm._render生成vnode', 0, 0, 0, '_render 在src/core/instance/render.js中，renderMixin（src/core/instance/index.js中）时往vue原型上挂载了_render方法。 通过$options的render方法生成vnode： 	.........   	......... const { render, _parentVnode } = vm.$options 	.........   	......... vnode = render.call(vm._renderProxy, vm.$createElement)    	......... 	.........  vm.$createElement vm.$createElement函数定义在initRender函数中，initRender会在_init初始化时调用。 还能看到有一个是vm._c函数，这两者的区别是：  vm.$createElement是用户手写 render 方法使用的。 vm._c是被模板编译成的 render 函数使用。  它们内部都调用了createElement方法。 _createElement 在src/core/vdom/create-element.js中。在createElement方法中调用_createElement生成虚拟dom。 它有四个参数:  context：上下文环境 tag：标签 data：表示 VNode 的数据 children：VNode的子节点 normalizationType：子节点规范类型，在createElement中通过alwaysNormalize参数会生成不同的normalizationType规范。  因为原来的children是任意类型的，所有需要根据不同的normalizationType分别调用normalizationType和simpleNormalizeChildren方法将children规范化为vnode类型。其中normalizationType方法是用户手写 render 方法使用的。 simpleNormalizeChildren规范化children src/core/vdom/helpers/normalzie-children.js中，因为render函数是编译template生成的children已经是VNode类型。因为函数式组件返回的是一个数组而不是一个根节点,所以这里需要把整个children 数组打平，让它的深度只有一层。 for (let i = 0; i &lt; children.length; i++) {     if (Array.isArray(children[i])) {       return Array.prototype.concat.apply([], children)               }   }   return children }  normalizeChildren规范化children 调用normalizeArrayChildren 主要的逻辑就是遍历 children，获得单个节点 c，然后对 c 的类型判断，如果是一个数组类型，则递归调用 normalizeArrayChildren; 如果是基础类型，则通过 createTextVNode 方法转换成 VNode 类型；否则就已经是 VNode 类型了，如果 children 是一个列表并且列表还存在嵌套的情况，则根据 nestedIndex 去更新它的 key。这里需要注意一点，在遍历的过程中，对这 3 种情况都做了如下处理：如果存在两个连续的 text 节点，会把它们合并成一个 text 节点。 经过对 children 的规范化，children 变成了一个类型为 VNode 的 Array VNode创建 将children转为vnode后， 对tag 做判断如果是 string 类型，则接着判断如果是内置的一些节点，则直接创建一个普通 VNode，如果是为已注册的组件名，则通过 createComponent 创建一个组件类型的 VNode，否则创建一个未知的标签的 VNode。 如果是 tag 一个 Component 类型，则直接调用 createComponent 创建一个组件类型的 VNode 节点。 ', '## _render\n在==src/core/instance/render.js中==，renderMixin（==src/core/instance/index.js==中）时往vue原型上挂载了_render方法。\n\n通过$options的render方法生成vnode：\n```JavaScript\n	.........\n  	.........\nconst { render, _parentVnode } = vm.$options\n	.........\n  	.........\nvnode = render.call(vm._renderProxy, vm.$createElement)   \n	.........\n	.........\n```\n## vm.$createElement\nvm.$createElement函数定义在initRender函数中，initRender会在_init初始化时调用。\n\n还能看到有一个是vm._c函数，这两者的区别是：\n\n- vm.$createElement是用户手写 render 方法使用的。\n- vm._c是被模板编译成的 render 函数使用。\n\n它们内部都调用了==createElement==方法。\n\n## _createElement\n在==src/core/vdom/create-element.js==中。在createElement方法中调用_createElement生成虚拟dom。\n\n它有四个参数:\n- context：上下文环境\n- tag：标签\n- data：表示 VNode 的数据\n- children：VNode的子节点\n- normalizationType：子节点规范类型，在createElement中通过alwaysNormalize参数会生成不同的normalizationType规范。\n\n因为原来的children是任意类型的，所有需要根据不同的normalizationType分别调用normalizationType和simpleNormalizeChildren方法将children规范化为vnode类型。其中normalizationType方法是用户手写 render 方法使用的。\n\n## simpleNormalizeChildren规范化children\n==src/core/vdom/helpers/normalzie-children.js==中，因为render函数是编译template生成的children已经是VNode类型。因为函数式组件返回的是一个数组而不是一个根节点,所以这里需要把整个children 数组打平，让它的深度只有一层。\n```JavaScript\nfor (let i = 0; i < children.length; i++) {\n    if (Array.isArray(children[i])) {\n      return Array.prototype.concat.apply([], children)          \n    }\n  }\n  return children\n}\n```\n\n## normalizeChildren规范化children\n调用normalizeArrayChildren\n\n主要的逻辑就是遍历 children，获得单个节点 c，然后对 c 的类型判断，如果是一个数组类型，则递归调用 normalizeArrayChildren; 如果是基础类型，则通过 createTextVNode 方法转换成 VNode 类型；否则就已经是 VNode 类型了，如果 children 是一个列表并且列表还存在嵌套的情况，则根据 nestedIndex 去更新它的 key。这里需要注意一点，在遍历的过程中，对这 3 种情况都做了如下处理：如果存在两个连续的 text 节点，会把它们合并成一个 text 节点。\n\n经过对 children 的规范化，children 变成了一个类型为 VNode 的 Array\n\n## VNode创建\n将children转为vnode后， 对tag 做判断如果是 string 类型，则接着判断如果是内置的一些节点，则直接创建一个普通 VNode，如果是为已注册的组件名，则通过 createComponent 创建一个组件类型的 VNode，否则创建一个未知的标签的 VNode。 如果是 tag 一个 Component 类型，则直接调用 createComponent 创建一个组件类型的 VNode 节点。\n\n\n \n\n\n\n', '2022-02-24 23:17:08', '');
INSERT INTO `article` VALUES ('bf9534da-463d-498c-acef-75ce6114c84d', 'Vue2.x源码学习笔记（三）——vm._update生成dom', 1, 1, 0, '_update 通过_update来进行首次渲染。在src/core/instance/lifecycle.js中的lifecycleMixin中挂载到Vue原型上。主要是调用vm.__patch__方法。 在首次渲染时这样调用： vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)  __patch__定义在 src/platforms/web/runtime/index.js中，通过判断当前是否是web端来调用不同的patch函数。 Vue.prototype.__patch__ = inBrowser ? patch : noop   patch最终是函数createPatchFunction，在src/core/vdom/patch.js中 createPatchFunction 内部定义了一系列的辅助方法，最终返回了一个 patch 方法。首次渲染的时候oldVnode是一个真实dom元素，需要调用emptyNodeAt将其转为VNode,然后再调用 createElm 方法。 createElm 作用是通过VNode创建真实的DOM并插入到它的父节点中。 首先会对vnode的tag进行合法性校验，通过后会创建一个占位元素。然后调用createChildren方法去创建子元素。 createChildren中遍历子元素，递归调用createElm。接着再调用 invokeCreateHooks 方法执行所有的 create 的钩子并把 vnode push 到 insertedVnodeQueue 中。最后调用 insert 方法把 DOM 插入到父节点中，因为是递归调用，子元素会优先调用 insert，所以整个 vnode 树节点的插入顺序是先子后父。 整个过程  ', '## _update\n通过_update来进行首次渲染。在==src/core/instance/lifecycle.js==中的lifecycleMixin中挂载到Vue原型上。主要是调用vm.__patch__方法。\n在首次渲染时这样调用：\n```javascript\nvm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)\n```\n__patch__定义在 ==src/platforms/web/runtime/index.js==中，通过判断当前是否是web端来调用不同的patch函数。\n```JavaScript\nVue.prototype.__patch__ = inBrowser ? patch : noop \n```\npatch最终是函数==createPatchFunction==，在==src/core/vdom/patch.js==中\n\n## createPatchFunction\n内部定义了一系列的辅助方法，最终返回了一个 patch 方法。首次渲染的时候oldVnode是一个真实dom元素，需要调用emptyNodeAt将其转为VNode,然后再调用 createElm 方法。\n\n## createElm \n作用是通过VNode创建真实的DOM并插入到它的父节点中。\n\n首先会对vnode的tag进行合法性校验，通过后会创建一个占位元素。然后调用createChildren方法去创建子元素。\n\ncreateChildren中遍历子元素，递归调用createElm。接着再调用 invokeCreateHooks 方法执行所有的 create 的钩子并把 vnode push 到 insertedVnodeQueue 中。最后调用 insert 方法把 DOM 插入到父节点中，因为是递归调用，子元素会优先调用 insert，所以整个 vnode 树节点的插入顺序是先子后父。\n\n## 整个过程\n![newvue.png](http://101.132.68.0:3000/uploads/new-vue-1631610933493.png)\n\n\n\n\n\n\n', '2022-02-24 23:25:27', '');
INSERT INTO `article` VALUES ('df62b833-245e-44e5-9ab5-420cc4973acf', '前端模块化总结', 1, 0, 0, 'CommonJs  主要用在nodeJS中，它是通过同步的方式加载模块。因为在服务端模块文件都存在本地磁盘，读取非常快。 加载机制:输入是被输出的值的拷贝，一旦输出这一个值模块内部的变化就影响不到这个值  // test.js var count=0 function add() {     count++ } module.exports = {     add,     count }	  var test=require(\'./test.js\') console.log(test.count)  //0 test.add() console.log(test.count)  //0  但这个拷贝只是浅拷贝，当这个对象层次更深时会怎样呢？ // test.js var obj={     count:0 } function add() {     obj.count++ } module.exports = {     add,     obj }  var test=require(\'./test.js\') console.log(test.obj.count)  //0 test.add() console.log(test.obj.count)  //1   因为只是浅层拷贝，当test模块中的count改变，由于对象的引用，main中的count也会改变  module.exports和exports：每一个模块都有一个module对象，真正负责导出的是module.exports。内部实现是module.exports=exports。因此当exports.xxx时会给module.exports添加属性。当module.exports={name:2}时，module.exports是一个新对象，之前exports.xxx将不会再被导出。  AMD  采用异步加载模块 使用requirejs  &lt;script src=\"./require.js\" data-main=\"./main.js\"&gt;&lt;/script&gt;  加载完require.js后立即执行main.js。main.js是入口文件 //main.js (function(){     require.config({         baseUrl:\'\',         paths:{             \"bar\":\"./bar\",  //模块对应的路径 不需要加.js             \"test\":\"./test\"         }     })     require([\'test\'],function(test){         console.log(\'main\',test.a)  //main 1     }) })()  //bar.js define(function(){     const name=\'bar\'     const count=0     return {         name,         count     } })  //test.js define([     \'bar\', ], function(bar) {     console.log(bar.name)  //bar     console.log(bar.count) //0     return {         a:1     } });  CMD  采用异步加载模块，结合了CommonJS优点。 使用seajs  &lt;script src=\"./sea.js\"&gt;&lt;/script&gt; &lt;script&gt;     seajs.use(\'./main.js\')  //入口文件 &lt;/script&gt;  //bar.js define(function(require,exports,module){     var obj={         count:0     }     function add(){         obj.count++     }     module.exports={         obj,         add     } });  //main.js define(function(require,exports,module){     const bar=require(\'./bar.js\')     console.log(bar.obj.count)  //0     bar.add()     console.log(bar.obj.count)  //1 });  ES Module 1.模块输出的是值的引用 //main.js import {count,add} from \'./test.js\' console.log(count)  //0 add() console.log(count)  //1  //test.js export var count=0 export function add (){     count++ }  ES Module和CommonJs区别  CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。 CommonJS 模块是运行时加载，ES6 模块是编译（解析）时加载。  UMD 严格上说，umd不能算是一种模块规范，因为它没有模块定义和调用，这是AMD、CMD和CommonJS的结合体，保证模块可以被amd、cmd和commonjs调用。 (function(root, factory) {     if (typeof module === \'object\' &amp;&amp; typeof module.exports === \'object\') {         var depModule = require(\'./test.js\')         module.exports = factory(depModule);  //是commonjs模块规范，nodejs环境     } else if (typeof define === \'function\' &amp;&amp; define.amd) {         define([\'test\'], factory) //是AMD模块规范，如require.js     } else if (typeof define === \'function\' &amp;&amp; define.cmd) {         define(function(require, exports, module) {             var depModule = require(\'./test.js\')             module.exports = factory(depModule)  //是CMD模块规范，如sea.js         })      } else {         root.umdModule = factory(root.depModule);  //没有模块环境，直接挂载在全局对象上     } }(this, function(depModule) {     console.log(\'我调用了依赖模块\', depModule)     return {         name: \'我自己是一个umd模块\'     } }))  ', '## CommonJs\n1. 主要用在nodeJS中，它是通过同步的方式加载模块。因为在服务端模块文件都存在本地磁盘，读取非常快。\n2. 加载机制:输入是被输出的值的拷贝，一旦输出这一个值模块内部的变化就影响不到这个值\n```javascript\n// test.js\nvar count=0\nfunction add() {\n    count++\n}\nmodule.exports = {\n    add,\n    count\n}	\n```\n```javascript\nvar test=require(\'./test.js\')\nconsole.log(test.count)  //0\ntest.add()\nconsole.log(test.count)  //0\n```\n但这个拷贝只是浅拷贝，当这个对象层次更深时会怎样呢？\n```javascript\n// test.js\nvar obj={\n    count:0\n}\nfunction add() {\n    obj.count++\n}\nmodule.exports = {\n    add,\n    obj\n}\n```\n```javascript\nvar test=require(\'./test.js\')\nconsole.log(test.obj.count)  //0\ntest.add()\nconsole.log(test.obj.count)  //1\n\n```\n因为只是浅层拷贝，当test模块中的count改变，由于对象的引用，main中的count也会改变\n\n3. module.exports和exports：每一个模块都有一个module对象，真正负责导出的是module.exports。内部实现是module.exports=exports。因此当exports.xxx时会给module.exports添加属性。当module.exports={name:2}时，module.exports是一个新对象，之前exports.xxx将不会再被导出。\n## AMD\n1. 采用异步加载模块\n2. 使用[requirejs](https://github.com/requirejs/requirejs)\n```html\n<script src=\"./require.js\" data-main=\"./main.js\"></script>\n```\n加载完require.js后立即执行main.js。main.js是入口文件\n```javascript\n//main.js\n(function(){\n    require.config({\n        baseUrl:\'\',\n        paths:{\n            \"bar\":\"./bar\",  //模块对应的路径 不需要加.js\n            \"test\":\"./test\"\n        }\n    })\n    require([\'test\'],function(test){\n        console.log(\'main\',test.a)  //main 1\n    })\n})()\n```\n```javascript\n//bar.js\ndefine(function(){\n    const name=\'bar\'\n    const count=0\n    return {\n        name,\n        count\n    }\n})\n```\n```javascript\n//test.js\ndefine([\n    \'bar\',\n], function(bar) {\n    console.log(bar.name)  //bar\n    console.log(bar.count) //0\n    return {\n        a:1\n    }\n});\n```\n## CMD\n1. 采用异步加载模块，结合了CommonJS优点。\n2. 使用[seajs](https://github.com/seajs/seajs)\n```javascript\n<script src=\"./sea.js\"></script>\n<script>\n    seajs.use(\'./main.js\')  //入口文件\n</script>\n```\n```javascript\n//bar.js\ndefine(function(require,exports,module){\n    var obj={\n        count:0\n    }\n    function add(){\n        obj.count++\n    }\n    module.exports={\n        obj,\n        add\n    }\n});\n```\n```javascript\n//main.js\ndefine(function(require,exports,module){\n    const bar=require(\'./bar.js\')\n    console.log(bar.obj.count)  //0\n    bar.add()\n    console.log(bar.obj.count)  //1\n});\n```\n## ES Module\n1.模块输出的是值的引用\n```javascript\n//main.js\nimport {count,add} from \'./test.js\'\nconsole.log(count)  //0\nadd()\nconsole.log(count)  //1\n```\n```javascript\n//test.js\nexport var count=0\nexport function add (){\n    count++\n}\n```\n### ES Module和CommonJs区别\n1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。\n2. CommonJS 模块是运行时加载，ES6 模块是编译（解析）时加载。\n## UMD\n严格上说，umd不能算是一种模块规范，因为它没有模块定义和调用，这是AMD、CMD和CommonJS的结合体，保证模块可以被amd、cmd和commonjs调用。\n```javascript\n(function(root, factory) {\n    if (typeof module === \'object\' && typeof module.exports === \'object\') {\n        var depModule = require(\'./test.js\')\n        module.exports = factory(depModule);  //是commonjs模块规范，nodejs环境\n    } else if (typeof define === \'function\' && define.amd) {\n        define([\'test\'], factory) //是AMD模块规范，如require.js\n    } else if (typeof define === \'function\' && define.cmd) {\n        define(function(require, exports, module) {\n            var depModule = require(\'./test.js\')\n            module.exports = factory(depModule)  //是CMD模块规范，如sea.js\n        }) \n    } else {\n        root.umdModule = factory(root.depModule);  //没有模块环境，直接挂载在全局对象上\n    }\n}(this, function(depModule) {\n    console.log(\'我调用了依赖模块\', depModule)\n    return {\n        name: \'我自己是一个umd模块\'\n    }\n}))\n```\n', '2022-02-24 23:31:54', '');

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chatName` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `chatContent` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `chatWay` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (2, '呃', 'e', '：', '2021-12-26 16:27:25');

-- ----------------------------
-- Table structure for filelist
-- ----------------------------
DROP TABLE IF EXISTS `filelist`;
CREATE TABLE `filelist`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` int(20) NOT NULL COMMENT '0 文章',
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of filelist
-- ----------------------------
INSERT INTO `filelist` VALUES (9, 'http://localhost:8888/article/render函数的作用-1644935586637.png', 0, 'render函数的作用-1644935586637.png');
INSERT INTO `filelist` VALUES (10, 'http://localhost:8888/article/权限控制的前后端逻辑-1644936679465.png', 0, '权限控制的前后端逻辑-1644936679465.png');
INSERT INTO `filelist` VALUES (11, 'http://localhost:8888/article/render函数的作用-1645717269587.png', 0, 'render函数的作用-1645717269587.png');

-- ----------------------------
-- Table structure for link
-- ----------------------------
DROP TABLE IF EXISTS `link`;
CREATE TABLE `link`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `href` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of link
-- ----------------------------
INSERT INTO `link` VALUES (14, '头像生成器', '用于生成国庆节等其他专属头像～', 'http://101.132.68.0:81/makePhoto/', '2022-02-27 15:31:30');
INSERT INTO `link` VALUES (25, '2', '2', '2', '2022-02-27 15:33:57');

-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `tag` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `tagColor` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of photo
-- ----------------------------
INSERT INTO `photo` VALUES ('6c7fb910-1d40-4bee-be0f-5c47cfc620c2', '测试', '', '测试', '#b5cea8', 'http://localhost:8888/photo/cdn的理解-1645955082059-small.png', '2022-02-27 17:45:01');

-- ----------------------------
-- Table structure for picture
-- ----------------------------
DROP TABLE IF EXISTS `picture`;
CREATE TABLE `picture`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `photoid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `previewUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 116 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of picture
-- ----------------------------
INSERT INTO `picture` VALUES (112, '6c7fb910-1d40-4bee-be0f-5c47cfc620c2', 'http://localhost:8888/photo/App组件的挂载和渲染过程-1645955082056.png', 'http://localhost:8888/photo/App组件的挂载和渲染过程-1645955082056-small.png', 'App组件的挂载和渲染过程-1645955082056.png', '2022-02-27 17:44:43');
INSERT INTO `picture` VALUES (113, '6c7fb910-1d40-4bee-be0f-5c47cfc620c2', 'http://localhost:8888/photo/cdn的理解-1645955082059.png', 'http://localhost:8888/photo/cdn的理解-1645955082059-small.png', 'cdn的理解-1645955082059.png', '2022-02-27 17:44:43');
INSERT INTO `picture` VALUES (114, '6c7fb910-1d40-4bee-be0f-5c47cfc620c2', 'http://localhost:8888/photo/render函数的作用-1645955082063.png', 'http://localhost:8888/photo/render函数的作用-1645955082063-small.png', 'render函数的作用-1645955082063.png', '2022-02-27 17:44:43');
INSERT INTO `picture` VALUES (115, '6c7fb910-1d40-4bee-be0f-5c47cfc620c2', 'http://localhost:8888/photo/vite的服务器原理-1645955082064.png', 'http://localhost:8888/photo/vite的服务器原理-1645955082064-small.png', 'vite的服务器原理-1645955082064.png', '2022-02-27 17:44:43');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (4, 'gulp', 'danger');
INSERT INTO `tag` VALUES (6, 'webpack', 'success');
INSERT INTO `tag` VALUES (39, 'node', 'warning');
INSERT INTO `tag` VALUES (40, 'react', 'info');
INSERT INTO `tag` VALUES (49, 'vue', 'success');
INSERT INTO `tag` VALUES (50, 'js', 'danger');

-- ----------------------------
-- Table structure for tag_article
-- ----------------------------
DROP TABLE IF EXISTS `tag_article`;
CREATE TABLE `tag_article`  (
  `id` bigint(40) NOT NULL AUTO_INCREMENT,
  `tagid` bigint(40) NOT NULL,
  `articleid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 103 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag_article
-- ----------------------------
INSERT INTO `tag_article` VALUES (87, 49, 'bf9534da-463d-498c-acef-75ce6114c84d');
INSERT INTO `tag_article` VALUES (88, 49, '553ccf7a-af42-4bb0-a03e-066dd3e552b7');
INSERT INTO `tag_article` VALUES (89, 39, '553ccf7a-af42-4bb0-a03e-066dd3e552b7');
INSERT INTO `tag_article` VALUES (90, 50, 'df62b833-245e-44e5-9ab5-420cc4973acf');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'gkmdanran', '84f5913c60cb22066a856648676c275d');

SET FOREIGN_KEY_CHECKS = 1;
