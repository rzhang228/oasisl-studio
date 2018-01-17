import React from 'react'
import DragBlock from 'COMPONENT/util/DragBlock'
import Dom from './Dom'
import Style from './Style'
import './index.scss'

export default () => {
  let dom1

  return (
    <div className="devtool-container">
      <div className="dev-left" ref={(el) => { dom1 = el }}>
        <DragBlock
          type="vertical"
          position="right"
          target={() => dom1}
        >
          <Dom />
        </DragBlock>
      </div>
      <div className="dev-right">
        <Style />
      </div>
    </div>
  )
}
