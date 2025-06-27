import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
} from '@mui/material';

type User = {
    id: number;
    name: string;
    email: string;
};

type UsersProps = {
    users: User[];
};

const UsersTable: React.FC<UsersProps> = ({ users }) => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                ユーザー一覧
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>名前</TableCell>
                            <TableCell>メールアドレス</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UsersTable;
