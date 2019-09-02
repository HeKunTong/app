# app模块 curd快捷式开发

## 提供基础模块，绑定事件

    controller  

	核心函数:
	
	1. init 初始化admin, view, laydate, upload等模块，执行回调函数
	
	2. setModel 模型，包括id，列表url, 添加url，修改url，删除url，以及表格字段
	
	3. setConfig 配置，包括表格名字，表格最多展示多少行
	
	4.setResponse 列表数据格式
	
	5.renderTable 渲染表格
	
	6.search 绑定搜索搜索事件
	
	7.setFormFields 表单元素
	
	8.add 添加事件（layer.open方式）
	
	9.addByPopup 添加事件（admin.popup方式）
	
	10.onTable 绑定表格事件
	
	11.update 更新事件（layer.open方式）
	
	12.updateByPopup 更新事件（admin.popup方式）
	
	13.remove  删除事件
	
## 模型，设置id，url,表格字段
   
    model  

	核心函数:
	
	1.setId 设置表id字段
	
	2.setListUrl 设置列表接口
	
	3.setAddUrl 设置添加接口
	
	4.setUpdateUrl 设置更新接口
	
	5.setDeleteUrl 设置删除接口
	
	6.setField 设置表格的列


## 表格字段类	

    field

	核心函数:
	
	1.clear 获取表格字段并且清除数据
	
	2.setKey  设置字段名称
	
	3.setTitle 设置标题
	
	4.setAlign 设置对齐方式
	
	5.setTemplet 设置回调处理函数

## 表格toolBar类

    toolbar

	核心函数:
	
	1.clear 获取toolBar信息并且清除数据
	
	2.setFixed  设置固定类型
	
	3.setWidth 设置宽度
	
	4.setToolbar 设置绑定toolBar名称
	
	5.setTitle 设置标题
	
	6.setAlign 设置对齐方式
	
## 表单类

    formField

	核心函数:
	
	1.text 单行文本输入框
	
	2.hidden  隐藏输入框
	
	3.number 数字输入框
	
	4.password 密码输入框
	
	5.date 日期控件
	
	6.select 下拉框	
	
	7.checkbox 多选框
	
	8.radio  单选框
	
	9.switch 开关选择器
	
	10.textarea 多行输入框
	
	11.edit 富文本框
	
	12.upload 上传组件

	13.selectGroup 下拉分组

## 表格数据结构

    response

	核心函数:
	
	1.exec 获取json数据结构
	
	2.setStatusName  数据状态的字段名称
	
	3.setStatusCode 成功的状态码
	
	4.setMsgName 状态信息的字段名称
	
	5.setCountName 数据总数的字段名称
	
	6.setDataName 数据列表的字段名称	

## 配置

    config

	核心函数:
	
	1.setTableName 设置表格名字
	
	2.setLimit  设置表格分页显示多少条数
	
	3.setTableFilter 设置表格事件名称
	
	4.setWidth 设置弹窗的宽度
	
	5.setHeight 设置弹窗的高度
	
	6.getTableName 获取表格名字
	
	7.getLimit  获取表格分页显示多少条数
	
	8.getTableFilter 获取表格事件名称
	
	9.getWidth 获取弹窗的宽度
	
	10.getHeight 获取弹窗的高度


##  例子

