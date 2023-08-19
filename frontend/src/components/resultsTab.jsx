import {
    Box,
    Flex,
    Stack,
    Button,
    Grid,
    Input,
    GridItem,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    VStack,
    Center,
    Heading,
} from "@chakra-ui/react";

import React, { useState } from "react";
import BoxCard from "./boxCard";
import BinCanvas from "./BinCanvas";
import ResultCard from "./resultCard";
const boxes3d = [
    {
        transparent: true,
        position: [0, 0, 0],
        size: [5, 5, 5],
        color: "grey",
    },
    {
        transparent: false,
        position: [0, 0, 0],
        size: [1, 1, 1],
        color: "red",
    },
];

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
            <GridItem>
                <Button>Compute Results</Button>
                {/* <BinCanvas boxes={boxes3d} /> */}
            </GridItem>
        </Grid>
    );
}

export default ResultsTab;
