# 单页面应用（Single Page Application, SPA）
	## 缺陷
		1. 不利于SEO
		2. 性能问题（首页加载性能， 浏览器请求增多）
# SRR （浏览器请求回来的html是带有内容的）
	  1. 请求数没减少，只是把浏览器的一部分数据请求移到了服务器端，数据拉取成本变小，传入高效。
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
