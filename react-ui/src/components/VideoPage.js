import React, {useState} from 'react';
import Typist from 'react-text-typist';
import Webcam from "react-webcam";
import { Content, Button } from 'rsuite';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState('');
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(image);
    },
      [webcamRef]
    );
  
    return (
      <>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <Button appearance="ghost" onClick={capture}>
            Capture photo
        </Button>
        <img src={image}/>
      </>
    );
  };

class VideoPage extends React.Component {
    render() {
        return (
            <Content className="Banner-Header">
                <Typist
                    sentences={[
                        'Tokenize your face my guy! 😃',
                        'Are you enjoing ETH lyfe yo? Respek'
                    ]}
                    typingSpeed={15}
                    deletingSpeed={13}
                    cursorColor='#1e8ae3'
                    cursorBlinkSpeed='500'
                    pauseTime={2500}
                    loop={false}
                />
                <WebcamCapture />
            </Content>
        )
    }
}

export default VideoPage;