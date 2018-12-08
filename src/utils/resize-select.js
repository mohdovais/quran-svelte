function getSelectWidth(node, text) {
    var doc = document;
    var body = doc.body;
    var select = node.cloneNode();
    var option = doc.createElement('option');
    var width;

    option.text = text;
    select.add(option, null);
    select.style.opacity = 0;
    select.style.width = 'auto';
    body.appendChild(select);
    width = select.scrollWidth;
    body.removeChild(select);

    return width;
}

export default function resizeSelect(select) {
    var selected = select && select.options[select.selectedIndex];
    if (selected) {
        select.style.width = getSelectWidth(select, selected.innerText) + 'px';
    }
}