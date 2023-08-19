import React, { useState, useEffect, useRef } from 'react';

function CameraCapture({ deviceId }) {
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [hasPhoto, setHasPhoto] = useState(false)
    const videoId = []

    const getVideo = () => {


        const constraints = {
            video: {
                width: 1920,
                height: 1080,
                deviceId: { exact: deviceId }, // Use the specified deviceId
            },
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                let video = videoRef.current
                video.srcObject = stream
                video.play()
            })
            .catch(err => {
                console.log(err)
            })
    };

    const takePhoto = () => {
        console.log(videoId)
        const width = 414
        const height = width / (16 / 9)

        let video = videoRef.current
        let photo = photoRef.current

        photo.width = width
        photo.height = height

        let ctx = photo.getContext('2d')
        ctx.drawImage(video, 0, 0, width, height)
        setHasPhoto(true)
    };

    useEffect(() => {
        getVideo();
    }, []);

    return (
        <div>
            <div className="camera">
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>
                    Capture
                </button>
            </div>
            <div className={'result' + (hasPhoto ? ' hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
            </div>
        </div>
    );
}

export default CameraCapture;