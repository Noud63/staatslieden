import AddPost from "@/components/AddPost";

export default function Layout({ children }) {
  return (
    <div className="w-full max-w-[670px] mx-auto">
      <AddPost />
      <main>{children}</main>

    </div>
  );
}
