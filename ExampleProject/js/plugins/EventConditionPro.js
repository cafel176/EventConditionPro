// ============================================================================= //
// EventConditionPro.js
// ============================================================================= //

/*:
 * @plugindesc 当前版本 V1
 * 逻辑和运算增强插件，适用于RMMZ和RMMV
 * @author cafel
 * @target MZ
 * @url https://github.com/cafel176/EventConditionPro
 * @help QQ群：792888538 欢迎反馈遇到的问题和希望支持的功能
 * 视频教程：
 * 
 * 
 * 
 * ★ 本插件提供如下支持：
 * 
 * 1. 支持通过插件指令进行各种复杂的逻辑和数值运算
 *    ♦ 通过变量指令进行数值运算，得到数值结果
 *    ♦ 通过条件指令进行逻辑判断，得到bool结果
 *    ♦ 通过运算指令组合bool结果，得到复合结果
 *    ♦ 得到的结果可用于事件出现条件和条件分歧，或者直接存回RM变量或开关
 * 
 * 2. 支持自定义任意复杂的事件出现条件
 * 
 * 3. 支持自定义任意复杂的逻辑用于条件分歧
 * 
 * 4. 对于并行处理，支持定义任意按键触发
 * 
 * 5. 支持 A-Z 26个独立开关
 * 
 * 
 * 
 * ★ 指令参数：
 * 
 * 1. [开关]：开关类参数允许以下类型：
 *    ♦ 单个字母A-Z：独立开关
 *    ♦ 以字母s开头，后面接序号，如s31：RM开关
 *    ♦ 临时变量名字，如temp：临时变量
 *    ♦ 直接写true，或者false
 * 
 * 2. [变量]：变量类参数允许以下类型：
 *    ♦ 以字母v开头，后面接序号，如v31：RM变量
 *    ♦ 临时变量名字，如temp：临时变量
 *    ♦ 直接写数值
 * 
 * 3. [序号]：序号类参数一定需要是正整数，对应相应序号
 * 
 * 4. [名字]：名字类参数一定需要是字符串，对应相应名字
 * 
 * 
 * 
 * ★ 插件指令：
 * 
 * 1. 当前事件页使用出现条件：让事件页使用自定义出现条件，要在事件页开头设置一个本指令并将参数设置为true
 *    设置了本指令的事件页会完全使用自定义条件忽略RM原生条件，关闭则反之
 *    设置好后，当前事件页所有带有 (用于出现条件) 的指令都会被纳入考量，不用时关闭本指令即可，无需大量删除
 * 
 * 2. 条件(用于出现条件)：通过条件列表设置一组[开关]，每一条的结果支持保存供后续取用
 *    ♦ 结果：写[开关]，比较结果会保存在这里，留空为不保存
 *    ♦ 取反：对当前条件的结果取反
 *    ♦ 条件类型
 *    ♦ 比较对象1的结果：临时变量，写[开关]或[变量]，比较对象1的值会保存在这里，留空为不保存
 *    ♦ 比较对象1：开关、变量、物品、武器、防具、事件朝向/位置(玩家为-1，当前事件为0)、角色、按键用[序号]，临时变量、独立开关用[名字]，脚本直接写，金币和时间不用写
 *    ♦ 比较类型：开关类只分为等于和其他两种，物品、武器、防具、金币、时间、事件朝向比较值，角色、按键、脚本不写
 *    ♦ 比较对象2：开关类写[开关]，变量类和物品、武器、防具、金币、时间、事件位置写[变量]，按键写触发类型(Triggered、Repeated、其他都为Pressed)，事件朝向写方向(下、左、右、上)、角色、脚本不写
 * 
 * 3. 条件(用于事件)：功能同上，但是用于事件页内
 * 
 * 4. 变量(用于出现条件)：通过变量列表设置一组[变量]，每一条的结果支持保存供后续取用
 *    ♦ 结果：写[变量]，运算结果会保存在这里
 *    ♦ 运算对象1取负数
 *    ♦ 运算对象1：写[变量]，随机数是较小值，脚本直接写
 *    ♦ 运算类型
 *    ♦ 运算对象2取负数
 *    ♦ 运算对象2：写[变量]，随机数是较大值，脚本不写
 * 
 * 5. 变量(用于事件)：功能同上，但是用于事件页内
 * 
 * 6. 运算(用于出现条件)：对一组[开关]进行逻辑组合，每一条的结果支持保存供后续取用
 *    ♦ 结果：写[开关]，运算结果会保存在这里
 *    ♦ 运算对象1取反
 *    ♦ 运算对象1：写[开关]
 *    ♦ 操作类型
 *    ♦ 运算对象2取反
 *    ♦ 运算对象2：写[开关]
 * 
 * 7. 运算(用于事件)：功能同上，但是用于事件页内
 * 
 * 8. 输出(用于出现条件)：将一个临时变量的值输出到控制台
 * 
 * 9. 输出(用于事件)：功能同上，但是用于事件页内
 * 
 * 10. 提交结果(用于出现条件)：将一个临时变量作为事件页的出现条件的最终判定结果提交
 * 
 * 11. 提交结果(用于事件)：功能同上，但是用于事件页内
 * 
 * 12. 清空临时变量(用于事件)：事件页内执行运算时，为保证临时变量不互相影响，可用本指令清除之前的变量
 * 
 * 13. 独立开关(用于事件)：用本指令可以设置超过D的独立开关
 * 
 * 14. 触发按键(用于触发条件)：在并行处理的事件页内使用，可以自定义按键来触发事件
 * 
 * 
 * 
 * @command enable
 * @text 当前事件页使用出现条件
 * @desc 让事件页使用自定义出现条件，要在事件页开头设置一个本指令并将参数设置为true
 * 设置了本指令的事件页会完全使用自定义条件忽略RM原生条件，关闭则反之
 * 设置好后，当前事件页所有带有 (用于出现条件) 的指令都会被纳入考量，不用时关闭本指令即可，无需大量删除
 * 
 * @arg enable
 * @text 是否启用
 * @desc 打开时，忽略RM原生条件仅判断插件条件，关闭则反之
 * @type boolean
 * @default true
 * 
 * 
 * 
 * @command condition
 * @text 条件(用于出现条件)
 * @desc 通过条件列表设置一组[开关]，每一条的结果支持保存供后续取用
 * 
 * @arg conditions
 * @text 条件列表
 * @type struct<Condition>[]
 * @default []
 * 
 * @command condition_event
 * @text 条件(用于事件)
 * @desc 通过条件列表设置一组[开关]，每一条的结果支持保存供后续取用
 * 
 * @arg conditions
 * @text 条件列表
 * @type struct<Condition>[]
 * @default []
 * 
 * 
 * 
 * @command variable
 * @text 变量(用于出现条件)
 * @desc 通过变量列表设置一组[变量]，每一条的结果支持保存供后续取用
 * 
 * @arg variables
 * @text 变量列表
 * @type struct<Variable>[]
 * @default []
 * 
 * @command variable_event
 * @text 变量(用于事件)
 * @desc 通过变量列表设置一组[变量]，每一条的结果支持保存供后续取用
 * 
 * @arg variables
 * @text 变量列表
 * @type struct<Variable>[]
 * @default []
 * 
 * 
 * 
 * @command expression
 * @text 运算(用于出现条件)
 * @desc 对一组[开关]进行逻辑组合，每一条的结果支持保存供后续取用
 * 
 * @arg operates
 * @text 运算列表
 * @type struct<Operate>[]
 * @default []
 * 
 * @command expression_event
 * @text 运算(用于事件)
 * @desc 对一组[开关]进行逻辑组合，每一条的结果支持保存供后续取用
 * 
 * @arg operates
 * @text 运算列表
 * @type struct<Operate>[]
 * @default []
 * 
 * 
 * 
 * @command log
 * @text 输出(用于出现条件)
 * @desc 将一个临时变量的值输出到控制台
 * 
 * @arg name
 * @text 名称
 * @desc 输出这么一个名字的临时变量的值以供调试
 * 
 * @command log_event
 * @text 输出(用于事件)
 * @desc 将一个临时变量的值输出到控制台
 * 
 * @arg name
 * @text 名称
 * @desc 输出这么一个名字的临时变量的值以供调试
 * 
 * 
 * 
 * @command submit
 * @text 提交结果(用于出现条件)
 * @desc 将一个临时变量作为事件页的出现条件的最终判定结果提交
 * 
 * @arg name
 * @text 名称
 * @desc 将这么一个名字的临时变量的值提交作为事件页出现条件判断的结果
 * 
 * @command submit_event
 * @text 提交结果(用于事件)
 * @desc 将一个临时变量作为条件的最终判定结果提交
 * 
 * @arg name
 * @text 名称
 * @desc 将这么一个名字的临时变量的值提交作为条件判断的结果
 * 
 * 
 * 
 * @command clear
 * @text 清空临时变量(用于事件)
 * @desc 事件页内执行运算时，为保证临时变量不互相影响，可用本指令清除之前的变量
 * 
 * 
 * 
 * @command selfSwitch
 * @text 独立开关(用于事件)
 * @desc 用本指令可以设置超过D的独立开关
 * 
 * @arg type
 * @text 开关
 * @desc 开关
 * @type select
 * 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * 
 * @arg value
 * @text 取值
 * @desc 
 * @type boolean
 * @default true
 * 
 * 
 * 
 * @command input
 * @text 触发按键(用于触发条件)
 * @desc 在并行处理的事件页内使用，可以自定义按键来触发事件
 * 
 * @arg keyCode
 * @text 按键KeyCode
 * @desc 按键的KeyCode，可通过百度获取，如R键为82
 * @type number
 * 
 * @arg type
 * @text 触发类型
 * @desc 触发类型
 * @type select
 * 
 * @option 被按下
 * @value Pressed
 * @option 被触发
 * @value Triggered
 * @option 被重复
 * @value Repeated
 */

