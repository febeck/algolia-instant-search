import { useMutation } from "@tanstack/react-query";

export function useDeleteRestaurant() {
  function deleteRestaurant(objectID: string) {
    return fetch(`/api/algolia/delete/${objectID}`, {
      method: "DELETE",
    });
  }

  return useMutation(deleteRestaurant);
}

export function useCreateRestaurant() {
  function createRestaurant(formData: FormData) {
    return fetch("/api/algolia/create", {
      method: "POST",
      // @ts-ignore
      body: new URLSearchParams([...formData.entries()]),
    });
  }

  return useMutation(createRestaurant);
}

export function useUploadRestaurants() {
  async function uploadRestaurants(file: File) {
    const body = await file.text();
    return fetch("/api/algolia/upload", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return useMutation(uploadRestaurants);
}
