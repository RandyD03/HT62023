import {
    Card,
    Stack,
    Heading,
    Text,
    CardBody,
    CardFooter,
    Button,
    Image,
    Center,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import boxLogo from "../images/box.png";

function BoxCard({ props }) {
    return (
        <Card boxShadow="lg">
            <Center h="100%" p="8">
                <Image
                    src={boxLogo}
                    alt="Green double couch with wooden legs"
                    borderRadius="dark-lg"
                    width="100px"
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
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}

export default BoxCard;
