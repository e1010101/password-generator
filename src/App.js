import "./App.css";
import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  CheckboxGroup,
  ChakraProvider,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import theme from "./theme";

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function App() {
  const [checkedItems, setCheckedItems] = React.useState([true, true, true]);
  const [password, setPassword] = React.useState("password");
  const [value, setValue] = React.useState(16);
  const handleChange = (value) => setValue(value);

  return (
    <ChakraProvider theme={theme}>
      <Box
        className="container"
        background="white"
        color="black"
        padding="3rem"
        borderRadius="1rem"
        border="2px solid black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        width="4xl"
      >
        <Text
          fontSize="5xl"
          padding="1rem"
          alignItems="center"
          wordBreak="break-all"
        >
          {password}
        </Text>
        <SimpleGrid
          columns={1}
          spacing={10}
          width="100%"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Flex width="100%">
            <NumberInput
              maxW="100px"
              mr="2rem"
              defaultValue={16}
              min={8}
              max={64}
              value={value}
              onChange={handleChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              flex="1"
              focusThumbOnChange={false}
              value={value}
              onChange={handleChange}
              defaultValue={16}
              min={8}
              max={64}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={value} />
            </Slider>
          </Flex>
          <Flex flexDir="column">
            <Checkbox
              defaultChecked
              isChecked={checkedItems[0]}
              margin="0.5rem"
              onChange={(e) =>
                setCheckedItems([
                  e.target.checked,
                  checkedItems[1],
                  checkedItems[2],
                ])
              }
            >
              <Text fontSize="2xl">Include Uppercase</Text>
            </Checkbox>
            <Checkbox
              defaultChecked
              isChecked={checkedItems[1]}
              margin="0.5rem"
              onChange={(e) =>
                setCheckedItems([
                  checkedItems[0],
                  e.target.checked,
                  checkedItems[2],
                ])
              }
            >
              <Text fontSize="2xl">Include Numbers</Text>
            </Checkbox>
            <Checkbox
              defaultChecked
              isChecked={checkedItems[2]}
              margin="0.5rem"
              onChange={(e) =>
                setCheckedItems([
                  checkedItems[0],
                  checkedItems[1],
                  e.target.checked,
                ])
              }
            >
              <Text fontSize="2xl">Include Symbols</Text>
            </Checkbox>
          </Flex>
        </SimpleGrid>
        <Button
          marginTop="1rem"
          size="lg"
          width="100%"
          onClick={() =>
            setPassword(
              generatePassword(
                value,
                checkedItems[0],
                checkedItems[1],
                checkedItems[2]
              )
            )
          }
        >
          Generate Password
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
