export const API_BASE = "http://localhost:5000/api";
export const API_HOST = "http://localhost:5000";

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const authHeaders = () => {
  const user = getStoredUser();
  const token = user?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const requestJson = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
};

export const resolveImageUrl = (value?: string) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:")) {
    return value;
  }
  if (value.startsWith("/uploads/")) {
    return `${API_HOST}${value}`;
  }
  return `${API_HOST}/uploads/${value}`;
};

export const placeholderImageFromTitle = (title: string) =>
  `https://placehold.co/640x360/f4f4f5/18181b?text=${encodeURIComponent((title || "WREAD").slice(0, 40))}`;

export const mapPostToArticle = (post: any) => ({
  id: post._id,
  title: post.title,
  subtitle: post.subtitle || "",
  content: post.content || "",
  coverImage: resolveImageUrl(post.coverImage || post.image || ""),
  tags: post.tags || [],
  likes: post.likesCount ?? post.likes?.length ?? 0,
  comments: post.commentCount ?? 0,
  publishDate: post.createdAt,
  readTime: post.readingTime || 1,
  author: {
    id: post.author?._id || post.userId,
    name: post.author?.username || post.authorName || "Author",
    avatar: post.author?.profilePicture || "",
    bio: post.author?.bio || "",
    followers: post.author?.followers?.length || 0,
    following: post.author?.following?.length || 0,
  },
});
