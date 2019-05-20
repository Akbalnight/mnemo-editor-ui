import React, { Component } from 'react'
import { MnemonicSchemeViewer } from 'mnemo-editor'
import 'antd/dist/antd.css'
import mnemoscheme from './mnemocheme'

export default class App extends Component {
  render () {
    return (
      <div style={{width: '100wh', height: 'calc(100vh - 85px)'}}>
        <MnemonicSchemeViewer
          mnemoschemeData={mnemoscheme.data}
        />
      </div>
    )
  }
}
