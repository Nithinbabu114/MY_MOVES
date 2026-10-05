/**
 * Formats date into exact style: "Sep 26, 2020 at 6:18 pm" or "Nov 6, 2021 at 10:00 pm"
 */
export function formatMovingDate(dateStr) {
  if (!dateStr) return 'Date not specified';

  // If already in "MMM d, yyyy at h:mm am/pm" format, return as is
  if (/[A-Za-z]{3}\s+\d{1,2},\s+\d{4}\s+at\s+\d{1,2}:\d{2}\s+(am|pm)/i.test(dateStr)) {
    return dateStr;
  }

  // Parse strings like "2021-11-06 22:00:00" or ISO strings
  const cleaned = dateStr.replace(' ', 'T');
  const d = new Date(cleaned);
  if (isNaN(d.getTime())) {
    return dateStr;
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}

/**
 * Extracts and groups active items from inventory and custom items
 */
export function processInventory(inventory = [], customItemsData = {}) {
  const result = [];

  for (const section of inventory) {
    let sectionTotalQty = 0;
    const subcategories = [];

    if (Array.isArray(section.category)) {
      for (const cat of section.category) {
        const activeItems = [];

        if (Array.isArray(cat.items)) {
          for (const item of cat.items) {
            const qty = Number(item.qty) || 0;
            if (qty > 0) {
              sectionTotalQty += qty;

              // Find specifications (material type, size option, etc.)
              const selectedTypes = (item.type || [])
                .filter((t) => t.selected)
                .map((t) => t.option.trim())
                .filter(Boolean);

              const selectedSizes = Array.isArray(item.size)
                ? item.size
                    .filter((s) => s.selected)
                    .map((s) => (s.tooltip || s.option).trim())
                    .filter(Boolean)
                : [];

              const specs = [...selectedTypes, ...selectedSizes].join(', ');

              activeItems.push({
                id: item.id,
                name: item.displayName || item.name,
                qty,
                specification: specs,
              });
            }
          }
        }

        if (activeItems.length > 0) {
          subcategories.push({
            name: cat.displayName || cat.name,
            items: activeItems,
          });
        }
      }
    }

    result.push({
      id: section.id || section.name,
      name: section.name,
      displayName: section.displayName || section.name,
      totalCount: sectionTotalQty,
      subcategories,
    });
  }

  // Add Custom Items category
  const customItemsList = customItemsData?.items || [];
  const customTotal = customItemsList.reduce(
    (sum, ci) => sum + (Number(ci.item_qty) || 0),
    0
  );

  result.push({
    id: 'custom_items',
    name: 'custom_items',
    displayName: 'Custom Items',
    totalCount: customTotal,
    subcategories: [],
    isCustom: true,
    customItems: customItemsList,
  });

  return result;
}
