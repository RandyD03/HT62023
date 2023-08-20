import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

import { BsSend } from "react-icons/bs"
import { FiCamera } from "react-icons/fi"
import ItemCard from "./itemCard"
import axios from "axios"

function ItemTab({ props }) {
    const videoRef1 = useRef(null)
    const photoRef1 = useRef(null)
    const videoRef2 = useRef(null)
    const photoRef2 = useRef(null)
    const [photo1, setPhoto1] = useState("")
    const [photo2, setPhoto2] = useState("")
    const [annotatedImages, setAnnotatedImages] = useState("")
    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(1)
    const [length, setLength] = useState(1)
    const [name, setName] = useState("")
    const [id, setId] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.log("enumerateDevices() not supported.")
        } else {
            navigator.mediaDevices
                .enumerateDevices()
                .then((devices) => {
                    const filteredVideoIds = devices
                        .filter(
                            (device) =>
                                device.kind === "videoinput" &&
                                device.label.includes("Webcam")
                        )
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

    async function handleImageUpload(e) {
        setLoading(true)
        const annotatedImages = await axios.post(
            "http://127.0.0.1:5000/processImages",
            [[photo1, photo2]]
        )
        props.handleItemSubmit(
            e,
            width,
            length,
            height,
            name,
            id,
            annotatedImages.data.frontImg
        )
        setId((prevId) => prevId + 1)
        setName("")
        setAnnotatedImages(annotatedImages.data.frontImg)
        setLoading(false)
    }

    return (
        <Grid templateColumns="2fr 1fr" height="100%" gap={2}>
            <GridItem>
                {props.items.length == 0 ? (
                    <Center height="100%">
                        <Heading color="blackAlpha.300">
                            No items created
                        </Heading>
                    </Center>
                ) : (
                    <Grid
                        gap={4}
                        p="4"
                        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                        overflowY="scroll"
                        maxHeight="100vh"
                    >
                        {props.items.map((item) => (
                            <ItemCard
                                props={{
                                    item: item,
                                    handleItemDelete: props.handleItemDelete,
                                }}
                            />
                        ))}
                    </Grid>
                )}
            </GridItem>
            <GridItem>
                <Flex flexDir="column" height="100%" alignContent="flex-start">
                    <VStack width="100%">
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="My Item 1"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                value={name}
                            />
                        </FormControl>
                        <Button
                            width="100%"
                            onClick={takePhoto}
                            leftIcon={<FiCamera />}
                        >
                            Capture
                        </Button>
                        <Button
                            width="100%"
                            onClick={handleImageUpload}
                            leftIcon={<BsSend />}
                        >
                            Submit
                        </Button>

                        <video ref={videoRef1}></video>
                        <video ref={videoRef2}></video>
                        <canvas
                            style={{ width: "100%" }}
                            ref={photoRef1}
                        ></canvas>
                        <canvas
                            style={{ width: "100%" }}
                            ref={photoRef2}
                        ></canvas>
                        <img src={annotatedImages} />
                    </VStack>
                </Flex>
            </GridItem>
        </Grid>
    )
}

export default ItemTab
