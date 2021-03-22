const userAttrMatcher = (field, search) => field.toLowerCase().includes(search);

export const userFilterIteratee = (user, search) => {
    if (!search) {
        return true;
    }
    return (
        userAttrMatcher(user.name, search) ||
        userAttrMatcher(user.email, search) ||
        userAttrMatcher(user.username, search)
    );
};

export const userSorter = (a, b, field) => {
    const x = a[field];
    const y = b[field];

    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
};
