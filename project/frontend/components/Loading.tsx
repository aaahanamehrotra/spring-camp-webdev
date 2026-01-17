'use client';
import { Box, Typography } from '@mui/material';

interface LoadingProps {
    inline?: boolean;
}

export default function Loading({ inline = false }: LoadingProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: inline ? 'auto' : '100vh',
                gap: 2,
                padding: inline ? 4 : 0,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 500,
                    color: '#1976d2',
                }}
            >
                Loading...
            </Typography>
            <Box
                sx={{
                    width: '300px',
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        height: '100%',
                        width: '30%',
                        backgroundColor: '#1976d2',
                        borderRadius: '2px',
                        animation: 'loading 1.5s linear infinite',
                        '@keyframes loading': {
                            '0%': {
                                left: '-30%',
                            },
                            '100%': {
                                left: '100%',
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

