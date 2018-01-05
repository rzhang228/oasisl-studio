import React, { Component } from 'react'
import Header from 'COMPONENT/Header'
import File from 'COMPONENT/File'

export default () => {
  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="file-container">
        <File />
      </div>
    </div>
  )
}