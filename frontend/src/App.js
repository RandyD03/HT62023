import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import BoxTab from "./components/boxTab"
import ItemTab from "./components/itemTab"
import ResultTab from "./components/resultsTab"
import axios from "axios"

const COLOURS = ["red", "blue", "yellow", "green", "orange", "brown", "purple"]

function App() {
    const [boxes, setBoxes] = useState([
        // {
        //     width: 2,
        //     height: 2,
        //     length: 2,
        //     size: [2, 2, 2],
        //     name: "small",
        //     id: 0,
        //     color: "grey",
        // },
        // {
        //     width: 4,
        //     height: 4,
        //     length: 4,
        //     size: [4, 4, 4],
        //     name: "medium",
        //     id: 1,
        //     color: "grey",
        // },
    ])
    const [items, setItems] = useState([
        // {
        //     width: 1,
        //     height: 1,
        //     length: 1,
        //     size: [1, 1, 1],
        //     name: "doritos",
        //     id: 0,
        //     color: "blue",
        // },
        // {
        //     width: 1,
        //     height: 1,
        //     length: 1,
        //     size: [1, 1, 1],
        //     name: "chipmunk",
        //     id: 1,
        //     color: "red",
        // },
    ])
    const [results, setResults] = useState([])

    const handleBoxSubmit = (event, width, length, height, name, id) => {
        event.preventDefault()
        setBoxes((prevBoxes) => [
            ...prevBoxes,
            {
                width: parseFloat(width),
                length: parseFloat(length),
                height: parseFloat(height),
                size: [
                    parseFloat(height),
                    parseFloat(width),
                    parseFloat(length),
                ],
                name: name === "" ? `Box ${id + 1}` : name,
                color: "grey",
                id: id,
            },
        ])
    }

    const handleBoxDelete = (id) => {
        setBoxes((prevBoxes) => prevBoxes.filter((v) => v.id !== id))
    }

    const handleResultCompute = async () => {
        const result = await axios.post("http://127.0.0.1:5000/computeResult", {
            boxes,
            items,
        })
        // dummy code for testing, match each box with each item
        let resData = result.data
        console.log(resData)
        for (let i = 0; i < resData.length; i++) {
            let curItems = resData[i].items
            for (let j = 0; j < curItems.length; j++) {
                const itemId = parseInt(curItems[j].itemId)
                let item = items.filter((item) => item.id === itemId)[0] // w, l, h here => x z y
                const h = item.height
                const w = item.width
                const l = item.length
                let size = [w, l, h] // w l h
                switch (parseInt(curItems[j].rt)) {
                    case 1:
                        size = [h, l, w]
                        break
                    case 2:
                        size = [l, w, h]
                        break
                    case 3:
                        // w h l => x z y
                        // h w l
                        size = [h, w, l]
                        break
                    case 4:
                        size = [w, h, l]
                        break
                    case 5:
                        // w h l => x z y
                        // l h w
                        size = [l, h, w]
                        break
                    default:
                        break
                }
                resData[i].items[j].size = size
                resData[i].items[j].posX =
                    parseFloat(resData[i].items[j].posX) +
                    parseFloat(size[0] / 2)
                resData[i].items[j].posZ =
                    parseFloat(resData[i].items[j].posZ) +
                    parseFloat(size[1] / 2)
                resData[i].items[j].posY =
                    parseFloat(resData[i].items[j].posY) +
                    parseFloat(size[2] / 2)
            }
        }
        console.log(resData)
        setResults(resData)
    }

    const handleItemSubmit = (event, width, length, height, name, id, img) => {
        event.preventDefault()
        setItems((prevItems) => [
            ...prevItems,
            {
                width: width,
                length: length,
                height: height,
                name: name === "" ? `Item ${id + 1}` : name,
                id: id,
                img: img,
                color: COLOURS[Math.floor(Math.random() * COLOURS.length)],
            },
        ])
    }

    const handleItemDelete = (id) => {
        setItems((prevItems) => prevItems.filter((v) => v.id !== id))
    }

    return (
        <Box maxHeight="100vh" height="100vh">
            <Tabs height="100%" align="center">
                <TabList height="auto">
                    <Tab>Scan Item</Tab>
                    <Tab>Input Box</Tab>
                    <Tab>View Results</Tab>
                </TabList>

                <TabPanels height="100%">
                    <TabPanel>
                        <ItemTab
                            props={{
                                items: items,
                                handleItemSubmit: handleItemSubmit,
                                handleItemDelete: handleItemDelete,
                            }}
                        />
                    </TabPanel>
                    <TabPanel height="100%">
                        <BoxTab
                            props={{
                                boxes: boxes,
                                handleBoxSubmit: handleBoxSubmit,
                                handleBoxDelete: handleBoxDelete,
                            }}
                        />
                    </TabPanel>
                    <TabPanel height="100%">
                        <ResultTab
                            props={{
                                boxes: boxes,
                                items: items,
                                results: results,
                                handleResultCompute: handleResultCompute,
                                handleBoxDelete: handleBoxDelete,
                            }}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default App
