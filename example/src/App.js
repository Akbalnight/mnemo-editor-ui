import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { MnemonicSchemeEditor } from 'mnemo-editor'

export default class App extends Component {
  render () {
    return (
      <div style={{width: '100wh', height: 'calc(100vh - 85px)'}}>
        <MnemonicSchemeEditor />
      </div>
    )
  }
}
