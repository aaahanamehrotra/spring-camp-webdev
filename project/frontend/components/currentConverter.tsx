'use client';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { data } from '../constants/data';

export default function CurrentConverter() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [selectedDate, setSelectedDate] = useState('');
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'currency' | 'rate'>('currency');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleConvert = async () => {
        try {
            const date = selectedDate || new Date().toISOString().split('T')[0]; 
            // const response = await fetch(
            //     `https://data.fixer.io/api/${date}?access_key=5dd8cd5c43e4a8470e8a448c7c027322`
            // );
            // const data = await response.json();

            console.log('Conversion result:', data.rates);
            setRates(data.rates);
            setSearchQuery(''); // Reset search when new rates are fetched
        } catch (error) {
            console.error('Error converting currency:', error);
        }
    };

    // Filter and sort the rates
    const getFilteredAndSortedRates = () => {
        if (!rates) return [];

        let entries = Object.entries(rates);

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toUpperCase();
            entries = entries.filter(([currency]) => 
                currency.toUpperCase().includes(query)
            );
        }

        // Sort the entries
        entries.sort((a, b) => {
            let comparison = 0;
            
            if (sortBy === 'currency') {
                comparison = a[0].localeCompare(b[0]);
            } else {
                comparison = a[1] - b[1];
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return entries;
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                padding: { xs: 2, sm: 3, md: 4 },
            }}
        >
            <Box
                sx={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 600,
                        marginBottom: 3,
                        color: '#1976d2',
                    }}
                >
                    Currency Converter Dashboard
                </Typography>

                <Paper
                    elevation={3}
                    sx={{
                        padding: 3,
                        marginBottom: 3,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <form onSubmit={(e) => { e.preventDefault(); handleConvert(); }}>
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
                                size="large"
                                sx={{
                                    minWidth: '120px',
                                    height: '56px',
                                }}
                            >
                                Fetch Rates
                            </Button>
                        </Box>
                    </form>
                </Paper>

                {rates && (
                    <>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 2,
                                marginBottom: 2,
                                borderRadius: 2,
                                border: '1px solid #e0e0e0',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    label="Search Currency Code"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="e.g., USD, EUR"
                                    sx={{
                                        flexGrow: 1,
                                        minWidth: '200px',
                                    }}
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
                                            onChange={(e) => setSortBy(e.target.value as 'currency' | 'rate')}
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
                                            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                            label="Order"
                                        >
                                            <MenuItem value="asc">Ascending</MenuItem>
                                            <MenuItem value="desc">Descending</MenuItem>
        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Paper>

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
                                                    fontSize: '1rem',
                                                    padding: '12px 16px',
                                                },
                                            }}
                                        >
                                            <TableCell sx={{ width: '150px' }}><strong>Currency</strong></TableCell>
                                            <TableCell align="right" sx={{ paddingLeft: '8px' }}><strong>Rate</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getFilteredAndSortedRates().map(([currency, rate], index) => (
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
                                                        padding: '12px 16px',
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
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )}
            </Box>
        </Box>
    );
}
