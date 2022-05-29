import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const WIDTH = document.documentElement.clientWidth;
    return (
      <div
        style={{
          border: 'solid',
          borderRadius: 8,
          color: 'white',
          width: { WIDTH },
          margin: 10,
          padding: 5
        }}
      >
        <h2>ABISS: Advanced Biometric Identity Security System</h2>
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            margin: 'auto',
            marginLeft: 10
          }}
        >
          <h3>How to Use</h3>
          <p>
            This App detects all the faces of people trying to enter the workspace.
            visitor's name will be displayed under face box if recognized.
             Only the current visitors are listed in the database for this App to recognize.
              <br/>
             <ul>
              <h4>People are categorized in 4 categories:</h4>
              <li>1. Students</li>
              <li>2. VIPs</li>
              <li>3. Blacklisted</li>
              <li>4. Unknown</li>
            </ul>
          </p>
          <div>
            
            <ul>
              <h4>Photo Input:</h4>
              <li>Input image can be image file or URL</li>
              <li>Image file must be jpg, jpeg, or png format</li>
              <li>
                The App will try to detect all faces, which might take few
                seconds depend on how many faces are in the image.
              </li>
              
            </ul>
            <ul>
              <h4>Video Camera:</h4>
              <li>
                Video Input works well with PC webcam or Android phone's camera.
              </li>
            
              <li>
                App will try to detect and recognize any faces, but performance
                depends on CPU of the device.
              </li>
              <li>
                Detection and Recognition with PC webcam can be fast, while
                working on smartphone can be slower.
              </li>
            </ul>
            <ul>
              <h4>Reference:</h4>
              <li>API used:
                face-api.js API{' '}
                <a href="https://github.com/justadudewhohacks/face-api.js">
                  repo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
