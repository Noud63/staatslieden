"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function NavbarNotificationBadge() {
    const { data: session } = useSession();
  const [count, setCount] = useState(0);

  useEffect(() => {
     if (!session?.user?.id) return;

    async function fetchNotifications() {
      const res = await fetch("/api/getNotifications");
      const data = await res.json();
      setCount(data.notifications?.length || 0);
    }
    fetchNotifications();
  }, [session?.user?.id]);

  if (!session?.user?.id || count === 0) return null;

  return (
    <span style={{
        position: "absolute",
      top: "-14px",
      right: "-22px",
      background: "red",
      width: "1.5em",
      height: "1.5em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      borderRadius: "50%",
      fontWeight: "bold",
      fontSize: "0.9em"
    }}>
      {count}
    </span>
  );
}