/*~struct~Condition:
 * @param name
 * @text 结果
 * @desc 写[开关]，比较结果会保存在这里，留空为不保存
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
 * @option 临时变量(开关)
 * @value tempSwicth
 * @option 临时变量(变量)
 * @value tempVariable
 * @option 开关
 * @value switch
 * @option 变量
 * @value variable
 * @option 独立开关
 * @value selfSwitch
 * @option 时间
 * @value timer
 * @option 物品
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @option 金币
 * @value gold
 * @option 事件朝向
 * @value direction
 * @option 事件位置X
 * @value positionX
 * @option 事件位置Y
 * @value positionY
 * @option 角色
 * @value actor
 * @option 按键
 * @value input
 * @option 脚本
 * @value script
 * 
 * @param checkTarget1Name
 * @text 比较对象1的结果
 * @desc 临时变量，写[开关]或[变量]，比较对象1的值会保存在这里，留空为不保存
 * 
 * @param checkTarget1
 * @text 比较对象1
 * @desc 开关、变量、物品、武器、防具、事件朝向/位置(玩家为-1，当前事件为0)、角色、按键用[序号]，临时变量、独立开关用[名字]，脚本直接写，金币和时间不用写
 * 
 * @param checkType
 * @text 比较类型
 * @desc 比较类型，开关类只分为等于和其他两种，物品、武器、防具、金币、时间、事件朝向比较值，角色、按键、脚本不写
 * @type select
 * @default equal
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
 * @desc 开关类写[开关]，变量类和物品、武器、防具、金币、时间、事件位置写[变量]，按键写触发类型(Triggered、Repeated、其他都为Pressed)，事件朝向写方向(下、左、右、上)、角色、脚本不写
 */

