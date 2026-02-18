import { Box, ButtonGroup, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export function TestUI() {
    return <Box>
        <ButtonGroup variant="text" aria-label="Basic button group">
            <Button color="secondary">Secondary</Button>
        <Button variant="contained" color="success">
            Success
        </Button>
        <Button variant="outlined" color="error" >
            <DeleteIcon />
            Error
        </Button>
        </ButtonGroup>
    </Box>
}