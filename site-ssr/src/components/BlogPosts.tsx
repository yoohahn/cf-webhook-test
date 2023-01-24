import { Stack, Skeleton, Grid, Typography } from "@mui/material";
import { useGetContent } from "./api/useGetContent";

const CIRCLE_SIZE = 3;
export const BlogPosts: React.FC<{ update: number }> = ({ update }) => {
  const content = useGetContent(update, true);
  const posts = content.status !== "DONE" ? Array.from(new Array(2)) : content.posts;
  return (
    <>
      {posts.map((post: Model.BlogPost, idx) => {
        return (
          <Grid container spacing={1} marginBottom={1} key={idx}>
            <Grid
              item
              xs={CIRCLE_SIZE}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {post == null ? (
                <Skeleton variant="rounded" width="100%" height="100%" />
              ) : (
                <img
                  css={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt={post.image.alt}
                  src={`${post.image.src}`}
                />
              )}
            </Grid>
            <Grid item xs={12 - CIRCLE_SIZE}>
              <Stack spacing={1}>
                {post == null ? (
                  <>
                    <Skeleton variant="rounded" height={60} />
                    <Skeleton variant="rounded" height={60} />
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontWeight: "bold" }} variant="body2" component="h3" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="caption">{post.description}</Typography>
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
