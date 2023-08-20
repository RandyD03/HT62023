import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Center,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    HStack,
    Heading,
    IconButton,
    Image,
    ListItem,
    NumberInput,
    Stack,
    Text,
    UnorderedList,
    useEditableControls,
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"

import { useState } from "react"

function ItemCard({ props }) {
    return (
        <Card boxShadow="lg" height="100%">
            <Center h="100%">
                <Image
                    src={props.item.img}
                    borderRadius="dark-lg"
                    minWidth="100px"
                    maxWidth="100%"
                />
            </Center>
            <CardBody>
                <Stack spacing="3" textAlign="left">
                    <Heading size="md">{props.item.name}</Heading>
                    <Flex flexDir="column" width="100%">
                        <Box>
                            <Badge>Length</Badge>{" "}
                            {Math.round(props.item.length * 10) / 10} cm
                        </Box>
                        <Box>
                            <Badge>Width</Badge>{" "}
                            {Math.round(props.item.height * 10) / 10} cm
                        </Box>
                        <Box>
                            <Badge>Height</Badge>{" "}
                            {Math.round(props.item.width * 10) / 10} cm
                        </Box>
                    </Flex>
                </Stack>
            </CardBody>
            <CardFooter>
                {props.handleItemDelete === undefined ? (
                    ""
                ) : (
                    <HStack spacing={2}>
                        <Button
                            variant="solid"
                            colorScheme="red"
                            flex="1"
                            onClick={() =>
                                props.handleItemDelete(props.item.id)
                            }
                            leftIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </HStack>
                )}
            </CardFooter>
        </Card>
    )
}

export default ItemCard
