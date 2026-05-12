import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchGlobalArticles = async () => {
  const response = await axiosInstance.get("/api/articles", {
    params: {
      limit: 10,
      offset: 0,
    },
  });
  return response.data;
};

export const fetchFeedArticles = async () => {
  const response = await axiosInstance.get("/api/articles/feed", {
    params: { limit: 10, offset: 0 },
  });
  return response.data;
};
