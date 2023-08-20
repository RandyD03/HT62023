import { Button, Grid, GridItem } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import BinCanvas from "./BinCanvas"
import BoxCard from "./boxCard"
import ResultCard from "./resultCard"

const COLOURS = ["red", "blue", "yellow", "green", "orange", "brown", "purple"]
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
    const [currentBin, setCurrentBin] = useState()
    const [currentItems, setCurrentItems] = useState([])

    useEffect(() => {
        // global store of all items and boxes, passed from App.js
        let items = props.items
        let boxes = props.boxes
        let results = props.results
        let rows = []

        if (props.results.length > 0) {
            setCurrentBin(
                props.boxes.filter(
                    (box) => box.id === props.results[0].boxId
                )[0]
            )
            setCurrentItems(props.results[0].items)
        }

        // transform the above data structure into the following format for displaying
        // {
        //     box: box object
        //     items: [item objects]
        // }
        results.forEach((result) => {
            const boxId = parseInt(result["boxId"])
            let row = {
                box: boxes.filter((box) => box.id === boxId)[0],
                items: [],
            }
            result.items.forEach((item) => {
                const itemId = parseInt(item["itemId"])
                row["items"].push(items.filter((item) => item.id === itemId)[0])
            })
            rows.push(row)
        })
        setSanitizedResults(rows)
        console.log(rows)
    }, [props.results])
    return (
        <Grid templateColumns="2fr 1fr" height="100%" gap={2}>
            <GridItem overflowX="scroll">
                <Grid gap={4}>
                    {sanitizedResults.map((result) => (
                        <GridItem>
                            <ResultCard
                                props={{
                                    box: result.box,
                                    items: result.items,
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
                <BinCanvas bin={currentBin} items={currentItems} />
            </div>
        </Grid>
    )
}

export default ResultsTab
