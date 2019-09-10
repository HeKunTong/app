/**

 @Name：layuiAdmin curd模块
 @Author：何坤同
 @QQ：1161709455
 */

layui.define(['table', 'form', 'laydate', 'layedit', 'upload'], function(exports){
    let $ = layui.jquery
        ,table = layui.table
        ,layer = layui.layer
        ,form = layui.form
        ,laydate = layui.laydate
        ,layedit = layui.layedit
        ,upload = layui.upload

        // ,controller = function() {
        //     return new Controller();
        // }
        //
        // ,model = function() {
        //     return new Model();
        // }
        //
        // ,field = function() {
        //     return new Field();
        // }
        //
        // ,toolbar = function() {
        //     return new Toolbar();
        // }
        //
        // ,formField = function() {
        //     return new FormField();
        // }
        //
        // ,response = function() {
        //     return new Response();
        // }
        //
        // ,config = function() {
        //     return new Config();
        // }

        /**
         * Controller
         * @constructor
         * 提供基础模块，绑定事件
         */
        ,Controller = function(){
            this._form = null;
            this._table = null;
            this._laydate = null;
            this._layedit = null;
            this._upload = null;
            this._model = null;
            this._formFields = null;
            this._response = null;
            this._config = null;
        }

        /**
         * 表单处理类
         * @constructor
         */
        ,Dao = function(){

        }

        /**
         * 模型，设置id，url,表格字段
         * @constructor
         */
        ,Model = function(){
            this._id = 'id';
            this._listUrl = '';
            this._addUrl = '';
            this._updateUrl = '';
            this._deleteUrl = '';
            this._field = [];
        }

        /**
         * 表格字段类
         * @constructor
         */
        ,Field = function(){
            this._key = '';
            this._title = '';
            this._align = 'center';
            this._templet = null;
        }

        /**
         * 表格toolBar类
         * @constructor
         */
        ,Toolbar = function(){
            this._fixed = 'right';
            this._width = 140;
            this._toolbar = '#toolBar';
            this._align = 'center';
            this._title = '操作';
        }

        /**
         * 表单元素类
         * @constructor
         */
        ,FormField = function(){

        }

        ,Text = function(){
            this._type = 'text';
            this._title = '';
            this._name = '';
            this._defaultValue = '';    // 设置添加默认值
            this._disabled = false;     // 设置修改编辑框的可编辑性
            this._showAdd = true;       // 添加是否展示
            this._showUpdate = true;    // 修改是否展示
        }

        ,NumberField = function(){
            this._type = 'number';
            this._title = '';
            this._name = '';
            this._defaultValue = '';    // 设置添加默认值
            this._disabled = false;     // 设置修改编辑框的可编辑性
            this._showAdd = true;       // 添加是否展示
            this._showUpdate = true;    // 修改是否展示
        }

        ,Hidden = function(){
            this._type = 'hidden';
            this._title = '';
            this._name = '';
            this._defaultValue = '';    // 设置添加默认值
        }

        ,Password = function(){
            this._type = 'password';
            this._title = '';
            this._name = '';
        }

        ,DateField = function(){
            this._type = 'date';
            this._title = '';
            this._name = '';
            this._disabled = false;
            this._defaultValue = '';
            this._dateType = 'date';         // 控件类型 year 年选择器 month 年月选择器 date 日期选择器 time 时间选择器 datetime 日期时间选择器
            this._format = 'yyyy-MM-dd';     // 格式
        }

        ,Select = function(){
            this._type = 'select';
            this._title = '';
            this._name = '';
            this._disabled = false;
            this._defaultValue = '';
            this._key = 'key';
            this._text = 'text';
            this._search = false;
            this._data = [];
            this._url = '';
            this._callBack = null;
        }

        ,Radio = function(){
            this._type = 'radio';
            this._title = '';
            this._name = '';
            this._disabled = false;
            this._defaultValue = '';
            this._key = 'key';
            this._text = 'text';
            this._data = [];
            this._url = '';
            this._callBack = null;
        }

        ,CheckBox = function(){
            this._type = 'checkbox';
            this._title = '';
            this._name = '';
            this._defaultValue = '';
            this._key = 'key';
            this._text = 'text';
            this._data = [];
            this._url = '';
            this._callBack = null;
        }

        ,Switch = function(){
            this._type = 'switch';
            this._title = '';
            this._name = '';
            this._defaultValue = '';
            this._open = 1;
            this._openText = 'ON';
            this._close = 0;
            this._closeText = 'OFF';
            this._disabled = false;
        }

        ,TextArea = function(){
            this._type = 'textarea';
            this._title = '';
            this._name = '';
            this._defaultValue = '';
            this._height = 100;
            this._disabled = false;
        }

        ,Edit = function(){
            this._type = 'edit';
            this._title = '';
            this._name = '';
            this._height = 405;
            this._url = '';
            this._callBack = null;
        }

        ,Upload = function(){
            this._type = 'upload';
            this._title = '';
            this._name = '';
            this._url = '';
            this._callBack = null;
        }

        ,SelectGroup = function(){
            this._type = 'selectGroup';
            this._title = '';
            this._name = '';
            this._url = '';
            this._disabled = false;
            this._key = 'key';
            this._text = 'text';
            this._data = [];
            this._defaultValue = '';
            this._callBack = null;
        }

        ,Response = function(){
            this._statusName = 'code';           //数据状态的字段名称，默认：code
            this._statusCode = 200;              //成功的状态码，默认：0
            this._msgName = 'msg';               //状态信息的字段名称，默认：msg
            this._countName = 'result.total';    //数据总数的字段名称，默认：count
            this._dataName = 'result.list';      //数据列表的字段名称，默认：data
        }

        ,Config = function(){
            this._tableName = 'main-table';      // table 名字
            this._limit = 10;
            this._tableFilter = 'LAY-main-table';
            this._width = '55%';
            this._height = '500px';
        };

    /**
     * @method init
     * 提供基础模块以及回调
     */
    Controller.prototype.init = function (callBack) {
        let _this = this;
        _this.setForm(form);
        _this.setTable(table);
        _this.setLayDate(laydate);
        _this.setLayEdit(layedit);
        _this.setUpload(upload);
        callBack();
    };

    /**
     * @method setModel
     * 绑定model
     */
    Controller.prototype.setModel = function(model) {
        this._model = model;
        return this;
    };

    Controller.prototype.getModel = function() {
        return this._model;
    };

    /**
     * @method setModel
     * 设置配置项
     */
    Controller.prototype.setConfig = function(config) {
        this._config = config;
        return this;
    };

    Controller.prototype.getConfig = function() {
        return this._config;
    };

    /**
     * @method setModel
     * 设置表格接口数据格式
     */
    Controller.prototype.setResponse = function(response) {
        this._response = response;
        return this;
    };

    Controller.prototype.getResponse = function() {
        return this._response;
    };

    /**
     * @method renderTable
     * 表格展示
     */
    Controller.prototype.renderTable = function(where) {
        if (where === undefined || where === null || where === ''){
            where = {};
        }
        /**
         * 数据格式 {code: 200, result: {list: [{...}, {...}], total: 2}, msg: ''}
         */
        if (this.getResponse() === null) {
            this.setResponse(new Response());
        }
        if (this.getConfig() === null) {
            this.setConfig(new Config());
        }
        if (this.getModel() === null) {
            console.error("hint: 没有设置model");
            layer.msg("请设置model");
        }
        let response = this.getResponse();
        let config = this.getConfig();
        let model = this.getModel();
        let table = this.getTable();
        table.render({
            elem: '#' + config.getTableName(),
            method: 'GET',
            url: model.getListUrl(),
            where: where,
            limit: config.getLimit(),
            height: 'full-300',
            response: response.exec(),
            page: true,
            cols: [model.getField()]
        });
    };

    /**
     * @method search
     * 搜索事件
     */
    Controller.prototype.search = function (event = 'search') {
        // 绑定搜索事件
        if (this.config === null) {
            this.setConfig(new Config());
        }
        let table = this.getTable();
        let form = this.getForm();
        let config = this.getConfig();
        form.on('submit(' + event + ')', function (data) {

            console.log(data);

            table.reload(config.getTableName(), {where: data.field, page: {curr: 1}});

            return false;
        });
    };

    /**
     * @method setFormFields
     * 处理表单元素
     */
    Controller.prototype.setFormFields = function(formFields) {
        this._formFields = formFields;
        return this;
    };

    Controller.prototype.getFormFields = function() {
        return this._formFields;
    };

    Controller.prototype._getFormView = function(type, title, data, callBack) {     // type 1 为添加  2 为修改
        let _this = this;
        let form = this.getForm();
        let table = this.getTable();
        let formFields = this.getFormFields();
        let model = _this.getModel();
        let str = '';
        let dates = [];
        let selects = [];
        let checkboxs = [];
        let radios = [];
        let switchs = [];
        let edits = [];
        let uploads = [];
        let dao = new Dao();
        let editIndex = {};
        if (type !== 1) {
            str = str + dao.getHiddenForm({name: model.getId()}, data[model.getId()]);
        }
        $.each(formFields, function(key, formField) {
            if (formField.url && formField.type !== 'upload' && formField.type !== 'edit') {
                $.ajax({
                    url: formField.url,
                    async: false,
                    success: function (data) {
                        let list = [];
                        if (formField.callBack) {
                            list = formField.callBack(data);
                        } else {
                            list = data.result.list;
                        }
                        formField.data = list;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        layer.msg(jqXHR.msg);
                    }
                });
            }
            let value = type === 1 ? (typeof formField.defaultValue === 'undefined' ? '' : formField.defaultValue) : (typeof data[formField.name] === 'undefined' ? '' : data[formField.name]);
            let disabled = type === 1 ? false : formField.disabled;
            let show = type === 1 ? formField.showAdd : formField.showUpdate;
            switch (formField.type) {
                case 'text':
                    if (show) {
                        str = str + dao.getTextForm(formField, value, disabled);
                    }
                    break;
                case 'hidden':
                    str = str + dao.getHiddenForm(formField, value);
                    break;
                case 'number':
                    if (show) {
                        str = str + dao.getNumberForm(formField, value, disabled);
                    }
                    break;
                case 'password':
                    str = str + dao.getPasswordForm(formField);
                    break;
                case 'date':
                    dates.push(formField);
                    str = str + dao.getDateForm(formField, value, disabled);
                    break;
                case 'select':
                    selects.push({name: formField.name, value: value});
                    str = str + dao.getSelectForm(formField, disabled);
                    break;
                case 'checkbox':
                    checkboxs.push({name: formField.name, value: value, data: formField.data, key: formField.key, text: formField.text});
                    str = str + dao.getCheckBoxForm(formField);
                    break;
                case 'radio':
                    radios.push({name: formField.name, value: value});
                    str = str + dao.getRadioForm(formField);
                    break;
                case 'switch':
                    switchs.push({name: formField.name, value: value, open: formField.open, close: formField.close});
                    str = str + dao.getSwitchForm(formField, disabled);
                    break;
                case 'textarea':
                    str = str + dao.getTextAreaForm(formField, value, disabled);
                    break;
                case 'edit':
                    edits.push({name: formField.name, url: formField.url, value: value, callBack: formField.callBack});
                    str = str + dao.getEditForm(formField);
                    break;
                case 'upload':
                    uploads.push({name: formField.name, url: formField.url, callBack: formField.callBack});
                    str = str + dao.getUploadForm(formField);
                    break;
                case 'selectGroup':
                    selects.push({name: formField.name, value: value});
                    str = str + dao.getSelectGroupForm(formField, disabled);
                    break;
                default: ;
            }
        });
        let html = '<form id="addForm" class="layui-form layui-form-pane">' +
            '           <div class="row" style="width:70%;  margin-left:3%; margin-top:10px;">' +
            '               <div class="col-sm-12">' +
            '                   <div class="input-group conn-itest">' +
            str +
            '                   </div>' +
            '               </div>' +
            '           </div>' +
            '       </form>';
        if (_this.getConfig() === null) {
            _this.setConfig(new Config());
        }
        let config = _this.getConfig();
        let action = type === 1 ? '添加' : '修改';
        let url = type === 1 ? model.getAddUrl() : model.getUpdateUrl();
        layer.open({
            id: 2,
            type: 1,
            title: title,
            skin: 'layui-layer-rim',
            area: [config.getWidth(), config.getHeight()],
            content: html,
            btn: [action, '取消'],
            success: function () {
                if (edits.length !== 0) {
                    $.each(edits, function (index, edit) {
                        let pos = _this.getLayEdit().build(edit.name, {
                            height: 360,
                            uploadImage: {
                                url: edit.url //接口url
                                , type: 'post' //默认post
                                , callBack: edit.callBack
                            }
                        }); //建立编辑器
                        editIndex[edit.name] = pos;
                        if (edit.value !== '') {
                            _this.getLayEdit().setContent(pos, edit.value);
                        }
                    });
                }
                if (uploads.length !== 0) {
                    $.each(uploads, function (index, item) {
                        _this.getUpload().render({
                            elem: '#' + item.name //绑定元素
                            ,url: item.url //上传接口
                            ,done: function(res){
                                //上传完毕回调
                                let src = res.result.src;
                                if (item.callBack !== null) {
                                    src = item.callBack(res);
                                }
                                $('input[name="' + item.name + '"]').val(src);
                                $("#img-" + item.name).attr('src', src);
                            }
                            ,error: function(){
                                //请求异常回调
                            }
                        });
                    });
                }
                if (dates.length !== 0 || selects.length !== 0 || radios.length !== 0 || switchs.length !== 0) {
                    $.each(dates, function (index, date) {
                        _this.getLayDate().render({
                            elem: '#' + date.name, //指定元素
                            type: date.dateType,
                            format: date.format
                        });
                    });
                    $.each(selects, function (index, select) {
                        $('select[name="' + select.name + '"]').val(select.value);
                    });
                    $.each(checkboxs, function (index, checkbox) {
                        let value = [];
                        if (typeof checkbox.value !== 'object' && checkbox.value !== '') {
                            value = [checkbox.value];
                        }
                        if (typeof checkbox.value === 'object' && checkbox.value instanceof Array) {
                            value = checkbox.value;
                        }
                        $.each(value, function (pos, item) {
                            $('input[name="' + checkbox.name + '['+ item +']"]').attr('checked', true);
                        });
                    });
                    $.each(radios, function (index, radio) {
                        $('input[name="' + radio.name + '"][value="' + radio.value + '"]').attr("checked", true);
                    });
                    $.each(switchs, function (index, item) {
                        if (item.value === item.open) {
                            $('input[name="' + item.name + '"][type="checkbox"][lay-skin="switch"]').attr("checked", true);
                        }
                    });
                    form.render();
                }
            },
            btn1: function (index, layero) {
                let formNode = $(layero)[0].querySelector('form');
                let field = $(formNode).serializeArray();
                let sendData = {};
                for(let key in field) {
                    sendData[field[key].name] = field[key].value;
                }
                for (let key in editIndex) {
                    sendData[key] = _this.getLayEdit().getContent(editIndex[key]);
                }
                for (let key in checkboxs) {
                    let values = [];
                    let name = checkboxs[key].name;
                    let data = checkboxs[key].data;
                    for (let i in data) {
                        let pos = data[i][checkboxs[key].key];
                        let item = sendData[name + '[' + pos + ']'];
                        if (typeof item !== 'undefined') {
                            values.push(item);
                            delete sendData[name + '[' + pos + ']'];
                        }
                    }
                    sendData[name] = values;
                }
                for (let key in switchs) {
                    let name = switchs[key].name;
                    if (typeof sendData[name] !== 'undefined' && sendData[name] === 'on') {
                        sendData[name] = switchs[key].open;
                    } else {
                        sendData[name] = switchs[key].close;
                    }
                }
                if (callBack) {
                    sendData = callBack(sendData);
                }
                if (!sendData) {
                    return false;
                }
                $.ajax({
                    url: url,
                    data: sendData,
                    success: function () {
                        layer.msg(action + '成功', { icon: 1, time: 1000 }, function () {
                            table.reload(config.getTableName(), { page: { curr: 1 } });
                            layer.close(index); //执行关闭
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        layer.msg(jqXHR.msg);
                    }
                });
                return false;
            },
            btn2: function (index, layero) {
                layer.close(index);
            }, cancel: function () {
                // location.reload();
            }

        });

    };

    Controller.prototype._getFormViewByPopup = function(type, title, data, callBack) {     // type 1 为添加  2 为修改
        let _this = this;
        let form = this.getForm();
        let table = this.getTable();
        let formFields = this.getFormFields();
        let model = _this.getModel();
        let str = '';
        let dates = [];
        let selects = [];
        let checkboxs = [];
        let radios = [];
        let switchs = [];
        let edits = [];
        let uploads = [];
        let dao = new Dao();
        let editIndex = {};
        if (type !== 1) {
            str = str + dao.getHiddenForm({name: model.getId()}, data[model.getId()]);
        }
        $.each(formFields, function(key, formField) {
            if (formField.url && formField.type !== 'upload' && formField.type !== 'edit') {
                $.ajax({
                    url: formField.url,
                    async: false,
                    success: function (data) {
                        let list = [];
                        if (formField.callBack) {
                            list = formField.callBack(data);
                        } else {
                            list = data.result.list;
                        }
                        formField.data = list;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        layer.msg(jqXHR.msg);
                    }
                });
            }
            let value = type === 1 ? (typeof formField.defaultValue === 'undefined' ? '' : formField.defaultValue) : (typeof data[formField.name] === 'undefined' ? '' : data[formField.name]);
            let disabled = type === 1 ? false : formField.disabled;
            let show = type === 1 ? formField.showAdd : formField.showUpdate;
            switch (formField.type) {
                case 'text':
                    if (show) {
                        str = str + dao.getTextForm(formField, value, disabled);
                    }
                    break;
                case 'hidden':
                    str = str + dao.getHiddenForm(formField, value);
                    break;
                case 'number':
                    if (show) {
                        str = str + dao.getNumberForm(formField, value, disabled);
                    }
                    break;
                case 'password':
                    str = str + dao.getPasswordForm(formField);
                    break;
                case 'date':
                    dates.push(formField);
                    str = str + dao.getDateForm(formField, value, disabled);
                    break;
                case 'select':
                    selects.push({name: formField.name, value: value});
                    str = str + dao.getSelectForm(formField, disabled);
                    break;
                case 'checkbox':
                    checkboxs.push({name: formField.name, value: value, data: formField.data, key: formField.key, text: formField.text});
                    str = str + dao.getCheckBoxForm(formField);
                    break;
                case 'radio':
                    radios.push({name: formField.name, value: value});
                    str = str + dao.getRadioForm(formField);
                    break;
                case 'switch':
                    switchs.push({name: formField.name, value: value, open: formField.open, close: formField.close});
                    str = str + dao.getSwitchForm(formField, disabled);
                    break;
                case 'textarea':
                    str = str + dao.getTextAreaForm(formField, value, disabled);
                    break;
                case 'edit':
                    edits.push({name: formField.name, url: formField.url, value: value, callBack: formField.callBack});
                    str = str + dao.getEditForm(formField);
                    break;
                case 'upload':
                    uploads.push({name: formField.name, url: formField.url, callBack: formField.callBack});
                    str = str + dao.getUploadForm(formField);
                    break;
                case 'selectGroup':
                    selects.push({name: formField.name, value: value});
                    str = str + dao.getSelectGroupForm(formField, disabled);
                    break;
                default: ;
            }
        });
        let html = '<div>' +
            '   <form class="layui-form layui-form-pane">' +
            str +
            '   <div class="layui-form-item">' +
            '        <div class="layui-input-block">' +
            '            <button class="layui-btn layui-btn-danger" lay-submit="" lay-filter="save">提交修改</button>' +
            '        </div>' +
            '    </div>' +
            '   </form>' +
            '</div>';
        if (_this.getConfig() === null) {
            _this.setConfig(new Config());
        }
        let config = _this.getConfig();
        let action = type === 1 ? '添加' : '修改';
        let url = type === 1 ? model.getAddUrl() : model.getUpdateUrl();
        layer.open({
            title: action + title,
            skin: 'layui-layer-admin',
            area: [config.getWidth(), config.getHeight()],
            content: html,
            btn: [],
            shadeClose: true,
            closeBtn: 1,
            success: function (layero, index) {
                if (edits.length !== 0) {
                    $.each(edits, function (index, edit) {
                        let pos = _this.getLayEdit().build(edit.name, {
                            height: 360,
                            uploadImage: {
                                url: edit.url //接口url
                                , type: 'post' //默认post
                                , callBack: edit.callBack
                            }
                        }); //建立编辑器
                        editIndex[edit.name] = pos;
                        if (edit.value !== '') {
                            _this.getLayEdit().setContent(pos, edit.value);
                        }
                    });
                }
                if (uploads.length !== 0) {
                    $.each(uploads, function (index, item) {
                        _this.getUpload().render({
                            elem: '#' + item.name //绑定元素
                            ,url: item.url //上传接口
                            ,done: function(res){
                                //上传完毕回调
                                let src = res.result.src;
                                if (item.callBack !== null) {
                                    src = item.callBack(res);
                                }
                                $('input[name="' + item.name + '"]').val(src);
                                $("#img-" + item.name).attr('src', src);
                            }
                            ,error: function(){
                                //请求异常回调
                            }
                        });
                    });
                }
                if (dates.length !== 0 || selects.length !== 0 || radios.length !== 0 || switchs.length !== 0) {
                    $.each(dates, function (index, date) {
                        _this.getLayDate().render({
                            elem: '#' + date.name, //指定元素
                            type: date.dateType,
                            format: date.format
                        });
                    });
                    $.each(selects, function (index, select) {
                        $('select[name="' + select.name + '"]').val(select.value);
                    });
                    $.each(checkboxs, function (index, checkbox) {
                        let value = [];
                        if (typeof checkbox.value !== 'object' && checkbox.value !== '') {
                            value = [checkbox.value];
                        }
                        if (typeof checkbox.value === 'object' && checkbox.value instanceof Array) {
                            value = checkbox.value;
                        }
                        $.each(value, function (pos, item) {
                            $('input[name="' + checkbox.name + '['+ item +']"]').attr('checked', true);
                        });
                    });
                    $.each(radios, function (index, radio) {
                        $('input[name="' + radio.name + '"][value="' + radio.value + '"]').attr("checked", true);
                    });
                    $.each(switchs, function (index, item) {
                        if (item.value === item.open) {
                            $('input[name="' + item.name + '"][type="checkbox"][lay-skin="switch"]').attr("checked", true);
                        }
                    });
                    form.render();
                }

                form.on('submit(save)', function(data) {
                    let sendData = data.field;
                    for (let key in editIndex) {
                        sendData[key] = _this.getLayEdit().getContent(editIndex[key]);
                    }
                    for (let key in checkboxs) {
                        let values = [];
                        let name = checkboxs[key].name;
                        let data = checkboxs[key].data;
                        for (let i in data) {
                            let pos = data[i][checkboxs[key].key];
                            let item = sendData[name + '[' + pos + ']'];
                            if (typeof item !== 'undefined') {
                                values.push(item);
                                delete sendData[name + '[' + pos + ']'];
                            }
                        }
                        sendData[name] = values;
                    }
                    for (let key in switchs) {
                        let name = switchs[key].name;
                        if (typeof sendData[name] !== 'undefined' && sendData[name] === 'on') {
                            sendData[name] = switchs[key].open;
                        } else {
                            sendData[name] = switchs[key].close;
                        }
                    }
                    if (callBack) {
                        sendData = callBack(sendData);
                    }
                    if (!sendData) {
                        return false;
                    }
                    $.ajax({
                        url: url,
                        data: sendData,
                        success: function () {
                            layer.msg('添加成功', { icon: 1, time: 1000 }, function () {
                                table.reload(config.getTableName(), { page: { curr: 1 } });
                                layer.close(index); //执行关闭
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            layer.msg(jqXHR.msg);
                        }
                    });
                    return false;
                });

            }
        });

    };

    /**
     * @method add
     * 添加事件
     */
    Controller.prototype.add = function (title, callBack = null, event = 'add') {
        let _this = this;
        let form = this.getForm();
        form.on('submit(' + event + ')', function () {
            _this._getFormView(1, title, null, callBack);
            return false;
        });
    };

    /**
     * @method addByPopup
     * 添加事件
     */
    Controller.prototype.addByPopup = function (title, callBack = null, event = 'add') {
        let _this = this;
        let form = this.getForm();

        form.on('submit(' + event + ')', function () {
            _this._getFormViewByPopup(1, title, null, callBack);
        });
    };

    /**
     * @method onTable
     * 表格事件
     */
    Controller.prototype.onTable = function(config = [{event: 'edit', callBack: function() {}}]) {
        let _this = this;
        let table = this.getTable();
        table.on('tool('+ _this.getConfig().getTableFilter() +')', function (toolbar) {
            let data = toolbar.data; // 获得当前行数据
            let layEvent = toolbar.event; // 当前触发的事件名称
            $.each(config, function(key, co) {
                if (layEvent === co.event) {
                    co.callBack(data);
                }
            });
        });
    };

    /**
     * @method update
     * 更新事件
     */
    Controller.prototype.update = function (title, data, callBack = null) {
        this._getFormView(2, title, data, callBack);
    };

    /**
     * @method updateByPopup
     * 更新事件
     */
    Controller.prototype.updateByPopup = function (title, data, callBack = null) {
        this._getFormViewByPopup(2, title, data, callBack);
    };

    /**
     * @method update
     * 删除事件
     */
    Controller.prototype.remove = function(data) {
        let table = this.getTable();
        let model = this.getModel();
        let config = this.getConfig();
        layer.confirm('是否删除?', function (index) {
            $.ajax({
                url: model.getDeleteUrl(),
                data: {
                    [model.getId()]: typeof data[model.getId()] !== "undefined" ? data[model.getId()] : null,
                },
                success: function () {
                    layer.msg('删除成功', {icon: 1, time: 1000}, function () {
                        table.reload(config.getTableName(), {page: {curr: 1}});
                        layer.close(index);
                    });
                },
                error: function (jqXHR) {
                    layer.msg(jqXHR.msg);
                }
            });
        });
    };

    Controller.prototype.setForm = function(form) {
        this._form = form;
        return this;
    };

    Controller.prototype.setTable = function(table) {
        this._table = table;
        return this;
    };



    Controller.prototype.setLayDate = function (laydate) {
        this._laydate = laydate;
        return this;
    };

    Controller.prototype.setLayEdit = function (layedit) {
        this._layedit = layedit;
        return this;
    };

    Controller.prototype.setUpload = function (upload) {
        this._upload = upload;
        return this;
    };

    Controller.prototype.getForm = function() {
        return this._form;
    };

    Controller.prototype.getTable = function() {
        return this._table;
    };

    Controller.prototype.getLayDate = function () {
        return this._laydate;
    };

    Controller.prototype.getLayEdit = function () {
        return this._layedit;
    };

    Controller.prototype.getUpload = function () {
        return this._upload;
    };

    /**
     * @method getTextForm
     * 处理text
     */
    Dao.prototype.getTextForm = function(formField, value = '', disabled = false) {
        let str = '<input type="text" class="layui-input" name="'+ formField.name + '" placeholder="" value="' + value + '"';
        if (disabled) {
            str += ' disabled';
        }
        str += '>';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getHiddenForm
     * 处理hidden
     */
    Dao.prototype.getHiddenForm = function(formField, value) {
        return '<input type="hidden" class="layui-input" name="' + formField.name +'" placeholder="" value="' + value + '">';
    };

    /**
     * @method getDateForm
     * 处理date
     */
    Dao.prototype.getDateForm = function(formField, value, disabled = false) {
        let str = '<input type="text" class="layui-input" id="' + formField.name + '" name="'+ formField.name + '" placeholder="" value="' + value + '"';
        if (disabled) {
            str += ' disabled';
        }
        str += ' readonly>';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getNumberForm
     * 处理number
     */
    Dao.prototype.getNumberForm = function (formField, value, disabled = false) {
        let str = '<input type="number" class="layui-input" name="'+ formField.name + '" placeholder="" value="' + value + '"';
        if (disabled) {
            str += ' disabled';
        }
        str += '>';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getPasswordForm
     * 处理password
     */
    Dao.prototype.getPasswordForm = function(formField) {
        let str = '<input type="password" class="layui-input" name="'+ formField.name + '" placeholder="" value="">';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getSelectForm
     * 处理select
     */
    Dao.prototype.getSelectForm = function(formField, disabled = false) {
        let str = '';
        $.each(formField.data, function(key, item) {
            str += '<option value="' + item[formField.key] + '">' + item[formField.text] + '</option>';
        });
        let info = disabled ? ' disabled' : '';
        let search = formField.search ? ' lay-search' : '';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            '           <select name="' + formField.name + '"' + info + search + '>' +
            str +
            '           </select>' +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getCheckBoxForm
     * 处理checkbox
     */
    Dao.prototype.getCheckBoxForm = function(formField) {
        let str = '';
        $.each(formField.data, function(key, item) {
            str += '<input type="checkbox" name="' + formField.name + '['+ item[formField.key] +']" value="'+ item[formField.key] +'" title="' + item[formField.text] + '">';
        });
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getRadioForm
     * 处理radio
     */
    Dao.prototype.getRadioForm = function(formField) {
        let str = '';
        $.each(formField.data, function(key, item) {
            str += '<input type="radio" name="' + formField.name + '" value="' + item[formField.key] + '" title="' + item[formField.text] + '">';
        });
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getSwitchForm
     * 处理switch
     */
    Dao.prototype.getSwitchForm = function(formField, disabled = false) {
        let str = '<input type="checkbox" name="'+ formField.name + '" lay-skin="switch" lay-text="'+ formField.openText +'|' + formField.closeText + '"';
        if (disabled) {
            str += ' disabled';
        }
        str += '>';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getTextAreaForm
     * 处理textarea
     */
    Dao.prototype.getTextAreaForm = function(formField, value, disabled = false) {
        let str = '<textarea id="' + formField.name + '" name="'+ formField.name + '" placeholder="请输入" class="layui-textarea"';
        if (disabled) {
            str += ' disabled';
        }
        str += '>' + value + '</textarea>';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label" style="height: ' + formField.height + 'px;">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getEditForm
     * 处理edit
     */
    Dao.prototype.getEditForm = function(formField) {
        let str = '<textarea id="' + formField.name + '" name="'+ formField.name + '" placeholder="请输入" class="layui-textarea"></textarea>';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label" style="height: ' + formField.height + 'px;">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            str +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getSelectGroupForm
     * 处理selecyGroup
     */
    Dao.prototype.getSelectGroupForm = function(formField, disabled = false) {
        let str = '<option value="">请选择</option>';
        $.each(formField.data, function(index, data) {
            str += '<optgroup label="' + data[formField.text] + '">';
            $.each(data.children, function(pos, item) {
                str += '<option value="' + item[formField.key] + '">' + item[formField.text] + '</option>';
            });
            str += '</optgroup>';
        });
        let info = disabled ? ' disabled' : '';
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            '           <select name="' + formField.name + '"' + info  + '>' +
            str +
            '           </select>' +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method getUploadForm
     * 处upload
     */
    Dao.prototype.getUploadForm = function(formField, value = '') {
        return '<div class="layui-form-item">' +
            '       <label class="layui-form-label">' + formField.title + '</label>' +
            '       <div class="layui-input-block">' +
            '           <button type="button" class="layui-btn" id="' + formField.name + '">' +
            '               <i class="layui-icon">&#xe67c;</i>上传图片' +
            '           </button>' +
            '           <div style="margin: 20px 0 0;">' +
            '               <img id="img-' + formField.name + '" style="max-width: 50%" src="' + value + '">' +
            '               <input type="hidden" class="layui-input" name="' + formField.name + '" placeholder="" value="' + value + '">' +
            '           </div>' +
            '       </div>' +
            '   </div>';
    };

    /**
     * @method setId
     * 设置id
     */
    Model.prototype.setId = function(id) {
        this._id = id;
        return this;
    };

    Model.prototype.getId = function(id) {
        return this._id;
    };

    /**
     * @method setListUrl
     * 设置列表链接
     */
    Model.prototype.setListUrl = function(url) {
        this._listUrl = url;
        return this;
    };

    Model.prototype.getListUrl = function() {
        return this._listUrl;
    };

    /**
     * @method setAddUrl
     * 设置添加链接
     */
    Model.prototype.setAddUrl = function (url) {
        this._addUrl = url;
        return this;
    };

    Model.prototype.getAddUrl = function () {
        return this._addUrl;
    };

    /**
     * @method setUpdateUrl
     * 设置更新链接
     */
    Model.prototype.setUpdateUrl = function(url) {
        this._updateUrl = url;
        return this;
    };

    Model.prototype.getUpdateUrl = function() {
        return this._updateUrl;
    };

    /**
     * @method setDeleteUrl
     * 设置删除链接
     */
    Model.prototype.setDeleteUrl = function(url) {
        this._deleteUrl = url;
        return this;
    };

    Model.prototype.getDeleteUrl = function() {
        return this._deleteUrl;
    };

    /**
     * @method setField
     * 设置表格字段
     */
    Model.prototype.setField = function(field) {
        this._field = field;
        return this;
    };

    /**
     * @method getField
     * 获取表格字段
     */
    Model.prototype.getField = function() {
        return this._field;
    };

    /**
     * @method clear
     * 获取表格字段数据，清除信息
     */
    Field.prototype.clear = function() {
        let field = {field: this._key, title: this._title, align: this._align};
        if (this._templet) {
            field.templet = this._templet;
        }
        this._key = '';
        this._title = '';
        this._align = 'center';
        this._templet = null;
        return field;
    };

    /**
     * @method setKey
     * 设置字段key
     */
    Field.prototype.setKey = function(key) {
        this._key = key;
        return this;
    };

    /**
     * @method setTitle
     * 设置标题
     */
    Field.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    /**
     * @method setAlign
     * 设置对齐方式
     */
    Field.prototype.setAlign = function (align) {
        this._align = align;
        return this;
    };

    /**
     * @method setTemplet
     * 设置回调函数
     */
    Field.prototype.setTemplet = function(templet) {
        this._templet = templet;
        return this;
    };

    /**
     * @method clear
     * 设置toolBar信息
     */
    Toolbar.prototype.clear = function() {
        let toolbar = {fixed: this._fixed, width: this._width, title: this._title, align: this._align, toolbar: this._toolbar};
        this._fixed = 'right';
        this._width = 140;
        this._toolbar = '#toolBar';
        this._align = 'center';
        this._title = '操作';
        return toolbar;
    };

    /**
     * @method setFixed
     * 设置固定位置
     */
    Toolbar.prototype.setFixed = function(fixed) {
        this._fixed = fixed;
        return this;
    };

    /**
     * @method setWidth
     * 设置宽度
     */
    Toolbar.prototype.setWidth = function(width) {
        this._width = width;
        return this;
    };

    /**
     * @method setToolbar
     * 设置绑定toolBar名称
     */
    Toolbar.prototype.setToolbar = function (toolbar) {
        this._toolbar = toolbar;
        return this;
    };

    /**
     * @method setTitle
     * 设置标题
     */
    Toolbar.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    /**
     * @method setAlign
     * 设置对齐方式
     */
    Toolbar.prototype.setAlign = function(align) {
        this._align = align;
        return this;
    };

    FormField.prototype.text = function() {
        return new Text();
    };

    FormField.prototype.hidden = function() {
        return new Hidden();
    };

    FormField.prototype.number = function() {
        return new NumberField();
    };

    FormField.prototype.password = function() {
        return new Password();
    };

    FormField.prototype.date = function() {
        return new DateField();
    };

    FormField.prototype.select = function() {
        return new Select();
    };

    FormField.prototype.checkbox = function() {
        return new CheckBox();
    };

    FormField.prototype.radio = function() {
        return new Radio();
    };

    FormField.prototype.radio = function() {
        return new Radio();
    };

    FormField.prototype.switch = function() {
        return new Switch();
    };

    FormField.prototype.textarea = function() {
        return new TextArea();
    };

    FormField.prototype.edit = function() {
        return new Edit();
    };

    FormField.prototype.upload = function() {
        return new Upload();
    };

    FormField.prototype.selectGroup = function() {
        return new SelectGroup();
    };

    Text.prototype.exec = function() {
        return {
            type: this._type, title:  this._title,
            name: this._name, disabled: this._disabled,
            defaultValue: this._defaultValue,
            showAdd: this._showAdd, showUpdate: this._showUpdate
        };
    };

    Text.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Text.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    Text.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    Text.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    Text.prototype.setShowAdd = function (showAdd) {
        this._showAdd = showAdd;
        return this;
    };

    Text.prototype.setShowUpdate = function (showUpdate) {
        this._showUpdate = showUpdate;
        return this;
    };

    NumberField.prototype.exec = function() {
        return {
            type: this._type, title: this._title,
            name: this._name, disabled: this._disabled,
            showAdd: this._showAdd, showUpdate: this._showUpdate,
            defaultValue: this._defaultValue
        };
    };

    NumberField.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    NumberField.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    NumberField.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    NumberField.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    NumberField.prototype.setShowAdd = function (showAdd) {
        this._showAdd = showAdd;
        return this;
    };

    NumberField.prototype.setShowUpdate = function (showUpdate) {
        this._showUpdate = showUpdate;
        return this;
    };

    Hidden.prototype.exec = function() {
        return {type: this._type, title:  this._title, name: this._name, defaultValue: this._defaultValue};
    };

    Hidden.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Hidden.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    Hidden.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    Password.prototype.exec = function() {
        return {type: this._type, title:  this._title, name: this._name};
    };

    Password.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Password.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    DateField.prototype.exec = function() {
        return {
            type: this._type, title:  this._title,
            name: this._name, disabled: this._disabled,
            format: this._format, dateType: this._dateType,
            defaultValue: this._defaultValue,
        };
    };

    DateField.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    DateField.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    DateField.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    DateField.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    DateField.prototype.setDateType = function (dateType) {
        this._dateType = dateType;
        return this;
    };

    DateField.prototype.setFormat = function (format) {
        this._format = format;
        return this;
    };

    Select.prototype.exec = function() {
        return {
            type: this._type, title:  this._title,
            name: this._name, disabled: this._disabled,
            key: this._key, text: this._text,
            data: this._data, defaultValue: this._defaultValue,
            url: this._url, callBack: this._callBack,
            search: this._search
        };
    };

    Select.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Select.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    Select.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    Select.prototype.setKey = function (key) {
        this._key = key;
        return this;
    };

    Select.prototype.setText = function (text) {
        this._text = text;
        return this;
    };

    Select.prototype.setSearch = function (search) {
        this._search = search;
        return this;
    };

    Select.prototype.setData = function (data) {
        this._data = data;
        return this;
    };

    Select.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    Select.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };

    Select.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
        return this;
    };

    Radio.prototype.exec = function() {
        return {
            type: this._type, title: this._title,
            name: this._name, disabled: this._disabled,
            key: this._key, text: this._text,
            data: this._data, defaultValue: this._defaultValue,
            url: this._url, callBack: this._callBack,
        };
    };

    Radio.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Radio.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    Radio.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    Radio.prototype.setKey = function (key) {
        this._key = key;
        return this;
    };

    Radio.prototype.setText = function (text) {
        this._text = text;
        return this;
    };

    Radio.prototype.setData = function (data) {
        this._data = data;
        return this;
    };

    Radio.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    Radio.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
        return this;
    };

    Radio.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };

    CheckBox.prototype.exec = function() {
        return {
            type: this._type, title: this._title,
            name: this._name, callBack: this._callBack,
            key: this._key, text: this._text,
            data: this._data, defaultValue: this._defaultValue,
            url: this._url
        };
    };

    CheckBox.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    CheckBox.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    CheckBox.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
        return this;
    };

    CheckBox.prototype.setKey = function (key) {
        this._key = key;
        return this;
    };

    CheckBox.prototype.setText = function (text) {
        this._text = text;
        return this;
    };

    CheckBox.prototype.setData = function (data) {
        this._data = data;
        return this;
    };

    CheckBox.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    CheckBox.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };

    Switch.prototype.exec = function() {
        return {
            type: this._type, title:  this._title,
            name: this._name, disabled: this._disabled,
            open: this._open, openText: this._openText,
            close: this._close, closeText: this._closeText,
            defaultValue: this._defaultValue
        };
    };

    Switch.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Switch.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    Switch.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    Switch.prototype.setClose= function (close) {
        this._close = close;
        return this;
    };

    Switch.prototype.setCloseText = function (closeText) {
        this._closeText = closeText;
        return this;
    };

    Switch.prototype.setOpen= function (open) {
        this._open = open;
        return this;
    };

    Switch.prototype.setOpenText = function (openText) {
        this._openText = openText;
        return this;
    };

    Switch.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    TextArea.prototype.exec = function() {
        return {
            type: this._type, title:  this._title,
            name: this._name, height: this._height,
            disabled: this._disabled, defaultValue: this._defaultValue,
        };
    };

    TextArea.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    TextArea.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    TextArea.prototype.setHeight = function (height) {
        this._height = height;
        return this;
    };

    TextArea.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    TextArea.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    Edit.prototype.exec = function() {
        return {
            type: this._type, title:  this._title,
            name: this._name, height: this._height,
            url: this._url, callBack: this._callBack
        };
    };

    Edit.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Edit.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    Edit.prototype.setHeight = function (height) {
        this._height = height;
        return this;
    };

    Edit.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };

    Edit.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
        return this;
    };

    Upload.prototype.exec = function() {
        return {type: this._type, title:  this._title, name: this._name,  callBack: this._callBack, url: this._url};
    };

    Upload.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    Upload.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    Upload.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
        return this;
    };

    Upload.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };

    SelectGroup.prototype.exec = function() {
        return {
            type: this._type, title:  this._title,
            name: this._name, disabled: this._disabled,
            key: this._key, text: this._text,
            data: this._data, defaultValue: this._defaultValue,
            url: this._url, callBack: this._callBack
        };
    };

    SelectGroup.prototype.setTitle = function(title) {
        this._title = title;
        return this;
    };

    SelectGroup.prototype.setName = function (name) {
        this._name = name;
        return this;
    };

    SelectGroup.prototype.setDisabled = function (disabled) {
        this._disabled = disabled;
        return this;
    };

    SelectGroup.prototype.setKey = function (key) {
        this._key = key;
        return this;
    };

    SelectGroup.prototype.setText = function (text) {
        this._text = text;
        return this;
    };

    SelectGroup.prototype.setData = function (data) {
        this._data = data;
        return this;
    };

    SelectGroup.prototype.setDefaultValue = function (defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    };

    SelectGroup.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };

    SelectGroup.prototype.setCallBack = function (callBack) {
        this._callBack = callBack;
        return this;
    };

    Response.prototype.exec = function() {
        return {
            statusName: this._statusName, statusCode: this._statusCode,
            msgName: this._msgName, countName: this._countName,
            dataName: this._dataName
        };
    }

    Response.prototype.setStatusName = function(statusName) {
        this._statusName = statusName;
    }

    Response.prototype.setStatusCode = function(statusCode) {
        this._statusCode = statusCode;
    }

    Response.prototype.setMsgName = function(msgName) {
        this._msgName = msgName;
    }

    Response.prototype.setCountName = function(countName) {
        this._countName = countName;
    }

    Response.prototype.setDataName = function(dataName) {
        this._dataName = dataName;
    }

    Config.prototype.setTableName = function(tableName) {
        this._tableName = tableName;
    }

    Config.prototype.setLimit = function(limit) {
        this._limit = limit;
    }

    Config.prototype.setTableFilter = function(tableFilter) {
        this._tableFilter = tableFilter;
    }

    Config.prototype.setWidth = function(width) {
        this._width = width;
    }

    Config.prototype.setHeight= function(height) {
        this._height = height;
    }

    Config.prototype.getTableName = function() {
        return this._tableName;
    }

    Config.prototype.getLimit = function() {
        return this._limit;
    }

    Config.prototype.getTableFilter = function() {
        return this._tableFilter;
    }

    Config.prototype.getWidth = function() {
        return this._width;
    }

    Config.prototype.getHeight= function() {
        return this._height;
    }

    //对外接口
    // exports('app', {Controller: Controller, Model: Model, Field: Field, Toolbar: Toolbar, FormField: FormField, Response: Response, Config: Config});

    let app = {
        controller: new Controller(),
        model: new Model(),
        field: new Field(),
        toolbar: new Toolbar(),
        formField: new FormField(),
        response: new Response(),
        config: new Config()
    };

    exports('app', app);

});