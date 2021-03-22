import { Divider, Grid, Icon, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import useSWR from 'swr';
import { userFilterIteratee, userSorter } from './utility';

export default function UsersList(props) {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error } = useSWR(
        'http://jsonplaceholder.typicode.com/users',
        fetcher
    );

    if (error) return <div>failed to load users</div>;
    if (!data) return <Skeleton animation="wave" />;

    const sortBy = props.sortBy;
    const search = props.search.toLowerCase().trim();

    const users = data.filter((user) => userFilterIteratee(user, search));
    users.sort((a, b) => userSorter(a, b, sortBy));

    const list = users.map((user, i) => (
        <React.Fragment key={user.email}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Icon>account_circle</Icon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {user.username}
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{ textAlign: 'right' }}
                            >
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    <a href={'mailto:' + user.email}>
                                        {user.email}
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    ));

    return <List style={{ width: '100%', height: '500' }}>{list}</List>;
}
