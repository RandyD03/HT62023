import { Button, Grid, GridItem } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import BinCanvas from "./BinCanvas"
import BoxCard from "./boxCard"
import ResultCard from "./resultCard"

const boxes3d = [
    {
        transparent: true,
        position: [0, 0, 0],
        size: [3, 5, 5],
        color: "grey",
    },
    {
        transparent: false,
        position: [0, 0, 0],
        size: [1, 1, 1],
        color: "red",
    },
    {
        transparent: false,
        position: [0, 1, 0],
        size: [1, 1, 1],
        color: "green",
    },
    {
        transparent: false,
        position: [0, 1.5, 1],
        size: [1, 1, 1],
        color: "blue",
    },
]

// results data structure format
// [
//     {
//       boxId: int,
//       items: [
//         {
//           itemId: int,
//           posX: float,
//           posY: float,
//           posZ: float
//         },
//         ...
//       ]
//   },
//   ...
// ]
function ResultsTab({ props }) {
    const [sanitizedResults, setSanitizedResults] = useState([])
    useEffect(() => {
        console.log("results use effect")
        // global store of all items and boxes, passed from App.js
        console.log(props)
        let items = props.items
        let boxes = props.boxes
        let results = props.results
        let rows = []
        // transform the above data structure into the following format for displaying
        // {
        //     box: box object
        //     items: [item objects]
        // }
        results.forEach((result) => {
            const boxId = parseInt(result["boxId"])
            let row = { box: boxes[boxId], items: [] }
            result.items.forEach((item) => {
                const itemId = parseInt(item["itemId"])
                row["items"].push(items[itemId])
            })
            rows.push(row)
        })
        setSanitizedResults(rows)
    }, [props.results])
    return (
        <Grid templateColumns="2fr 1fr" height="100%" gap={2}>
            <GridItem overflowX="scroll">
                {/* {props.boxes.length == 0 ? (
                    <Center height="100%">
                        <Heading color="blackAlpha.300">
                            No results computed yet
                        </Heading>
                    </Center>
                ) : (
                    <Grid
                        gap={4}
                        p="10"
                        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                        overflowY="scroll"
                        maxHeight="100vh"
                    >
                        {props.boxes.map((box) => (
                            <BoxCard
                                props={{
                                    box: box,
                                    handleBoxDelete: props.handleBoxDelete,
                                }}
                            />
                        ))}
                    </Grid>
                )} */}
                <Grid gap={4}>
                    {sanitizedResults.map((result) => (
                        <GridItem>
                            <ResultCard
                                props={{
                                    box: result.box,
                                    items: result.items,
                                    handleBoxDelete: props.handleBoxDelete,
                                    handleItemDelete: props.handleItemDelete,
                                }}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </GridItem>
            <div>
                <Button width="100%" onClick={props.handleResultCompute}>
                    Compute Results
                </Button>
                {/* <BinCanvas boxes={boxes3d} /> */}
            </div>
        </Grid>
    )
}

export default ResultsTab
