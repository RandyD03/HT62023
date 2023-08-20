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

function ItemCard({ props }) {
    return (
        <Card boxShadow="lg" height="100%">
            <Center h="100%" p="8">
                <Image
                    src={props.image}
                    borderRadius="dark-lg"
                    minWidth="100px"
                    maxWidth="100px"
                />
            </Center>
            <CardBody>
                <Stack spacing="3" textAlign="left">
                    <Heading size="md">{props.item.name}</Heading>
                    <Flex flexDir="column" width="100%">
                        <Box>
                            <Badge>Length</Badge> {props.item.length} m
                        </Box>
                        <Box>
                            <Badge>Width</Badge> {props.item.height} m
                        </Box>
                        <Box>
                            <Badge>Height</Badge> {props.item.width} m
                        </Box>
                    </Flex>
                </Stack>
            </CardBody>
            <CardFooter>
                {props.handleItemDelete === undefined ? (
                    ""
                ) : (
                    <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={() => props.handleItemDelete(props.item.id)}
                        leftIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default ItemCard
