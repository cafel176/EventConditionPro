// ============================================================================= //
// EventConditionPro.js
// ============================================================================= //

/*:
 * @plugindesc 当前版本 V1
 * 事件页出现条件增强插件，适用于RMMZ和RMMV
 * @author cafel
 * @target MZ
 * @url https://github.com/cafel176/EventConditionPro
 * @help QQ群：792888538 欢迎反馈遇到的问题和希望支持的功能
 * 视频教程：
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @command enable
 * @text 当前事件页使用增强条件
 * @desc 当前事件页想要使用增强条件时，在事件页开头使用本指令，不想时删除本指令，其他指令会自动失效
 * 
 * @arg enable
 * @text 是否启用
 * @desc 是否启用
 * @type boolean
 * @default true
 * 
 * 
 * 
 * @command condition
 * @text 条件
 * @desc 条件
 * 
 * @arg name
 * @text 名称
 * @desc 本条件的比较结果会保存在这么一个名字的临时变量里以供取用
 * 
 * @arg negative
 * @text 取反
 * @desc 对当前条件的结果取反
 * @type boolean
 * @default false
 * 
 * @arg type
 * @text 条件类型
 * @desc 条件类型
 * @type select
 * 
 * @option 开关
 * @value switch
 * @option 变量
 * @value variable
 * @option 独立开关
 * @value selfSwitch
 * @option 物品
 * @value item
 * @option 角色
 * @value actor
 * @option 脚本
 * @value script
 * 
 * @arg checkType
 * @text 比较类型
 * @desc 比较类型，对于非变量类，只分为等于和其他两种
 * @type select
 * 
 * @option 等于
 * @value equal
 * @option 不等于
 * @value notEqual
 * @option 大于
 * @value Greater
 * @option 小于
 * @value Less
 * @option 大于等于
 * @value GreaterEqual
 * @option 小于等于
 * @value LessEqual
 * 
 * @arg checkTarget
 * @text 比较对象
 * @desc 比较相对的另一个对象，变量和开关请写序号，独立开关用名字
 * 
 * 
 * 
 * @command variableCondition
 * @text 变量组合条件
 * @desc 变量组合条件
 * 
 * @arg name
 * @text 名称
 * @desc 本条件的比较结果会保存在这么一个名字的临时变量里以供取用
 * 
 * @arg negative
 * @text 取反
 * @desc 对当前条件的结果取反
 * @type boolean
 * @default false
 * 
 * @arg variables1
 * @text 变量列表1
 * @type struct<VariableList>
 * @default []
 * 
 * @arg checkType
 * @text 比较类型
 * @desc 比较类型
 * @type select
 * 
 * @option 等于
 * @value equal
 * @option 不等于
 * @value notEqual
 * @option 大于
 * @value Greater
 * @option 小于
 * @value Less
 * @option 大于等于
 * @value GreaterEqual
 * @option 小于等于
 * @value LessEqual
 * 
 * @arg variables2
 * @text 变量列表2
 * @type struct<VariableList>
 * @default []
 * 
 * 
 * 
 * @command expression
 * @text 条件运算
 * @desc 通过条件名字对他们进行运算
 * 
 * @arg name
 * @text 名称
 * @desc 本运算的结果会保存在这么一个名字的临时变量里以供取用
 * 
 * @arg negative
 * @text 取反
 * @desc 对当前运算的结果取反
 * @type boolean
 * @default false
 * 
 * @arg operates
 * @text 操作列表
 * @type struct<Operate>[]
 * @default []
 * 
 * 
 * 
 * @command submit
 * @text 提交结果
 * @desc 提交结果
 * 
 * @arg name
 * @text 名称
 * @desc 将这么一个名字的临时变量的值提交作为事件页条件判断的结果
 * 
 * 
 * 
 * @command log
 * @text 输出
 * @desc 输出
 * 
 * @arg name
 * @text 名称
 * @desc 输出这么一个名字的临时变量的值以供调试
 * 
 * 
 * 
 * @command input
 * @text 触发按键
 * @desc 触发按键
 * 
 * @arg keyCode
 * @text 按键KeyCode
 * @desc 将事件触发条件的并行处理增加一个按键判断
 * @type number
 * 
 */

/*~struct~VariableList:
 * @param variables
 * @text 变量列表
 * @type struct<VariableInfo>[]
 * @default []
 * 
 * @param type
 * @text 变量组合类型
 * @desc 变量组合类型
 * @type select
 * 
 * @option 求和
 * @value sum
 * @option 最大
 * @value max
 * @option 最小
 * @value min
 */

/*~struct~VariableInfo:
 * @param index
 * @text 变量序号
 * @desc 变量序号
 * @type number
 * 
 */

