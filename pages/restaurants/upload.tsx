import { Button, FormControl, FormLabel, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Layout } from "../../components/Layout";
import { useUploadRestaurants } from "../../hooks/restaurants";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadRestaurants();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (uploadMutation.isLoading) return;

    const file = fileInputRef?.current?.files?.[0];
    if (!file) return;

    const fileSizeInMb = Number((file.size / 1024 / 1024).toFixed(2)); // MB

    if (fileSizeInMb > 10) {
      return alert(
        `Current file is ${fileSizeInMb}MB in size. Api can only handle files smaller than 10MB`
      );
    }

    uploadMutation.mutate(file);
  }

  useEffect(() => {
    if (uploadMutation.isSuccess) {
      alert(
        "Your file has been correctly updated. You can go check it out on Home of Search pages"
      );
    }
  }, [uploadMutation.isSuccess]);

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <VStack gap={6}>
          <Text fontSize="lg" fontWeight="bold">
            You can upload a file of up to 10MB and it will replace current
            content on Agolia index
          </Text>

          <FormControl isRequired>
            <FormLabel htmlFor="file">File</FormLabel>
            <input
              ref={fileInputRef}
              type="file"
              id="file"
              name="file"
              accept=".json"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="pink"
            isLoading={uploadMutation.isLoading}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Layout>
  );
}
