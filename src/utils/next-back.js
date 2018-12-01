export function nextIndex(currentIndex, totalPages) {
    return (currentIndex + 1) % totalPages || 1;
}

export function prevIndex(currentIndex, totalPages) {
    return (
        (totalPages + currentIndex - 1) % totalPages ||
        (totalPages - 1)
    )
}