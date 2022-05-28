import React, { Component } from 'react';
import { JSON_PROFILE } from '../common/profile';
import emailjs from 'emailjs-com';

class PermissionCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: null,
      detections: null,
      prevId:null,
    };
  }

  componentDidMount() {
    this.getDescription();
  }


  componentWillReceiveProps(newProps) {
    this.getDescription(newProps);
  }

  getDescription = async (props = this.props) => {
    const { fullDiscription, faceMatcher} = props;
    if (!!fullDiscription) {
      await this.setState({
        descriptors: fullDiscription.map(fd => fd.descriptor),
        detections: fullDiscription.map(fd => fd.detection)
      });
      if (!!this.state.descriptors && !!faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          faceMatcher.findBestMatch(descriptor)
        );
        this.setState({ match });
      }
    }
  };
  

  render() {


    var blacklistedEmailParams={
        location:'Block 1, Security Gates',
        subject:'blacklisted person',
        email: 'universityssteam1@gmail.com , universityssteam2@gmail.com',
        message: 'A Blacklisted Person recognised at Block 1 Security Gate, kindly contact the nearest police station!',
        submessage:'Convert the following Base64-encoded image of the suspect to png using: https://base64.guru/converter/decode/image/png',
        screenshot: this.props.screenshot
      };

      var unknownEmailParams={
        location:'Block 1, Security Gates',
        subject:'unknown person',
        email: 'universityssteam1@gmail.com, universityssteam2@gmail.com',
        message: 'An Unlisted Person recognised at Block 1 Security Gate, kindly verify the identify and escort them.',
        submessage:'Convert the following Base64-encoded image of the unknown person to png using: https://base64.guru/converter/decode/image/png',
        screenshot: this.props.screenshot
      };

      var vipEmailParams={
        location:'Block 1, Security Gates',
        subject:'VIP person',
        email: 'universityssteam1@gmail.com, universityssteam2@gmail.com',
        message: 'A VIP Person recognised at Block 1 Security Gate, kindly verify the identify and escort them to the Engagement Team.',
        submessage:'Convert the following Base64-encoded image of the vip person to png using: https://base64.guru/converter/decode/image/png',
        screenshot: this.props.screenshot
      };
  


    //send alert email messages
    const sendMailAlert=(idnumber,permissionStatus)=>{
      if(idnumber!==this.state.prevId)
      {
          //sending message+snapshot to security team if blacklisted person/criminal is recognised
        if(permissionStatus==='blacklisted')
        {emailjs.send('service_i5k082k','template_aip0zcs',blacklistedEmailParams,'Z0DE67ZW8tdKVSfCj').then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
       }, function(error) {
          console.log('FAILED...', error);
       });
       
       this.setState({prevId: idnumber})}

       //sending message+snapshot to security team if unknown person is recognised
       else if(permissionStatus==='unknown')
       {emailjs.send('service_i5k082k','template_aip0zcs',unknownEmailParams,'Z0DE67ZW8tdKVSfCj').then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
     
     this.setState({prevId: idnumber})}
     //sending message+snapshot to security team if VIP person is recognised
     else 
       {emailjs.send('service_i5k082k','template_aip0zcs',vipEmailParams,'Z0DE67ZW8tdKVSfCj').then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
     
     this.setState({prevId: idnumber})}
        
      }
      else{ }
    }
    
    
    const { detections, match } = this.state;
    let permissionStatusAlert = null;
    let visitors = Object.keys(JSON_PROFILE);
    let permissionStatus;
    let idnumber;
    
    
    if (!!detections) {
        permissionStatusAlert = detections.map((detection, i) => {
                  return (
            <div key={i} className="container">
            <div className="row" style={{margin:20}}>

            
              <div
                style={{
                  padding:10,
                  border: 'solid lightgreen',
                  backgroundColor:"purple"
                }}
              >
              
                {!!match && match[i] && match[i]._label !== 'unknown' ? (
                  <p
                    style={{
                      color: "white"
                    }}
                  >
                   
                    {!!visitors.map(visitor =>(JSON_PROFILE[visitor].rollno)===match[i]._label ?
                    (permissionStatus=JSON_PROFILE[visitor].permission,
                     idnumber=JSON_PROFILE[visitor].rollno
                    ):null
                      )}

                      Permission Status: {permissionStatus}

                          {permissionStatus==='blacklisted' || permissionStatus==='vip' ?
                          (
                          sendMailAlert(idnumber,permissionStatus)
                          ): null}
                  </p>

                  
                ) : null}
                
              
                {!!match && match[i] && match[i]._label === 'unknown' ? (
                  <p
                    style={{
                      backgroundColor:"red",
                      color:"white"
                    }}
                  >
                    Permission Status: {match[i]._label}
                   {sendMailAlert(0,match[i]._label)}
                   
                  </p>
                ) : null}
              </div>
              

              </div>   
            </div>
  
          );
        });

        
      }

     
      

    return( 
      
    <div>
    
    {permissionStatusAlert}</div>);
  }
}

export default PermissionCheck;
