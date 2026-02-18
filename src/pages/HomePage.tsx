import { Box, Button, Container, Paper, Stack } from "@mui/material";
import { Title } from "../components/Title";
import { Link } from "react-router";

export default function HomePage() {
  return <Container>
    <Stack alignItems='center' height='100%'>
      <Box p={2} width='100%'>
        <Paper >
          <Stack p={2} gap={2} alignItems='center'>
            <Title>Welcome to Hans Mini Forum!</Title>
            <Link to='/post'>
              <Button>Go To Posts</Button>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  </Container>
}