/*~struct~Operate:
 * @param negative1
 * @text 取反
 * @desc 对当前的值取反
 * @type boolean
 * @default false
 * 
 * @param type
 * @text 操作类型
 * @desc 操作类型
 * @type select
 * 
 * @option 与
 * @value and
 * @option 或
 * @value or
 * 
 * @param negative2
 * @text 取反
 * @desc 对操作对象的值取反
 * @type boolean
 * @default false
 * 
 * @param operateTarget
 * @text 操作对象
 * @desc 操作对象，请写条件名称
 * 
 */

var EventConditionPro = EventConditionPro || {};
EventConditionPro.param = PluginManager.parameters('EventConditionPro');

// ============================================================================= //
// 插件指令
// ============================================================================= //
// 获取临时变量
var EventConditionPro_GetTempValue = function (page, name) {
    if (('EventConditionPro_TempValues' in page) && page.EventConditionPro_TempValues) {
        if (name in page.EventConditionPro_TempValues) {
            return page.EventConditionPro_TempValues[name]
        }
    }
    return null
}

// 创建或设置临时变量
var EventConditionPro_AddOrSetTempValue = function (page, name, value) {
    if (!('EventConditionPro_TempValues' in page) || !page.EventConditionPro_TempValues) {
        page.EventConditionPro_TempValues = {}
    }

    page.EventConditionPro_TempValues[name] = value
}

// 清空临时变量
var EventConditionPro_ClearTempValue = function (page) {
    page.EventConditionPro_TempValues = {}
}

// 处理条件逻辑
var EventConditionPro_ProcessPluginCommand = function (page, eventItem) {
    if (!eventItem) {
        console.log("条件为空，跳过")
        return null
    }

    const commandName = eventItem.parameters[1]
    const args = eventItem.parameters[3]
    if (commandName === "enable") {
        return args.enable === "true"
    }
    else if (commandName === "condition") {
        const resultName = String(args.name);

        return true
    }
    else if (commandName === "variableCondition") {
        const resultName = String(args.name);

        return true
    }
    else if (commandName === "expression") {
        const resultName = String(args.name);

        return 
    }
    else if (commandName === "submit") {
        const name = String(args.name);
        return EventConditionPro_GetTempValue(page, name)
    }
    else if (commandName === "log") {
        const name = String(args.name);
        console.log(name + "：" + EventConditionPro_GetTempValue(page, name))
        return true
    }
    else if (commandName === "input") {
        const keyCode = Number(args.keyCode);
        if (!(keyCode in Input.keyMapper)) {
            Input.keyMapper[keyCode] = String(keyCode);
        }
        return Input.isTriggered(String(keyCode))
    }

    console.log("未识别的指令，跳过")
    return null
}

// 获取所有的条件指令
var EventConditionPro_GetConditions = function (page) {
    if (!('EventConditionPro_Contions' in page) || !page.EventConditionPro_Contions) {
        page.EventConditionPro_Contions = []
    }

    return page.EventConditionPro_Contions
}

// 处理条件逻辑
var EventConditionPro_ProcessConditions = function (page, conditions) {
    for (let index = 0; index < conditions.length; ++index) {
        let re = EventConditionPro_ProcessPluginCommand(page, conditions[index])
        if (!re) {
            continue;
        }

        const commandName = conditions[index].parameters[1]
        if (commandName === "submit") {
            EventConditionPro_ClearTempValue(page)
            return re
        }
    }

    EventConditionPro_ClearTempValue(page)
    return false
}

// 获取所有的按键触发指令
var EventConditionPro_GetTriggers = function (page) {
    if (!('EventConditionPro_Triggers' in page) || !page.EventConditionPro_Triggers) {
        page.EventConditionPro_Triggers = []
    }

    // 并行处理时处理
    if (page.trigger === 4) {
        return page.EventConditionPro_Triggers
    } 

    return null
}

// 加载时将插件指令归类
var EventConditionPro_Load = function (page) {
    page.EventConditionPro_Contions = []
    page.EventConditionPro_Triggers = []

    let Enable = false
    for (let index = 0; index < page.list.length; ++index) {
        // 当前事件是否是插件指令
        if (page.list[index].code === 357) {
            const pluginName = page.list[index].parameters[0]
            // 检查是否是当前插件
            if (pluginName.includes("EventConditionPro")) {
                const pluginCommand = page.list[index].parameters[1]
                // 是enbale
                if (pluginCommand === "enable") {
                    if (!EventConditionPro_ProcessPluginCommand(page, page.list[index])) {
                        page.EventConditionPro_Contions = []
                        page.EventConditionPro_Triggers = []
                        return page;
                    }
                    Enable = true
                    page.EventConditionPro_Contions.push(page.list[index])
                }
                // 是input
                else if (pluginCommand === "input") {
                    page.EventConditionPro_Triggers.push(page.list[index])
                }
                else {
                    page.EventConditionPro_Contions.push(page.list[index])
                }
            }
        }
    }
    if (!Enable) {
        page.EventConditionPro_Contions = []
        page.EventConditionPro_Triggers = []
        return page;
    }

    return page;
}

