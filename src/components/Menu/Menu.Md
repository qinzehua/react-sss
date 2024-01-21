第一部分

- Menu 接口：activeIndex, mode(horizontal, vertical),
  style?: React.CssPro,
  onSelect, classname
- MenuItem: index, disabled, className

第二部分

- 解析 props
- 拼接 class， 横向，塑像 class
- ul, style, class

第三部分

- 引入 context
- type context, index, onSelect,
- createContext
- Menu, 保存 index 状态
- Menu, handleClick, 设置 index
- Menu, passContext, index, onSelect
- Context.Provider, value=passContext

- MeunItem, 引入 context
- MenuItem, const context = ......
- class, 设置is-actived
- onClick, handleClick, 调用context.OnSelect(index) && !disabled


第四部分
- 