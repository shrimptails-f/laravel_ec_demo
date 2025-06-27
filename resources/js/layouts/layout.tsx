import { ReactNode } from 'react';
import * as PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            {/* ヘッダー */}
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            MyApp
                        </Typography>
                        <Button color="inherit" component={Link} href="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} href="/about">
                            About
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            href="/contact"
                        >
                            Contact
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* コンテンツ */}
            <Container sx={{ mt: 4 }}>{children}</Container>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