/*~struct~Variable:
 * @param name
 * @text 结果
 * @desc 写[变量]，运算结果会保存在这里
 * 
 * @param negative1
 * @text 运算对象1取负数
 * @desc 对运算对象1取负数
 * @type boolean
 * @default false
 * 
 * @param checkTarget1
 * @text 运算对象1
 * @desc 写[变量]，随机数是较小值，脚本直接写
 * 
 * @param checkType
 * @text 运算类型
 * @desc 运算类型
 * @type select
 * @default add
 * 
 * @option 加
 * @value add
 * @option 减
 * @value minus
 * @option 乘
 * @value multiple
 * @option 除
 * @value divide
 * @option 膜
 * @value mod
 * @option 取幂
 * @value exponentiation
 * @option 取大
 * @value max
 * @option 取小
 * @value min
 * @option 随机数
 * @value random
 * @option 脚本
 * @value script
 * 
 * @param negative2
 * @text 运算对象2取负数
 * @desc 对运算对象2取负数
 * @type boolean
 * @default false
 * 
 * @param checkTarget2
 * @text 运算对象2
 * @desc 写[变量]，随机数是较大值，脚本不写
 * 
 */

/*~struct~Operate:
 * @param name
 * @text 结果
 * @desc 写[开关]，运算结果会保存在这里
 * 
 * @param negative1
 * @text 运算对象1取反
 * @desc 对运算对象1取反
 * @type boolean
 * @default false
 * 
 * @param checkTarget1
 * @text 运算对象1
 * @desc 写[开关]
 * 
 * @param checkType
 * @text 操作类型
 * @desc 操作类型
 * @type select
 * @default and
 * 
 * @option 与
 * @value and
 * @option 或
 * @value or
 * 
 * @param negative2
 * @text 运算对象2取反
 * @desc 对运算对象2取反
 * @type boolean
 * @default false
 * 
 * @param checkTarget2
 * @text 运算对象2
 * @desc 写[开关]
 * 
 */

// ============================================================================= //
// 插件参数
// ============================================================================= //

var EventConditionPro = EventConditionPro || {};
EventConditionPro.pluginName = "EventConditionPro"
EventConditionPro.param = PluginManager.parameters(EventConditionPro.pluginName);
// 出现条件
EventConditionPro.appearCondition = ["condition", "variable", "expression", "log", "submit"]
// 触发条件
EventConditionPro.triggers = ["input"]

// ============================================================================= //
// 插件指令，用于事件页，this指向Game_Interpreter
// ============================================================================= //

// 保存上一次运算的结果
var EventConditionPro_LastResult = null

// 条件
PluginManager.registerCommand(EventConditionPro.pluginName, "condition_event", function (args) {
    EventConditionPro_ProcessPluginCommand(this, this, this.currentCommand())
});

// 变量
PluginManager.registerCommand(EventConditionPro.pluginName, "variable_event", function (args) {
    EventConditionPro_ProcessPluginCommand(this, this, this.currentCommand())
});

// 运算
PluginManager.registerCommand(EventConditionPro.pluginName, "expression_event", function (args) {
    EventConditionPro_ProcessPluginCommand(this, this, this.currentCommand())
});

// 输出
PluginManager.registerCommand(EventConditionPro.pluginName, "log_event", function (args) {
    EventConditionPro_ProcessPluginCommand(this, this, this.currentCommand())
});

// 提交
PluginManager.registerCommand(EventConditionPro.pluginName, "submit_event", function (args) {
    EventConditionPro_LastResult = EventConditionPro_ProcessPluginCommand(this, this, this.currentCommand())
    // 清除临时变量
    EventConditionPro_ClearTempValue(this)
});

// 清空
PluginManager.registerCommand(EventConditionPro.pluginName, "clear", function (args) {
    EventConditionPro_ClearTempValue(this)
});