// ============================================================================= //
// 对所有的事件页进行处理，将其中的插件指令转化为对应的条件
// ============================================================================= //

var EventConditionPro_DataManager_loadDataFile = DataManager.loadDataFile;
DataManager.loadDataFile = function (name, src) {
    if (Utils.RPGMAKER_NAME === 'MV') {
        // MV下需要接管xhr
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        // 更改onload为绑定到onXhrLoad
        xhr.onload = () => this.onXhrLoad(xhr, name, src, url);
        xhr.onerror = this._mapLoader || function () {
            DataManager._errorUrl = DataManager._errorUrl || url;
        };
        window[name] = null;
        xhr.send();
    }
    else if (Utils.RPGMAKER_NAME === 'MZ') {
        EventConditionPro_DataManager_loadDataFile.call(this, name, src);
    }
}

// 加载的是$dataMap
var EventConditionPro_loadDataMap = false
var EventConditionPro_DataManager_onXhrLoad = DataManager.onXhrLoad;
DataManager.onXhrLoad = function (xhr, name, src, url) {
    // 对$dataMap做标记处理
    if (name == "$dataMap") {
        EventConditionPro_loadDataMap = true;
    }
    if (Utils.RPGMAKER_NAME === 'MV') {
        // MV的xhr.onload
        if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);
            DataManager.onLoad(window[name]);
        }
    }
    else if (Utils.RPGMAKER_NAME === 'MZ') {
        EventConditionPro_DataManager_onXhrLoad.call(this, xhr, name, src, url);
    }
}

// 读档时根据文件进行数据更新
var EventConditionPro_DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function (object) {
    EventConditionPro_DataManager_onLoad.call(this, object);

    if (EventConditionPro_loadDataMap) {
        // 对用于数据的事件全部进行注释处理
        for (let i = $dataMap.events.length - 1; i >= 0; --i) {
            if (!$dataMap.events[i])
                continue;

            for (let j = $dataMap.events[i].pages.length - 1; j >= 0; --j) {
                EventConditionPro_Load($dataMap.events[i].pages[j]);
            }
        }

        EventConditionPro_loadDataMap = false;
    }

}

// ============================================================================= //
// 对事件做处理，加入条件和触发的判断
// ============================================================================= //
// 并行处理的按键处理
var EventConditionPro_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings
Game_Event.prototype.setupPageSettings = function () {
    EventConditionPro_Game_Event_setupPageSettings.call(this)

    const page = this.page();
    const Triggers = EventConditionPro_GetTriggers(page)
    if (Triggers && Triggers.length > 0) {
        // 暂时停止并行处理的自动触发
        this._interpreter = null;
    }
}

// 并行处理的按键处理
var EventConditionPro_Game_Event_updateParallel = Game_Event.prototype.updateParallel;
Game_Event.prototype.updateParallel = function () {
    // 判断并行处理的自动触发
    if (!this._interpreter && this._trigger === 4) {
        const page = this.page();
        const Triggers = EventConditionPro_GetTriggers(page)
        if (Triggers && Triggers.length > 0) {
            let Check = true
            for (let i = 0; i < Triggers.length; ++i) {
                if (!EventConditionPro_ProcessPluginCommand(page, Triggers[i])) {
                    Check = false
                    break
                }
            };
            if (Check) {
                this._interpreter = new Game_Interpreter();
            }
        }
    }

    EventConditionPro_Game_Event_updateParallel.call(this)

    // 判断并行处理的自动停止
    if (this._interpreter && this._trigger === 4) {
        const page = this.page();
        const Triggers = EventConditionPro_GetTriggers(page)
        if (Triggers && Triggers.length > 0) {
            if (!this._interpreter.isRunning()) {
                this._interpreter = null
            }
        }
    }
}

// 条件处理
var EventConditionPro_Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function (page) {
    const Contions = EventConditionPro_GetConditions(page)
    if (Contions && Contions.length > 0) {
        return EventConditionPro_ProcessConditions(page, Contions)
    }
    else {
        return EventConditionPro_Game_Event_meetsConditions.call(this, page)
    }
}