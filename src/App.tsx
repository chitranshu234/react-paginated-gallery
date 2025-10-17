import React, { useState, useEffect, useRef } from 'react';
import type { DataTablePageEvent, DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import type { Artwork, CustomLazyState, ApiResponse } from './types/artwork';
import { fetchArtworksFromApi } from './api/artworkApi';
import ArtworkTable from './components/ArtworkTable';
import SelectionOverlay from './components/SelectionOverlay';

const App: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const [lazyState, setLazyState] = useState<CustomLazyState>({
        first: 0,
        rows: 12,
        page: 1,
    });

    const [selectedArtworks, setSelectedArtworks] = useState<Record<number, Artwork>>({});
    const [selectionCount, setSelectionCount] = useState<number | null>(null);
    const op = useRef<OverlayPanel>(null);
    
    // --- CHANGE 1: Add a ref to track the initial page load ---
    const isInitialLoad = useRef(true);

    // Fetch data when page or rows change
    useEffect(() => {
        const fetchArtworks = async () => {
            // --- CHANGE 2: Only show the main loader on the very first run ---
            // For subsequent runs (like pagination), data will fetch in the background.
            if (isInitialLoad.current) {
                setLoading(true);
            }

            const page = lazyState.page || 1;
            // The API call remains the same
            const apiUrl = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${lazyState.rows}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: ApiResponse = await response.json();

                setArtworks(result.data);
                setTotalRecords(result.pagination.total);
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
            } finally {
                // --- CHANGE 3: After the first load, set the flag to false ---
                // This ensures the loader doesn't show again on pagination.
                if (isInitialLoad.current) {
                    setLoading(false);
                    isInitialLoad.current = false;
                }
            }
        };

        fetchArtworks();
    }, [lazyState]);

    // Handle page change
    const onPage = (event: DataTablePageEvent) => {
    setLazyState({
        first: event.first,
        rows: event.rows,
        page: (event.page ?? 0) + 1,
    });
};


    // Handle row selection change
    const onSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => {
        const newSelected = new Set((e.value || []).map(art => art.id));
        const currentPageIds = new Set(artworks.map(art => art.id));
        const newSelectedMap = { ...selectedArtworks };

        // Update only current page selections
        currentPageIds.forEach(id => {
            if (newSelected.has(id)) {
                const artwork = artworks.find(art => art.id === id);
                if (artwork) {
                    newSelectedMap[id] = artwork;
                }
            } else {
                delete newSelectedMap[id];
            }
        });

        setSelectedArtworks(newSelectedMap);
    };

    // Handle custom selection from the overlay
    const handleCustomSelection = async () => {
        setSelectedArtworks({});
        if (selectionCount === null || selectionCount <= 0) {
            op.current?.hide();
            setSelectionCount(null);
            return;
        }
        
        // This loading state is for the custom selection action and should remain
        setLoading(true); 

        try {
            const rowsPerPage = lazyState.rows;
            const totalPagesToFetch = Math.ceil(selectionCount / rowsPerPage);
            const currentPage = lazyState.page;
            
            const promises = [];
            for (let i = 0; i < totalPagesToFetch; i++) {
                promises.push(fetchArtworksFromApi(currentPage + i, rowsPerPage));
            }

            const results = await Promise.all(promises);

            const allArtworks = results.flatMap(result => result.data);
            const artworksToSelect = allArtworks.slice(0, selectionCount);

            const newSelectedMap: Record<number, Artwork> = {};
            artworksToSelect.forEach(artwork => {
                newSelectedMap[artwork.id] = artwork;
            });

            setSelectedArtworks(newSelectedMap);

        } catch (error) {
            console.error('Failed to fetch artworks for custom selection:', error);
        } finally {
            setLoading(false); // Hide the loader after custom selection is complete
            op.current?.hide();
            setSelectionCount(null);
        }
    };

    // Custom selection header with chevron icon only
    const selectionHeader = () => {
        return (
            <i
                className="pi pi-chevron-down cursor-pointer"
                onClick={(e: any) => op.current?.toggle(e)}
                aria-haspopup
                aria-controls="overlay_panel"
                style={{ marginLeft: '8px' }}
            />
        );
    };

    // Render N/A for null fields
    const renderField = (data: string | number | null | undefined) => {
        return data || <span className="text-gray-400">N/A</span>;
    };

    const currentSelection = artworks.filter(art => selectedArtworks[art.id]);
    const totalSelectedCount = Object.keys(selectedArtworks).length;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
         <style>{`
     .p-datatable .p-checkbox {
         width: 24px;
         height: 24px;
     }
     .p-datatable .p-checkbox .p-checkbox-box {
         width: 24px !important;
         height: 24px !important;
         border: 2px solid #D1D5DB !important;
     }
     .p-datatable .p-checkbox .p-checkbox-box.p-highlight {
         background-color: #2563EB !important;
         border-color: #2563EB !important;
     }
     .p-datatable .p-checkbox .p-checkbox-box .p-checkbox-icon {
         font-size: 16px !important;
         color: #FFFFFF !important;
     }
`}</style>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Art Institute of Chicago Collection</h1>
                <p className="text-gray-600 mb-6">Browse artworks with server-side pagination</p>

                {/* Custom Selection Overlay Panel */}
                <SelectionOverlay
                    op={op}
                    selectionCount={selectionCount}
                    onSelectionCountChange={setSelectionCount}
                    onSubmit={handleCustomSelection}
                    totalSelectedCount={totalSelectedCount}
                />

                {/* DataTable */}
                <ArtworkTable
                    artworks={artworks}
                    loading={loading}
                    totalRecords={totalRecords}
                    lazyState={lazyState}
                    onPage={onPage}
                    onSelectionChange={onSelectionChange}
                    currentSelection={currentSelection}
                    totalSelectedCount={totalSelectedCount}
                    selectionHeader={selectionHeader}
                    renderField={renderField}
                />
            </div>
        </div>
    );
};

export default App;