// 独立开关
PluginManager.registerCommand(EventConditionPro.pluginName, "selfSwitch", function (args) {
    if (this._eventId > 0) {
        const type = String(args.type);
        const value = (args.value === "true");

        const key = [this._mapId, this._eventId, type];
        $gameSelfSwitches.setValue(key, value);
    }
});

// 用于脚本的函数，获取上一次运算的结果
var EventConditionPro_GetLastResult = function () {
    let temp = EventConditionPro_LastResult
    EventConditionPro_LastResult = null
    return temp
}

// ============================================================================= //
// 临时变量逻辑
// ============================================================================= //

// 获取临时变量
var EventConditionPro_GetTempValue = function (outer, name) {
    if (!outer)
        return null

    if (('EventConditionPro_TempValues' in outer) && outer.EventConditionPro_TempValues) {
        if (name in outer.EventConditionPro_TempValues) {
            return outer.EventConditionPro_TempValues[name]
        }
    }
    // 找不到返回null
    return null
}

// 创建或设置临时变量
var EventConditionPro_AddOrSetTempValue = function (outer, name, value) {
    if (!outer)
        return false

    if (!('EventConditionPro_TempValues' in outer) || !outer.EventConditionPro_TempValues) {
        outer.EventConditionPro_TempValues = {}
    }

    outer.EventConditionPro_TempValues[name] = value
    return true
}

// 清空临时变量
var EventConditionPro_ClearTempValue = function (outer) {
    if (!outer)
        return

    outer.EventConditionPro_TempValues = {}
}

// ============================================================================= //
// 取值逻辑
// ============================================================================= //
// 获取事件名
var EventConditionPro_GetEventName = function (event) {
    // 公共事件
    if (!('_eventId' in event)) {
        return $dataCommonEvents[event._commonEventId].name
    }
    return $dataMap.events[event._eventId].name
}

// [开关]，无法识别返回false
var EventConditionPro_GetSwitchValue = function (event, outer, str) {
    if (!str || str.length === 0) {
        console.log(EventConditionPro_GetEventName(event) + " " + "错误的字符，无法识别为开关")
        return false
    }

    // 只有单个字符，判断是否是独立开关
    if (str.length === 1) {
        const charIndex = str.charCodeAt(0)
        // 大写A-Z
        if (charIndex >= 65 && charIndex <= 90) {
            const key = [event._mapId, event._eventId, str];
            return $gameSelfSwitches.value(key)
        }
        // 小写a-z
        else if (charIndex >= 97 && charIndex <= 122) {
            str = str.toUpperCase()
            const key = [event._mapId, event._eventId, str];
            return $gameSelfSwitches.value(key)
        }
    }   
    else {
        const char = str.charAt(0)
        const last = str.substring(1)
        const num = EventConditionPro_GetIndex(last)
        // last是数字，判断是否是开关
        if ((char === "s" || char === "S") && !isNaN(num) && isFinite(num)) {
            return $gameSwitches.value(num)
        }
        
        // 判断是否是临时变量
        let re = EventConditionPro_GetTempValue(outer, EventConditionPro_GetName(str))
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

    console.log(EventConditionPro_GetEventName(event) + " " + "无法识别的开关：" + str)
    return false
}

// [开关]，无法识别返回false
var EventConditionPro_SetSwitchValue = function (event, outer, str, value) {
    if (!str || str.length === 0) {
        console.log(EventConditionPro_GetEventName(event) + " " + "错误的字符，无法识别为开关")
        return false
    }

    // 只有单个字符，判断是否是独立开关
    if (str.length === 1) {
        const charIndex = str.charCodeAt(0)
        // 大写A-Z
        if (charIndex >= 65 && charIndex <= 90) {
            const key = [event._mapId, event._eventId, str];
            $gameSelfSwitches.setValue(key, value);
            return true
        }
        // 小写a-z
        else if (charIndex >= 97 && charIndex <= 122) {
            str = str.toUpperCase()
            const key = [event._mapId, event._eventId, str];
            $gameSelfSwitches.setValue(key, value);
            return true
        }
    }
    else {
        const char = str.charAt(0)
        const last = str.substring(1)
        const num = EventConditionPro_GetIndex(last)
        // last是数字，判断是否是开关
        if ((char === "s" || char === "S") && !isNaN(num) && isFinite(num)) {
            $gameSwitches.setValue(num, value)
            return true
        }

        // 判断是否是临时变量
        let re = EventConditionPro_AddOrSetTempValue(outer, EventConditionPro_GetName(str), value)
        if (re)
            return re
    }

    console.log(EventConditionPro_GetEventName(event) + " " + "无法识别的开关：" + str)
    return false
}

// [变量]，无法识别返回-1
var EventConditionPro_GetVariableValue = function (event, outer, str) {
    if (!str || str.length === 0) {
        console.log(EventConditionPro_GetEventName(event) + " " + "错误的字符，无法识别为变量")
        return -1
    }

    if (str.length > 1) {
        const char = str.charAt(0)
        const last = str.substring(1)
        const num = EventConditionPro_GetIndex(last)
        // last是数字，判断是否是变量
        if ((char === "v" || char === "V") && !isNaN(num) && isFinite(num)) {
            return $gameVariables.value(num)
        }
    }

    // 判断是否是临时变量
    let re = EventConditionPro_GetTempValue(outer, EventConditionPro_GetName(str))
    if (re !== null)
        return re

    // 是数字
    const num = Number(str)
    if (!isNaN(num) && isFinite(num)) {
        return num
    }

    console.log(EventConditionPro_GetEventName(event) + " " + "无法识别的变量：" + str)
    return -1
}

// [变量]，无法识别返回false
var EventConditionPro_SetVariableValue = function (event, outer, str, value) {
    if (!str || str.length === 0) {
        console.log(EventConditionPro_GetEventName(event) + " " + "错误的字符，无法识别为变量")
        return false
    }

    if (str.length > 1) {
        const char = str.charAt(0)
        const last = str.substring(1)
        const num = EventConditionPro_GetIndex(last)
        // last是数字，判断是否是变量
        if ((char === "v" || char === "V") && !isNaN(num) && isFinite(num)) {
            $gameVariables.setValue(num, value);
            return true
        }
    }

    // 判断是否是临时变量
    let re = EventConditionPro_AddOrSetTempValue(outer, EventConditionPro_GetName(str), value)
    if (re)
        return re

    console.log(EventConditionPro_GetEventName(event) + " " + "无法识别的变量：" + str)
    return false
}

// [序号]
var EventConditionPro_GetIndex = function (index) {
    return Number(index)
}

// [名字]
var EventConditionPro_GetName = function (name) {
    return String(name)
}

// ============================================================================= //
// 比较和运算逻辑
// ============================================================================= //

// 比较和运算两个值
var EventConditionPro_Check = function (checkType, value1, value2) {
    // 等于
    if (checkType === "equal") {
        return value1 === value2;
    }
    // 不等于
    else if (checkType === "notEqual") {
        return value1 !== value2;
    }
    // 与
    else if (checkType === "and") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return false;
        }
        else {
            return value1 && value2;
        }
    }
    // 或
    else if (checkType === "or") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return false;
        }
        else {
            return value1 || value2;
        }
    }
    // 大于
    else if (checkType === "Greater") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 > value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 小于
    else if (checkType === "Less") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 < value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 大于等于
    else if (checkType === "GreaterEqual") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 >= value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 小于等于
    else if (checkType === "LessEqual") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 <= value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 加
    else if (checkType === "add") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 + value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 减
    else if (checkType === "minus") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 - value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 乘
    else if (checkType === "multiple") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 * value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 除
    else if (checkType === "divide") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 / value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 膜
    else if (checkType === "mod") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 % value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 取幂
    else if (checkType === "exponentiation") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value1 ** value2;
        }
        else {
            return value1 !== value2;
        }
    }
    // 取大
    else if (checkType === "max") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return Math.max(value1, value2);
        }
        else {
            return value1 !== value2;
        }
    }
    // 取小
    else if (checkType === "min") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return Math.min(value1, value2);
        }
        else {
            return value1 !== value2;
        }
    }
    // 随机数
    else if (checkType === "random") {
        if (typeof value1 === "number" && typeof value2 === "number") {
            randomMax = value2 - value1 + 1;
            randomMax = Math.max(randomMax, 1);
            return value1 + Math.randomInt(randomMax);
        }
        else {
            return value1 !== value2;
        }
    }
    else {
        console.log("未识别的检查：" + String(value1) + ", " + String(value2))
        return null
    }
}

