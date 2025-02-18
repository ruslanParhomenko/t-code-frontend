import LinkPage from "./button-nav";

export default function Header() {
  return (
    <header className="flex justify-center items-center gap-4 pt-12 pb-4">
      <LinkPage page="/" text="HOME" />
      <LinkPage page="/admin" text="ADD PRODUCTS" />
      <LinkPage page="/products" text="PRODUCTS" />
    </header>
  );
}
