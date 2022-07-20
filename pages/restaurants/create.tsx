import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useRef } from "react";
import { Layout } from "../../components/Layout";
import { useCreateRestaurant } from "../../hooks/restaurants";

export default function CreateRestaurantPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const createMutation = useCreateRestaurant();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (createMutation.isLoading) return;
    const formData = new FormData(formRef.current!);
    createMutation.mutate(formData);
  }

  useEffect(() => {
    if (createMutation.isSuccess) {
      formRef.current?.reset();
      alert("Your restaurant has been created");
    }
  }, [createMutation.isSuccess]);

  return (
    <Layout>
      <form onSubmit={handleSubmit} ref={formRef}>
        <VStack gap={6}>
          <VStack gap={2} w="100%">
            <Text fontSize="2xl" fontWeight="bold">
              Create a new restaurant !
            </Text>
            <Text fontSize="xl" fontWeight="semibold" alignSelf="flex-start">
              Restaurant Details
            </Text>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  name="name"
                  id="name"
                  defaultValue="My super duper restaurant"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="food_type">Food type</FormLabel>
                <Input
                  name="food_type"
                  id="food_type"
                  defaultValue="super value"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="dining_style">Dining style</FormLabel>
                <Input
                  name="dining_style"
                  id="dining_style"
                  defaultValue="super value"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="stars_count">Review</FormLabel>
                <NumberInput
                  min={0}
                  max={5}
                  step={0.1}
                  name="stars_count"
                  id="stars_count"
                  defaultValue={4.3}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Grid>
          </VStack>

          <VStack gap={2} w="100%">
            <Text fontSize="xl" fontWeight="semibold" alignSelf="flex-start">
              Practical Information
            </Text>

            <FormControl isRequired>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <Input
                minLength={8}
                name="phone"
                id="phone"
                defaultValue="+33123456789"
              />
            </FormControl>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <FormControl isRequired>
                <FormLabel htmlFor="address">Address: </FormLabel>
                <Input
                  name="address"
                  id="address"
                  defaultValue="123 unicorn street"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="neighborhood">Neighborhood:</FormLabel>
                <Input
                  name="neighborhood"
                  id="neighborhood"
                  defaultValue="Cool place"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="postal_code">Postal_code:</FormLabel>
                <Input
                  name="postal_code"
                  id="postal_code"
                  defaultValue="12345"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="city">City: </FormLabel>
                <Input name="city" id="city" defaultValue="Gotham City" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="area">Area: </FormLabel>
                <Input name="area" id="area" defaultValue="XX" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="state">State: </FormLabel>
                <Input name="state" id="state" defaultValue="BatState" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="country">Country: </FormLabel>
                <Input name="country" id="country" defaultValue="US" />
              </FormControl>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <FormControl isRequired>
                <FormLabel htmlFor="lat">Latitude</FormLabel>
                <NumberInput
                  precision={3}
                  step={0.001}
                  min={-90}
                  max={90}
                  name="lat"
                  id="lat"
                  defaultValue={42.0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="lng">Longitude</FormLabel>
                <NumberInput
                  precision={3}
                  step={0.001}
                  min={-180}
                  max={180}
                  name="lng"
                  id="lng"
                  defaultValue={42.0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Grid>
          </VStack>

          <VStack gap={2} w="100%">
            <Text fontSize="xl" fontWeight="semibold" alignSelf="flex-start">
              Payment Info
            </Text>

            <FormControl isRequired>
              <FormLabel htmlFor="price">Price</FormLabel>
              <RadioGroup name="price">
                {/* Hacky solution because Chakra Radio don't work in uncontrolled forms... */}
                <HStack gap={6}>
                  {[1, 2, 3, 4].map((price) => {
                    const symbol = "$".repeat(price);
                    return (
                      <div key={symbol}>
                        <input
                          type="radio"
                          name="price"
                          value={price}
                          id={symbol}
                          required
                        />
                        <label htmlFor={symbol}> {symbol}</label>
                      </div>
                    );
                  })}
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="price_range">Price range</FormLabel>
              <RadioGroup name="price_range">
                {/* Hacky solution because Chakra Radio don't work in uncontrolled forms... */}
                <HStack gap={6}>
                  {["$30 and under", "$30 to $50", "$50 and more"].map(
                    (value) => (
                      <div key={value}>
                        <input
                          type="radio"
                          name="price_range"
                          value={value}
                          id={value}
                          required
                        />
                        <label htmlFor={value}> {value}</label>
                      </div>
                    )
                  )}
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="payment_options">
                Accepted payment methods
              </FormLabel>
              <HStack gap={6}>
                {["Cash", "Visa", "Mastercard", "AMEX"].map((option) => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      name="payment_options"
                      value={option}
                      id={option}
                      multiple
                    />
                    <label htmlFor={option}> {option}</label>
                  </div>
                ))}
              </HStack>
            </FormControl>
          </VStack>

          <Button
            colorScheme="pink"
            type="submit"
            isLoading={createMutation.isLoading}
          >
            Submit form
          </Button>
        </VStack>
      </form>
    </Layout>
  );
}
