import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  loadModels,
  getFullFaceDescription,
  createMatcher,
  isFaceDetectionModelLoaded
} from '../api/face';
import DrawBox from '../components/drawBox';
import ShowDescriptors from '../components/showDescriptors';
import { JSON_PROFILE } from '../common/profile';

const MaxWidth = 600;
const boxColor = '#BE80B5';
const welcome = require('../img/login.svg');

const INIT_STATE = {
  url: null,
  imageURL: null,
  fullDiscription: null,
  imageDimension: null,
  error: null,
  loading: false
};

class FaceRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INIT_STATE,
      faceMatcher: null,
      showDescriptors: false,
      WIDTH: null,
      HEIGHT: 0,
      isModelLoaded: !!isFaceDetectionModelLoaded()
    };
  }

  componentWillMount() {
    this.resetState();
    let _W = document.documentElement.clientWidth;
    if (_W > MaxWidth) _W = MaxWidth;
    this.setState({ WIDTH: _W });
    this.mounting();
  }

  mounting = async () => {
    await loadModels();
    await this.matcher();
    await this.getImageDimension(welcome);
    await this.setState({ imageURL: welcome, loading: true });
    await this.handleImageChange(welcome);  //@ToDo- Add a pretty photo saying: Upload New Record
  };

  matcher = async () => {
    const faceMatcher = await createMatcher(JSON_PROFILE);
    this.setState({ faceMatcher });
  };

  handleFileChange = async event => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true
    });
    this.handleImageChange();
  };

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  };

  handleButtonClick = async () => {
    this.resetState();
    let blob = await fetch(this.state.url)
      .then(r => r.blob())
      .catch(error => this.setState({ error }));
    if (!!blob && blob.type.includes('image')) {
      this.setState({
        imageURL: URL.createObjectURL(blob),
        loading: true
      });
      this.handleImageChange();
    }
  };

  handleImageChange = async (image = this.state.imageURL) => {
    await this.getImageDimension(image);
    await getFullFaceDescription(image).then(fullDiscription => {
      this.setState({ fullDiscription, loading: false });
    });
  };

  getImageDimension = imageURL => {
    let img = new Image();
    img.onload = () => {
      let HEIGHT = (this.state.WIDTH * img.height) / img.width;
      this.setState({
        HEIGHT,
        imageDimension: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = imageURL;
  };

  handleDescriptorsCheck = event => {
    this.setState({ showDescriptors: event.target.checked });
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };
  render() {
    const {
      WIDTH,
      HEIGHT,
      imageURL,
      fullDiscription,
      faceMatcher,
      showDescriptors,
      isModelLoaded,
      error,
      loading
    } = this.state;

    // Display working status
    let status = <p>Status: Model Loaded = {isModelLoaded.toString()}</p>;
    if (!!error && error.toString() === 'TypeError: Failed to fetch') {
      status = (
        <p style={{ color: 'red' }}>Status: Error! Unable to fetch Image URL</p>
      );
    } else if (loading) {
      status = <p style={{ color: 'blue' }}>Status: LOADING...</p>;
    } else if (!!fullDiscription && !!imageURL && !loading) {
      if (fullDiscription.length < 2)
        status = <p>Status: {fullDiscription.length} Face Detect</p>;
      if (fullDiscription.length > 1)
        status = <p>Status: {fullDiscription.length} Faces Detect</p>;
    }

    // Loading Sign
    let spinner = (
      <div
        style={{
          margin: 0,
          color: '#BE80B5',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textShadow: '2px 2px 3px #fff'
        }}
      >
        <div className="loading" />
        <h3>Processing...</h3>
      </div>
    );
    // console.log(fullDiscription);

    return (
      <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        {status}
        <div style={{position: 'relative',width: WIDTH, height: HEIGHT}}>
          {!!imageURL ? (
            <div style={{position: 'relative'}}>
              <div style={{ position: 'absolute' }}>
                <img style={{ width: WIDTH }} src={imageURL} alt="imageURL" />
              </div>
              
              {!!fullDiscription ? (
                <DrawBox
                  fullDiscription={fullDiscription}
                  faceMatcher={faceMatcher}
                  imageWidth={WIDTH}
                  boxColor={boxColor}
                />
              ) : null}
            </div>
          ) : null}
          {loading ? spinner : null}
        </div>
        <div
          style={{
            width: WIDTH,
            padding: 10,
            border: 'solid',
            marginTop: 10
          }}
        >
          <p>Input Image file or URL</p>
          <input
            id="myFileUpload"
            type="file"
            onChange={this.handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <br />
          <div className="URLInput">
            <input
              type="url"
              name="url"
              id="url"
              placeholder="Place your photo URL here (only .jpg, .jpeg, .png)"
              pattern="https://.*"
              size="30"
              onChange={this.handleURLChange}
            />
            <button onClick={this.handleButtonClick}>Upload</button>
          </div>
          <div>
            <input
              name="descriptors"
              type="checkbox"
              checked={this.state.showDescriptors}
              onChange={this.handleDescriptorsCheck}
            />
            <label>Show Descriptors</label>
          </div>
          {!!showDescriptors ? <ShowDescriptors fullDiscription={fullDiscription} /> : null}
        </div>
      </div>
      
    );
  }
}

export default withRouter(FaceRecognition);
