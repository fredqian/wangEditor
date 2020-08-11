/**
 * @description tooltip 事件
 * @author lichunlin
 */

import $, { DomElement } from '../../../utils/dom-core'
import Tooltip, { TooltipConfType } from '../../menu-constructors/Tooltip'
import Editor from '../../../editor/index'

//操作事件
import operatingEvent from './event/operating-event'

import getNode from './event/getNode'

let tooltip: Tooltip | null
let _editor: Editor

/**
 * 显示 tooltip
 * @param  table元素
 */
function showTableTooltip($node: DomElement) {
    const getnode = new getNode(_editor)

    const conf: TooltipConfType = [
        {
            // $elem: $("<span class='w-e-icon-trash-o'></span>"),
            $elem: $('<span>删除表格</span>'),
            onClick: (editor: Editor, $node: DomElement) => {
                // 选中img元素
                editor.selection.createRangeByElem($node)
                editor.selection.restoreSelection()
                editor.cmd.do('delete')
                // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                return true
            },
        },
        {
            $elem: $('<span>添加行</span>'),
            onClick: (editor: Editor, $node: DomElement) => {
                //当前元素
                let selectDom = $(editor.selection.getSelectionStartElem())
                //当前行
                let $currentLine = getnode.getLineNode(selectDom.elems[0])
                //获取当前行的index
                const index = Number(getnode.getCurrentLineIndex($node.elems[0], $currentLine))
                //生成要替换的html
                let htmlStr = getnode.getNodeHtml($node.elems[0])
                //生成新的table
                let newdom: string = getnode.getNodeHtml(
                    operatingEvent.ProcessingLine($(htmlStr), index).elems[0]
                )
                // 选中table
                editor.selection.createRangeByElem($node)
                editor.selection.restoreSelection()

                editor.cmd.do('insertHTML', newdom)

                return true
            },
        },
        {
            $elem: $('<span>删除行</span>'),
            onClick: (editor: Editor, $node: DomElement) => {
                //当前元素
                let selectDom = $(editor.selection.getSelectionStartElem())
                //当前行
                let $currentLine = getnode.getLineNode(selectDom.elems[0])
                //获取当前行的index
                const index = Number(getnode.getCurrentLineIndex($node.elems[0], $currentLine))
                //生成要替换的html
                let htmlStr = getnode.getNodeHtml($node.elems[0])
                //获取新生成的table 判断是否是最后一行被删除 是 删除整个table
                const trLength: number = operatingEvent.DeleteLine($(htmlStr), index).elems[0]
                    .childNodes[0].childNodes.length
                //生成新的table
                let newdom: string = ''
                // 选中table
                editor.selection.createRangeByElem($node)
                editor.selection.restoreSelection()

                if (trLength === 0) {
                    newdom = '<p><br></p>'
                } else {
                    newdom = getnode.getNodeHtml(
                        operatingEvent.DeleteLine($(htmlStr), index).elems[0]
                    )
                }
                editor.cmd.do('insertHTML', newdom)

                return true
            },
        },
        {
            $elem: $('<span>添加列</span>'),
            onClick: (editor: Editor, $node: DomElement) => {
                //当前元素
                let selectDom = $(editor.selection.getSelectionStartElem())
                //当前列的index
                const index = getnode.getCurrentRowIndex(selectDom.elems[0])
                //生成要替换的html
                let htmlStr = getnode.getNodeHtml($node.elems[0])
                //生成新的table
                let newdom: string = getnode.getNodeHtml(
                    operatingEvent.ProcessingRow($(htmlStr), index).elems[0]
                )
                // 选中table
                editor.selection.createRangeByElem($node)
                editor.selection.restoreSelection()

                editor.cmd.do('insertHTML', newdom)

                return true
            },
        },
        {
            $elem: $('<span>删除列</span>'),
            onClick: (editor: Editor, $node: DomElement) => {
                //当前元素
                let selectDom = $(editor.selection.getSelectionStartElem())
                //当前列的index
                const index = getnode.getCurrentRowIndex(selectDom.elems[0])
                //生成要替换的html
                let htmlStr = getnode.getNodeHtml($node.elems[0])
                //获取新生成的table 判断是否是最后一列被删除 是 删除整个table
                const tdLength: number = operatingEvent.DeleteLine($(htmlStr), index).elems[0]
                    .childNodes[0].childNodes[0].childNodes.length
                //生成新的table
                let newdom: string = ''
                // 选中table
                editor.selection.createRangeByElem($node)
                editor.selection.restoreSelection()

                if (tdLength === 1) {
                    newdom = '<p><br></p>'
                } else {
                    newdom = getnode.getNodeHtml(
                        operatingEvent.DeleteRow($(htmlStr), index).elems[0]
                    )
                }

                editor.cmd.do('insertHTML', newdom)

                return true
            },
        },
        {
            $elem: $('<span>设置表头</span>'),
            onClick: (editor: Editor, $node: DomElement) => {
                //当前元素
                let selectDom = $(editor.selection.getSelectionStartElem())
                //当前行
                let $currentLine = getnode.getLineNode(selectDom.elems[0])
                //获取当前行的index
                const index = Number(getnode.getCurrentLineIndex($node.elems[0], $currentLine))
                //生成要替换的html
                let htmlStr = getnode.getNodeHtml($node.elems[0])
                //生成新的table
                let newdom: string = getnode.getNodeHtml(
                    operatingEvent.setTheHeader($(htmlStr), index, 'th').elems[0]
                )
                // 选中table
                editor.selection.createRangeByElem($node)
                editor.selection.restoreSelection()

                editor.cmd.do('insertHTML', newdom)

                return true
            },
        },
        {
            $elem: $('<span>取消表头</span>'),
            onClick: (editor: Editor, $node: DomElement) => {
                //当前元素
                let selectDom = $(editor.selection.getSelectionStartElem())
                //当前行
                let $currentLine = getnode.getLineNode(selectDom.elems[0])
                //获取当前行的index
                const index = Number(getnode.getCurrentLineIndex($node.elems[0], $currentLine))
                //生成要替换的html
                let htmlStr = getnode.getNodeHtml($node.elems[0])
                //生成新的table
                let newdom: string = getnode.getNodeHtml(
                    operatingEvent.setTheHeader($(htmlStr), index, 'td').elems[0]
                )
                // 选中table
                editor.selection.createRangeByElem($node)
                editor.selection.restoreSelection()

                editor.cmd.do('insertHTML', newdom)

                return true
            },
        },
    ]

    tooltip = new Tooltip(_editor, $node, conf)
    tooltip.create()
}

/**
 * 隐藏 tooltip
 */
function hideTableTooltip() {
    // 移除 tooltip
    if (tooltip) {
        tooltip.remove()
        tooltip = null
    }
}

/**
 * 绑定 tooltip 事件
 * @param editor 编辑器实例
 */
function bindTooltipEvent(editor: Editor) {
    _editor = editor

    // 点击table元素是，显示 tooltip
    editor.txt.eventHooks.formClickEvents.push(showTableTooltip)

    // 点击其他地方，或者滚动时，隐藏 tooltip
    editor.txt.eventHooks.clickEvents.push(hideTableTooltip)
    editor.txt.eventHooks.keyupEvents.push(hideTableTooltip)
    editor.txt.eventHooks.toolbarClickEvents.push(hideTableTooltip)
    editor.txt.eventHooks.textScrollEvents.push(hideTableTooltip)
}

export default bindTooltipEvent
