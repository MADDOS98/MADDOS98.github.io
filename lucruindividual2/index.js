document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('albumGrid');
    const generateBtn = document.getElementById('generateBtn');

    // Categorii pentru a face pozele să arate a albume reale
    const categories = ['wedding', 'family', 'travel', 'couple', 'nature', 'portrait', 'architecture', 'party'];

    function generateAlbums(count = 8) {
        // Facem grid-ul invizibil pentru tranziție
        grid.style.opacity = '0';

        setTimeout(() => {
            grid.innerHTML = ''; // Curățăm albumele vechi
            
            for (let i = 0; i < count; i++) {
                createAlbumItem(i);
            }

            // Reafișăm grid-ul
            grid.style.opacity = '1';
        }, 300);
    }

    function createAlbumItem(index) {
        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card');

        // Alegem o categorie random pentru fiecare album
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        
        // Folosim un parametru 'lock' unic combinat cu un timestamp pentru a evita cache-ul
        // Aceasta forțează browserul să descarce o imagine nouă de fiecare dată
        const uniqueSeed = Date.now() + index;
        const imageUrl = `https://loremflickr.com/500/500/${randomCat}?lock=${uniqueSeed}`;

        const albumInner = document.createElement('div');
        albumInner.classList.add('album-inner');

        const img = document.createElement('img');
        // Setăm src-ul
        img.src = imageUrl;
        img.alt = `Album ${randomCat}`;
        
        // Ascundem imaginea până se încarcă complet
        img.style.opacity = 0;
        img.style.transition = 'opacity 0.6s ease';

        // Când imaginea s-a încărcat
        img.onload = () => {
            img.style.opacity = 1;
        };

        // Dacă imaginea eșuează (link rupt), punem un placeholder colorat
        img.onerror = () => {
            img.src = 'https://placehold.co/500x500/1e293b/ffffff?text=Fara+Imagine';
        };

        albumInner.appendChild(img);
        
        // Adăugăm un mic element decorativ (opțional, pentru realism)
        const shine = document.createElement('div');
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)';
        shine.style.pointerEvents = 'none';
        albumInner.appendChild(shine);

        albumCard.appendChild(albumInner);
        grid.appendChild(albumCard);
    }

    // Event Listeners
    generateBtn.addEventListener('click', () => generateAlbums(8));

    // Generare la start
    generateAlbums(8);
});