// 处理条件逻辑
var EventConditionPro_ProcessPluginCommand = function (event, outer, eventItem) {
    if (!eventItem) {
        console.log(EventConditionPro_GetEventName(event).name + " " + "条件为空，跳过")
        return null
    }

    const commandName = eventItem.parameters[1]
    const args = eventItem.parameters[3]
    // 当前事件页使用出现条件
    if (commandName === "enable") {
        return args.enable === "true"
    }
    // 条件
    else if (commandName === "condition" || commandName === "condition_event") {
        const conditions = JsonEx.parse(args.conditions);
        for (let i = 0; i < conditions.length; i++) {
            const condition = JsonEx.parse(conditions[i])

            const resultName = condition.name;
            const checkTarget1Name = EventConditionPro_GetName(condition.checkTarget1Name);
            const negative = (condition.negative === "true")
            const type = String(condition.type);
            const checkType = String(condition.checkType);
            
            // 临时变量(开关)
            if (type === "tempSwicth") {
                const value1 = EventConditionPro_GetTempValue(outer, EventConditionPro_GetName(condition.checkTarget1))
                const value2 = EventConditionPro_GetSwitchValue(event, outer, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
                if (checkTarget1Name.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, checkTarget1Name, value1)
                }
            }
            // 临时变量(变量)
            else if (type === "tempVariable") {
                const value1 = EventConditionPro_GetTempValue(outer, EventConditionPro_GetName(condition.checkTarget1))
                const value2 = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
                if (checkTarget1Name.length > 0) {
                    EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, value1)
                }
            }
            // 开关
            else if (type === "switch") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                const value1 = $gameSwitches.value(checkTarget1)
                const value2 = EventConditionPro_GetSwitchValue(event, outer, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
                if (checkTarget1Name.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, checkTarget1Name, value1)
                }
            }
            // 变量
            else if (type === "variable") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                const value1 = $gameVariables.value(checkTarget1)
                const value2 = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
                if (checkTarget1Name.length > 0) {
                    EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, value1)
                }
            }
            // 独立开关
            else if (type === "selfSwitch") {
                const checkTarget1 = EventConditionPro_GetName(condition.checkTarget1);
                const key1 = [event._mapId, event._eventId, checkTarget1.toUpperCase()];
                const value1 = $gameSelfSwitches.value(key1)
                const value2 = EventConditionPro_GetSwitchValue(event, outer, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
                if (checkTarget1Name.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, checkTarget1Name, value1)
                }
            }
            // 时间
            else if (type === "timer") {
                if ($gameTimer.isWorking()) {
                    const value1 = $gameTimer.frames() / 60;
                    const value2 = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)
                    const re = EventConditionPro_Check(checkType, value1, value2)
                    if (resultName.length > 0) {
                        EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                    }
                    if (checkTarget1Name.length > 0) {
                        EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, value1)
                    }
                }
            }
            // 物品
            else if (type === "item") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                if (checkTarget1 >= 0 && checkTarget1 < $dataItems.length) {
                    const item = $dataItems[checkTarget1];
                    const value1 = $gameParty.numItems(item)
                    const value2 = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)
                    const re = EventConditionPro_Check(checkType, value1, value2)
                    if (resultName.length > 0) {
                        EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                    }
                    if (checkTarget1Name.length > 0) {
                        EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, value1)
                    }
                }
            }
            // 武器
            else if (type === "weapon") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                if (checkTarget1 >= 0 && checkTarget1 < $dataWeapons.length) {
                    const item = $dataWeapons[checkTarget1];
                    const value1 = $gameParty.numItems(item)
                    const value2 = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)
                    const re = EventConditionPro_Check(checkType, value1, value2)
                    if (resultName.length > 0) {
                        EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                    }
                    if (checkTarget1Name.length > 0) {
                        EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, value1)
                    }
                }
            }
            // 防具
            else if (type === "armor") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                if (checkTarget1 >= 0 && checkTarget1 < $dataArmors.length) {
                    const item = $dataArmors[checkTarget1];
                    const value1 = $gameParty.numItems(item)
                    const value2 = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)
                    const re = EventConditionPro_Check(checkType, value1, value2)
                    if (resultName.length > 0) {
                        EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                    }
                    if (checkTarget1Name.length > 0) {
                        EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, value1)
                    }
                }
            }
            // 金币
            else if (type === "gold") {
                const value1 = $gameParty.gold()
                const value2 = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)
                const re = EventConditionPro_Check(checkType, value1, value2)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
                if (checkTarget1Name.length > 0) {
                    EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, value1)
                }
            }
            // 角色
            else if (type === "actor") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                const actor = $gameActors.actor(checkTarget1);
                const re = $gameParty.members().includes(actor)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
            }
            // 事件朝向
            else if (type === "direction") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                const checkTarget2 = String(condition.checkTarget2);

                let character = null
                if (checkTarget1 < 0) {
                    character = $gamePlayer;
                } else {
                    character = $gameMap.event(checkTarget1 > 0 ? checkTarget1 : event._eventId);
                } 

                if (character) {
                    let direction = 0
                    if (checkTarget2 === "下") {
                        direction = 2
                    }
                    else if (checkTarget2 === "左") {
                        direction = 4
                    }
                    else if (checkTarget2 === "右") {
                        direction = 6
                    }
                    else if (checkTarget2 === "上") {
                        direction = 8
                    }
                    const re = EventConditionPro_Check(checkType, character.direction(), direction)
                    if (resultName.length > 0) {
                        EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                    }
                    if (checkTarget1Name.length > 0) {
                        EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, character.direction())
                    }
                }
            }
            // 事件位置X
            else if (type === "positionX") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                const value = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)

                let character = null
                if (checkTarget1 < 0) {
                    character = $gamePlayer;
                } else {
                    character = $gameMap.event(checkTarget1 > 0 ? checkTarget1 : event._eventId);
                }

                if (character) {
                    const re = EventConditionPro_Check(checkType, character.x, value)
                    if (resultName.length > 0) {
                        EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                    }
                    if (checkTarget1Name.length > 0) {
                        EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, character.x)
                    }
                }
            }
            // 事件位置Y
            else if (type === "positionY") {
                const checkTarget1 = EventConditionPro_GetIndex(condition.checkTarget1);
                const value = EventConditionPro_GetVariableValue(event, outer, condition.checkTarget2)

                let character = null
                if (checkTarget1 < 0) {
                    character = $gamePlayer;
                } else {
                    character = $gameMap.event(checkTarget1 > 0 ? checkTarget1 : event._eventId);
                }

                if (character) {
                    const re = EventConditionPro_Check(checkType, character.y, value)
                    if (resultName.length > 0) {
                        EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                    }
                    if (checkTarget1Name.length > 0) {
                        EventConditionPro_SetVariableValue(event, outer, checkTarget1Name, character.y)
                    }
                }
            }
            // 按键
            else if (type === "input") {
                const keyCode = Number(condition.checkTarget1);
                let keyName = String(keyCode)
                // 不存在此按键则新增
                if (!(keyCode in Input.keyMapper)) {
                    Input.keyMapper[keyCode] = keyName;
                }
                // 存在按键则获取名字
                else {
                    keyName = Input.keyMapper[keyCode]
                }
                // 触发类型
                let re = false;
                if (checkType === "Triggered") {
                    re = Input.isTriggered(keyName)
                }
                else if (checkType === "Repeated") {
                    re = Input.isRepeated(keyName)
                }
                else {
                    re = Input.isPressed(keyName)
                }
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
            }
            // 脚本
            else if (type === "script") {
                const re = !!eval(condition.checkTarget1)
                if (resultName.length > 0) {
                    EventConditionPro_SetSwitchValue(event, outer, resultName, (negative ? !re : re))
                }
            }
        }

        return true
    }
    // 变量
    else if (commandName === "variable" || commandName === "variable_event") {
        const variables = JsonEx.parse(args.variables);
        for (let i = 0; i < variables.length; i++) {
            const variable = JsonEx.parse(variables[i])

            const resultName = EventConditionPro_GetName(variable.name);
            const negative1 = (variable.negative1 === "true")
            const negative2 = (variable.negative2 === "true")
            const checkType = String(variable.checkType);

            // 脚本
            if (checkType === "script") {
                const re = !!eval(variable.checkTarget1)
                EventConditionPro_SetVariableValue(event, outer, resultName, (negative1 ? -1 : 1) * re)
            }
            else {
                const value1 = EventConditionPro_GetVariableValue(event, outer, variable.checkTarget1)
                const value2 = EventConditionPro_GetVariableValue(event, outer, variable.checkTarget2)
                const re = EventConditionPro_Check(checkType, (negative1 ? -1 : 1) * value1, (negative2 ? -1 : 1) * value2)
                EventConditionPro_SetVariableValue(event, outer, resultName, re)
            }
        }

        return true
    }
        // 运算
    else if (commandName === "expression" || commandName === "expression_event") {
        const operates = JsonEx.parse(args.operates);
        for (let i = 0; i < operates.length; i++) {
            const operate = JsonEx.parse(operates[i])

            const resultName = EventConditionPro_GetName(operate.name);
            const negative1 = (operate.negative1 === "true")
            const negative2 = (operate.negative2 === "true")
            const checkType = String(operate.checkType);

            const value1 = EventConditionPro_GetSwitchValue(event, outer, variable.checkTarget1)
            const value2 = EventConditionPro_GetSwitchValue(event, outer, variable.checkTarget2)
            const re = EventConditionPro_Check(checkType, (negative1 ? !value1 : value1), (negative2 ? !value2 : value2))
            EventConditionPro_SetSwitchValue(event, outer, resultName, re)
        }

        return true
    }
    // 输出
    else if (commandName === "log" || commandName === "log_event") {
        const name = EventConditionPro_GetName(args.name);
        console.log($dataMap.events[event._eventId].name + " " + name + "：" + EventConditionPro_GetTempValue(outer, name))
        return true
    }
    // 提交结果
    else if (commandName === "submit" || commandName === "submit_event") {
        const name = EventConditionPro_GetName(args.name);
        return EventConditionPro_GetTempValue(outer, name)
    }
    // 触发按键
    else if (commandName === "input") {
        const type = String(args.type);
        const keyCode = Number(args.keyCode);
        let keyName = String(keyCode)
        // 不存在此按键则新增
        if (!(keyCode in Input.keyMapper)) {
            Input.keyMapper[keyCode] = keyName;
        }
        // 存在按键则获取名字
        else {
            keyName = Input.keyMapper[keyCode]
        }
        // 触发类型
        if (type === "Pressed") {
            return Input.isPressed(keyName)
        }
        else if (type === "Triggered") {
            return Input.isTriggered(keyName)
        }
        else if (type === "Repeated") {
            return Input.isRepeated(keyName)
        }

        return false
    }

    console.log(EventConditionPro_GetEventName(event) + " " + "未识别的指令，跳过：" + commandName)
    return null
}

