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
    NumberInput,
    NumberInputField,
    VStack,
} from "@chakra-ui/react"
import React, { useState } from "react"

import { AddIcon } from "@chakra-ui/icons"
import BoxCard from "./boxCard"

function BoxTab({ props }) {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [length, setLength] = useState(0)
    const [name, setName] = useState("")
    const [id, setId] = useState(0)
    return (
        <Grid templateColumns="2fr 1fr" height="100%" gap={2}>
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
                        templateColumns="repeat(3, 1fr)"
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
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="My Box 1"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                value={name}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Length</FormLabel>
                            <NumberInput
                                onChange={(length) => setLength(length)}
                                value={length}
                                width="100%"
                            >
                                <NumberInputField placeholder="Length" />
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Width</FormLabel>
                            <NumberInput
                                onChange={(width) => setWidth(width)}
                                value={width}
                                width="100%"
                            >
                                <NumberInputField placeholder="Width" />
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Height</FormLabel>
                            <NumberInput
                                onChange={(height) => setHeight(height)}
                                value={height}
                                width="100%"
                            >
                                <NumberInputField placeholder="Height" />
                            </NumberInput>
                        </FormControl>
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
                                )
                                setName("")
                                setLength(0)
                                setWidth(0)
                                setHeight(0)
                                setId((id) => id + 1)
                            }}
                            leftIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </VStack>
                </Flex>
            </GridItem>
        </Grid>
    )
}

export default BoxTab
