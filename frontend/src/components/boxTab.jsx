import {
    Box,
    Flex,
    Spacer,
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
import { AddIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import BoxCard from "./boxCard";

function BoxTab({ props }) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [length, setLength] = useState(0);
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    return (
        <Grid templateColumns="6fr 4fr" height="100%" gap={2}>
            <GridItem>
                {props.boxes.length == 0 ? (
                    <Center height="100%">
                        <Heading color="blackAlpha.300">
                            No boxes created
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
                        {props.boxes.map((box) => (
                            <BoxCard
                                props={{
                                    box: box,
                                    handleBoxDelete: props.handleBoxDelete,
                                }}
                            />
                        ))}
                    </Grid>
                )}
            </GridItem>
            <GridItem>
                <Flex flexDir="column" height="100%" alignContent="flex-start">
                    <VStack width="100%">
                        <Input
                            placeholder="Name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            value={name}
                        />
                        <NumberInput
                            onChange={(length) => setLength(length)}
                            value={length}
                            width="100%"
                        >
                            <NumberInputField placeholder="Length" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <NumberInput
                            onChange={(width) => setWidth(width)}
                            value={width}
                            width="100%"
                        >
                            <NumberInputField placeholder="Width" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <NumberInput
                            onChange={(height) => setHeight(height)}
                            value={height}
                            width="100%"
                        >
                            <NumberInputField placeholder="Height" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Button
                            width="100%"
                            colorScheme="teal"
                            onClick={(e) => {
                                props.handleBoxSubmit(
                                    e,
                                    width,
                                    length,
                                    height,
                                    name,
                                    id
                                );
                                setName("");
                                setLength(0);
                                setWidth(0);
                                setHeight(0);
                                setId((id) => id + 1);
                            }}
                            leftIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </VStack>
                </Flex>
            </GridItem>
        </Grid>
    );
}

export default BoxTab;
