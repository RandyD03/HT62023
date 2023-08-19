import { Box, Grid, Button, GridItem } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from "axios"
import CameraCapture from "./CameraCapture"
function ItemTab() {
    const [videoIds, setVideoIds] = useState([])
    const [newImages, setNewImages] = useState([])

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

                    setVideoIds(filteredVideoIds)
                })
                .catch((err) => {
                    console.error(`${err.name}: ${err.message}`)
                })
        }
    }, [])

    async function handleImageUpload() {
        const annotatedImages = await axios.post(
            "http://127.0.0.1:5000/processImages",
            newImages
        )
    }
    return (
        <Grid templateColumns="4fr 1fr" height="100%" gap={2}>
            <GridItem>
                <Box>
                    {videoIds.map((videoId, index) => (
                        <Box>
                            {/* <div key={index}>{videoId}</div> */}
                            <CameraCapture deviceId={videoId} />
                        </Box>
                    ))}
                </Box>
            </GridItem>
            <GridItem>
                <Button width="100%">Capture</Button>
            </GridItem>
        </Grid>
    )
}

export default ItemTab
