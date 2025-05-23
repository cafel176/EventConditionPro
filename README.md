# EventConditionPro
逻辑和运算增强插件

——***以创作者为本，让RM没有难做的演出***

<br/>

本插件支持通过插件指令进行各种复杂的逻辑和数值运算，适用于RMMZ和RMMV<br/>
本插件逻辑较为复杂，因此附带了示例工程，请结合本文的使用说明与示例工程来了解详细使用方法<br/>

<br/>

QQ群：***792888538***   欢迎反馈遇到的问题和希望支持的功能

<br/>

MZ/MV 视频教程：

<br/>
<br/>

## 需求背景：

1. RM的开关可以理解为一个bool变量，但是RM并没有内置支持逻辑运算与或非，因此大部分复杂逻辑的实现变得较为困难

<br/>

2. RM开关与变量之间并没有互相打通，诸如判断变量的值并将结果存入开关这种需求的实现也较为麻烦，独立开关更是完全无法参与逻辑

<br/>

3. RM变量自身的运算也不够完善，无法计算两个变量的运算并将结果存在第三个变量内，而必须存在两者之一。此外，也没有快速判断开关并给变量赋值的简单方法，取大取小这种基本逻辑也有缺失

<br/>

4. 事件出现条件太过简单，不能支持复杂的逻辑判断，不能支持或非，不能支持自定义条件的先后顺序(括号的功能)，不能支持多样的判断条件

<br/>

5. 独立开关数量太少

<br/>
<br/>

## 插件功能：

针对以上问题，本插件提供以下功能解决：

<br/>

1. 支持通过插件指令进行各种复杂的逻辑和数值运算
   * 通过变量指令进行数值运算，得到数值结果
   * 通过条件指令进行逻辑判断，得到bool结果，同时将操作对象的值存在指定的位置
   * 通过运算指令组合bool结果，得到复合结果
   * 得到的结果可用于事件出现条件和条件分歧，或者直接存回RM变量或开关或独立开关

<br/>

2. 支持自定义任意复杂的事件出现条件

<br/>

3. 支持自定义任意复杂的逻辑用于条件分歧

<br/>

4. 对于并行处理和公共事件，支持定义任意按键触发

<br/>

5. 支持 A-Z 26个独立开关

<br/>
<br/>

## 指令参数：

插件指令常用的参数类型，根据情况填写

<br/>

1. [开关]：开关类参数允许以下类型：
   * 单个字母A-Z：独立开关
   * 以字母s开头，后面接序号，如s31：RM开关
   * 临时变量名字，如temp：临时变量
   * 直接写true，或者false(不适用于存返回结果)

<br/>

2. [变量]：变量类参数允许以下类型：
   * 以字母v开头，后面接序号，如v31：RM变量
   * 临时变量名字，如temp：临时变量
   * 直接写数值(不适用于存返回结果)

<br/>

3. [序号]：序号类参数一定需要是正整数，对应相应序号

<br/>

4. [名字]：名字类参数一定需要是字符串，对应相应名字

<br/>
<br/>

## 插件指令：

常用的插件指令
   * MV需要采用这种格式：逻辑增强 指令类型 指令参数
   * 两用的指令，后缀为 _出现 的用于事件出现条件，后缀为 _事件 的用于事件页内

<br/>

1. 启用(出现)：让事件页使用自定义出现条件，要在事件页开头设置一个本指令并将参数设置为true<br/>
   设置了本指令的事件页会完全使用自定义条件忽略RM原生条件，关闭则反之<br/>
   设置好后，当前事件页所有带有 (用于出现条件) 的指令都会被纳入考量，不用时关闭本指令即可，无需大量删除
   * 启用：true/false
   * MV示例：逻辑增强 启用_出现 true

<br/>

