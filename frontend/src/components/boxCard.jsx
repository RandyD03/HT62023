import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Center,
    Flex,
    Heading,
    Image,
    ListItem,
    Stack,
    Text,
    UnorderedList,
} from "@chakra-ui/react"

import { DeleteIcon } from "@chakra-ui/icons"
import boxLogo from "../images/box.png"

function BoxCard({ props }) {
    return (
        <Card boxShadow="lg" height="100%">
            <Center h="100%" p="8">
                <Image
                    src={boxLogo}
                    borderRadius="dark-lg"
                    minWidth="100px"
                    maxWidth="100px"
                />
            </Center>
            <CardBody>
                <Stack spacing="3" textAlign="left">
                    <Heading size="md">{props.box.name}</Heading>
                    <Flex flexDir="column" width="100%">
                        <Box>
                            <Badge>Length</Badge> {props.box.length} m
                        </Box>
                        <Box>
                            <Badge>Width</Badge> {props.box.height} m
                        </Box>
                        <Box>
                            <Badge>Height</Badge> {props.box.width} m
                        </Box>
                    </Flex>
                </Stack>
            </CardBody>
            <CardFooter>
                {props.handleBoxDelete === undefined ? (
                    ""
                ) : (
                    <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={() => props.handleBoxDelete(props.box.id)}
                        leftIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default BoxCard