// ============================================================================= //
// 指令操作
// ============================================================================= //

// 获取所有的条件指令
var EventConditionPro_GetConditions = function (outer) {
    if (!('EventConditionPro_Contions' in outer) || !outer.EventConditionPro_Contions) {
        outer.EventConditionPro_Contions = []
    }

    return outer.EventConditionPro_Contions
}

// 处理条件逻辑
var EventConditionPro_ProcessConditions = function (event, outer, conditions) {
    // 按顺序逐条处理
    for (let index = 0; index < conditions.length; ++index) {
        let re = EventConditionPro_ProcessPluginCommand(event, outer, conditions[index])
        const commandName = conditions[index].parameters[1]
        // submit提交结果
        if (commandName === "submit") {
            EventConditionPro_ClearTempValue(outer)
            return re
        }
        // 出现false意味着需要跳过
        else if (!re) {
            continue;
        }
    }

    // 没发现submit
    EventConditionPro_ClearTempValue(outer)
    return false
}

// 获取所有的按键触发指令
var EventConditionPro_GetTriggers = function (outer) {
    if (!('EventConditionPro_Triggers' in outer) || !outer.EventConditionPro_Triggers) {
        outer.EventConditionPro_Triggers = []
    }

    // 并行处理时处理
    if (outer.trigger === 4) {
        return outer.EventConditionPro_Triggers
    } 

    return null
}

