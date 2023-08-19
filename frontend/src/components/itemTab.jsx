import { Box, Button, Grid, GridItem } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

import CameraCapture from "./CameraCapture"
import axios from "axios"

function ItemTab() {
    const videoRef1 = useRef(null)
    const photoRef1 = useRef(null)
    const videoRef2 = useRef(null)
    const photoRef2 = useRef(null)
    const [photo1, setPhoto1] = useState("")
    const [photo2, setPhoto2] = useState("")
    const [annotatedImages, setAnnotatedImages] = useState("")

    useEffect(() => {
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.log("enumerateDevices() not supported.")
        } else {
            navigator.mediaDevices
                .enumerateDevices()
                .then((devices) => {
                    console.log(devices)
                    const filteredVideoIds = devices
                        .filter((device) => device.kind === "videoinput")
                        .map((device) => device.deviceId)
                    getVideo(filteredVideoIds[0], videoRef1)
                    getVideo(filteredVideoIds[1], videoRef2)
                })
                .catch((err) => {
                    console.error(`${err.name}: ${err.message}`)
                })
        }
    }, [])

    const getVideo = (deviceId, videoRef) => {
        const constraints = {
            video: {
                width: 1920,
                height: 1080,
                deviceId: { exact: deviceId }, // Use the specified deviceId
            },
        }

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                let video = videoRef.current
                video.srcObject = stream
                video.play()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const takePhoto = () => {
        const width = 414
        const height = width / (16 / 9)

        let video1 = videoRef1.current
        let photo1 = photoRef1.current
        let video2 = videoRef2.current
        let photo2 = photoRef2.current

        photo1.width = width
        photo1.height = height
        photo2.width = width
        photo2.height = height

        let ctx1 = photo1.getContext("2d")
        let ctx2 = photo2.getContext("2d")
        ctx1.drawImage(video1, 0, 0, width, height)
        ctx2.drawImage(video2, 0, 0, width, height)
        let photo1url = ctx1.canvas.toDataURL().split(",")[1]
        let photo2url = ctx2.canvas.toDataURL().split(",")[1]
        setPhoto1(photo1url)
        setPhoto2(photo2url)
    }

    async function handleImageUpload() {
        const annotatedImages = await axios.post(
            "http://127.0.0.1:5000/processImages",
            [[photo1, photo2]]
        )
        setAnnotatedImages(annotatedImages.data[1].frontImg)
        console.log(annotatedImages.data[1].frontImg)
    }

    return (
        <Grid templateColumns="4fr 1fr" height="100%" gap={2}>
            <GridItem>
                <Box>
                    <video ref={videoRef1}></video>
                    <video ref={videoRef2}></video>
                    <canvas ref={photoRef1}></canvas>
                    <canvas ref={photoRef2}></canvas>
                    <img src={`data:image/jpeg;base64,${annotatedImages}`} />
                </Box>
            </GridItem>
            <GridItem>
                <Button width="100%" onClick={takePhoto}>
                    Capture
                </Button>
                <Button width="100%" onClick={handleImageUpload}>
                    Submit
                </Button>
            </GridItem>
        </Grid>
    )
}

export default ItemTab
