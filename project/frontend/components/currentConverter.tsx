'use client';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Select, MenuItem, FormControl, InputLabel, Pagination } from '@mui/material';
// import { data } from '../constants/data';
import getFilteredAndSortedRates from './getFilteredAndSortedRates';
import Loading from './Loading';

export default function CurrentConverter() {
    const [selectedDate, setSelectedDate] = useState('');
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'currency' | 'rate'>('currency');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const rowsPerPage = 10;

    const fetchRates = async () => {
        setIsLoading(true);
        try {
            const date = selectedDate || new Date().toISOString().split('T')[0]; 
            const response = await fetch(
                `https://data.fixer.io/api/${date}?access_key=5dd8cd5c43e4a8470e8a448c7c027322`
            );
            const data = await response.json();

            // Simulate API delay for demonstration
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Conversion result:', data.rates);
            setRates(data.rates);
            setSearchQuery(''); // Reset search when new rates are fetched
            setPage(1); // Reset to first page when new rates are fetched
        } catch (error) {
            console.error('Error converting currency:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                padding: { xs: 4, sm: 6, md: 8 },
            }}
        >
            <Box
                sx={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        fontWeight: 600,
                        marginBottom: 2,
                        color: '#1976d2',
                        fontSize: '1.5rem',
                    }}
                >
                    Conversion Rates Dashboard
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: 2,

                    }}
                >
                    <form onSubmit={(e) => { e.preventDefault(); fetchRates(); }}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                type="date"
                                label="Date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    flexGrow: 1,
                                    minWidth: '200px',

                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="medium"
                                sx={{
                                    minWidth: '120px',
                                }}
                            >
                                Fetch Rates
                            </Button>
                        </Box>
                    </form>
                </Paper>

                {isLoading && (
                    <Box sx={{ marginBottom: 2 }}>
                        <Loading inline={true} />
                    </Box>
                )}

                {rates && !isLoading && (
                    <>
                        <Box
                            sx={{
                                marginBottom: 1.5,
                                borderRadius: 2,

                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TextField
                                    label="Search Currency Code"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setPage(1); // Reset to first page when search changes
                                    }}
                                    placeholder="e.g., USD, EUR"
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <FormControl sx={{ minWidth: '150px' }}>
                                        <InputLabel>Sort By</InputLabel>
                                        <Select
                                            value={sortBy}
                                            onChange={(e) => {
                                                setSortBy(e.target.value as 'currency' | 'rate');
                                                setPage(1); // Reset to first page when sort changes
                                            }}
                                            label="Sort By"
                                        >
                                            <MenuItem value="currency">Currency Code</MenuItem>
                                            <MenuItem value="rate">Rate</MenuItem>
        </Select>  
                                    </FormControl>
                                    <FormControl sx={{ minWidth: '150px' }}>
                                        <InputLabel>Order</InputLabel>
                                        <Select
                                            value={sortOrder}
                                            onChange={(e) => {
                                                setSortOrder(e.target.value as 'asc' | 'desc');
                                                setPage(1); // Reset to first page when sort order changes
                                            }}
                                            label="Order"
                                        >
                                            <MenuItem value="asc">Ascending</MenuItem>
                                            <MenuItem value="desc">Descending</MenuItem>
        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>

                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 2,
                                border: '1px solid #e0e0e0',
                                overflow: 'hidden',
                            }}
                        >
                            <TableContainer>
                                <Table sx={{ tableLayout: 'auto' }}>
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                backgroundColor: '#1976d2',
                                                '& th': {
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: '0.875rem',
                                                    padding: '10px 12px',
                                                },
                                            }}
                                        >
                                            <TableCell sx={{ width: '150px' }}><strong>Currency</strong></TableCell>
                                            <TableCell align="right" sx={{ paddingLeft: '8px' }}><strong>Rate</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(() => {
                                            const allRates = getFilteredAndSortedRates(rates, searchQuery, sortBy, sortOrder);
                                            
                                            if (allRates.length === 0) {
                                                return (
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="center" sx={{ padding: 4 }}>
                                                            <Typography variant="body1" sx={{ color: '#666' }}>
                                                                No entries satisfy the search
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }

                                            const totalPages = Math.ceil(allRates.length / rowsPerPage);
                                            const startIndex = (page - 1) * rowsPerPage;
                                            const endIndex = startIndex + rowsPerPage;
                                            const paginatedRates = allRates.slice(startIndex, endIndex);

                                            return (
                                                <>
                                                    {paginatedRates.map(([currency, rate], index) => (
                                                        <TableRow
                                                            key={currency}
                                                            sx={{
                                                                '&:nth-of-type(odd)': {
                                                                    backgroundColor: '#fafafa',
                                                                },
                                                                '&:hover': {
                                                                    backgroundColor: '#f0f0f0',
                                                                },
                                                                '& td': {
                                                                    borderBottom: '1px solid #e0e0e0',
                                                                    padding: '10px 12px',
                                                                    fontSize: '0.875rem',
                                                                },
                                                            }}
                                                        >
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    width: '150px',
                                                                }}
                                                            >
                                                                {currency}
                                                            </TableCell>
                                                            <TableCell
                                                                align="right"
                                                                sx={{
                                                                    fontFamily: 'monospace',
                                                                    paddingLeft: '8px',
                                                                }}
                                                            >
                                                                {rate.toLocaleString()}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </>
                                            );
                                        })()}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {(() => {
                                const allRates = getFilteredAndSortedRates(rates, searchQuery, sortBy, sortOrder);
                                
                                if (allRates.length === 0) {
                                    return null; // Don't show pagination when there are no results
                                }
                                
                                const totalPages = Math.ceil(allRates.length / rowsPerPage);
                                
                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: 1.5,
                                            borderTop: '1px solid #e0e0e0',
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Page {page} of {totalPages || 1}
                                        </Typography>
                                        <Pagination
                                            count={totalPages || 1}
                                            page={page}
                                            onChange={(event, value) => setPage(value)}
                                            color="primary"
                                            showFirstButton
                                            showLastButton
                                        />
                                    </Box>
                                );
                            })()}
                        </Paper>
                    </>
                )}
            </Box>
        </Box>
    );
}
