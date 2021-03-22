import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import { useState } from 'react';
import Footer from './footer';
import UsersList from './user-list';

export default function Content() {
    // Declare a new state variable
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const onSearchChange = (e) => setSearch(e.target.value);
    const onSortByChange = (e) => setSortBy(e.target.value);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
            bgcolor="grey.200"
            minHeight="100vh"
        >
            <Box mt={5} bgcolor="white" boxShadow={3} width="50%">
                <Box px={3} width="100%">
                    <h2>Users Dashboard</h2>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} px={5}>
                            <FormControl style={{ width: 100 + '%' }}>
                                <TextField
                                    label="Search..."
                                    onChange={onSearchChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} px={5}>
                            <FormControl style={{ width: 100 + '%' }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sortBy}
                                    onChange={onSortByChange}
                                >
                                    <MenuItem value="name">Name</MenuItem>
                                    <MenuItem value="username">
                                        {' '}
                                        Username{' '}
                                    </MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <UsersList search={search} sortBy={sortBy} />
            </Box>

            <Footer />
        </Box>
    );
}
