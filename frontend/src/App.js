import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import axios from "axios"

import BoxTab from "./components/boxTab"
import ItemTab from "./components/itemTab"
import ResultTab from "./components/resultsTab"

function App() {
    const [boxes, setBoxes] = useState([])
    const [items, setItems] = useState([])
    const [results, setResults] = useState([])

    const handleBoxSubmit = (event, width, length, height, name, id) => {
        event.preventDefault()
        setBoxes((prevBoxes) => [
            ...prevBoxes,
            {
                width: width,
                length: length,
                height: height,
                name: name === "" ? `Box ${id + 1}` : name,
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

        console.log(result.data);
        let localResults = []
        let itemCnt = items.length - 1
        for (let i = 0; i < boxes.length; i++) {
            // still items to add
            if (i < items.length) {
                localResults.push({
                    boxId: boxes[i].id,
                    items: [
                        {
                            itemId: items[i].id,
                        },
                    ],
                })
            }
        }

        setResults(result.data);
    }

    const handleItemSubmit = (event, width, length, height, name, id) => {
        event.preventDefault()
        setItems((prevItems) => [
            ...prevItems,
            {
                width: width,
                length: length,
                height: height,
                name: name === "" ? `Item ${id + 1}` : name,
                id: id,
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