```
<script>

     let admin;
     let view;
     let form;
     let table;	

    layui.use('app', function() {
        let $ = layui.$;
        $("#js-load-title").html('用户管理');//标题
        $("#js-load-Controller").html('用户管理');//控制器
        $("#js-load-action").html('用户列表');//方法
        $("#js-load-table-title").html('用户列表');//方法
        $("#keyword-placeholder").attr('placeholder', '帐号');//搜索框

        let app = layui.app;
        let controller = app.controller;
        let model = app.model;
        let field = app.field;
        let toolbar = app.toolbar;
        let formField = app.formField;

        let fields = [
            field.setKey('userAccount').setTitle('帐号').clear(),
            field.setKey('userName').setTitle('名称').clear(),
            field.setKey('phone').setTitle('手机号码').clear(),
            /* field.setKey('userAvatar').setTitle('头像').setTemplet(function (data) {
                 var str = '';
                 if (data.userAvatar) {
                     str = '<img src="'+ data.userAvatar +'" alt="" onclick="showImg('+ data.userAvatar +')"/>';
                 }
                 return str;
             }).clear(),*/
            field.setKey('money').setTitle('余额').setTemplet(function (data) {
                return data.money / 100;
            }).clear(),
            field.setKey('frozenMoney').setTitle('冻结余额').setTemplet(function (data) {
                return data.frozenMoney / 100;
            }).clear(),
            field.setKey('addTime').setTitle('用户新增时间').setTemplet(function (data) {
                var str = '';
                if (data.addTime) {
                    str = intToDate(data.addTime);
                }
                return str;
            }).clear(),
            field.setKey('lastLoginTime').setTitle('最后登录时间').setTemplet(function (data) {
                var str = '';
                if (data.lastLoginTime) {
                    str = intToDate(data.lastLoginTime);
                }
                return str;
            }).clear(),
            field.setKey('lastLoginIp').setTitle('最后登录ip').clear(),
            field.setKey('state').setTitle('状态').setTemplet(function(data) {
                var str = '禁用';
                if (data.state === 1 ) {
                    str = '正常';
                }
                return str;
            }).clear(),
            toolbar.setWidth(260).setToolbar('#toolBar').clear()
        ];

        let formFields = [
            formField.text().setName('userAccount').setTitle('帐号').setDisabled(true).exec(),
            formField.text().setName('userName').setTitle('名称').exec(),
            formField.text().setName('phone').setTitle('手机号码').exec(),
            formField.upload().setName('userAvatar').setTitle('头像').setUrl('/Api/Common/File/image').setCallBack(function(response) {
                return response.result;
            }).exec(),
            formField.edit().setName('detail').setTitle('详情').setUrl('/Api/Common/File/image').setCallBack(function(response) {
                return {src: response.result, title: response.result};
            }).exec(),
            formField.textarea().setName('info').setTitle('信息').exec(),
            formField.radio().setName('color').setTitle('颜色').setData([{key: 0, text: '白色'}, {key: 1, text: '黑色'}]).setDefaultValue(0).exec(),
            formField.switch().setName('status').setTitle('状态').setOpenText('正常').setCloseText('禁用').setDefaultValue(0).exec(),
            formField.date().setName('now').setTitle('今天').setDefaultValue('2019-08-20').exec(),
            formField.date().setName('time').setTitle('时间').setDateType('time').setFormat('HH:mm').setDefaultValue('14:00').exec(),
            formField.select().setName('sex').setTitle('性别').setData([{key: 1, text: '男'}, {key: 2, text: '女'}]).setDefaultValue(1).exec(),
            formField.select().setName('element').setTitle('控件').setSearch(true).setData([{
                key: 1, text: 'layer'
            }, {
                key: 2, text: 'form'
            }, {
                key: 3, text: 'layim'
            }, {
                key: 4, text: 'element'
            }, {
                key: 5, text: 'laytpl'
            }, {
                key: 6, text: 'upload'
            }, {
                key: 7, text: 'laydate'
            }, {
                key: 8, text: 'laypage'
            }, {
                key: 9, text: 'flow'
            }, {
                key: 10, text: 'util'
            }, {
                key: 11, text: 'code'
            }, {
                key: 11, text: 'tree'
            }]).setDefaultValue(1).exec(),
            formField.checkbox().setName('exam').setTitle('考试').setData([{key: 0, text: '选择题'}, {key: 1, text: '填空题'}, {key: 2, text: '判断题'}, {key: 3, text: '应用题'}]).setDefaultValue(1).exec(),
            formField.password().setName('userPassword').setTitle('密码').exec(),
            formField.select().setName('state').setTitle('状态').setData([{key: 0, text: '禁用'}, {key: 1, text: '正常'}]).setDefaultValue(1).exec(),
            formField.selectGroup().setName('quiz').setTitle('分组选择框').setData([{
                key: 0,
                text: '城市记忆',
                children: [{
                    key: 1,
                    text: '你工作的第一个城市',
                }],
            }, {
                key: 2,
                text: '学生时代',
                children: [{
                    key: 3,
                    text: '你的工号',
                }, {
                    key: 4,
                    text: '你最喜欢的老师',
                }],
            }]).setDefaultValue(1).exec()
        ];

        let adminSession = layui.data('layuiAdmin')['adminSession'];
        model.setField(fields);
        model.setListUrl('/Api/admin/user/getAll?adminSession=' + adminSession);
        model.setAddUrl('/Api/admin/user/add?adminSession=' + adminSession);
        model.setUpdateUrl('/Api/admin/user/update?adminSession=' + adminSession);
        model.setDeleteUrl('/Api/admin/user/delete?adminSession=' + adminSession);
        model.setId('userId');

        controller.init(function () {
            admin = controller.getAdmin();
            view = controller.getView();
            form = controller.getForm();
            table = controller.getTable();
            controller.setModel(model).renderTable();		// 设置model以及渲染table 
            controller.search();							// 绑定搜索事件 

            controller.setFormFields(formFields);			// 绑定表单元素
		
			// controller.add('用户', function (params) {		// 以layer.open方式弹窗，绑定添加事件以及执行添加操作
            //
            //     console.log(params);
            //     return false;
            //
            // });

            controller.addByPopup('用户', function (params) {		// 以admn.popup方式弹窗，绑定添加事件以及执行添加操作

                console.log(params);
                return false;

            });

            // 绑定表格工具栏事件
            controller.onTable([{
                event: 'money',											// 绑定money事件
                callBack: function (data) {

                    popup('调整金额', 'users/money', function(index) {		// 弹窗
                   
                        form.val('form-money', data);					// 赋值
						form.render();									// 渲染
						
                        form.on('submit(save)', function(data) {		// 提交按钮事件
                            var field = data.field;

                            console.log(field);

                            return false;
                        });

                    });

                }
            }, {
                event: 'info',										// 绑定info事件
                callBack: function (data) {
                    window.location.hash = '#/users/info/userId=' + data.userId;
                }
            }, {
                event: 'edit',										// 绑定info事件
                callBack: function (data) {
					// controller.update('用户', data, function (params) {		// 以layer.open方式弹窗，执行更新操作 	
					//
					//     console.log(params);
					//
					//     return false;
					// });
				
                    controller.updateByPopup('用户', data, function (params) {		// 以admn.popup方式弹窗，执行更新操作 	
                        
						console.log(params);
                        
                        return fasle;
                    });
                }
            },{
                event: 'remove',									// 绑定remove事件
                callBack: function (data) {
                    controller.remove(data);						// 询问模式，执行删除操作 	
                }
            }]);
        });
    });

    function popup(title, path, callBack) {
        admin.popup({
            title: title, area: ['40%', '50%'], id: 'LAY-popup-data',
            success: function (layero, index) {
                view(this.id).render(path).done(function () {
                    callBack(index);
                });
            }
        });
    }

</script>
```

	

