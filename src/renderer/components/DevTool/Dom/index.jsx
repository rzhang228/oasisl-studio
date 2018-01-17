import React, { Component } from 'react'
import PropTypes from 'prop-types'

import domIdAction from 'ACTION/domId'
import createContainer from 'UTIL/createContainer'
import VNodeTree from 'UTIL/menifest/VNodeTree'
import './index.scss'

const connector = createContainer(
  ({ vNodeTreeList }) => ({ vNodeTreeList }),
  domIdAction
)

const autoOpenTag = [
  'html',
  'body'
]

const toggleAnimateTime = 1000

/**
 * type  0:展开;1:收起
 * 
 * @param {any} dom 
 * @param {any} type 
 * @memberof Dom
 */
function toggleAnimate(dom, type) {
  const { style } = dom

  if (type) {
    style['max-height'] = `${+window.getComputedStyle(dom).height.slice(0, -2)}px`
    style['max-height'] = '0px'
  } else {
    style['max-height'] = `${dom.scrollHeight}px`
    setTimeout(() => {
      style['max-height'] = 'none'
    }, toggleAnimateTime)
  }
}

class Dom extends Component {
  createTree(vNode) {
    if (vNode.tagName === '')
      return (
        <div className="dom-ele" data-os-id={vNode.id} key={vNode.id}>
          <p className="dom-line" onMouseEnter={this.handleDomEnter} onMouseLeave={this.handleDomLeave}>
            <span className="text">{`${vNode.text}`}</span>
          </p>
        </div>
      )

    const attrList = []

    for (const attrName in vNode.attr)
      if ({}.hasOwnProperty.call(vNode.attr, attrName))
        attrList.push(
          <span key={attrName} className="dom-attr-name">{` ${attrName}=`}</span>,
          <span key={vNode.attr[attrName]} className="dom-attr-value">{`"${vNode.attr[attrName]}"`}</span>
        )

    if (vNode.isSingleTag())
      return (
        <div className="dom-ele" data-os-id={vNode.id} key={vNode.id}>
          <p className="dom-line" onMouseEnter={this.handleDomEnter} onMouseLeave={this.handleDomLeave}>
            {`<${vNode.tagName}`}
            {attrList}
            {' />'}
          </p>
        </div>
      )

    if (vNode.children.length === 0)
      return (
        <div className="dom-ele" data-os-id={vNode.id} key={vNode.id}>
          <p className="dom-line" onMouseEnter={this.handleDomEnter} onMouseLeave={this.handleDomLeave}>
            {`<${vNode.tagName}`}
            {attrList}
            {`></${vNode.tagName}>`}
          </p>
        </div>
      )

    const childList = []
    for (const child of vNode.children)
      childList.push(this.createTree(child))

    return (
      <div className={`dom-ele has-child${autoOpenTag.indexOf(vNode.tagName) !== -1 ? ' open' : ''}`} data-os-id={vNode.id} key={vNode.id}>
        <p className="dom-line" onMouseEnter={this.handleDomEnter} onMouseLeave={this.handleDomLeave}>
          <i className="oasicon oasicon-down" onClick={this.toggleFold} role="presentation" />
          {`<${vNode.tagName}`}
          {attrList}
          {'>'}
        </p>
        <div
          className="dom-children"
          style={{
            maxHeight: autoOpenTag.indexOf(vNode.tagName) !== -1 ? 'none' : '0px',
            transition: `max-height ${toggleAnimateTime / 1000}s`
          }}
        >
          {childList}
        </div>
        <p className="dom-line" onMouseEnter={this.handleDomEnter} onMouseLeave={this.handleDomLeave}>{`</${vNode.tagName}>`}</p>
      </div>
    )
  }

  toggleFold = (event) => {
    const domEle = event.target.parentElement.parentElement
    const domEleClassList = domEle.classList
    const domChildren = domEle.querySelector('.dom-children')
    if (domEleClassList.contains('open')) {
      toggleAnimate(domChildren, 1)
      domEleClassList.remove('open')
    } else {
      toggleAnimate(domChildren, 0)
      domEleClassList.add('open')
    }
  }

  handleDomEnter = (event) => {
    const id = +event.currentTarget.parentElement.getAttribute('data-os-id')
    this.props.setActiveDomId(id)
  }

  handleDomLeave = () => {
    this.props.clearActiveDomId()
  }

  render() {
    const { vNodeTreeList } = this.props
    const vNodeTree = vNodeTreeList.list[vNodeTreeList.activeIndex]
    let tree

    if (vNodeTree)
      tree = this.createTree(vNodeTree.tree)

    return (
      <div className="dom-container">
        {tree}
      </div>
    )
  }
}

Dom.propTypes = {
  vNodeTreeList: PropTypes.shape({
    activeIndex: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.instanceOf(VNodeTree))
  }).isRequired,
  setActiveDomId: PropTypes.func.isRequired,
  clearActiveDomId: PropTypes.func.isRequired
}

export default connector(Dom)
