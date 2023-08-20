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

function ItemCard({ props }) {
    return (
        <Card boxShadow="lg">
            <Center h="100%" p="8">
                <Image
                    src={props.image}
                    borderRadius="dark-lg"
                    minWidth="100px"
                    maxWidth="100px"
                />
            </Center>
            <CardBody>
                <Stack spacing="3">
                    <Heading size="md">{props.item.name}</Heading>
                    <UnorderedList>
                        <ListItem>Length: {props.item.length}</ListItem>
                        <ListItem>Height: {props.item.height}</ListItem>
                        <ListItem>Width: {props.item.width}</ListItem>
                    </UnorderedList>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => props.handleItemDelete(props.item.id)}
                    leftIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ItemCard
