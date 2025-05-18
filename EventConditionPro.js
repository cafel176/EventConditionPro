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
 * @desc 当前事件页想要使用增强条件时，在事件页开头使用本指令，不想时关闭本指令，其他指令会自动失效
 * 
 * @arg enable
 * @text 是否启用
 * @desc 打开时完全不考虑RM原生的条件仅判断插件条件，关闭反之
 * @type boolean
 * @default true
 * 
 * 
 * 
 * @command condition
 * @text 条件
 * @desc 条件
 * 
 * @arg conditions
 * @text 条件列表
 * @type struct<Condition>[]
 * @default []
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

/*~struct~Condition:
 * @param name
 * @text 名称
 * @desc 本条件的比较结果会保存在这么一个名字的临时变量里以供取用
 * 
 * @param negative
 * @text 取反
 * @desc 对当前条件的结果取反
 * @type boolean
 * @default false
 * 
 * @param type
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
 * @param checkTarget1
 * @text 比较对象1
 * @desc 变量、开关、物品、角色请写序号，独立开关用名字，脚本直接写
 * 
 * @param checkType
 * @text 比较类型
 * @desc 比较类型，对于开关类，只分为等于和其他两种
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
 * @param checkTarget2
 * @text 比较对象2
 * @desc 比较相对的另一个对象，变量和开关请写序号，独立开关用名字
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

// 比较两个值
var EventConditionPro_Check = function (checkType, value1, value2) {
    if (checkType === "equal") {
        return value1 === value2;
    }
    else if (checkType === "notEqual") {
        return value1 !== value2;
    }
    else if (checkType === "Greater") {
        if (typeof value1 === "number") {
            return value1 > value2;
        }
        else {
            return value1 !== value2;
        }
    }
    else if (checkType === "Less") {
        if (typeof value1 === "number") {
            return value1 < value2;
        }
        else {
            return value1 !== value2;
        }
    }
    else if (checkType === "GreaterEqual") {
        if (typeof value1 === "number") {
            return value1 >= value2;
        }
        else {
            return value1 !== value2;
        }
    }
    else if (checkType === "LessEqual") {
        if (typeof value1 === "number") {
            return value1 <= value2;
        }
        else {
            return value1 !== value2;
        }
    }
    else {
        console.log("未识别的检查")
        return false
    }
}

var EventConditionPro_GetSwitchValue = function (event, page, str) {
    if (!str || str.length === 0) {
        console.log("错误的字符，无法识别为开关")
        return false
    }

    // 只有单个字符，判断是否是独立开关
    if (str.length === 1) {
        const char = str.charAt(0)
        // 大写A-Z
        if (char >= 65 && char <= 90) {
            const key = [event._mapId, event._eventId, str];
            return $gameSelfSwitches.value(key)
        }
        // 小写a-z
        else if (char >= 97 && char <= 122) {
            str = str.toUpperCase()
            const key = [event._mapId, event._eventId, str];
            return $gameSelfSwitches.value(key)
        }
    }   
    else {
        const char = str.charAt(0)
        const last = str.substring(1)
        // last是数字，判断是否是开关
        if (char === "s" && !isNaN(parseFloat(last)) && isFinite(last)) {
            const key = Number(last);
            return $gameSwitches.value(key)
        }
        
        // 判断是否是临时变量
        let re = EventConditionPro_GetTempValue(page, str)
        if (re !== null)
            return re

        // 判断是否是直接写的
        str = str.toLowerCase()
        if (str === "true") {
            return true
        }
        else if (str === "false") {
            return false
        }
    }

    console.log("无法识别的开关")
    return false
}

var EventConditionPro_GetVariableValue = function (event, page, str) {
    if (!str || str.length === 0) {
        console.log("错误的字符，无法识别为变量")
        return -1
    }

    if (str.length > 1) {
        const char = str.charAt(0)
        const last = str.substring(1)
        // last是数字，判断是否是变量
        if (char === "v" && !isNaN(parseFloat(last)) && isFinite(last)) {
            const key = Number(last);
            return $gameVariables.value(key)
        }
    }

    // 判断是否是临时变量
    let re = EventConditionPro_GetTempValue(page, str)
    if (re !== null)
        return re

    // 是数字
    if (!isNaN(parseFloat(str)) && isFinite(str)) {
        return Number(str)
    }

    console.log("无法识别的变量")
    return -1
}

// 处理条件逻辑
var EventConditionPro_ProcessPluginCommand = function (event, page, eventItem) {
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
        const conditions = JsonEx.parse(args.conditions);
        for (let i = 0; i < conditions.length; i++) {
            const condition = JsonEx.parse(conditions[i])

            const resultName = String(condition.name);
            const negative = (condition.negative === "true")
            const type = String(condition.type);
            const checkType = String(condition.checkType);

            if (type === "switch") {
                const checkTarget1 = Number(condition.checkTarget1);
                const value1 = $gameSwitches.value(checkTarget1)
                const value2 = EventConditionPro_GetSwitchValue(event, page, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                EventConditionPro_AddOrSetTempValue(page, resultName, (negative ? !re : re))
            }
            else if (type === "variable") {
                const checkTarget1 = Number(condition.checkTarget1);
                const value1 = $gameVariables.value(checkTarget1)
                const value2 = EventConditionPro_GetSwitchValue(event, page, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                EventConditionPro_AddOrSetTempValue(page, resultName, (negative ? !re : re))
            }
            else if (type === "selfSwitch") {
                const checkTarget1 = String(condition.checkTarget1);
                const key1 = [event._mapId, event._eventId, checkTarget1.toUpperCase()];
                const value1 = $gameSelfSwitches.value(key1)
                const value2 = EventConditionPro_GetSwitchValue(event, page, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                EventConditionPro_AddOrSetTempValue(page, resultName, (negative ? !re : re))
            }
            else if (type === "item") {
                const checkTarget1 = Number(condition.checkTarget1);
                if (checkTarget1 >= 0 && checkTarget1 < $dataItems.length) {
                    const item = $dataItems[checkTarget1];
                    const re = $gameParty.hasItem(item)
                    EventConditionPro_AddOrSetTempValue(page, resultName, (negative ? !re : re))
                }
            }
            else if (type === "actor") {
                const checkTarget1 = Number(condition.checkTarget1);
                const actor = $gameActors.actor(checkTarget1);
                const re = $gameParty.members().includes(actor)
                EventConditionPro_AddOrSetTempValue(page, resultName, (negative ? !re : re))
            }
            else if (type === "script") {
                const re = eval(condition.checkTarget1)
                EventConditionPro_AddOrSetTempValue(page, resultName, (negative ? !re : re))
            }
        }

        return true
    }
    else if (commandName === "variableCondition") {
        const resultName = String(args.name);

        return true
    }
    else if (commandName === "expression") {
        const resultName = String(args.name);
        const negative = (args.negative === "true")
        const operates = JsonEx.parse(args.operates);

        let result = true
        for (let i = 0; i < operates.length; i++) {
            const operate = JsonEx.parse(operates[i])

            const negative1 = (operate.negative1 === "true")
            const negative2 = (operate.negative2 === "true")
            const type = String(operate.type)
            const operateTarget = String(operate.operateTarget)

            if (negative1) {
                result = !result
            }

            let re = EventConditionPro_GetTempValue(page, operateTarget)
            re = (negative2 ? !re : re)
            if (type === "and") {
                result = (result && re)
            }
            else if (type === "or") {
                result = (result || re)
            }
        }
        EventConditionPro_AddOrSetTempValue(page, resultName, (negative ? !result : result))

        return true
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
var EventConditionPro_ProcessConditions = function (event, page, conditions) {
    for (let index = 0; index < conditions.length; ++index) {
        let re = EventConditionPro_ProcessPluginCommand(event, page, conditions[index])
        const commandName = conditions[index].parameters[1]
        if (commandName === "submit") {
            EventConditionPro_ClearTempValue(page)
            return re
        }
        else if (!re) {
            continue;
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
var EventConditionPro_Load = function (event, page) {
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
                    // 要考虑input，所以false下不能直接结束
                    if (EventConditionPro_ProcessPluginCommand(event, page, page.list[index])) {
                        Enable = true
                        page.EventConditionPro_Contions.push(page.list[index])
                    }
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
                EventConditionPro_Load($dataMap.events[i], $dataMap.events[i].pages[j]);
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
    EventConditionPro_Load(this, page);

    this.canParallel = true

    const Triggers = EventConditionPro_GetTriggers(page)
    if (Triggers && Triggers.length > 0 && this._trigger === 4) {
        // 暂时停止并行处理的自动触发
        this.canParallel = false
    }
}

// 并行处理的按键处理
var EventConditionPro_Game_Event_updateParallel = Game_Event.prototype.updateParallel;
Game_Event.prototype.updateParallel = function () {
    // 判断并行处理的自动触发
    if (this._trigger === 4 && !this.canParallel) {
        const page = this.page();
        const Triggers = EventConditionPro_GetTriggers(page)
        if (Triggers && Triggers.length > 0) {
            let Check = true
            for (let i = 0; i < Triggers.length; ++i) {
                if (!EventConditionPro_ProcessPluginCommand(this, page, Triggers[i])) {
                    Check = false
                    break
                }
            }
            if (Check) {
                this.canParallel = true
            }
        }
    }

    if (this.canParallel) {
        EventConditionPro_Game_Event_updateParallel.call(this)
    }

    // 判断并行处理的自动停止
    if (this._trigger === 4 && this.canParallel) {
        const page = this.page();
        const Triggers = EventConditionPro_GetTriggers(page)
        if (Triggers && Triggers.length > 0) {
            if (!this._interpreter.isRunning()) {
                this.canParallel = false
            }
        }
    }
}

// 条件处理
var EventConditionPro_Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function (page) {
    EventConditionPro_Load(this, page);

    const Contions = EventConditionPro_GetConditions(page)
    if (Contions && Contions.length > 0) {
        return EventConditionPro_ProcessConditions(this, page, Contions)
    }
    else {
        return EventConditionPro_Game_Event_meetsConditions.call(this, page)
    }
}