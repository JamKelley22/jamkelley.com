import React from 'react'

import './downloads.module.scss'

const Downloads = (props) => {
  return (
    <div>
      <h1>Downloads</h1>
	  <hr/>

    <h1>Pentachoron</h1>
    <h3>Convert scanned PDF files to text!</h3>
    <a href="http://jamkelley.com:3001/download/pentachoron">Install (Windows)</a>
    <h3>Known Bugs</h3>
    <ul>
      <li>PDF file must not have spaces in name</li>
    </ul>

    <hr/>
    
	  <h1>PunchClock</h1>
    <h3>Track and take charge of your work hours!</h3>
    <a href="http://jamkelley.com:3001/download/punchclock">Install (Windows)</a>
    </div>
  )
}

export default Downloads;