// 加载时将插件指令归类
var EventConditionPro_Load = function (event, outer) {
    outer.EventConditionPro_Contions = []
    outer.EventConditionPro_Triggers = []

    let Enable = false
    for (let index = 0; index < outer.list.length; ++index) {
        // 当前事件是否是插件指令
        if (outer.list[index].code === 357) {
            const pluginName = outer.list[index].parameters[0]
            // 检查是否是当前插件
            if (pluginName.includes(EventConditionPro.pluginName)) {
                const pluginCommand = outer.list[index].parameters[1]
                // 是enbale
                if (pluginCommand === "enable") {
                    // 要考虑input，所以false下不能直接结束
                    if (EventConditionPro_ProcessPluginCommand(event, outer, outer.list[index])) {
                        Enable = true
                        outer.EventConditionPro_Contions.push(outer.list[index])
                    }
                }
                // 是触发条件
                else if (EventConditionPro.triggers.includes(pluginCommand)) {
                    outer.EventConditionPro_Triggers.push(outer.list[index])
                }
                // 是出现条件
                else if (EventConditionPro.appearCondition.includes(pluginCommand)){
                    outer.EventConditionPro_Contions.push(outer.list[index])
                }
            }
        }
    }
    // 并未启用
    if (!Enable) {
        outer.EventConditionPro_Contions = []
        return outer;
    }

    return outer;
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
var EventConditionPro_loadDataCommonEvents = false
var EventConditionPro_DataManager_onXhrLoad = DataManager.onXhrLoad;
DataManager.onXhrLoad = function (xhr, name, src, url) {
    // 对$dataMap做标记处理
    if (name == "$dataMap") {
        EventConditionPro_loadDataMap = true;
    }
    else if (name == "$dataCommonEvents") {
        EventConditionPro_loadDataCommonEvents = true;
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
        for (let i = $dataMap.events.length - 1; i >= 0; --i) {
            if (!$dataMap.events[i])
                continue;

            // 对事件页所有的插件指令进行处理
            for (let j = $dataMap.events[i].pages.length - 1; j >= 0; --j) {
                EventConditionPro_Load($dataMap.events[i], $dataMap.events[i].pages[j]);
            }
        }

        EventConditionPro_loadDataMap = false;
    }
    if (EventConditionPro_loadDataCommonEvents) {
        for (let i = $dataCommonEvents.length - 1; i >= 0; --i) {
            if (!$dataCommonEvents[i])
                continue;

            // 对事件页所有的插件指令进行处理
            EventConditionPro_LoadCommon($dataCommonEvents[i]);
        }

        EventConditionPro_loadDataCommonEvents = false
    }
}

// ============================================================================= //
// 对普通事件做处理，加入条件和触发的判断
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

    const Conditions = EventConditionPro_GetConditions(page)
    if (Conditions && Conditions.length > 0) {
        return EventConditionPro_ProcessConditions(this, page, Conditions)
    }
    else {
        return EventConditionPro_Game_Event_meetsConditions.call(this, page)
    }
}

