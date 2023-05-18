export default function Restaurant({ name, rating }) {
  return (
    <span>
      { name }
      { Array(Math.floor(rating)).fill('♡') }
    </span>
  );
}