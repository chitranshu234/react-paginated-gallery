# React Paginated Gallery 🖼️

A responsive and efficient art gallery browser built with React and PrimeReact. This project showcases advanced front-end techniques, including server-side pagination, dynamic bulk selection, and parallel data fetching to handle large datasets gracefully.

The application allows users to explore the vast collection from the Art Institute of Chicago, fetching data on demand for a smooth and scalable user experience.

## 🔴 Live Preview

You can view the live deployed application here:

➡️ **[Paginator Site](https://reactpaginator.netlify.app/)** ⬅️


## ✨ Key Features

* ⚡ **Server-Side Pagination**: Data is fetched lazily from the API as the user navigates, ensuring minimal initial load time and scalability for thousands of records.
* ✅ **Dynamic Row Selection**: Users can select single or multiple rows on the current page, with the selection state maintained across page changes.
* 🔢 **Custom Bulk Selection**: An intuitive overlay panel allows users to select a specific number of items across multiple pages at once.
* 🚀 **Efficient Data Fetching**: Utilizes recursive async calls to fetch data for bulk selections, significantly reducing wait times.
* 📱 **Clean & Responsive UI**: Built with PrimeReact components for a professional, mobile-friendly interface.

## 🛠️ Technology Stack

* **Framework**: React
* **Language**: TypeScript
* **UI Components**: PrimeReact (DataTable, Paginator, OverlayPanel) & PrimeIcons
* **Styling**: Inline & Utility CSS
* **API**: Art Institute of Chicago (AIC) API

## 🚀 Getting Started Locally

### Prerequisites

Make sure you have Node.js (v16 or later) and npm installed.

### Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-paginated-gallery.git
cd react-paginated-gallery
```

2. Install the necessary packages:

```bash
npm install
npm install primereact primeicons
```

3. Start the development server:

```bash
npm run dev
```

The application will be running on `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/
│   └── artworkApi.ts
├── components/
│   ├── ArtworkTable.tsx
│   └── SelectionOverlay.tsx
├── types/
│   └── artwork.ts
├── App.tsx
└── main.tsx
```

## 📖 Usage

**Browse Artworks**: Navigate through pages using pagination controls. Change rows per page using the dropdown (12, 25, or 50).

**Select Artworks**: 
- Check boxes to select individual artworks
- Click the chevron icon to open the overlay panel
- Enter the number of rows you want to select
- Click "submit" to select that many artworks across pages
- Click "clear all" to deselect everything

---

**Created as an internship assignment** ✨
