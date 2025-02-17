import LinkPage from "./button-link";

export default function Header() {
  return (
    <div className="flex justify-center items-center gap-4 pt-12 pb-4">
      <LinkPage page="/" text="HOME" />
      <LinkPage page="/admin" text="ADD PRODUCTS" />
      <LinkPage page="/products" text="PRODUCTS" />
    </div>
  );
}