2. 条件(两用)：通过条件列表设置一组[开关]，每一条的结果支持保存供后续取用
   * 结果：写[开关]，比较结果会保存在这里，留空为不保存
   * 取反：对当前条件的结果取反
   * 条件类型
   * 比较对象1的结果：临时变量，写[开关]或[变量]，比较对象1的值会保存在这里，留空为不保存
   * 比较对象1：开关、变量、物品、武器、防具、事件朝向/位置(玩家为-1，当前事件为0)、角色、按键用[序号]，临时变量、独立开关用[名字]，脚本直接写，金币和时间不用写
   * 比较类型：开关类只分为等于和其他两种，物品、武器、防具、金币、时间、事件朝向比较值，角色、按键、脚本不写
   * 比较对象2：开关类写[开关]，变量类和物品、武器、防具、金币、时间、事件位置写[变量]，按键写触发类型(被触发、被重复、其他都为被按下)，事件朝向写方向(下、左、右、上)、角色、脚本不写
   * 可以配置多条，按顺序执行
   * MV使用本指令需要在插件参数内使用 条件转换 生成json字符串
   * MV示例：逻辑增强 条件_出现 json
   * MV示例：逻辑增强 条件_事件 json

<br/>

3. 变量(两用)：通过变量列表设置一组[变量]，每一条的结果支持保存供后续取用
   * 结果：写[变量]，运算结果会保存在这里
   * 运算对象1取负数
   * 运算对象1：写[变量]，随机数是较小值，脚本直接写
   * 运算类型
   * 运算对象2取负数
   * 运算对象2：写[变量]，随机数是较大值，脚本不写
   * 条件：运算类型为条件时才需要填写，写[开关]，开关为true则返回运算对象1反之返回运算对象2
   * 可以配置多条，按顺序执行
   * MV使用本指令需要在插件参数内使用 变量转换 生成json字符串
   * MV示例：逻辑增强 变量_出现 json
   * MV示例：逻辑增强 变量_事件 json

<br/>

4. 运算(两用)：对一组[开关]进行逻辑组合，每一条的结果支持保存供后续取用
   * 结果：写[开关]，运算结果会保存在这里
   * 运算对象1取反
   * 运算对象1：写[开关]
   * 操作类型
   * 运算对象2取反
   * 运算对象2：写[开关]
   * 可以配置多条，按顺序执行
   * MV使用本指令需要在插件参数内使用 运算转换 生成json字符串
   * MV示例：逻辑增强 运算_出现 json
   * MV示例：逻辑增强 运算_事件 json

<br/>

5. 输出(两用)：将一个临时变量的值输出到控制台
   * 名称
   * MV示例：逻辑增强 输出_出现 临时变量名字
   * MV示例：逻辑增强 输出_事件 临时变量名字

<br/>

6. 提交(两用)：将一个临时变量作为事件页的出现条件的最终判定结果提交
   * 名称
   * MV示例：逻辑增强 提交_出现 临时变量名字
   * MV示例：逻辑增强 提交_事件 临时变量名字

<br/>

7. 清空临时变量(事件)：事件页内执行运算时，为保证临时变量不互相影响，可用本指令清除之前的变量
   * MV示例：逻辑增强 清空临时变量

<br/>

8. 独立开关(事件)：用本指令可以设置超过D的独立开关
   * 名称
   * 开启：true/false
   * MV示例：逻辑增强 独立开关 E true

<br/>

9. 按键(触发)：在并行处理的事件页内使用，可以自定义按键来触发事件
   * 按键：填写KeyCode，可通过百度得到，如R为82
   * MV示例：逻辑增强 按键 82

<br/>
<br/>

## 使用说明：

本说明需要结合示例工程，请打开工程对比本说明使用

<br/>

### 示例群1

地图左下角，本示例群演示插件指令内开关的写法和使用

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex1.png?raw=true '示例')

<br/>

最下方事件互动打开开关DDD，上方三个事件进行出现条件判断，顺序由上往下依次是：

<br/>

#### 事件1

1. 开启事件出现条件判断，开启后会判断插件条件并完全忽略RM条件，关闭反之

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex0.png?raw=true '示例')

<br/>

2. 临时变量temp1 = true，使用脚本script直接赋值temp1

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex2.png?raw=true '示例')

<br/>

3. 判断DDD是否等于temp1，使用临时开关类型，判断temp1是否等于开关4，并将结果保存在另一个临时变量temp内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex3.png?raw=true '示例')

<br/>

4. 将临时变量temp作为结果提交，temp的开关与否将决定本事件是否出现

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex4.png?raw=true '示例')

<br/>

#### 事件2

1. 判断开关DDD是否不等于开关EEE，使用开关类型，判断开关4是否不等于开关5，并将结果保存在另一个临时变量temp内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex5.png?raw=true '示例')

