export function getRandomItems(array, count = array.length) {
  try {
    return Array.from(
      { length: count },
      () => array[Math.floor(Math.random() * array.length)],
    );
  } catch (err) {
    console.error(err);
    return Array(count).fill(null);
  }
}
