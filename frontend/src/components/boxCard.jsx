import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Center,
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
        <Card boxShadow="lg">
            <Center h="100%" p="8">
                <Image
                    src={boxLogo}
                    alt="Green double couch with wooden legs"
                    borderRadius="dark-lg"
                    minWidth="100px"
                    maxWidth="100px"
                />
            </Center>
            <CardBody>
                <Stack spacing="3">
                    <Heading size="md">{props.box.name}</Heading>
                    <Text>
                        <UnorderedList>
                            <ListItem>Length: {props.box.length}</ListItem>
                            <ListItem>Height: {props.box.height}</ListItem>
                            <ListItem>Width: {props.box.width}</ListItem>
                        </UnorderedList>
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => props.handleBoxDelete(props.box.id)}
                    leftIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default BoxCard