<br/>

#### 事件3

1. 判断开关DDD是否等于独立开关D，使用开关类型，判断开关4是否等于独立开关D，并将结果保存在另一个临时变量temp1内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex6.png?raw=true '示例')

<br/>

2. 判断独立开关A是否打开，使用独立开关类型，判断独立开关A是否等于true，并将结果保存在另一个临时变量temp2内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex7.png?raw=true '示例')

<br/>

3. 判断临时变量temp1与temp2，使用运算，并将结果保存在另一个临时变量temp内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex8.png?raw=true '示例')

<br/>

### 示例群2

地图左下角，本示例群演示插件指令内变量的写法和使用

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex9.png?raw=true '示例')

<br/>

最下方事件互动设置变量DDD=5 EEE=6，上方三个事件进行出现条件判断，顺序由上往下依次是：

<br/>

#### 事件1

1. 临时变量temp1 = 2 + 3，使用变量直接赋值temp1

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex10.png?raw=true '示例')

<br/>

2. 判断变量DDD是否等于temp1，使用临时变量类型，判断temp1是否等于变量4，并将结果保存在另一个临时变量temp内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex11.png?raw=true '示例')

<br/>

#### 事件2

1. 判断变量DDD是否不等于变量EEE，使用变量类型，判断变量4是否不等于变量5，并将结果保存在另一个临时变量temp内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex12.png?raw=true '示例')

<br/>

#### 事件3

1. 判断变量DDD是否等于数值5，使用变量类型，判断变量4是否等于5，并将结果保存在另一个临时变量temp内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex13.png?raw=true '示例')

<br/>

### 示例群3

地图正下，本示例群演示多种不同条件的使用

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex14.png?raw=true '示例')

<br/>

最下方六个事件进行出现条件判断，顺序由左往右依次是：物品数量大于3、武器数量大于5、防具数量大于2、金币数量大于等于999、事件朝向为向上、人物凯西是否在队伍中

<br/>

### 示例群4

地图左测，本示例群演示插件指令内变量的根据条件赋值以及根据计时器判断事件出现条件

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex9.png?raw=true '示例')

<br/>

右侧事件根据计时器判断事件出现条件，计时器时间小于60秒时事件出现

<br/>

左侧事件互动设置开关III开启，旁边的事件进行出现条件判断：

<br/>

#### 事件

1. 根据开关9判断采用值5还是值7，开关打开采用5，未打开采用7，保存在临时变量temp里

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex16.png?raw=true '示例')

<br/>

2. 判断临时变量temp是否等于5，使用临时变量类型，并将结果保存在另一个临时变量result内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex17.png?raw=true '示例')

<br/>

### 示例群5

地图右测，本示例群演示插件指令内事件位置和朝向的判断

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex18.png?raw=true '示例')

<br/>

顺序由上往下依次是：

<br/>

#### 事件1

1. 将玩家角色朝向记录在临时变量temp1

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex19.png?raw=true '示例')

<br/>

2. 将当前事件角色朝向记录在临时变量temp2

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex20.png?raw=true '示例')

<br/>

3. 将临时变量temp1和临时变量temp2求和，并将结果保存在另一个临时变量temp内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex21.png?raw=true '示例')

<br/>

4. 判断临时变量temp是否不等于10，即玩家和本事件朝向不相对，并将结果保存在另一个临时变量result2内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex22.png?raw=true '示例')

<br/>

#### 事件2

1. 比较玩家角色位置X坐标是否不等于7，将玩家角色位置X坐标在临时变量temp5，，并将结果保存在另一个临时变量temp3内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex23.png?raw=true '示例')

<br/>

2. 比较玩家角色位置Y坐标是否不等于7，将玩家角色位置Y坐标在临时变量temp6，，并将结果保存在另一个临时变量temp4内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex24.png?raw=true '示例')

<br/>

3. 将临时变量temp3和临时变量temp4求或，即玩家不站在(7，7)位置，并将结果保存在另一个临时变量result1内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex25.png?raw=true '示例')

<br/>

### 示例群6

地图右侧，本示例群演示独立开关的使用

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex26.png?raw=true '示例')

<br/>

事件不断地使用插件指令打开独立开关跳转到下一页