// ============================================================================= //
// 对公共事件做处理，加入条件和触发的判断
// ============================================================================= //

// 公共事件自动执行条件处理
var EventConditionPro_Game_Map_setupAutorunCommonEvent = Game_Map.prototype.setupAutorunCommonEvent;
Game_Map.prototype.setupAutorunCommonEvent = function () {
    for (const commonEvent of this.autorunCommonEvents()) {
        commonEvent._commonEventId = commonEvent.id
        EventConditionPro_Load(commonEvent, commonEvent);

        const Conditions = EventConditionPro_GetConditions(commonEvent)
        // 有条件
        if (Conditions && Conditions.length > 0) {
            // 判断条件
            if (EventConditionPro_ProcessConditions(commonEvent, commonEvent, Conditions)) {
                this._interpreter.setup(commonEvent.list);
                return true;
            }
        }
        // 没条件，判断原生
        else if ($gameSwitches.value(commonEvent.switchId)) {
            this._interpreter.setup(commonEvent.list);
            return true;
        }
    }
    return false;
};

// 公共事件并行处理的按键处理
var EventConditionPro_Game_CommonEvent_isActive = Game_CommonEvent.prototype.isActive;
Game_CommonEvent.prototype.isActive = function () {
    const event = this.event();
    EventConditionPro_Load(this, event);

    // 如果是并行处理
    if (event.trigger === 2) {
        const Conditions = EventConditionPro_GetConditions(event)
        // 有条件
        if (Conditions && Conditions.length > 0) {
            // 判断条件
            if (!EventConditionPro_ProcessConditions(this, event, Conditions))
                return false
        }
        // 没条件
        else {
            // 判断原生
            if (!EventConditionPro_Game_CommonEvent_isActive.call(this))
                return false
        }

        const Triggers = EventConditionPro_GetTriggers(event)
        // 有触发
        if (Triggers && Triggers.length > 0) {
            // 判断触发
            let Check = true
            for (let i = 0; i < Triggers.length; ++i) {
                if (!EventConditionPro_ProcessPluginCommand(this, event, Triggers[i])) {
                    Check = false
                    break
                }
            }
            return Check
        }
        // 没触发
        else {
            return true
        }
    }
    return false
};