# 单页面应用（Single Page Application, SPA）
  ## 缺陷
    1. 不利于SEO
    2. 性能问题（首页加载性能， 浏览器请求增多）
# SSR （浏览器请求回来的html是带有内容的）
  1. 请求数没减少，只是把浏览器的一部分数据请求移到了服务器端，数据拉取成本变小，传入高效。
  2. react16以前： ReactDomServer提供renderToString和renderToStaticMarkup方法，这两个方法只能在服务端使用
    renderToString字符串的每个DOM节点都有一个data-react-id属性，根结点有通过Adler校验算法计算的data-react-checksum值，如果两个组件的Props和DOM结构相同，服务端完成渲染后，浏览器端不会重复渲染
    renderToStaticMarkup不会带有data-react-checksum属性，浏览器会重新渲染组件，最终覆盖服务端的初始组件
  ---

      react16后，提供新的API： ReactDOM.hydrate()。用法同render,但它配合renderToString使用，浏览器渲染的过程会尽最大可能保留服务端原有的内容结构  
      
      renderToNodeStream: 该方法产生字节流，通过流形式返回的HTML字符串，与renderToString返回的HTML字符串并无差别。但是使用流有利于页面的初始化加载速度和首屏展现时间。服务端的数据是实时向浏览器传输数据，不是一次性处理完成后才开始向浏览器传输的，这样可以缩短TTFB时间

      renderToString 3.02 TTFB
      renderToNodeStream 4.22 TTFB
      
      renderToStaticNodeStream: 和renderToNodeStream类似，仍然不会产生data-react-*属性。
      如果对于静态内容输出页面，采用renderToStaticNodeStream方法比较合适，如果页面交互较多，采用renderToNodeStream
  3. 开发中需要考虑的问题：

      a.浏览器下的特殊对象使用和初始化的问题： 在服务端并不存在支持组件挂载的浏览器环境，所以react组件只有componengDidMount之前的生命周期有效，因此getInitialState，render等组件方法不能用到浏览器的特性，比如访问window、localStorage等，合理做法是依赖浏览器环境的放在componentDidMount中处理

      只渲染服务端，其点击效果是没有的。只有添加了浏览器端才会有点击交互

      b. 代码复用方法：在服务端拉取数据后，很多场景在浏览器端也需要拉取数据，进行二次渲染，为了实现代码复用，典型的做法是把请求数据的逻辑放在react组件的静态方法中，不管浏览器还是服务器，在需要获取数据时都可直接访问该方法。
      c. 请求数据方法： 服务端不存在AJAX的概念，在Node.js环境下，一般用http.request。为了达到代码复用，可以将浏览器和服务端统一采用isomorphic-fetch方法

      d. 不能复用情况： 根据浏览器和服务器端的判断，比如： 
```
  var onServer = typeof window === 'undefined'
```
          除此之外，还可以借助webpack配置来完成前后端的判断
# 同构（代码复用）

		定义及区别：同构是渲染服务端和浏览器端，并达到一种平衡，服务端渲染主要是表达页面；浏览器端渲染主要是交互，进一步完成页面以及事件绑定。

  ## 优势
  1. 首页展现时间更快（文件更小，不知道怎么体现的），低端设备更加友好，恶劣网络更加友好，体验好
  2. SEO支持
  3. 可维护性强（借助react 类库，实现大范围的代码服用，避免服务端和浏览器同时维护两套代码或逻辑，代码量减少，维护成本低）

  ## 劣势
  1. 服务端逻辑增多，增加了复杂性
  2. 服务端无法完全复用浏览器端代码
  3. 增加了网络的TTFB(Time To First Byte)时间，TTFB是指从浏览器发起最初的网络请求，到服务其接受到的第一个字节这段时间。包含了TCP连接时间、发送HTTP请求的时间和获得响应消息的第一个字节时间。

# 同构与浏览器端渲染优势对比（主要是DOMContentLoaded和loaded上体现）
  当初始的HTML文档被完全加载和解析完成后，DOMContentLoaded事件被触发，而无需等待样式表、图片和子框架加载完成。
  load事件用于检测页面是否完成加载完成。
