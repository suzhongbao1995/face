## 我的热爱 22-12-27
### class 和 hooks组件的区别
    函数式组件没有针对this的相关操作
    class开发依赖生命周期钩子，函数式组件无状态，通过hooks可实现
    class的组件是先进行实例化后调用render渲染，函数式组件通过return
    class式面向对象的编程思想，函数式组件偏函数式编程思想 （封装继承多态）
### 实现一个倒计时的自定义hooks 通过setTimeout模拟setInterval 监听状态，执行setTimeout
### dva使用的中间件
### dva的一个工作流
### dva 是否遇到过useSelector 查询状态发现状态没更新的情况
    使用subscription 订阅数据源，比如ws keyword，history路由变化等，根据条件触发dispatch 不同的action
### dva yield 的关键字的作用
### axios 和fetch 怎样封装的
### vue 父子组件生命周期执行顺序？
    挂载阶段
    - 父组件 beforeCreated created 子组件 beforeCreated created beforeMounted mounted 父组件 beforeMounted mounted
    更新阶段
    - 父组件 beforeUpdated 子组件 beforeUpdated updated 父组件 updated
    卸载阶段
    - 父组件 beforeDestoryed 子组件 beforeDestoryed destoryed 父组件 destoryed
### react多个状态改变是怎样更新的？
### react 是单向还是双向绑定的？
### hooks组件实现shouldComponentUpdate 
    在hooks中实现通过React.memo的第二个参数回调处理
### 常用的hooks
### 为什么hooks不能再if 循环语句中调用，在只能在顶层调用
    确保 Hooks 在每一次渲染中都按照同样的顺序被调用，因为react实现查找的是链表、
    他用数组和下标来实现hooks的查找，如果在条件或者循环语句中调用hooks，
    就容易实现hooks对应状态的混乱。不能在render的时候去调用hooks
### umi的痛点： 升级困难， 可拓展性差项目难以定制，状态管理使用不舒服，结合ts类型推导困难，
### script 
    defer 严格的执行顺序，但不需要等待js加载直接渲染dom等dom加载完后按顺序执行脚本
    async 直接加载，不需要等待dom加载完成，先加载哪个就执行哪个，
    动态script dom创建完成后动态创建script标签
## 趣云万维 22-12-29 
### 项目中你负责的功能及实现
### 职业规划
### 对后端有了解么
### http状态码
### http和https的区别
    - httpsCA证书，有具体费用，http没有
    - http是超文本传输协议，信息是明文传输，但是https是具有安全性的ssl加密传输
    - 两个协议的端口不同，http是80端口，https是443端口
    - http链接是无状态的，https协议和ssl对的构建可进行明文加密和身份认证的网络协议比http更加安全
### https
    - ssl: http协议和TCP协议之间的一层协议，采用对称加密和非对称加密混合加密方式
### http1.0
    - 短链接：每次请求都需要建立链接
    - 串行：一次通信需要经历请求，响应后才能进行下次请求
### http1.2
  #### 优点
    - 缓存方面： 多了一些控制字段
    - 多了一些请求方法
    - 添加range头域，只请求部分资源，节省带宽
    - 长链接（持久链接）：建立一次TCP链接后可重复使用，有一方主动断开链接则结束
    - 管道传输：不必串行等待，可并行发送多次请求，但服务端会按照顺序处理
  #### 缺点
    - 头部压缩：不支持压缩头部，每次相同的header浪费，像cookie，User Agent
    - 管道传输：管道传输会造成队头阻塞，服务端按照顺序处理请求，前面的请求未完成，后面的需要等待
    - 单向请求：只能客户端发送请求，服务端被动响应，服务端无法像客户端主动发送请求
### http 2.0
    - 多路复用：支持并行请求、响应、客户端、服务端不用排队等候
    - 头部压缩：支持头部压缩
    - 服务端推送：服务端可以主动向客户端发送数据（静态资源）
    - 浏览器同一个域名下请求的最大数是6
### TCP三次握手  
    客户端向服务端发送SYN的建立链接请求，
    服务端接受SYN并给客户端发送SYN+ACK的确认身份链接，
    最后客户端确认发送ACK成功建立链接
### vue 响应式原理 
    创建Vue实例的时，会遍历data的属性，并通过Object.defineProperty转化为getter和setter，内部追踪相关依赖
    当属性被访问和修改时会触发通知变化，每个组件实例都有对应的watcher实例跟踪，会在组件渲染时将属性记为依赖，当依赖的setter被调用后
    会触发对应的Watcher 重新计算，使关联的组件更新
### 模块化规范  
    js模块化为了解决变量冲突，抽离公共代码，隔离作用域
    IIFE 创建自执行函数，在单独的作用中执行代码，避免变量冲突
    CommonJS nodejs自带模块化，文件即模块
    AMD 使用requireJS编写代码
        特点：依赖必须提前写好
    CMD seaJS编写代码
        特点：支持动态引入模块
    UMD
        兼容AMD和commonJS模块化语法
    ESM
### TCP四次挥手
    客户端接受到服务器端的请求，发出SYN-ACK的标识
### react16 删除了哪些生命周期，增加了哪些生命周期
    1、删除了componentWillMount componetWillRceiveProps componentWillUpdate 
    2、增加了static getDerivedStateFromProps getSnapshotBeforeUpdate

        
    
    
    
