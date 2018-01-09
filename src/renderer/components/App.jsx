import React from 'react'
import DragBlock from 'COMPONENT/util/DragBlock'
import Header from 'COMPONENT/Header'
import Elements from 'COMPONENT/Elements'
import File from 'COMPONENT/File'
import Page from 'COMPONENT/Page'
import DevTool from 'COMPONENT/DevTool'
import Properties from 'COMPONENT/Properties'
import style from './App.scss'

export default () => {
  let dom1
  let dom2
  let dom3
  let dom4
  return (
    <div className={style['app']}>
      <div className={style['header']}>
        <Header />
      </div>
      <div className={style['body']}>
        <div className={style['left']} ref={(dom) => { dom1 = dom }}>
          <DragBlock
            type="vertical"
            position="right"
            needFlexStyle
            flexDirection="column"
            target={() => dom1}
          >
            <div className={style['elements-container']} ref={(dom) => { dom2 = dom }}>
              <DragBlock
                position="bottom"
                target={() => dom2}
              >
                <Elements />
              </DragBlock>
            </div>
            <div className={style['file-container']}>
              <File />
            </div>
          </DragBlock>
        </div>
        <div className={style['center']}>
          <div className={style['page-container']}>
            <Page />
          </div>
          <div className={style['devtool-container']} ref={(dom) => { dom3 = dom }}>
            <DragBlock
              direction={1}
              target={() => dom3}
            >
              <DevTool />
            </DragBlock>
          </div>
        </div>
        <div className={style['right']} ref={(dom) => { dom4 = dom }}>
          <DragBlock
            type="vertical"
            position="left"
            direction={1}
            target={() => dom4}
          >
            <Properties />
          </DragBlock>
        </div>
      </div>
    </div>
  )
}
