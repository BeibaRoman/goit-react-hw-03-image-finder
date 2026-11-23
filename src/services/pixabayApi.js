const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "36833134-be534b8a8a704feb8c4d9a967";
export const PER_PAGE = 12;

export const fetchImages = (query, page) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    page,
    per_page: PER_PAGE,
    image_type: "photo",
    orientation: "horizontal",
  });

  return fetch(`${BASE_URL}?${params}`).then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error("Failed to fetch images"));
    }
    return response.json();
  });
};
