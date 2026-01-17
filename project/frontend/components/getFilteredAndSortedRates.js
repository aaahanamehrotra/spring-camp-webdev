const getFilteredAndSortedRates = (rates, searchQuery, sortBy, sortOrder) => {
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
export default getFilteredAndSortedRates;