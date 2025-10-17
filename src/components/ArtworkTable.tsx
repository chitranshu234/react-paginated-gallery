import React from 'react';
import { DataTable, type DataTablePageEvent, type DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { Artwork, CustomLazyState } from '../types/artwork';

interface ArtworkTableProps {
    artworks: Artwork[];
    loading: boolean;
    totalRecords: number;
    lazyState: CustomLazyState;
    onPage: (event: DataTablePageEvent) => void;
    onSelectionChange: (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => void;
    currentSelection: Artwork[];
    totalSelectedCount: number;
    selectionHeader: () => React.ReactNode;
    renderField: (data: string | number | null | undefined) => React.ReactNode;
}

const ArtworkTable: React.FC<ArtworkTableProps> = ({
    artworks,
    loading,
    totalRecords,
    lazyState,
    onPage,
    onSelectionChange,
    currentSelection,
    totalSelectedCount,
    selectionHeader,
    renderField,
}) => {
    return (
        <div className="card shadow-md rounded-lg overflow-hidden">
            <DataTable
                value={artworks}
                lazy
                paginator
                first={lazyState.first}
                rows={lazyState.rows}
                totalRecords={totalRecords}
                onPage={onPage}
                loading={loading}
                dataKey="id"
                selection={currentSelection}
                onSelectionChange={onSelectionChange}
                selectionMode="multiple"
                rowsPerPageOptions={[12, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} artworks (Total Selected: ${totalSelectedCount})`}
            >
                <Column
                    selectionMode="multiple"
                    header={selectionHeader}
                    headerStyle={{ width: '4rem' }}
                />
                <Column
                    field="title"
                    header="Title"
                    style={{ minWidth: '14rem' }}
                    body={(rowData: Artwork) => renderField(rowData.title)}
                />
                <Column
                    field="artist_display"
                    header="Artist"
                    style={{ minWidth: '12rem' }}
                    body={(rowData: Artwork) => renderField(rowData.artist_display)}
                />
                <Column
                    field="place_of_origin"
                    header="Origin"
                    style={{ minWidth: '8rem' }}
                    body={(rowData: Artwork) => renderField(rowData.place_of_origin)}
                />
                <Column
                    field="date_start"
                    header="Start Date"
                    style={{ minWidth: '8rem' }}
                    body={(rowData: Artwork) => renderField(rowData.date_start)}
                />
                <Column
                    field="date_end"
                    header="End Date"
                    style={{ minWidth: '8rem' }}
                    body={(rowData: Artwork) => renderField(rowData.date_end)}
                />
                <Column
                    field="inscriptions"
                    header="Inscriptions"
                    style={{ minWidth: '14rem' }}
                    body={(rowData: Artwork) => renderField(rowData.inscriptions)}
                />
            </DataTable>
        </div>
    );
};

export default ArtworkTable;