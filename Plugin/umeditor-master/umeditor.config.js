/**
 *  umeditor完整配置项
 *  可以在这里配置整个编辑器的特性
 */

etpl.config({
    commandOpen: '<%',
    commandClose: '%>'
});

(function () {

    var URL = window.UMEDITOR_HOME_URL || (function(){

            function PathStack() {

                this.documentURL = self.document.URL || self.location.href;

                this.separator = '/';
                this.separatorPattern = /\\|\//g;
                this.currentDir = './';
                this.currentDirPattern = /^[.]\/]/;

                this.path = this.documentURL;
                this.stack = [];

                this.push( this.documentURL );

            }

            PathStack.isParentPath = function( path ){
                return path === '..';
            };

            PathStack.hasProtocol = function( path ){
                return !!PathStack.getProtocol( path );
            };

            PathStack.getProtocol = function( path ){

                var protocol = /^[^:]*:\/*/.exec( path );

                return protocol ? protocol[0] : null;

            };

            PathStack.prototype = {
                push: function( path ){

                    this.path = path;

                    update.call( this );
                    parse.call( this );

                    return this;

                },
                getPath: function(){
                    return this + "";
                },
                toString: function(){
                    return this.protocol + ( this.stack.concat( [''] ) ).join( this.separator );
                }
            };

            function update() {

                var protocol = PathStack.getProtocol( this.path || '' );

                if( protocol ) {

                    //根协议
                    this.protocol = protocol;

                    //local
                    this.localSeparator = /\\|\//.exec( this.path.replace( protocol, '' ) )[0];

                    this.stack = [];
                } else {
                    protocol = /\\|\//.exec( this.path );
                    protocol && (this.localSeparator = protocol[0]);
                }

            }

            function parse(){

                var parsedStack = this.path.replace( this.currentDirPattern, '' );

                if( PathStack.hasProtocol( this.path ) ) {
                    parsedStack = parsedStack.replace( this.protocol , '');
                }

                parsedStack = parsedStack.split( this.localSeparator );
                parsedStack.length = parsedStack.length - 1;

                for(var i= 0,tempPath,l=parsedStack.length,root = this.stack;i<l;i++){
                    tempPath = parsedStack[i];
                    if(tempPath){
                        if( PathStack.isParentPath( tempPath ) ) {
                            root.pop();
                        } else {
                            root.push( tempPath );
                        }
                    }

                }


            }

            var currentPath = document.getElementsByTagName('script');

            currentPath = currentPath[ currentPath.length -1 ].src;

            return new PathStack().push( currentPath ) + "";


        })();


    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UMEDITOR_CONFIG = {

        //为编辑器实例添加一个路径，这个不能被注释
        UMEDITOR_HOME_URL : URL

        //图片上传配置区
        // ,imageUrl:URL+"http://10.128.31.116/business/item/uploadImageByEditor"             //图片上传提交地址
        ,imageUrl:'http://' + window.location.hostname + '/api/upload/image'             //图片上传提交地址
        //,imagePath:URL + "php/"                     //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
        //,imageFieldName:"upfile"                   //图片数据的key,若此处修改，需要在后台对应文件修改对应参数


        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        ,toolbar:[
            // 'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
            // 'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize' ,
            // '| justifyleft justifycenter justifyright justifyjustify |',
            // 'link unlink | emotion image video  | map',
            // '| horizontal print preview fullscreen', 'drafts', 'formula'
            'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat emotion |',
            'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize' ,
            '| justifyleft justifycenter justifyright justifyjustify |',
            'link unlink | image',
            '| horizontal'
        ]

        //语言配置项,默认是zh-cn。有需要的话也可以使用如下这样的方式来自动多语言切换，当然，前提条件是lang文件夹下存在对应的语言文件：
        //lang值也可以通过自动获取 (navigator.language||navigator.browserLanguage ||navigator.userLanguage).toLowerCase()
        ,lang:"zh-cn"
        //,langPath:URL +"lang/"

        //ie下的链接自动监测
        //,autourldetectinie:false

        //主题配置项,默认是default。有需要的话也可以使用如下这样的方式来自动多主题切换，当然，前提条件是themes文件夹下存在对应的主题文件：
        //现有如下皮肤:default
        ,theme:'default'
        //,themePath:URL +"themes/"



        //针对getAllHtml方法，会在对应的head标签中增加该编码设置。
        //,charset:"utf-8"

        //常用配置项目
        //,isShow : true    //默认显示编辑器

        //,initialContent:'欢迎使用UMEDITOR!'    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子

        ,initialFrameWidth:'85%' //初始化编辑器宽度,默认500
        //,initialFrameHeight:500  //初始化编辑器高度,默认500

        //,autoClearinitialContent:true //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了

        //,textarea:'editorValue' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

        //,focus:false //初始化时，是否让编辑器获得焦点true或false

        //,autoClearEmptyNode : true //getContent时，是否删除空的inlineElement节点（包括嵌套的情况）

        //,fullscreen : false //是否开启初始化时即全屏，默认关闭

        //,readonly : false //编辑器初始化结束后,编辑区域是否是只读的，默认是false

        ,zIndex : 0     //编辑器层级的基数,默认是900

        //如果自定义，最好给p标签如下的行高，要不输入中文时，会有跳动感
        //注意这里添加的样式，最好放在.edui-editor-body .edui-body-container这两个的下边，防止跟页面上css冲突
        //,initialStyle:'.edui-editor-body .edui-body-container p{line-height:1em}'

        //,autoSyncData:true //自动同步编辑器要提交的数据

        //,emotionLocalization:false //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹

        //,allHtmlEnabled:false //提交到后台的数据是否包含整个html字符串

        //fontfamily
        //字体设置
        ,'fontfamily':[
            { label:'',name:'songti',val:'宋体,SimSun'},
            { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
            { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
            { label:'',name:'heiti',val:'黑体, SimHei'},
            { label:'',name:'lishu',val:'隶书, SimLi'},
            { label:'',name:'andaleMono',val:'andale mono'},
            { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
            { label:'',name:'arialBlack',val:'arial black,avant garde'},
            { label:'',name:'comicSansMs',val:'comic sans ms'},
            { label:'',name:'impact',val:'impact,chicago'},
            { label:'',name:'timesNewRoman',val:'times new roman'}
        ]

        //fontsize
        //字号
        ,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]

        //paragraph
        //段落格式 值留空时支持多语言自动识别，若配置，则以配置值为准
        //,'paragraph':{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''}

        //undo
        //可以最多回退的次数,默认20
        //,maxUndoCount:20
        //当输入的字符数超过该值时，保存一次现场
        //,maxInputCount:1

        //imageScaleEnabled
        // 是否允许点击文件拖拽改变大小,默认true
        //,imageScaleEnabled:true

        //dropFileEnabled
        // 是否允许拖放图片到编辑区域，上传并插入,默认true
        //,dropFileEnabled:true

        //pasteImageEnabled
        // 是否允许粘贴QQ截屏，上传并插入,默认true
        ,pasteImageEnabled:true

        //autoHeightEnabled
        // 是否自动长高,默认true
        //,autoHeightEnabled:true

        //autoFloatEnabled
        //是否保持toolbar的位置不动,默认true
        ,autoFloatEnabled:false

        //浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面
        //,topOffset:30

        //填写过滤规则
        //,filterRules: {}
    };
})();