import {
    Badge,
    Box,
    Button,
    Card,
    Flex,
    HStack,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import BoxCard from "./boxCard"
import ItemCard from "./itemCard"
import { SiWebpack } from "react-icons/si"

function ResultCard({ props }) {
    const [totBoxVolume, setTotBoxVolume] = useState(0.0)
    const [totItemVolume, setTotItemVolume] = useState(0.0)
    useState(() => {
        setTotBoxVolume(
            Math.round(props.box.length * props.box.height * props.box.width)
        )
        let totVol = 0
        props.items.forEach((item) => {
            totVol +=
                parseFloat(item.length) *
                parseFloat(item.width) *
                parseFloat(item.height)
        })
        setTotItemVolume(Math.round(totVol))
    })
    return (
        <Box>
            <Card
                direction={{ base: "column", sm: "row" }}
                variant="outline"
                p="4"
            >
                <HStack overflowX="scroll" spacing={2}>
                    <VStack spacing={0} textAlign="left" height="100%" pr="4">
                        <Stat>
                            <StatLabel>
                                <Badge>Total Volume</Badge>
                            </StatLabel>
                            <StatNumber>
                                {totBoxVolume}cm<sup>3</sup>
                            </StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <Badge colorScheme="green">Volume Used</Badge>
                            </StatLabel>
                            <StatNumber>
                                {totItemVolume}cm<sup>3</sup>
                            </StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>
                                <Badge colorScheme="red">Volume Empty</Badge>
                            </StatLabel>
                            <StatNumber>
                                {totBoxVolume - totItemVolume}cm<sup>3</sup>
                            </StatNumber>
                        </Stat>
                        <Button leftIcon={<SiWebpack />}>View in 3d</Button>
                    </VStack>
                    <BoxCard
                        props={{
                            box: props.box,
                        }}
                    />
                    {props.items.map((item) => (
                        <ItemCard
                            props={{
                                item: item,
                            }}
                        />
                    ))}
                </HStack>
            </Card>
        </Box>
    )
}

export default ResultCard
