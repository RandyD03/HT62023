import { Button, Grid, GridItem } from "@chakra-ui/react"
import React, { useState } from "react"

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

function ResultsTab({ props }) {
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
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <ResultCard
                            props={{
                                boxes: props.boxes,
                                items: props.items,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    </GridItem>

                    {/* {props.boxes.map((box) => (
                        <BoxCard
                            props={{
                                box: box,
                                handleBoxDelete: props.handleBoxDelete,
                            }}
                        />
                    ))} */}
                </Grid>
            </GridItem>
            <div>
                <Button width="100%" onClick={props.handleResultCompute}>Compute Results</Button>
                <BinCanvas boxes={boxes3d} results={props.results} />
            </div>
        </Grid>
    )
}

export default ResultsTab
