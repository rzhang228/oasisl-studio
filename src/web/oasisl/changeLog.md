
#当前程序版本号
VERSION=2.0.2

#release-notes:

RELEASE_BEGIN_2017

oasisL-2.0.2----------------------2017-11-21
	1) 日历组件添加双面板下默认初始化的日期范围的功能
	2）select支持搜索暂无数据时模板显示
	3) 修复timeline组件在current不为1时的加载bug
	4）tree修复url情况下搜索的问题
	5) 修改select组件分批加载是错误的bug
	6) 表格树添加默认展开选项
	7) 表格树组件增加首列自定义格式
	8) dropDown组件修改下方放不下展示在上方
	9）表单增加最近一天,添加今日
	10) 分布引导bug修复
	11) 修复表格多表头设置第一列时的计算问题
	12) 树组件搜索功能勾选状态错误的解决
	13）解决dropdown 初始化outheight报错的问题
	14）分页组件增加获取每页多少条的方法
	15) 树组件在增删改后面增加扩展图标，用户自定义格式extendIcons:[{iconClass:'',title:''},{iconClass:'',title:''}]
	16) 文档的demo页面引入svg的css文件。
	17) 删除重复引用的chartConverter、文档中增加jquery的引用说明
	18) 将Cookie添加到挂在到oasisl下,去除oasisl util下的Cookie
	19) 解决日历组件select事件多次触发的问题
	20) 解决select组件 多选加搜索情况下总条数显示有误bug
	21）select中body下自动判断是否超出边界

oasisL-2.0.1----------------------2017-10-24
	1) 修复日历双面板右侧时间面板出错的问题
    2) 增加失去焦点时，输入项为列表中有的值,触发选中事件。
    3) 添加日历组件销毁方法,
	4) 修复表格rowSelecteds事件返回参数不正确的问题、表格setRowSelected对外方法，当参数不为Array类型时报错的问题 、表格文档错别字的问题
	5) 表格新增getDataByIndex对外方法
    
oasisL-2.0.0----------------------2017-09-01
	1) 新增时间轴、穿梭框、级联选择，查询查询生成器、树形选择器组件等
    2) 新增SVG图标库
    3) 新增通用页面模板
    4) 引入滚动条、懒加载等第三方插件
    5) 丰富上一版本部分组件功能点及修复bug 
    6) 丰富font字体图标库图标
    7) 组件js支持UMD方式引用，组件内部去requirejs机制
    8) 视觉规范色系，新版换肤，支持更换主题

oasisl-1.0.5----------------------2017-05-27
    1)日历增加supportInput参数，支持用户按指定格式输入日期    
	2)修改thinkinput组件bug

oasisl-1.0.4----------------------2016-12-29
    1)修改oasPopover的content对外方法
	2)修改日历BUG
	3)修改表格无数据样式

oasisl-1.0.3----------------------2016-11-01
	1)修改oasSelect的bug
	2)修改树组件，增加checkboxEffect配置项
	3)修改分页组件pageItems配置项不生效bug
	4)给oasisl包增加oasisl_path和viewTpl_path参数配置
	5)日历组件修改时间范围
	6)增加overlay和operate组件
	7)增加position定位方法
	8)提交表单提示修改和文档
	9)给oasSelect和oasDropdown增加container配置项

oasisl-1.0.2----------------------2016-09-21
	1)分页组件增加customPageItems参数，提供自定义每页显示条数
	2)表格组件列dataRender可以传递函数，并且函数有该行的参数
	3)新增class filter-blur，来控制元素模糊显示

oasisL-1.0.0----------------------2016-03-25
	1) 整合了前端开发中经常使用的template模版 、矢量图标库 、公用HTML片段及20多个UI组件

RELEASE_END_2016