<br/>

### 示例群7

地图右上角，本示例群以及公共事件CCC DDD，演示插件指令内并行处理，以及公共事件内自动执行和并行处理的按键触发

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex27.png?raw=true '示例')

<br/>

按键触发可以与出现条件一起使用，按键KeyCode可以通过百度得到，如R S T分别是82 83 84

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex28.png?raw=true '示例')

<br/>

### 示例群8

地图右上角，本示例群以及公共事件AAA BBB，演示插件指令如何在事件页内使用用于条件分歧

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex29.png?raw=true '示例')

<br/>

在条件分歧内使用脚本 EventConditionPro_GetLastResult() ，即可获取最近的提交结果并清除所有临时变量

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex30.png?raw=true '示例')

<br/>

### 示例群9

地图上方，本示例群演示插件指令内运算结果保存回RM变量，开关以及独立开关

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex31.png?raw=true '示例')

<br/>

上方两个事件互动可以打开开关FFF，并将变量FFF赋值为4

<br/>

最下方事件互动会进行逻辑判断并将结果保存回RM变量，开关以及独立开关

<br/>

#### 事件

1. 将变量FFF的值+4并保存到变量GGG内，变量6的值与4求和保存到变量7

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex32.png?raw=true '示例')

<br/>

2. 判断开关FFF是否没打开，将开关FFF当前值保存到开关GGG，并将结果保存回开关FFF

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex33.png?raw=true '示例')

<br/>

3. 判断开关GGG是否打开，并将结果保存在另一个临时变量temp1内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex34.png?raw=true '示例')

<br/>

4. 判断开关FFF是否没打开，并将结果保存在另一个临时变量temp2内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex35.png?raw=true '示例')

<br/>

5. 判断变量GGG是否等于8，并将结果保存在另一个临时变量temp3内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex36.png?raw=true '示例')

<br/>

6. 对临时变量temp1和临时变量temp2进行与运算，并将结果保存在另一个临时变量result内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex37.png?raw=true '示例')

<br/>

7. 对临时变量result和临时变量temp3进行与运算，并将结果保存回独立开关A内

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex38.png?raw=true '示例')

<br/>

### 示例群10

地图左上角，本示例群演示多条出现条件的与或非组合用法

![示例](https://github.com/cafel176/EventConditionPro/blob/main/ex39.png?raw=true '示例')

<br/>

顺序由左往右依次是：

<br/>

#### 事件1

判断 开关AAA = true 与 开关BBB = true 与 开关 CCC = true

<br/>

#### 事件2

判断 变量AAA  + 变量BBB + 变量CCC >= 6

<br/>

#### 事件3

判断 变量AAA >= 变量CCC 或 开关BBB = false 或 变量CCC < 1

<br/>

#### 事件4

判断 变量AAA >= 1 或 开关BBB = true

<br/>
<br/>

## MV使用插件参数生成插件指令所需的Json：
本说明仅用于MV，MZ用户直接使用插件指令即可

<br/>

条件、变量、运算三种插件指令需要Json字符串作为参数，因此需要在插件参数内配置好后拷贝其Json作为指令参数

![参数转换](https://github.com/cafel176/EventConditionPro/blob/main/pic1.png?raw=true '参数转换')

<br/>

1. 首先根据需求通过UI配置好对应的参数

![参数](https://github.com/cafel176/EventConditionPro/blob/main/pic2.png?raw=true '参数')

<br/>

2. 右键参数，选择“以文本编辑”

![参数](https://github.com/cafel176/EventConditionPro/blob/main/pic3.png?raw=true '参数')

<br/>

3. 在弹出的窗口内，全选文本并复制

![参数](https://github.com/cafel176/EventConditionPro/blob/main/pic4.png?raw=true '参数')

<br/>

4. 之后在插件指令内，填写好插件名，指令类型后，粘贴刚才复制的Json字符串即可

![参数](https://github.com/cafel176/EventConditionPro/blob/main/pic5.png?raw=true '参数')

<br/>

5. 想要修改已经写好的插件指令时，将写在里面的Json字符串复制，打开插件编辑器，右键对应的插件参数，选择“以文本编辑”，粘贴进去，即可再次通过UI调整Json

<br/>

更多详细案例请在示例工程内寻找